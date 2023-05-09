import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AchievementsOverviewComponent } from './achievements-overview.component';

describe('AchievementsOverviewComponent', () => {
  let component: AchievementsOverviewComponent;
  let fixture: ComponentFixture<AchievementsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AchievementsOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AchievementsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
