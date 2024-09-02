import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { Reserve } from '../models/reserve.model';
import { Router } from '@angular/router';
import { ExampleService } from '../services/example-service.service';

@Component({
  selector: 'app-historial-reserves',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './historial-reserves.component.html',
  styleUrl: './historial-reserves.component.css'
})
export class HistorialReservesComponent {
  reserves: Reserve[] = this.apiService.reserves


  constructor(private apiService: ExampleService, private router: Router) {
    this.apiService.reservesUpdate.subscribe(updateReserves => {
      this.reserves = updateReserves
    })
  }

  deleteReserve(reserve: Reserve) {
    this.apiService.deleteReserve(reserve)
  }

  editReserve(reserve: Reserve) {
    this.router.navigate(['/book', reserve.cliente.email])
  }

}
