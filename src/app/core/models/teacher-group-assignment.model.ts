export interface TeacherGroupAssignment {

  id?: string;

  teacherId: string;
  teacherName: string;
  teacherMateria: string;

  groupId: string;
  groupName: string;

  horasSemana: number;

  createdAt: Date;

}