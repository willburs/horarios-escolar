import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { GroupService } from '../../../../core/services/group.service';
import { Group } from '../../../../core/models/group.model';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit {

  groups: Group[] = [];
  displayedColumns = ['nombre', 'grado', 'turno', 'acciones'];

  constructor(
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.groupService.getAll().subscribe(data => {
      this.groups = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
  }

  nuevo() {
    this.router.navigate(['/groups/new']);
  }

  async eliminar(id: string) {
    if (!confirm('¿Eliminar este grupo?')) return;
    await this.groupService.delete(id);
  }

}