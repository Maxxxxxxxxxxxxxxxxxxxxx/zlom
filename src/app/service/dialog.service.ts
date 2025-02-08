import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CarEntryDTO } from '../dto/car-entry.dto';

export type DialogContentType = 'car' | 'user';

export interface DialogConfig {
  readonly title?: string;
  readonly object?: any;
  readonly type: DialogContentType;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private config$: Subject<any> = new BehaviorSubject(null);

  get config() {
    return this.config$.asObservable();
  }

  open(config: DialogConfig): void {
    this.config$.next(config);
  }

  resetConfig(): void {
    this.config$.next(null);
  }
}
