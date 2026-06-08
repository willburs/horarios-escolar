import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'teachers',
    loadComponent: () =>
      import('./features/teachers/pages/teacher-list/teacher-list.component')
        .then(m => m.TeacherListComponent)
  },
  {
    path: 'teachers/new',
    loadComponent: () =>
      import('./features/teachers/pages/teacher-form/teacher-form.component')
        .then(m => m.TeacherFormComponent)
  },
  {
    path: 'teachers/:id/availability',
    loadComponent: () =>
      import('./features/teachers/pages/teacher-availability/teacher-availability.component')
        .then(m => m.TeacherAvailabilityComponent)
  },
  {
    path: 'subjects',
    loadComponent: () =>
      import('./features/subjects/pages/subject-list/subject-list.component')
        .then(m => m.SubjectListComponent)
  },
  {
    path: 'subjects/new',
    loadComponent: () =>
      import('./features/subjects/pages/subject-form/subject-form.component')
        .then(m => m.SubjectFormComponent)
  },
  {
    path: 'groups',
    loadComponent: () =>
      import('./features/groups/pages/group-list/group-list.component')
        .then(m => m.GroupListComponent)
  },
  {
    path: 'groups/new',
    loadComponent: () =>
      import('./features/groups/pages/group-form/group-form.component')
        .then(m => m.GroupFormComponent)
  },
  {
    path: 'assignments',
    loadComponent: () =>
      import('./features/assignments/pages/assignment-list/assignment-list.component')
        .then(m => m.AssignmentListComponent)
  },
  {
    path: 'assignments/new',
    loadComponent: () =>
      import('./features/assignments/pages/assignment-form/assignment-form.component')
        .then(m => m.AssignmentFormComponent)
  },
  {
    path: 'schedules',
    loadComponent: () =>
      import('./features/schedules/pages/schedule-board/schedule-board.component')
        .then(m => m.ScheduleBoardComponent)
  }
];