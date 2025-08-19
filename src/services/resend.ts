// services/resend.ts
import axios from "axios";

export const sendEmail = async (firstName: string, email: string) => {
    console.log("Datos: ", firstName, email);

    try {
        const { data } = await axios.post("/api/send", { firstName, email });
        console.log("Respuesta:", data);
        return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("Error al enviar email:", err.response?.data || err.message);
        return {
            success: false,
            error: err.response?.data?.error || err.message || "Error desconocido",
        };
    }
};
