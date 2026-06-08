import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TeacherService } from '../../../../core/services/teacher.service';
import { GroupService } from '../../../../core/services/group.service';
import { AssignmentService } from '../../../../core/services/assignment.service';
import { Teacher } from '../../../../core/models/teacher.model';
import { Group } from '../../../../core/models/group.model';

@Component({
  selector: 'app-assignment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './assignment-form.component.html',
  styleUrl: './assignment-form.component.css'
})
export class AssignmentFormComponent implements OnInit {

  form: FormGroup;
  saving = false;
  teachers: Teacher[] = [];
  groups: Group[] = [];

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private groupService: GroupService,
    private assignmentService: AssignmentService,
    private router: Router
  ) {
    this.form = this.fb.group({
      teacherId: ['', Validators.required],
      groupId: ['', Validators.required],
      horasSemana: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.teacherService.getAll().subscribe(data => {
      this.teachers = data;
    });
    this.groupService.getAll().subscribe(data => {
      this.groups = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
  }

  get filteredGroups(): Group[] {
    const teacher = this.teachers.find(
      t => t.id === this.form.value.teacherId
    );
    if (!teacher) return this.groups;
    return this.groups.filter(g => g.turno === teacher.turno);
  }

  async guardar() {
    if (this.form.invalid) return;
    const f = this.form.value;
    const teacher = this.teachers.find(t => t.id === f.teacherId)!;
    const group = this.groups.find(g => g.id === f.groupId)!;

    this.saving = true;
    try {
      await this.assignmentService.create({
        teacherId: teacher.id!,
        teacherName: teacher.nombre,
        teacherMateria: teacher.materia,
        groupId: group.id!,
        groupName: group.nombre,
        horasSemana: f.horasSemana,
        createdAt: new Date()
      });
      this.router.navigate(['/assignments']);
    } catch (e) {
      alert('Error al guardar');
    } finally {
      this.saving = false;
    }
  }

  cancelar() {
    this.router.navigate(['/assignments']);
  }

}