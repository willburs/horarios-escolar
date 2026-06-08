import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TeacherService } from '../../../../core/services/teacher.service';
import { GroupService } from '../../../../core/services/group.service';
import { ScheduleService } from '../../../../core/services/schedule.service';
import { AssignmentService } from '../../../../core/services/assignment.service';
import { AvailabilityService } from '../../../../core/services/availability.service';
import { ScheduleGeneratorService } from '../../../../core/services/schedule-generator.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Teacher } from '../../../../core/models/teacher.model';
import { Group } from '../../../../core/models/group.model';
import { ScheduleEntry } from '../../../../core/models/schedule-entry.model';
import { TeacherAvailability } from '../../../../core/models/teacher-availability.model';
import { TeacherGroupAssignment } from '../../../../core/models/teacher-group-assignment.model';
import {
  SLOTS_MATUTINO,
  SLOTS_VESPERTINO,
  RECESO_MATUTINO,
  RECESO_VESPERTINO,
  TimeSlot
} from '../../../../core/models/school-config.model';

@Component({
  selector: 'app-schedule-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './schedule-board.component.html',
  styleUrl: './schedule-board.component.css'
})
export class ScheduleBoardComponent implements OnInit {

  private teacherService = inject(TeacherService);
  private groupService = inject(GroupService);
  private scheduleService = inject(ScheduleService);
  private assignmentService = inject(AssignmentService);
  private availabilityService = inject(AvailabilityService);
  private generator = inject(ScheduleGeneratorService);
  private notification = inject(NotificationService);

  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  teachers: Teacher[] = [];
  groups: Group[] = [];
  entries: ScheduleEntry[] = [];
  assignments: TeacherGroupAssignment[] = [];

  selectedGroupId = '';
  showDialog = false;
  selectedDay = '';
  selectedSlot = 0;
  selectedTeacherId = '';
  selectedGroupDialog = '';
  saving = false;
  generating = false;

  ngOnInit() {
    this.teacherService.getAll().subscribe(data => {
      this.teachers = data;
    });

    this.groupService.getAll().subscribe(data => {
      this.groups = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      if (this.groups.length > 0 && !this.selectedGroupId) {
        this.selectedGroupId = this.groups[0].id!;
      }
    });

    this.scheduleService.getAll().subscribe(data => {
      this.entries = data;
    });

    this.assignmentService.getAll().subscribe(data => {
      this.assignments = data;
    });
  }

  get currentGroup(): Group | undefined {
    return this.groups.find(g => g.id === this.selectedGroupId);
  }

  get currentSlots(): TimeSlot[] {
    return this.currentGroup?.turno === 'VESPERTINO'
      ? SLOTS_VESPERTINO
      : SLOTS_MATUTINO;
  }

  get currentReceso() {
    return this.currentGroup?.turno === 'VESPERTINO'
      ? RECESO_VESPERTINO
      : RECESO_MATUTINO;
  }

  get teachersForCurrentGroup(): Teacher[] {
    if (!this.currentGroup) return this.teachers;
    return this.teachers.filter(t => t.turno === this.currentGroup!.turno);
  }

  getEntry(day: string, slot: number): ScheduleEntry | undefined {
    return this.entries.find(e =>
      e.groupId === this.selectedGroupId &&
      e.day === day &&
      e.slot === slot
    );
  }

  openCell(day: string, slot: number) {
    if (this.getEntry(day, slot)) return;
    this.selectedDay = day;
    this.selectedSlot = slot;
    this.selectedTeacherId = '';
    this.selectedGroupDialog = this.selectedGroupId;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  teacherBusy(teacherId: string, day: string, slot: number): boolean {
    return this.entries.some(e =>
      e.teacherId === teacherId &&
      e.day === day &&
      e.slot === slot
    );
  }

  groupBusy(groupId: string, day: string, slot: number): boolean {
    return this.entries.some(e =>
      e.groupId === groupId &&
      e.day === day &&
      e.slot === slot
    );
  }

  teacherHoursInGroupDay(teacherId: string, groupId: string, day: string): number {
    return this.entries.filter(e =>
      e.teacherId === teacherId &&
      e.groupId === groupId &&
      e.day === day
    ).length;
  }

  async saveEntry() {
    const teacher = this.teachers.find(t => t.id === this.selectedTeacherId);
    if (!teacher) { this.notification.error('Selecciona un maestro'); return; }
    if (!this.selectedGroupDialog) { this.notification.error('Selecciona un grupo'); return; }

    if (this.teacherBusy(teacher.id!, this.selectedDay, this.selectedSlot)) {
      this.notification.error(`${teacher.nombre} ya tiene clase en ese horario`);
      return;
    }

    if (this.groupBusy(this.selectedGroupDialog, this.selectedDay, this.selectedSlot)) {
      this.notification.error('Ese grupo ya tiene clase en ese horario');
      return;
    }

    if (this.teacherHoursInGroupDay(teacher.id!, this.selectedGroupDialog, this.selectedDay) >= 2) {
      this.notification.error('Máximo 2 horas por día para el mismo grupo');
      return;
    }

    const group = this.groups.find(g => g.id === this.selectedGroupDialog)!;

    this.saving = true;
    try {
      await this.scheduleService.create({
        day: this.selectedDay,
        slot: this.selectedSlot,
        teacherId: teacher.id!,
        teacherName: teacher.nombre,
        subjectName: teacher.materia,
        groupId: group.id!,
        groupName: group.nombre
      });
      this.showDialog = false;
      this.notification.success('Clase asignada correctamente');
    } catch (e) {
      this.notification.error('Error al guardar');
    } finally {
      this.saving = false;
    }
  }

  async eliminarEntrada(entry: ScheduleEntry) {
    if (!confirm('¿Quitar esta clase?')) return;
    await this.scheduleService.delete(entry.id!);
    this.notification.success('Clase eliminada');
  }

  async limpiarHorario() {
    if (!confirm('¿Borrar todo el horario?')) return;
    await this.limpiarSilencioso();
    this.notification.success('Horario limpiado');
  }

  private async limpiarSilencioso() {
    for (const entry of this.entries) {
      await this.scheduleService.delete(entry.id!);
    }
  }

  async generarHorario() {
    if (this.entries.length > 0) {
      if (!confirm('Ya existe un horario. ¿Deseas reemplazarlo?')) return;
      await this.limpiarSilencioso();
    }

    const allAvailability: TeacherAvailability[] = [];
    for (const teacher of this.teachers) {
      await new Promise<void>(resolve => {
        this.availabilityService.getByTeacher(teacher.id!).subscribe(data => {
          allAvailability.push(...data);
          resolve();
        });
      });
    }

    this.generating = true;
    try {
      const generated = this.generator.generate(
        this.assignments,
        this.teachers,
        this.groups,
        allAvailability
      );

      for (const entry of generated) {
        await this.scheduleService.create(entry);
      }

      this.notification.success(`Horario generado: ${generated.length} clases asignadas`);
    } catch (e) {
      this.notification.error('Error al generar horario');
      console.error(e);
    } finally {
      this.generating = false;
    }
  }

}