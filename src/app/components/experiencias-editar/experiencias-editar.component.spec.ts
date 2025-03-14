import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciasEditarComponent } from './experiencias-editar.component';

describe('ExperienciasEditarComponent', () => {
  let component: ExperienciasEditarComponent;
  let fixture: ComponentFixture<ExperienciasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienciasEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
