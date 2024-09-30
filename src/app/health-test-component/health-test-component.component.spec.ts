import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTestComponentComponent } from './health-test-component.component';

describe('HealthTestComponentComponent', () => {
  let component: HealthTestComponentComponent;
  let fixture: ComponentFixture<HealthTestComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthTestComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthTestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
