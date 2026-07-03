import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    for (let key in data) {
      if (!data[key]) {
        return Response.json({ error: "Campos incompletos" }, { status: 400 });
      }
    }

    const numero_cita = "CITA-" + Date.now();

    // TRANSPORTER DIRECTO (evita errores de import)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.correo,
      subject: "Confirmación de cita médica",
      html: `
        <h2>🏥 Cita confirmada</h2>
        <p><b>Nombre:</b> ${data.nombre}</p>
        <p><b>Número de cita:</b> ${numero_cita}</p>
        <p><b>Especialidad:</b> ${data.especialidad}</p>
        <p><b>Médico:</b> ${data.medico}</p>
        <p><b>Fecha:</b> ${data.fecha}</p>
        <p><b>Hora:</b> ${data.hora}</p>
      `
    });

    return Response.json({ numero_cita });

  } catch (error) {
    console.log(error); // 👈 importante para ver error real
    return Response.json(
      { error: "Error al enviar correo o servidor" },
      { status: 500 }
    );
  }
}