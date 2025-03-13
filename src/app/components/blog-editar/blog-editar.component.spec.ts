import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditarComponent } from './blog-editar.component';

describe('BlogEditarComponent', () => {
  let component: BlogEditarComponent;
  let fixture: ComponentFixture<BlogEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
