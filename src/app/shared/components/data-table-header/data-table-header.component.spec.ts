import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableHeaderComponent } from './data-table-header.component';

describe('DataTableHeaderComponent', () => {
  let component: DataTableHeaderComponent;
  let fixture: ComponentFixture<DataTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
