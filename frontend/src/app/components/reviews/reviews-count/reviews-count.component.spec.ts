import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsCountComponent } from './reviews-count.component';

describe('ReviewsCountComponent', () => {
  let component: ReviewsCountComponent;
  let fixture: ComponentFixture<ReviewsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
