interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div
      style={{
        backgroundColor: "#0F172A",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: "#8B5CF6", textAlign: "center" }}>
        ¡Hola {firstName}!
      </h1>

      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#F1F5F9" }}>
        Muchas gracias por comunicarte conmigo ✨ Me alegra que te intereses en
        mi trabajo. Estoy siempre dispuesto a charlar sobre nuevas
        oportunidades, colaborar en proyectos creativos o simplemente resolver
        cualquier duda que tengas.
      </p>

      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#F1F5F9" }}>
        Contame un poco más sobre cómo puedo ayudarte, y con gusto te responderé
        lo antes posible 🚀.
      </p>

      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <a
          href="mailto:martinezignaciodev@gmail.com"
          style={{
            backgroundColor: "#6366F1",
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          Responder este correo
        </a>
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "#94A3B8",
          textAlign: "center",
          marginTop: "20px",
          borderTop: "1px solid #1E293B",
          paddingTop: "10px",
        }}
      >
        Ignacio Martínez · Desarrollador Full-Stack
        <br />
        <a
          href="https://github.com/martinezdap25"
          style={{ color: "#8B5CF6", textDecoration: "none" }}
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href="https://www.linkedin.com/in/ignacio-martinez-dev"
          style={{ color: "#8B5CF6", textDecoration: "none" }}
        >
          LinkedIn
        </a>
      </p>
    </div>
  );
}
