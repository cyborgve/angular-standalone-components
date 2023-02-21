import { Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericService<User> {
  protected getEntityUrl(): string {
    return 'users';
  }
}
