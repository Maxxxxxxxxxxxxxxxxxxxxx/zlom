import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  fromEvent,
  map,
  Observable,
  Subject,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  private dimensions$: BehaviorSubject<any> = new BehaviorSubject(null);

  private getWindowDimensions(): Observable<{ width: number; height: number }> {
    return fromEvent(window, 'resize').pipe(
      debounceTime(100),
      map(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }))
    );
  }

  get isSmall() {
    return this.getWindowDimensions().pipe(map((window) => window.width));
  }
}
