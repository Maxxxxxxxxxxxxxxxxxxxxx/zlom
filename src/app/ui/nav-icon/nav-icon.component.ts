import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-icon',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './nav-icon.component.html',
})
export class NavIconComponent implements OnInit {
  private router: Router = inject(Router);

  @Input() matIcon: string = 'home';
  @Input() path: string = '';

  active: boolean = false;

  ngOnInit(): void {
    this.active = this.checkUrl();

    this.router.events.subscribe(() => {
      this.active = this.checkUrl();
    });
  }

  private checkUrl = () =>
    this.router.url.split('/').reverse()[0] ===
    this.path.split('/').reverse()[0];

  public handleClick() {
    this.router.navigate([this.path]);
    this.active = true;
  }
}
