import icpData from "@data/icp.json";

export interface RentalIndexItem {
  label: string;
  value: string | null;
  date: string | null;
  unavailable: boolean;
}

const BCRA_MONETARIAS_URL = "https://api.bcra.gob.ar/estadisticas/v4.0/monetarias";
const IPC_SERIES_URL = "https://apis.datos.gob.ar/series/api/series/";
const IPC_SERIES_ID = "148.3_INIVELNAL_DICI_M_26";
const BCRA_IDVAR_UVA = 31;
const BCRA_IDVAR_ICL = 40;

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6hs: alcanza de sobra para índices diarios/mensuales
const FETCH_TIMEOUT_MS = 8000;

const cache = new Map<string, { expires: number; data: RentalIndexItem }>();

async function fetchJsonWithTimeout(url: string): Promise<any> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} al consultar ${url}`);
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function displayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function displayMonthYear(monthStr: string): string {
  const [year, month] = monthStr.split("-");
  return `${MONTH_NAMES[Number(month) - 1]} ${year}`;
}

function formatPercent(value: number): string {
  return (
    new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + "%"
  );
}

function oneYearBefore(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00Z");
  d.setUTCFullYear(d.getUTCFullYear() - 1);
  return toIsoDate(d);
}

async function withCache(key: string, compute: () => Promise<RentalIndexItem>): Promise<RentalIndexItem> {
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return cached.data;

  try {
    const data = await compute();
    cache.set(key, { expires: Date.now() + CACHE_TTL_MS, data });
    return data;
  } catch (err) {
    console.error(`[rentalIndices] Error al obtener "${key}":`, err);
    // Si falla pero hay un valor cacheado vencido, es preferible mostrarlo antes que nada.
    if (cached) return cached.data;
    return { label: key, value: null, date: null, unavailable: true };
  }
}

/** Variación interanual (%) de un índice diario del BCRA (UVA / ICL). */
async function fetchBcraAnnualVariation(idVariable: number, label: string): Promise<RentalIndexItem> {
  const hasta = toIsoDate(new Date());
  const desde = toIsoDate(new Date(Date.now() - 400 * 24 * 60 * 60 * 1000));
  const url = `${BCRA_MONETARIAS_URL}/${idVariable}?desde=${desde}&hasta=${hasta}&limit=3000`;

  const json = await fetchJsonWithTimeout(url);
  const detalle: { fecha: string; valor: number }[] = json?.results?.[0]?.detalle ?? [];
  if (detalle.length === 0) throw new Error(`Sin datos para idVariable=${idVariable}`);

  const last = detalle[0]; // la API devuelve orden descendente por fecha
  const target = oneYearBefore(last.fecha);
  const base = detalle.find((d) => d.fecha <= target);
  if (!base) throw new Error(`No se encontró dato base (~1 año antes) para idVariable=${idVariable}`);

  const variation = (last.valor / base.valor - 1) * 100;
  return { label, value: formatPercent(variation), date: displayDate(last.fecha), unavailable: false };
}

/** Variación interanual (%) del IPC Nivel General Nacional (datos.gob.ar / INDEC). */
async function fetchIpcAnnualVariation(): Promise<RentalIndexItem> {
  // El IPC se publica con rezago (el último dato disponible puede ser de
  // 1-2 meses atrás), así que la ventana debe cubrir bastante más de 12
  // meses hacia atrás desde hoy para no perder el dato base.
  const startDate = toIsoDate(new Date(Date.now() - 600 * 24 * 60 * 60 * 1000));
  const url = `${IPC_SERIES_URL}?ids=${IPC_SERIES_ID}&start_date=${startDate}&format=json&limit=1000`;

  const json = await fetchJsonWithTimeout(url);
  const data: [string, number][] = json?.data ?? [];
  if (data.length === 0) throw new Error("Sin datos de IPC");

  const [lastDate, lastValue] = data[data.length - 1];
  const target = oneYearBefore(lastDate);
  let base: [string, number] | undefined;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][0] <= target) {
      base = data[i];
      break;
    }
  }
  if (!base) throw new Error("No se encontró dato base (~1 año antes) para IPC");

  const variation = (lastValue / base[1] - 1) * 100;
  return { label: "IPC", value: formatPercent(variation), date: displayDate(lastDate), unavailable: false };
}

/**
 * El Coeficiente Casa Propia (ICP) no tiene API ni tabla estructurada: el
 * gobierno solo lo publica dentro de un PDF ("Coeficiente de actualización
 * de los Créditos Casa Propia") en
 * https://www.argentina.gob.ar/obras-publicas/coeficiente-casa-propia
 * cuyo nombre de archivo cambia cada mes. Por eso los coeficientes mensuales
 * se cargan a mano en src/data_files/icp.json y acá solo se componen para
 * obtener la variación interanual (últimos 12 meses encadenados), igual que
 * con los otros índices.
 */
function getIcpAnnualVariation(): RentalIndexItem {
  const coefficients = icpData.coefficients ?? [];
  const last12 = coefficients.slice(-12);
  if (last12.length < 12) {
    return { label: "ICP", value: null, date: null, unavailable: true };
  }

  const product = last12.reduce((acc, c) => acc * c.value, 1);
  const variation = (product - 1) * 100;
  const lastMonth = last12[last12.length - 1].month;
  return { label: "ICP", value: formatPercent(variation), date: displayMonthYear(lastMonth), unavailable: false };
}

export async function getRentalIndices(): Promise<RentalIndexItem[]> {
  const [ipc, uva, iclIndex] = await Promise.all([
    withCache("ipc", fetchIpcAnnualVariation),
    withCache("uva", () => fetchBcraAnnualVariation(BCRA_IDVAR_UVA, "UVA")),
    withCache("icl", () => fetchBcraAnnualVariation(BCRA_IDVAR_ICL, "ICL")),
  ]);

  return [getIcpAnnualVariation(), ipc, uva, iclIndex];
}
