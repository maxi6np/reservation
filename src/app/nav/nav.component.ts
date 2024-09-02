import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { ExampleService } from '../services/example-service.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule, MatBadgeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  numberOfReserves!: number

  constructor(private reserveService: ExampleService) {
    this.reserveService.reservesUpdate.subscribe(rsrvs => this.numberOfReserves = rsrvs.length)
    this.numberOfReserves = this.reserveService.reserves.length
  }

  setBreadCrumb(value: string) {
    localStorage.setItem('breadCrumb', value);
  }

  isActive(value: string) {
    return localStorage.getItem('breadCrumb') === value;
  }
}
