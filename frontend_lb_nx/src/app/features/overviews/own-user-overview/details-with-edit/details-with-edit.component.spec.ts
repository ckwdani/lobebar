import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsWithEditComponent } from './details-with-edit.component';

describe('DetailsWithEditComponent', () => {
  let component: DetailsWithEditComponent;
  let fixture: ComponentFixture<DetailsWithEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsWithEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsWithEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
