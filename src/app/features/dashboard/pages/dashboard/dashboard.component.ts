import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TeacherService } from '../../../../core/services/teacher.service';
import { GroupService } from '../../../../core/services/group.service';
import { SubjectService } from '../../../../core/services/subject.service';
import { AssignmentService } from '../../../../core/services/assignment.service';
import { ScheduleService } from '../../../../core/services/schedule.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  totalMaestros = 0;
  totalMaterias = 0;
  totalGrupos = 0;
  totalAsignaciones = 0;
  totalClases = 0;

  constructor(
    private teacherService: TeacherService,
    private groupService: GroupService,
    private subjectService: SubjectService,
    private assignmentService: AssignmentService,
    private scheduleService: ScheduleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.teacherService.getAll().subscribe(d => this.totalMaestros = d.length);
    this.groupService.getAll().subscribe(d => this.totalGrupos = d.length);
    this.subjectService.getAll().subscribe(d => this.totalMaterias = d.length);
    this.assignmentService.getAll().subscribe(d => this.totalAsignaciones = d.length);
    this.scheduleService.getAll().subscribe(d => this.totalClases = d.length);
  }

  ir(ruta: string) {
    this.router.navigate([ruta]);
  }

}