"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

export default function Home() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    especialidad: "",
    medico: "",
    fecha: "",
    hora: "",
    motivo: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
    e.preventDefault();
    setMensaje("");

    for (let key in form) {
      if (!form[key]) {
        setMensaje("❌ Todos los campos son obligatorios");
        return;
      }
    }

    setLoading(true);

    const numero_cita = "CITA-" + Date.now();

    try {
      await emailjs.send(
        "service_9q60moq",
        "template_0f43nrd",
        {
          nombre: form.nombre,
          correo: form.correo,
          numero_cita,
          especialidad: form.especialidad,
          medico: form.medico,
          fecha: form.fecha,
          hora: form.hora
        },
        "U6BM_cdwKw_OUgEll"
      );

      setMensaje("✅ Cita registrada: " + numero_cita);

    } catch (error) {
      console.log(error);
      setMensaje("❌ Error al enviar correo");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>🏥 Sistema de Citas Médicas</h1>

        <form onSubmit={enviar} style={styles.form}>

          <input name="nombre" placeholder="Nombre" onChange={handleChange} style={styles.input} />
          <input name="correo" placeholder="Correo" onChange={handleChange} style={styles.input} />
          <input name="telefono" placeholder="Teléfono" onChange={handleChange} style={styles.input} />

          <select name="especialidad" onChange={handleChange} style={styles.input}>
            <option value="">Especialidad</option>
            <option>Medicina General</option>
            <option>Pediatría</option>
            <option>Cardiología</option>
          </select>

          <select name="medico" onChange={handleChange} style={styles.input}>
            <option value="">Médico</option>
            <option>Dr. Juan Pérez</option>
            <option>Dra. Ana López</option>
            <option>Dr. Carlos Ramírez</option>
          </select>

          <input type="date" name="fecha" onChange={handleChange} style={styles.input} />
          <input type="time" name="hora" onChange={handleChange} style={styles.input} />
          <input name="motivo" placeholder="Motivo" onChange={handleChange} style={styles.input} />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Enviando..." : "Agendar cita"}
          </button>
        </form>

        <p>{mensaje}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a"
  },
  card: {
    background: "white",
    padding: 30,
    borderRadius: 15,
    width: 400,
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #111111"
  },
  button: {
    padding: 12,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  }
};