import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularComponent } from './singular.component';

describe('SingularComponent', () => {
  let component: SingularComponent;
  let fixture: ComponentFixture<SingularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
