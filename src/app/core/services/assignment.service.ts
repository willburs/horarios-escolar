import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TeacherGroupAssignment } from '../models/teacher-group-assignment.model';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'assignments');

  getAll(): Observable<TeacherGroupAssignment[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<TeacherGroupAssignment[]>;
  }
  create(assignment: Omit<TeacherGroupAssignment, 'id'>): Promise<any> {
    return addDoc(this.col, assignment);
  }
  delete(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'assignments', id));
  }
}