import { DataTableHeaderComponent } from '@shared/components/data-table-header/data-table-header.component';
import { CommonModule } from '@angular/common';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user';
import {
  AfterViewInit,
  Component,
  ViewChild,
  inject,
  Input,
} from '@angular/core';
import { OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DATA_TABLE_COLUMNS } from '@core/constants/data-table-columns';
import { ActionButtonsComponent } from '@shared/components/action-buttons/action-buttons.component';
import { SharedModule } from '@shared/shared.module';
import { Subscription, first, switchMap, take, Observable } from 'rxjs';
import { Id } from '@core/utils/custom-types';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';

@Component({
  standalone: true,
  selector: 'app-users-data-table',
  templateUrl: './users-data-table.component.html',
  styleUrls: ['./users-data-table.component.scss'],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    ActionButtonsComponent,
    DeleteDialogComponent,
    CommonModule,
    SharedModule,
    DataTableHeaderComponent,
  ],
})
export class UsersDataTableComponent implements AfterViewInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  @Input() title: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns = DATA_TABLE_COLUMNS.USERS.filter(
    s => s !== 'status'
  ).filter(s => s !== 'created');

  private _user = inject(UserService);
  private _router = inject(Router);
  private _dialog = inject(MatDialog);

  ngAfterViewInit(): void {
    this.reloadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  reloadData() {
    this.subscriptions.push(
      this._user.findAll().subscribe(users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  filterData(event: Event): void {
    let filterValue = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  create(): void {
    this._router.navigate(['/users/user']);
  }

  edit(user: User): void {
    this._router.navigate(['/users/user/' + user.id]);
  }

  delete(id: Id): void {
    let dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: { id: id, entity: 'User' },
    });
    dialogRef
      .afterClosed()
      .pipe(
        switchMap(confirm =>
          confirm ? this._user.delete(id) : new Observable<any>()
        ),
        take(1)
      )
      .subscribe(() => this.reloadData());
  }

  changeStatus(user: User): void {
    this._user
      .changeStatus(user)
      .pipe(first())
      .subscribe(() => this.reloadData());
  }
}
