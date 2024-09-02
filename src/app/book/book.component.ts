import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Reserve } from '../models/reserve.model';
import { ExampleService } from '../services/example-service.service';
import { Cliente } from '../models/cliente.model';
// import { v4 as uuidv4 } from 'uuid';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    RouterLink,
    NavComponent,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  constructor(private reserves: ExampleService, private router: Router, private route: ActivatedRoute) { }
  matcher = new MyErrorStateMatcher()
  editing: boolean = false
  id_mesa:number = 0

  bookForm = new FormGroup({
    id_reserva: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    nombre: new FormControl('', [Validators.required]),
    fecha_reserva: new FormControl('', [Validators.required]),
    hora_reserva: new FormControl('', [Validators.required]),
    cantidad_personas: new FormControl(0, [Validators.min(1)]),
    comment: new FormControl('')
  })

  hours: string[] = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  ];


  ngOnInit() {
    let email = this.route.snapshot.params['email']
    if (email) {
      this.editing = true
      const reserve = this.reserves.getReserve(email) ?? new Reserve('', new Cliente('', ''), '', '', 0, '')
      this.bookForm.setValue({
        id_reserva: reserve.id_reserva,
        nombre: reserve.cliente.nombre,
        email: reserve.cliente.email,
        fecha_reserva: reserve.fecha_reserva,
        hora_reserva: reserve.hora_reserva,
        cantidad_personas: reserve.cantidad_personas,
        comment: reserve.comment || ''
      })
    }

  }

  dateFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d ? d >= today : false;
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;

      const date = new Date(formValue.fecha_reserva ?? '');
      const myDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      const id_reserva = crypto.randomUUID()
      const cliente = new Cliente(formValue.nombre ?? '', formValue.email ?? '')

      const newReserve = new Reserve(
        id_reserva,
        cliente,
        myDate,
        formValue.hora_reserva ?? '',
        formValue.cantidad_personas ?? 0,
        formValue.comment ?? ''
      );

      const existingReserve = this.reserves.getReserve(formValue.email ?? '');
      (this.editing && existingReserve)
        ? this.reserves.editReserve(existingReserve, newReserve)
        : this.reserves.addReserve(newReserve);

      this.router.navigate(['/reserves']);

    } else {
      console.error('Formulario inválido');
    }
  }
}
