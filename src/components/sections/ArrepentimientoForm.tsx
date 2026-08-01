import { ArrepentimientoFormInfo } from "@/data_files/constants";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ArrepentimientoForm = () => {
  const [handleAlert, setHandleAlert] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    name,
    nacionality,
    idnumber,
    phonenumber,
    mail,
    serviceorproduct,
    sendtext,
  } = ArrepentimientoFormInfo;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { name, nacionality, mail, idnumber, phonenumber, serviceorproduct } =
      Object.fromEntries(formData);

    if (
      !name ||
      !nacionality ||
      !mail ||
      !idnumber ||
      !phonenumber ||
      !serviceorproduct
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
          // from: `${mail}`,
          from: `arrepentimiento@sinergiavalores.com`,
          to: "arrepentimiento@sinergiavalores.com",
          subject: `Arrepentimiento`,
          html: `<ul>
            <li>Dirección de email: ${mail}</li>
            <li>Nombre completo: ${name}</li>
            <li>Nacionalidad: ${nacionality}</li>
            <li>Número de documento: ${idnumber}</li>
            <li>Número de teléfono: ${phonenumber}</li>
            <li>Servicio o producto: ${serviceorproduct}</li>
          </ul>`,
          reply_to: mail,
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="sr-only">{name}</label>
        <input
          type="text"
          name="name"
          id={name}
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder={name}
        />
        <label className="sr-only">{nacionality}</label>
        <input
          type="text"
          name="nacionality"
          id={nacionality}
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder={nacionality}
        />
        <label className="sr-only">{idnumber}</label>
        <input
          type="text"
          name="idnumber"
          id="idnumber"
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder={idnumber}
        />
        <label className="sr-only">{phonenumber}</label>
        <input
          type="text"
          name="phonenumber"
          id="phonenumber"
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder={phonenumber}
        />
        <label className="sr-only">{mail}</label>
        <input
          type="text"
          name="mail"
          id="mail"
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder={mail}
        />
        <label className="sr-only">{serviceorproduct}</label>
        <input
          type="text"
          name="serviceorproduct"
          id="serviceorproduct"
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder={serviceorproduct}
        />
      </div>
      <div className="col-span-2 mt-4 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-[20rem] items-center justify-center gap-x-2 rounded-lg bg-yellow-500 px-4 py-3 font-nunito text-sm text-neutral-600 outline-none ring-zinc-500 transition duration-300 focus-visible:ring dark:text-neutral-50"
        >
          {sendtext}
        </button>
      </div>
    </form>
  );
};
