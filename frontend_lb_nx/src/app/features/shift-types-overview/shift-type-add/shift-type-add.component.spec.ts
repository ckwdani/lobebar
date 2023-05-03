import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShiftTypeAddComponent } from './shift-type-add.component';

describe('ShiftAddComponent', () => {
  let component: ShiftTypeAddComponent;
  let fixture: ComponentFixture<ShiftTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftTypeAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
