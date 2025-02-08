import { Component, Input, OnInit } from '@angular/core';
import { CarEntryDTO } from '../../../dto/car-entry.dto';

@Component({
  selector: 'app-car-view-form',
  standalone: true,
  imports: [],
  templateUrl: './car-view-form.component.html',
})
export class CarViewFormComponent implements OnInit {
  @Input() object: CarEntryDTO | Partial<CarEntryDTO> = {};

  ngOnInit(): void {
    this.carKeys = Object.keys(
      this.object as CarEntryDTO
    ) as (keyof CarEntryDTO)[];

    console.log(this.carKeys);
  }

  carKeys: (keyof CarEntryDTO)[] | null = null;

  getValue(key: keyof CarEntryDTO): any {
    return this.object[key] ?? '';
  }
}
