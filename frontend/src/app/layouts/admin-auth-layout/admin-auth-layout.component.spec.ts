import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthLayoutComponent } from './admin-auth-layout.component';

describe('AdminAuthLayoutComponent', () => {
  let component: AdminAuthLayoutComponent;
  let fixture: ComponentFixture<AdminAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
