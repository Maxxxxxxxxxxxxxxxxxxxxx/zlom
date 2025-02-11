import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export type DialogContentType = 'car' | 'user' | 'confirm';

export interface DialogConfig {
  readonly title?: string;
  readonly object?: any;
  readonly type?: DialogContentType;
  readonly close?: boolean;
  readonly confirmWindowData?: {
    readonly label: string;
    readonly callback: () => any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private config$: Subject<any> = new BehaviorSubject(null);

  get config() {
    return this.config$.asObservable();
  }

  confirm(title: string, label: string, callback: () => any): void {
    this.config$.next({
      type: 'confirm',
      title,
      confirmWindowData: {
        label,
        callback,
      },
    });
  }

  open(config: DialogConfig): void {
    this.config$.next(config);
  }

  close(): void {
    this.config$.next(null);
  }

  resetConfig(): void {
    this.config$.next(null);
  }
}
