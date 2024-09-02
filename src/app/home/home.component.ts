import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { NavComponent } from '../nav/nav.component';
import { NgOptimizedImage } from '@angular/common';
import { CarrouselComponent } from './carrousel/carrousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatRippleModule, NavComponent, NgOptimizedImage, CarrouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  
  ngAfterViewInit() {
    const reserveBtn = document.getElementById('reserveBtn');
    if (reserveBtn) {
      setTimeout(() => {
        reserveBtn.classList.add('animate');
      }, 500);
    }
  }
}
