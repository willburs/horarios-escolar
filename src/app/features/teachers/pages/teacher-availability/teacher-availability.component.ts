import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeacherService } from '../../../../core/services/teacher.service';
import { AvailabilityService } from '../../../../core/services/availability.service';
import { Teacher } from '../../../../core/models/teacher.model';
import {
  SLOTS_MATUTINO,
  SLOTS_VESPERTINO,
  RECESO_MATUTINO,
  RECESO_VESPERTINO,
  TimeSlot
} from '../../../../core/models/school-config.model';

@Component({
  selector: 'app-teacher-availability',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './teacher-availability.component.html',
  styleUrl: './teacher-availability.component.css'
})
export class TeacherAvailabilityComponent implements OnInit {

  teacher: Teacher | null = null;
  saving = false;
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  availability: Record<string, boolean> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private availabilityService: AvailabilityService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.teacherService.getAll().subscribe(teachers => {
      this.teacher = teachers.find(t => t.id === id) || null;
    });

    this.availabilityService.getByTeacher(id).subscribe(data => {
      this.availability = {};
      data.forEach(a => {
        if (a.available) {
          this.availability[`${a.day}-${a.slot}`] = true;
        }
      });
    });
  }

  get currentSlots(): TimeSlot[] {
    return this.teacher?.turno === 'VESPERTINO'
      ? SLOTS_VESPERTINO
      : SLOTS_MATUTINO;
  }

  get currentReceso() {
    return this.teacher?.turno === 'VESPERTINO'
      ? RECESO_VESPERTINO
      : RECESO_MATUTINO;
  }

  toggle(day: string, slot: number) {
    const key = `${day}-${slot}`;
    this.availability[key] = !this.availability[key];
  }

  isAvailable(day: string, slot: number): boolean {
    return !!this.availability[`${day}-${slot}`];
  }

  async guardar() {
    if (!this.teacher) return;
    this.saving = true;

    const slots: { day: string, slot: number, available: boolean }[] = [];
    for (const day of this.days) {
      for (const slot of this.currentSlots) {
        slots.push({
          day,
          slot: slot.index,
          available: this.isAvailable(day, slot.index)
        });
      }
    }

    try {
      await this.availabilityService.saveAll(this.teacher.id!, slots);
      this.router.navigate(['/teachers']);
    } catch (e) {
      alert('Error al guardar');
    } finally {
      this.saving = false;
    }
  }

  regresar() {
    this.router.navigate(['/teachers']);
  }

}