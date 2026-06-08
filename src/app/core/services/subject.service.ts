import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'subjects');

  getAll(): Observable<Subject[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Subject[]>;
  }
  create(subject: Omit<Subject, 'id'>): Promise<any> {
    return addDoc(this.col, subject);
  }
  delete(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'subjects', id));
  }
}