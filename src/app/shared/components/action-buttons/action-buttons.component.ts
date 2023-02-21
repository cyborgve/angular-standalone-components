import { MatIconModule } from '@angular/material/icon';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Status } from '@core/enums/status';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class ActionButtonsComponent {
  @Input() status: Status = Status.DISABLED;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() changeStatus = new EventEmitter();
}
