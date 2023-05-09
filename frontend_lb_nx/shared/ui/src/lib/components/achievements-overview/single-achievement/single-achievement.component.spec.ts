import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleAchievementComponent } from './single-achievement.component';

describe('SingleAchievementComponent', () => {
  let component: SingleAchievementComponent;
  let fixture: ComponentFixture<SingleAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleAchievementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
