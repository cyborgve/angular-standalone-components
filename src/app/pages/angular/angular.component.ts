import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-angular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
})
export class AngularComponent {
  title = 'angular-standalone';
  version = packageJson.version;
}
