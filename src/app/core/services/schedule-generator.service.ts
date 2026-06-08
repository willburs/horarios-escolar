import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher.model';
import { Group } from '../models/group.model';
import { TeacherGroupAssignment } from '../models/teacher-group-assignment.model';
import { TeacherAvailability } from '../models/teacher-availability.model';
import { ScheduleEntry } from '../models/schedule-entry.model';
import { SLOTS_MATUTINO, SLOTS_VESPERTINO } from '../models/school-config.model';

@Injectable({ providedIn: 'root' })
export class ScheduleGeneratorService {

  private days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  generate(
    assignments: TeacherGroupAssignment[],
    teachers: Teacher[],
    groups: Group[],
    availability: TeacherAvailability[]
  ): ScheduleEntry[] {

    const entries: ScheduleEntry[] = [];

    const availMap: Record<string, boolean> = {};
    availability.forEach(a => {
      availMap[`${a.teacherId}-${a.day}-${a.slot}`] = a.available;
    });

    for (const assignment of assignments) {

      const teacher = teachers.find(t => t.id === assignment.teacherId);
      const group = groups.find(g => g.id === assignment.groupId);
      if (!teacher || !group) continue;

      if (teacher.turno !== group.turno) continue;

      const slots = teacher.turno === 'VESPERTINO'
        ? SLOTS_VESPERTINO.map(s => s.index)
        : SLOTS_MATUTINO.map(s => s.index);

      let horasRestantes = assignment.horasSemana;

      for (const day of this.days) {
        if (horasRestantes <= 0) break;

        let horasEnEsteDia = 0;

        for (const slot of slots) {
          if (horasRestantes <= 0) break;
          if (horasEnEsteDia >= 2) break;

          const availKey = `${assignment.teacherId}-${day}-${slot}`;
          const hasAvailability = availability.length === 0 || availMap[availKey];
          if (!hasAvailability) continue;

          const teacherBusy = entries.some(e =>
            e.teacherId === assignment.teacherId &&
            e.day === day &&
            e.slot === slot
          );
          if (teacherBusy) continue;

          const groupBusy = entries.some(e =>
            e.groupId === assignment.groupId &&
            e.day === day &&
            e.slot === slot
          );
          if (groupBusy) continue;

          entries.push({
            day,
            slot,
            teacherId: assignment.teacherId,
            teacherName: assignment.teacherName,
            subjectName: assignment.teacherMateria,
            groupId: assignment.groupId,
            groupName: assignment.groupName
          });

          horasRestantes--;
          horasEnEsteDia++;
        }
      }
    }

    return entries;
  }

}