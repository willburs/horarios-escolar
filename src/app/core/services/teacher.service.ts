import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'teachers');

  getAll(): Observable<Teacher[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Teacher[]>;
  }
  create(teacher: Omit<Teacher, 'id'>): Promise<any> {
    return addDoc(this.col, teacher);
  }
  update(id: string, data: Partial<Teacher>): Promise<void> {
    return updateDoc(doc(this.firestore, 'teachers', id), data);
  }
  delete(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'teachers', id));
  }
}