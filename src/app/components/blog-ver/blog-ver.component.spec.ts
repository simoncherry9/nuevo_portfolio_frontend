import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogVerComponent } from './blog-ver.component';

describe('BlogVerComponent', () => {
  let component: BlogVerComponent;
  let fixture: ComponentFixture<BlogVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogVerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
