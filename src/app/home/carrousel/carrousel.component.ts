import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.css'
})
export class CarrouselComponent {

  images = [
    { title: 'Gofres Varias', src: 'img/gofresVarias.jpg' },
    { title: 'Cafes Bar', src: 'img/cafesBar.jpg' },
    { title: 'Interior Tienda', src: 'img/interiorTienda.jpg' }
  ];
}
