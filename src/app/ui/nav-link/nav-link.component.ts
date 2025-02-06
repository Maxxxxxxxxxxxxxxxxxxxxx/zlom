import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [NgClass],
  templateUrl: './nav-link.component.html',
})
export class NavLinkComponent implements OnInit {
  private router: Router = inject(Router);

  @Input() value: string = 'value';
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
