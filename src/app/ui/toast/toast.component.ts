// toast.component.ts
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateX(0%)' })),
      state('close', style({ opacity: 0 })),
      transition('open <=> close', [animate('200ms ease-in-out')]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  toastClass = ['toast-class'];
  toastMessage = 'trzeba robic package';
  showsToast = false;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showsToast = true;
    }, 1000);
  }
}
