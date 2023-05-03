import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleFormDialogComponent } from './single-form-dialog.component';

describe('SingleFormDialogComponent', () => {
  let component: SingleFormDialogComponent;
  let fixture: ComponentFixture<SingleFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleFormDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
