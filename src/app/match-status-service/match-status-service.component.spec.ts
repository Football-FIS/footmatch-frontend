import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchStatusServiceComponent } from './match-status-service.component';

describe('MatchStatusServiceComponent', () => {
  let component: MatchStatusServiceComponent;
  let fixture: ComponentFixture<MatchStatusServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchStatusServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchStatusServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
