import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AssignmentService } from '../../../../core/services/assignment.service';
import { TeacherGroupAssignment } from '../../../../core/models/teacher-group-assignment.model';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.css'
})
export class AssignmentListComponent implements OnInit {

  assignments: TeacherGroupAssignment[] = [];
  displayedColumns = ['maestro', 'materia', 'grupo', 'horas', 'acciones'];

  constructor(
    private assignmentService: AssignmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.assignmentService.getAll().subscribe(data => {
      this.assignments = data.sort((a, b) =>
        a.teacherName.localeCompare(b.teacherName)
      );
    });
  }

  nuevo() {
    this.router.navigate(['/assignments/new']);
  }

  async eliminar(id: string) {
    if (!confirm('¿Eliminar esta asignación?')) return;
    await this.assignmentService.delete(id);
  }

}