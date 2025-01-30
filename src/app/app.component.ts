import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ToastComponent } from './ui/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginFormComponent, ToastComponent],
  template: ' <app-toast></app-toast><router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'zlom-fe';
}
