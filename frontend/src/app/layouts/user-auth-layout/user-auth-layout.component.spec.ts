import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthLayoutComponent } from './user-auth-layout.component';

describe('UserAuthLayoutComponent', () => {
  let component: UserAuthLayoutComponent;
  let fixture: ComponentFixture<UserAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuthLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
