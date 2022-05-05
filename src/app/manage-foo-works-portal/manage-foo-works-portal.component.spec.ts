import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFooWorksPortalComponent } from './manage-foo-works-portal.component';

describe('ManageFooWorksPortalComponent', () => {
  let component: ManageFooWorksPortalComponent;
  let fixture: ComponentFixture<ManageFooWorksPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFooWorksPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFooWorksPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
