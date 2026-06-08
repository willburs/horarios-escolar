export interface Group {

  id?: string;

  nombre: string;

  grado: number;

  letra: string;

  turno: 'MATUTINO' | 'VESPERTINO';

  activo: boolean;

  createdAt: Date;

}