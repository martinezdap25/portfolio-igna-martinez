/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/resend/email-template";
import { z } from "zod";

const sendEmailSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido.").trim(),
  email: z.string().email("El formato del email no es válido."),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Leer body
    const body = await req.json();
    console.log("📩 Body recibido:", body);

    // 2. Validar con Zod
    const validation = sendEmailSchema.safeParse(body);
    if (!validation.success) {
      console.error("❌ Errores de validación:", validation.error.format());
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { firstName, email } = validation.data;

    // 3. Instanciar Resend
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ Falta RESEND_API_KEY en variables de entorno");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 4. Enviar correo
    console.log("📤 Enviando email con Resend:", {
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      firstName,
    });

    const response = await resend.emails.send({
      from: `Ignacio Martinez - Full Stack Developer <${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: "¿En qué puedo ayudarte?",
      react: EmailTemplate({ firstName }),
    });

    // 5. Loguear respuesta completa
    console.log("✅ Respuesta completa de Resend:", JSON.stringify(response, null, 2));

    // 6. Devolver respuesta clara al frontend
    return NextResponse.json({
      success: !response.error,
      data: response.data,
      error: response.error,
    });
  } catch (error: any) {
    console.error("💥 Error en /api/send:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error desconocido" },
      { status: 500 }
    );
  }
}
