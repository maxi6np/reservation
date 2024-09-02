import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ExampleService } from '../services/example-service.service';
import { CommonModule } from '@angular/common';
import { Reserve } from '../models/reserve.model';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
}
