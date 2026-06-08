import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ScheduleEntry } from '../models/schedule-entry.model';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'schedules');

  getAll(): Observable<ScheduleEntry[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<ScheduleEntry[]>;
  }
  create(entry: Omit<ScheduleEntry, 'id'>): Promise<any> {
    return addDoc(this.col, entry);
  }
  delete(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'schedules', id));
  }
}