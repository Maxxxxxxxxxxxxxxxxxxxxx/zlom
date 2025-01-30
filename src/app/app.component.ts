import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './ui/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  template: ' <app-toast></app-toast><router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'zlom-fe';
}
