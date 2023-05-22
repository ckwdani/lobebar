import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResPwComponent } from './res-pw.component';

describe('ResPwComponent', () => {
  let component: ResPwComponent;
  let fixture: ComponentFixture<ResPwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResPwComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
