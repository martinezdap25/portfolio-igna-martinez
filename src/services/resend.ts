// services/resend.ts
import axios from "axios";

export const sendEmail = async (firstName: string, email: string) => {
    try {
        const { data } = await axios.post("/api/send", { firstName, email });
        console.log("Respuesta:", data);
        return data;
    } catch (error) {
        console.error("Error al enviar email:", error);
        throw new Error("Error al enviar el email");
    }
};
