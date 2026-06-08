import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, query, where, getDocs, writeBatch } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TeacherAvailability } from '../models/teacher-availability.model';

@Injectable({ providedIn: 'root' })
export class AvailabilityService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'availability');

  getByTeacher(teacherId: string): Observable<TeacherAvailability[]> {
    const q = query(this.col, where('teacherId', '==', teacherId));
    return collectionData(q, { idField: 'id' }) as Observable<TeacherAvailability[]>;
  }

  async saveAll(teacherId: string, slots: { day: string, slot: number, available: boolean }[]): Promise<void> {
    const q = query(this.col, where('teacherId', '==', teacherId));
    const snapshot = await getDocs(q);
    const batch = writeBatch(this.firestore);
    snapshot.forEach(d => batch.delete(d.ref));
    await batch.commit();

    const batch2 = writeBatch(this.firestore);
    for (const slot of slots) {
      const ref = doc(this.col);
      batch2.set(ref, { teacherId, ...slot });
    }
    await batch2.commit();
  }
}