import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, ToolbarComponent, ModalComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {}
