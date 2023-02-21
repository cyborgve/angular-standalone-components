import { first } from 'rxjs';
import { FormType } from '@core/utils/custom-types';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Status } from '@core/enums/status';
import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { Id } from '@core/utils/custom-types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singular',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './singular.component.html',
  styleUrls: ['./singular.component.scss'],
})
export class SingularComponent {
  private id: Id;
  private formType: FormType = 'CREATE';
  title: string = 'User';
  singularForm: FormGroup;
  private _formBuilder = inject(FormBuilder);
  private _user = inject(UserService);
  private _location = inject(Location);
  private _activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.updateForm();
  }

  private updateForm(): void {
    if (this.id) {
      this.formType = 'EDIT';
      this._user
        .findById(this.id)
        .pipe(first())
        .subscribe(user => {
          this.singularForm = this._formBuilder.group({
            id: [user.id, Validators.required],
            name: [user.name, Validators.required],
            email: [user.email, Validators.required],
            phone: [user.phone, Validators.required],
            created: [new Date().getTime()],
            modified: [new Date().getTime()],
            status: [Status.ENABLED],
          });
        });
    } else {
      this.singularForm = this._formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        created: [new Date().getTime()],
        modified: [new Date().getTime()],
        status: [Status.ENABLED],
      });
    }
  }

  save(): void {
    if (this.formType === 'CREATE') {
      this._user
        .save(this.singularForm.value)
        .pipe(first())
        .subscribe(() => this.back());
    } else if (this.formType === 'EDIT') {
      this._user
        .update(this.id, this.singularForm.value)
        .pipe(first())
        .subscribe(() => this.back());
    }
  }

  back = () => this._location.back();
}
