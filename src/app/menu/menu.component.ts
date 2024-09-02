import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ExampleService } from '../services/example-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private exampleService: ExampleService) { }

  exampleData: any;

  ngOnInit() {
    this.exampleService.getExampleData().subscribe(data => {
      this.exampleData = data.message;
    });
  }

}
