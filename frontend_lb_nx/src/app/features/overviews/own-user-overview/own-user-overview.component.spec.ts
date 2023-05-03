import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OwnUserOverviewComponent } from './own-user-overview.component';

describe('OwnUserOverviewComponent', () => {
  let component: OwnUserOverviewComponent;
  let fixture: ComponentFixture<OwnUserOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnUserOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnUserOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
