import type { APIRoute } from "astro";
import { Resend } from "resend";
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  const { to, from, html, subject, text, reply_to } = body;

  const send = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
    reply_to,
  });
  console.log({send})
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
};
