export interface SchoolConfig {

  id?: string;

  nombreEscuela: string;

  grados: number;

  gruposPorGrado: string[];

  horaInicio: string;

  horaFin: string;

  duracionClase: number;

  duracionReceso: number;

}

export interface TimeSlot {
  index: number;
  label: string;
  turno: 'MATUTINO' | 'VESPERTINO';
}

export const SLOTS_MATUTINO: TimeSlot[] = [
  { index: 0, label: '07:00', turno: 'MATUTINO' },
  { index: 1, label: '07:50', turno: 'MATUTINO' },
  { index: 2, label: '08:40', turno: 'MATUTINO' },
  { index: 3, label: '09:30', turno: 'MATUTINO' },
  { index: 4, label: '10:50', turno: 'MATUTINO' },
  { index: 5, label: '11:40', turno: 'MATUTINO' },
  { index: 6, label: '12:30', turno: 'MATUTINO' },
];

export const SLOTS_VESPERTINO: TimeSlot[] = [
  { index: 0, label: '14:00', turno: 'VESPERTINO' },
  { index: 1, label: '14:50', turno: 'VESPERTINO' },
  { index: 2, label: '15:40', turno: 'VESPERTINO' },
  { index: 3, label: '16:30', turno: 'VESPERTINO' },
  { index: 4, label: '17:50', turno: 'VESPERTINO' },
  { index: 5, label: '18:40', turno: 'VESPERTINO' },
  { index: 6, label: '19:30', turno: 'VESPERTINO' },
];

export const RECESO_MATUTINO = {
  afterSlot: 3,
  label: 'RECESO  10:20 - 10:50'
};

export const RECESO_VESPERTINO = {
  afterSlot: 3,
  label: 'RECESO  17:10 - 17:50'
};