import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShiftType_DoneEW_AddComponentDialog } from './shift-type_-done-e-w_-add-component-dialog.component';

describe('ShiftAddComponent', () => {
  let component: ShiftType_DoneEW_AddComponentDialog;
  let fixture: ComponentFixture<ShiftType_DoneEW_AddComponentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftType_DoneEW_AddComponentDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftType_DoneEW_AddComponentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
