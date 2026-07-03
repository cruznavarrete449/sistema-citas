let citas = [];

export function guardarCita(cita) {
  citas.push(cita);
}

export function obtenerCitas() {
  return citas;
}