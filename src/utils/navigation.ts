const navBarLinks = [
  { name: "Inicio", url: "/" },
  { name: "Solicitud", url: "/solicitud" },
  { name: "Ayuda", url: "/ayuda" },
  { name: "Calculadora", url: "/calculadora" },
  { name: "Contacto", url: "/contacto" },
  { name: "Incumplimiento", url: "/incumplimiento" },
];

const footerLinks = [
  {
    section: "Redes Sociales",
    links: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61561059611052&mibextid=LQQJ4d",
      },
      { name: "Twitter", url: "https://twitter.com/" },
      { name: "Instagram", url: "https://www.instagram.com/sinergiavalores/" },
      {
        name: "Tiktok",
        url: "https://www.tiktok.com/@sinergia.valores?_t=8o3X7xTxBri&_r=1",
      },
    ],
  },
  {
    section: "Información",
    links: [
      {
        name: "Términos y Condiciones",
        url: "/files/terminosycondiciones.pdf",
      },
      {
        name: "Contrato de adhesión",
        url: "/files/Contrato.pdf",
      },
      {
        name: "Requisitos",
        url: "/files/REQUISITOS.pdf",
      },
    ],
  },
  {
    section: "Servicios",
    links: [
      { name: "Ayuda", url: "/ayuda" },
      { name: "Calculadora", url: "/calculadora" },
      { name: "Solicitud", url: "/solicitud" },
    ],
  },
];

const whatsappInfo = {
  PhoneNumber: "+5492216145726",
  Message: `Hola, me estoy comunicando del sitio web de Sinergia valores para hacer una consulta.`,
};

export default {
  navBarLinks,
  footerLinks,
  whatsappInfo,
};
