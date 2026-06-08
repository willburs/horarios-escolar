import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleValidatorService {

  constructor() {}

  teacherIsBusy(
    teacherId: string,
    day: string,
    slot: number,
    entries: any[]
  ): boolean {

    return entries.some(entry =>
      entry.teacherId === teacherId &&
      entry.day === day &&
      entry.slot === slot
    );

  }

  groupIsBusy(
    groupId: string,
    day: string,
    slot: number,
    entries: any[]
  ): boolean {

    return entries.some(entry =>
      entry.groupId === groupId &&
      entry.day === day &&
      entry.slot === slot
    );

  }

}