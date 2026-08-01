export function calcularResultado(
  rent: number,
  expenses: number,
  tipoAlquiler: string,
  duracionAlquiler: number,
): {
  resultadoNormal: string;
  resultadoMenosDiezPorciento: string;
  anticipo25: string;
  cuota25: string;
  anticipo50: string;
  cuota50: string;
} {
  let total = 0;
  switch (tipoAlquiler) {
    case "temporal":
      total = (rent + expenses) * 6 * 0.05;
      break;
    case "residencial":
      total = (rent + expenses) * duracionAlquiler * 0.05;
      break;
    case "comercial":
      total = (rent + expenses) * duracionAlquiler * 0.05;
      break;
    default:
      total = (rent + expenses) * 0.05; // Default case if type doesn't match
  }

  const locale = "es-AR";
  console.log("hola");
  console.log(total);
  // Formateador para el sistema de numeración argentino
  const numberFormatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Resultado normal
  const resultadoNormal = numberFormatter.format(total);
  // Resultado -15%
  const resultadoMenosDiezPorciento = numberFormatter.format(total * 0.85);

  // 25% Anticipo + 3 cuotas
  const anticipo25 = numberFormatter.format(total * 0.25);
  const cuota25 = numberFormatter.format((total * 0.75) / 3);

  // 50% Anticipo + 6 cuotas
  const anticipo50 = numberFormatter.format(total * 0.5);
  const cuota50 = numberFormatter.format((total * 0.5) / 6);

  return {
    resultadoNormal,
    resultadoMenosDiezPorciento,
    anticipo25,
    cuota25,
    anticipo50,
    cuota50,
  };
}

export function handleSubmit(event: Event): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const rent = parseFloat(formData.get("rent") as string);
  const expenses = parseFloat(formData.get("expenses") as string);
  const tipoAlquiler = formData.get("tipoAlquiler") as string;
  const duracionAlquiler = parseInt(
    formData.get("duracionAlquiler") as string,
    10,
  );

  const {
    resultadoNormal,
    resultadoMenosDiezPorciento,
    anticipo25,
    cuota25,
    anticipo50,
    cuota50,
  } = calcularResultado(rent, expenses, tipoAlquiler, duracionAlquiler);

  const resultElement10Off = document.getElementById("result10Off");
  const costoOriginalElement = document.getElementById("costoOriginal");
  const descuentoValorElement = document.getElementById("descuentoValor");
  const totalCostoElement = document.getElementById("totalCosto");

  const anticipo25Element = document.getElementById("anticipo25");
  const cuota25Element = document.getElementById("cuotas25");
  const cuotaValor25Element = document.getElementById("cuotaValor25");
  const totalCosto25Element = document.getElementById("totalCosto25");

  const anticipo50Element = document.getElementById("anticipo50");
  const cuota50Element = document.getElementById("cuotas50");
  const cuotaValor50Element = document.getElementById("cuotaValor50");
  const totalCosto50Element = document.getElementById("totalCosto50");

  if (resultElement10Off) {
    resultElement10Off.textContent = `$${resultadoMenosDiezPorciento}`;
  }
  if (costoOriginalElement) {
    costoOriginalElement.textContent = `$${resultadoNormal}`;
  }
  if (descuentoValorElement) {
    const descuentoValor =
      parseFloat(resultadoNormal.replace(/\./g, "")) -
      parseFloat(resultadoMenosDiezPorciento.replace(/\./g, ""));
    descuentoValorElement.textContent = `-$${new Intl.NumberFormat("es-AR").format(descuentoValor)}`;
  }
  if (totalCostoElement) {
    totalCostoElement.textContent = `$${resultadoMenosDiezPorciento}`;
  }

  if (anticipo25Element) {
    anticipo25Element.textContent = `$${anticipo25}`;
  }
  if (cuota25Element) {
    cuota25Element.textContent = `$${cuota25}`;
  }
  if (cuotaValor25Element) {
    cuotaValor25Element.textContent = cuota25;
  }
  if (totalCosto25Element) {
    totalCosto25Element.textContent = `$${resultadoNormal}`;
  }

  if (anticipo50Element) {
    anticipo50Element.textContent = `$${anticipo50}`;
  }
  if (cuota50Element) {
    cuota50Element.textContent = `$${cuota50}`;
  }
  if (cuotaValor50Element) {
    cuotaValor50Element.textContent = cuota50;
  }
  if (totalCosto50Element) {
    totalCosto50Element.textContent = `$${resultadoNormal}`;
  }
}
