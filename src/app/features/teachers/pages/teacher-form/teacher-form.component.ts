import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TeacherService } from '../../../../core/services/teacher.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent {

  form: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      materia: ['', Validators.required],
      turno: ['MATUTINO', Validators.required],
      horasSemana: [20, [Validators.required, Validators.min(1)]],
      grado1: [false],
      grado2: [false],
      grado3: [false]
    });
  }

  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;
    const grados: number[] = [];
    if (f.grado1) grados.push(1);
    if (f.grado2) grados.push(2);
    if (f.grado3) grados.push(3);

    if (grados.length === 0) {
      this.notification.error('Selecciona al menos un grado');
      return;
    }

    this.saving = true;
    try {
      await this.teacherService.create({
        nombre: f.nombre,
        materia: f.materia,
        turno: f.turno,
        horasSemana: f.horasSemana,
        grados,
        activo: true,
        createdAt: new Date()
      });
      this.notification.success('Maestro guardado correctamente');
      this.router.navigate(['/teachers']);
    } catch (e) {
      this.notification.error('Error al guardar el maestro');
    } finally {
      this.saving = false;
    }
  }

  cancelar() {
    this.router.navigate(['/teachers']);
  }

}