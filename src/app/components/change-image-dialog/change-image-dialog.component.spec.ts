import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeImageDialogComponent } from './change-image-dialog.component';

describe('ChangeImageDialogComponent', () => {
  let component: ChangeImageDialogComponent;
  let fixture: ComponentFixture<ChangeImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
