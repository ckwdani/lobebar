import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminBookWorkSnacksComponent } from './admin-book-work-snacks.component';

describe('AdminBookWorkSnacksComponent', () => {
  let component: AdminBookWorkSnacksComponent;
  let fixture: ComponentFixture<AdminBookWorkSnacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBookWorkSnacksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBookWorkSnacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
