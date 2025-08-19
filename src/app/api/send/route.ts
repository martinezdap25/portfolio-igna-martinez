import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/resend/email-template";
import { z, treeifyError } from "zod";

const sendEmailSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido.").trim(),
  email: z.string().email("El formato del email no es válido."),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Body recibido:", body);
    const validation = sendEmailSchema.safeParse(body);

    if (!validation.success) {
      const errorsTree = treeifyError(validation.error);
      const fieldErrors = {
        firstName: errorsTree.properties?.firstName?.errors || [],
        email: errorsTree.properties?.email?.errors || [],
      };
      return NextResponse.json({ error: fieldErrors }, { status: 400 });
    }

    const { firstName, email } = validation.data;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data } = await resend.emails.send({
      from: `Ignacio Martinez - Full Stack Developer - <${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: "¿En que puedo ayudarte?",
      react: EmailTemplate({ firstName }),
    });

    console.log(`Respuesta de Resend:", ${data}`)

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error al enviar el email:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
