import { Component } from '@angular/core';
import { LoginFormComponent } from '../../../components/login-form/login-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginFormComponent, MatCardModule, MatIconModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {}
