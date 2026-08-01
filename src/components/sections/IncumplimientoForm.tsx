import React, { useState, useEffect } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  formSubTitle: string;
};

export const IncumplimientoForm = ({ formSubTitle }: Props) => {
  const [handleAlert, setHandleAlert] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const {
      nombre,
      apellido,
      email,
      confirmarEmail,
      numerodetelefono,
      consulta,
      tipo,
      numerodocumento,
      numerodetelefonoparticular,
      calle,
      numero,
      departamento,
      piso,
      localidad,
      partido,
      provincia,
      codigocontrato,
      sugerencia,
      detalle,
      inmobiliaria,
      nombreinquilino,
      apellidoinquilino,
      tipoinquilino,
      numerodocumentoinquilino,
    } = Object.fromEntries(formData);

    if (
      !nombre ||
      !apellido ||
      !email ||
      !numerodetelefono ||
      !tipo ||
      !numerodocumento ||
      !confirmarEmail ||
      !numerodetelefonoparticular ||
      !calle ||
      !numero ||
      !localidad ||
      !partido ||
      !provincia ||
      !codigocontrato ||
      !inmobiliaria ||
      !nombreinquilino ||
      !apellidoinquilino ||
      !tipoinquilino ||
      !numerodocumentoinquilino
    ) {
      setHandleAlert(true);
      setIsSubmitting(false);
      return;
    }

    setHandleAlert(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/sendEmail.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // from: `${email}`,
          from: `incumplimiento@sinergiavalores.com`,
          to: "incumplimiento@sinergiavalores.com",
          subject: `Incumplimiento de parte de ${nombre} ${apellido}`,
          html: `
          <div>
          <h2>Datos Propietario</h2>
          <ul>
            <li>Nombre Completo: ${nombre} ${apellido}</li>
            <li>Email: ${email}</li>
            <li>Número de teléfono: ${numerodetelefono}</li>
            <li>Número de telefono particular: ${numerodetelefonoparticular}</li>
            <li>Tipo: ${tipo}</li>
            <li>Número de documento/Pasaporte: ${numerodocumento}</li>
          </ul>
          <h2>Datos Propiedad</h2>
          <ul>
            <li>Calle: ${calle}</li>
            <li>Número: ${numero}</li>
            <li>Departamento: ${departamento}</li>
            <li>Piso: ${piso}</li>
            <li>Localidad: ${localidad}</li>
            <li>Partido: ${partido}</li>
            <li>Provincia: ${provincia}</li>
            <li>Código de contrato: ${codigocontrato}</li>
            <li>Sugerencia: ${sugerencia}</li>
            <li>Detalle: ${detalle}</li>
            <li>Inmobiliaria: ${inmobiliaria}</li>
          </ul>
          <h2>Datos Inquilino</h2>
          <ul>
            <li>Nombre Completo: ${nombreinquilino} ${apellidoinquilino}</li>
            <li>Tipo: ${tipoinquilino}</li>
            <li>Número de documento: ${numerodocumentoinquilino}</li>
          </ul>
          </div>
          `,
          reply_to: email,
        }),
      });

      if (res.ok) {
        toast.success("Email enviado!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (handleAlert) {
      toast.warn("No ha completado todos los campos!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [handleAlert]);

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between gap-16 md:flex-row md:flex-wrap">
        <div className="grid h-full gap-4">
          <h1 className="text-balance text-center font-gotham text-xl tracking-tight text-neutral-800 dark:text-neutral-200 md:text-2xl md:leading-tight">
            Datos Propietario
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="sr-only">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="hs-firstname-contacts"
              className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              placeholder="Nombre"
            />
            <label className="sr-only">Apellido</label>
            <input
              type="text"
              name="apellido"
              id="hs-lastname-contacts"
              className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              placeholder="Apellido"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="sr-only">Tipo</label>
            <select
              name="tipo"
              id="hs-Tipo-check"
              autoComplete="Tipo"
              className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            >
              <option value="" disabled selected hidden>
                Tipo
              </option>
              <option value="dni">DNI</option>
              <option value="pasaporte">Pasaporte</option>
            </select>
            <label className="sr-only">Número de documento</label>
            <input
              type="text"
              name="numerodocumento"
              id="hs-phone-number"
              className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              placeholder="Número de documento"
            />
          </div>
          <label className="sr-only">Ingrese Email</label>
          <input
            type="email"
            name="email"
            id="hs-email-contacts"
            autoComplete="email"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Ingrese Email"
          />

          <label className="sr-only">Confirmar Email</label>
          <input
            type="email"
            name="confirmarEmail"
            id="hs-email-contacts"
            autoComplete="email"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Confirmar Email"
          />
          <label className="sr-only">Número de teléfono</label>
          <input
            type="tel"
            name="numerodetelefono"
            id="hs-phone-number"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Número de teléfono"
          />
          <label className="sr-only">Número de teléfono particular</label>
          <input
            id="hs-about-contacts"
            name="numerodetelefonoparticular"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Número de teléfono particular"
          />
        </div>

        <div className="grid h-full gap-4">
          <h1 className="text-balance text-center font-gotham text-xl tracking-tight text-neutral-800 dark:text-neutral-200 md:text-2xl md:leading-tight">
            Datos Propiedad
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="sr-only">Calle</label>
            <input
              type="text"
              name="calle"
              id="hs-firstname-contacts"
              className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              placeholder="Calle"
            />
            <label className="sr-only">Número</label>
            <input
              type="number"
              name="numero"
              id="hs-lastname-contacts"
              className="hide-number-arrows block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              placeholder="Número"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="sr-only">Departamento</label>
            <input
              type="text"
              name="departamento"
              id="hs-phone-number"
              className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              placeholder="Departamento"
            />

            <label className="sr-only">Piso</label>
            <input
              type="text"
              name="piso"
              id="hs-phone-number"
              className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              placeholder="piso"
            />
          </div>
          <label className="sr-only">Localidad</label>
          <input
            type="text"
            name="localidad"
            id="hs-email-contacts"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Localidad"
          />

          <label className="sr-only">Partido</label>
          <input
            type="text"
            name="partido"
            id="hs-email-contacts"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Partido"
          />

          <label className="sr-only">Provincia</label>
          <input
            type="text"
            name="provincia"
            id="hs-email-contacts"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Provincia"
          />

          <label className="sr-only">Código de contrato de fianza</label>
          <input
            type="tel"
            name="codigocontrato"
            id="hs-phone-number"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Código de contrato de fianza"
          />
          <label className="sr-only">Súgerencia</label>
          <input
            id="hs-about-contacts"
            name="sugerencia"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Súgerencia"
          />
          <label className="sr-only">Detalle</label>
          <input
            id="hs-about-contacts"
            name="detalle"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Detalle"
          />
          <label className="sr-only">Inmobiliaria</label>
          <input
            id="hs-about-contacts"
            name="inmobiliaria"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Inmobiliaria"
          />
        </div>

        <div className="grid h-full gap-4">
          <h1 className="text-balance text-center font-gotham text-xl tracking-tight text-neutral-800 dark:text-neutral-200 md:text-2xl md:leading-tight">
            Datos Inquilino
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="sr-only">Nombre</label>
            <input
              type="text"
              name="nombreinquilino"
              id="hs-firstname-contacts"
              className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              placeholder="Nombre"
            />
            <label className="sr-only">Apellido</label>
            <input
              type="text"
              name="apellidoinquilino"
              id="hs-lastname-contacts"
              className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              placeholder="Apellido"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="sr-only">Tipo</label>
            <select
              name="tipoinquilino"
              id="hs-Tipo-check"
              autoComplete="Tipo"
              className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            >
              <option value="" disabled selected hidden>
                Tipo
              </option>
              <option value="dni">DNI</option>
              <option value="pasaporte">Pasaporte</option>
            </select>
            <label className="sr-only">Número de documento</label>
            <input
              type="number"
              name="numerodocumentoinquilino"
              id="hs-phone-number"
              className="hide-number-arrows block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              placeholder="Número de documento"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-[100%] items-center justify-center gap-x-2 rounded-lg border border-transparent bg-yellow-400 px-4 py-3 font-gotham text-sm text-neutral-700 outline-none ring-zinc-500 transition duration-300 hover:bg-yellow-500 focus-visible:ring disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:ring-zinc-200 dark:focus:outline-none md:w-[30%] 2xl:text-base"
        >
          Enviar Mail
        </button>
      </div>

      <div className="mt-3 text-center">
        <p className="font-nunito text-sm text-neutral-600 dark:text-neutral-400">
          {formSubTitle}
        </p>
      </div>
    </form>
  );
};
