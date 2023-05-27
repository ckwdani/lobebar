import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTracksComponent } from './load-tracks.component';

describe('LoadTracksComponent', () => {
  let component: LoadTracksComponent;
  let fixture: ComponentFixture<LoadTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadTracksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
