import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciasCrearComponent } from './experiencias-crear.component';

describe('ExperienciasCrearComponent', () => {
  let component: ExperienciasCrearComponent;
  let fixture: ComponentFixture<ExperienciasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienciasCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
