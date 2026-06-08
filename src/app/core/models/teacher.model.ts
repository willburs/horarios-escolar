export interface Teacher {

  id?: string;

  nombre: string;

  materia: string;

  turno: 'MATUTINO' | 'VESPERTINO';

  horasSemana: number;

  grados: number[];

  activo: boolean;

  createdAt: Date;

}