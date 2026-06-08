import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-entry-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './schedule-entry-dialog.component.html',
  styleUrl: './schedule-entry-dialog.component.css'
})
export class ScheduleEntryDialogComponent {

  @Output() save = new EventEmitter<any>();

  teacher = '';
  group = '';

  teachers = [
    'Juan Pérez',
    'María López',
    'Carlos Ruiz'
  ];

  groups = [
    '1A',
    '1B',
    '1C',
    '2A',
    '2B',
    '2C',
    '3A',
    '3B',
    '3C'
  ];

  guardar() {

    this.save.emit({
      teacher: this.teacher,
      group: this.group
    });

  }

}