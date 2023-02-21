import { UsersDataTableComponent } from '@entities/users/users-data-table/users-data-table.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plural',
  standalone: true,
  imports: [CommonModule, UsersDataTableComponent],
  templateUrl: './plural.component.html',
  styleUrls: ['./plural.component.scss'],
})
export class PluralComponent {
  title: string = 'users';
}
