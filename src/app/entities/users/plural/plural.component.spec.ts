import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralComponent } from './plural.component';

describe('PluralComponent', () => {
  let component: PluralComponent;
  let fixture: ComponentFixture<PluralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PluralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
