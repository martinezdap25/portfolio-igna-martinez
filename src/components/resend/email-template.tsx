interface EmailTemplateProps {
  senderName: string;
  senderEmail: string;
}

export function EmailTemplate({ senderName, senderEmail }: EmailTemplateProps) {
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
        Nuevo mensaje recibido
      </h1>

      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#F1F5F9" }}>
        ¡Hola Ignacio! ✨
      </p>

      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#F1F5F9" }}>
        {senderName} te ha enviado un mensaje a través del formulario de contacto.
      </p>

      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <a
          href={`mailto:${senderEmail}`}
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
          Contactar con {senderName}
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
        Notificación automática · Sitio web de contacto
      </p>
    </div>
  );
}
