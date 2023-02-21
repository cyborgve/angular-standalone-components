import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  private _dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string; entity: string }
  ) {}

  okOption(): void {
    this._dialogRef.close(true);
  }
  noOption(): void {
    this._dialogRef.close(false);
  }
}
