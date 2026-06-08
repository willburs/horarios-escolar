import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GroupService } from '../../../../core/services/group.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.css'
})
export class GroupFormComponent {

  form: FormGroup;
  saving = false;

  grados = [1, 2, 3];
  letras = ['A', 'B', 'C', 'D', 'E', 'F'];

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      grado: [1, Validators.required],
      letra: ['A', Validators.required],
      turno: ['MATUTINO', Validators.required]
    });
  }

  async guardar() {
    if (this.form.invalid) return;

    const f = this.form.value;
    this.saving = true;

    try {
      await this.groupService.create({
        nombre: `${f.grado}${f.letra}`,
        grado: Number(f.grado),
        letra: f.letra,
        turno: f.turno,
        activo: true,
        createdAt: new Date()
      });
      this.notification.success(`Grupo ${f.grado}${f.letra} guardado correctamente`);
      this.router.navigate(['/groups']);
    } catch (e) {
      this.notification.error('Error al guardar el grupo');
      console.error(e);
    } finally {
      this.saving = false;
    }
  }

  cancelar() {
    this.router.navigate(['/groups']);
  }

}