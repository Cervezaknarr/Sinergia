import React, { useState, useEffect } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  formSubTitle: string;
};

export const SolicitudForm = ({ formSubTitle }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChecked) {
      toast.warn("Debe aceptar los términos y condiciones para continuar.", {
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
      return;
    }

    const formData = new FormData(e.currentTarget);
    const {
      nombre,
      apellido,
      email,
      confirmarEmail,
      tipo,
      NumeroDeDocumento,
      nacionalidad,
      numeroTelefono,
      nombreInmobiliaria,
      zonaAlquiler,
      comoNosConocio,
    } = Object.fromEntries(formData);

    if (
      !nombre ||
      !apellido ||
      !email ||
      !confirmarEmail ||
      !tipo ||
      !NumeroDeDocumento ||
      !nacionalidad ||
      !numeroTelefono ||
      !nombreInmobiliaria ||
      !zonaAlquiler ||
      !comoNosConocio
    ) {
      setIsSubmitting(false);
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
      return;
    }

    if (confirmarEmail !== email) {
      setIsSubmitting(false);
      toast.error("Las direcciones de mail no son iguales.", {
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
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/sendEmail.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // from: `${email}`,
          from: `solicitudes@sinergiavalores.com`,
          to: "solicitudes@sinergiavalores.com",
          subject: `Consulta de parte de ${nombre} ${apellido}`,
          html: `<ul>
            <li>Dirección de email: ${email}}</li>
            <li>Tipo de solicitud: ${tipo}</li>
            <li>Número de documento/pasaporte: ${NumeroDeDocumento}</li>
            <li>Nacionalidad: ${nacionalidad}</li>
            <li>Número de telefono: ${numeroTelefono}</li>
            <li>Nombre de inmobiliaria: ${nombreInmobiliaria}</li>
            <li>Zona de alquiler: ${zonaAlquiler}</li>
            <li>Como nos conocio: ${comoNosConocio}</li>
          </ul>`,
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

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        {/* Sección Nombre y Apellido */}
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

        {/* Sección Tipo de Documento y Número de Documento */}
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
            name="NumeroDeDocumento"
            id="hs-phone-number"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Número de documento"
          />
        </div>

        {/* Sección Nacionalidad y Número Telefónico */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="sr-only">Nacionalidad</label>
          <input
            type="text"
            name="nacionalidad"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Nacionalidad"
          />
          <label className="sr-only">Número Telefónico</label>
          <input
            type="text"
            name="numeroTelefono"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Número Telefónico"
          />
        </div>

        {/* Sección Nombre de Inmobiliaria y Zona de Alquiler */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="sr-only">Nombre de Inmobiliaria</label>
          <input
            type="text"
            name="nombreInmobiliaria"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Nombre de Inmobiliaria"
          />
          <label className="sr-only">Zona de Alquiler</label>
          <input
            type="text"
            name="zonaAlquiler"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Zona de Alquiler"
          />
        </div>

        {/* Sección Email y Confirmar Email */}
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

        {/* Sección ¿Cómo nos conoció? */}
        <label className="sr-only">¿Cómo nos conoció?</label>
        <select
          name="comoNosConocio"
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
        >
          <option defaultValue="" disabled selected hidden>
            ¿Cómo nos conoció?
          </option>
          <option value="internet">Internet</option>
          <option value="recomendacion">Recomendación</option>
          <option value="redes sociales">Redes Sociales</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      {/* Enlace a Términos y Condiciones y Checkbox */}
      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-500"
        />
        <label
          htmlFor="terms"
          className="ml-2 block text-sm text-neutral-600 dark:text-neutral-400"
        >
          He leído y acepto los{" "}
          <a
            href="/files/terminosycondiciones.pdf"
            target="_blank"
            className="text-yellow-400 hover:underline"
          >
            Términos y Condiciones
          </a>
        </label>
      </div>

      {/* Botón de Envío */}
      <div className="mt-4 grid">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-yellow-400 px-4 py-3 font-gotham text-sm text-neutral-700 outline-none ring-zinc-500 transition duration-300 hover:bg-yellow-500 focus-visible:ring disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:ring-zinc-200 dark:focus:outline-none 2xl:text-base"
        >
          Enviar Mail
        </button>
      </div>

      {/* Subtítulo */}
      <div className="mt-3 text-center">
        <p className="font-nunito text-sm text-neutral-600 dark:text-neutral-400">
          {formSubTitle}
        </p>
      </div>
    </form>
  );
};
