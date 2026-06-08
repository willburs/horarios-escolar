import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAvailabilityComponent } from './teacher-availability.component';

describe('TeacherAvailabilityComponent', () => {
  let component: TeacherAvailabilityComponent;
  let fixture: ComponentFixture<TeacherAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
