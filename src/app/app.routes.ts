import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { MenuComponent } from './menu/menu.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HistorialReservesComponent } from './historial-reserves/historial-reserves.component';
import { Reserve } from './models/reserve.model';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', component: BookComponent},
  { path: 'book/:email', component: BookComponent},
  { path: 'menu', component: MenuComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'reserves', component: HistorialReservesComponent },
];
