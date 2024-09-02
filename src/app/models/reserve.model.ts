import { Cliente } from './cliente.model';

export class Reserve {
  id_reserva: string;
  cliente: Cliente;
  fecha_reserva: string;
  hora_reserva: string;
  cantidad_personas: number;
  comment: string;

  constructor(
    id_reserva: string,
    cliente: Cliente,
    fecha_reserva: string,
    hora_reserva: string,
    cantidad_personas: number,
    comment: string
  ) {
    this.id_reserva = id_reserva;
    this.cliente = cliente;
    this.fecha_reserva = fecha_reserva;
    this.hora_reserva = hora_reserva;
    this.cantidad_personas = cantidad_personas;
    this.comment = comment;
  }
}
