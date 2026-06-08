import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SubjectService } from '../../../../core/services/subject.service';
import { Subject } from '../../../../core/models/subject.model';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent implements OnInit {

  subjects: Subject[] = [];
  displayedColumns = ['nombre', 'acciones'];

  constructor(
    private subjectService: SubjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subjectService.getAll().subscribe(data => {
      this.subjects = data;
    });
  }

  nuevo() {
    this.router.navigate(['/subjects/new']);
  }

  async eliminar(id: string) {
    if (!confirm('¿Eliminar esta materia?')) return;
    await this.subjectService.delete(id);
  }

}