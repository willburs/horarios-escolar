import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TeacherService } from '../../../../core/services/teacher.service';
import { Teacher } from '../../../../core/models/teacher.model';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent implements OnInit {

  teachers: Teacher[] = [];
  displayedColumns = ['nombre', 'materia', 'turno', 'horas', 'grados', 'acciones'];

  constructor(
    private teacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit() {
    this.teacherService.getAll().subscribe(data => {
      this.teachers = data;
    });
  }

  nuevo() {
    this.router.navigate(['/teachers/new']);
  }

  verDisponibilidad(id: string) {
    this.router.navigate(['/teachers', id, 'availability']);
  }

  async eliminar(id: string) {
    if (!confirm('¿Eliminar este maestro?')) return;
    await this.teacherService.delete(id);
  }

}