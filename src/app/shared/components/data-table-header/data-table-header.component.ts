import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-data-table-header',
  standalone: true,
  templateUrl: './data-table-header.component.html',
  styleUrls: ['./data-table-header.component.scss'],
  imports: [CommonModule, MatIconModule, MatInputModule, MatButtonModule],
})
export class DataTableHeaderComponent {
  @ViewChild('input') searchElement: ElementRef<HTMLInputElement>;
  @Input() title: string;
  @Input() isHiddenSearch: boolean = false;
  @Output() filterData = new EventEmitter();
  @Output() cleanSearch = new EventEmitter();

  clearSearch = () => {
    this.searchElement.nativeElement.value = '';
    this.cleanSearch.emit();
  };
}
