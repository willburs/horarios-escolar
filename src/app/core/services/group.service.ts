import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'groups');

  getAll(): Observable<Group[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Group[]>;
  }
  create(group: Omit<Group, 'id'>): Promise<any> {
    return addDoc(this.col, group);
  }
  delete(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'groups', id));
  }
}