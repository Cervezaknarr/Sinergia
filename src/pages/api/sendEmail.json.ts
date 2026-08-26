import type { APIRoute } from "astro";
import { Resend } from "resend";

const MIN_SUBMIT_TIME_MS = 3000;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { to, from, html, subject, text, reply_to, honeypot, formTimestamp } =
      body;

    // Trampa para bots: si completaron el campo oculto, o respondieron
    // demasiado rápido, se descarta el envío sin avisarles del bloqueo.
    const submittedTooFast =
      typeof formTimestamp === "number" &&
      Date.now() - formTimestamp < MIN_SUBMIT_TIME_MS;

    if (honeypot || submittedTooFast) {
      return new Response(
        JSON.stringify({
          message: "OK",
        }),
        {
          status: 200,
          statusText: "OK",
        },
      );
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const send = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
      reply_to,
    });

    if (send.data) {
      return new Response(
        JSON.stringify({
          message: send.data,
        }),
        {
          status: 200,
          statusText: "OK",
        },
      );
    } else {
      return new Response(
        JSON.stringify({
          message: send.error,
        }),
        {
          status: 500,
          statusText: "Internal Server Error",
        },
      );
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: e instanceof Error ? e.message : String(e),
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
};
