import { Basic } from '@core/models/basic';
import { environment } from '@environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Id } from '@core/utils/custom-types';
import { orderById } from '@core/utils/custom-rxjs-operators';
import { Status } from '@core/enums/status';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericService<T extends Basic> {
  protected _http = inject(HttpClient);
  private _snackBar = inject(MatSnackBar);
  protected abstract getEntityUrl(): string;
  protected api_url = `${environment.api_url}/${this.getEntityUrl()}`;
  protected api_url_id = (id: Id) => `${this.api_url}/${id}`;
  protected snackBarMessage = (message: string) =>
    this._snackBar.open(message, undefined, { duration: 6000 });

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this.api_url).pipe(orderById());
  }

  findById(id: Id): Observable<T> {
    return this._http.get<T>(this.api_url_id(id));
  }

  save(entity: T): Observable<T> {
    entity.created = new Date().getTime();
    entity.modified = new Date().getTime();
    return this._http
      .post<T>(this.api_url, entity)
      .pipe(
        tap(newEntity =>
          this.snackBarMessage(
            `Has saved on ${this.getEntityUrl()}: ${newEntity.id}`
          )
        )
      );
  }

  update(id: Id, entity: T): Observable<T> {
    entity.id = id;
    entity.modified = new Date().getTime();
    return this._http
      .put<T>(this.api_url_id(id), entity)
      .pipe(
        tap(newEntity =>
          this.snackBarMessage(
            `Has updated of ${this.getEntityUrl()}: ${newEntity.id}`
          )
        )
      );
  }

  delete(id: Id): Observable<T> {
    return this._http
      .delete<T>(this.api_url_id(id))
      .pipe(
        tap(entity =>
          this.snackBarMessage(
            `Has deleted of ${this.getEntityUrl()}: ${entity.id || id}`
          )
        )
      );
  }

  exist(id: Id): Observable<boolean> {
    return this._http.get(this.api_url_id(id)).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  changeStatus(entity: T): Observable<T> {
    entity.modified = new Date().getTime();
    entity.status =
      entity.status === 'ENABLED' ? Status.DISABLED : Status.ENABLED;
    return this._http
      .put<T>(this.api_url_id(entity.id), entity)
      .pipe(
        tap(newEntity =>
          this.snackBarMessage(
            `Has change status of ${this.getEntityUrl()}: ${newEntity.id} to ${
              newEntity.status
            }`
          )
        )
      );
  }
}
