import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCtaComponent } from './categories-cta.component';

describe('CategoriesCtaComponent', () => {
  let component: CategoriesCtaComponent;
  let fixture: ComponentFixture<CategoriesCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesCtaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
