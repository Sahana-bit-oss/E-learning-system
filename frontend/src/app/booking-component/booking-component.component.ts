import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface Course {
  id: number;
  name: string;
}

@Component({
  selector: 'app-booking-component',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './booking-component.component.html',
  styleUrl: './booking-component.component.css'
})
export class BookingComponentComponent {
  bookingForm: FormGroup;
  bookingConfirmed = false;
  minDate = new Date().toISOString().split('T')[0];

  courses: Course[] = [
    { id: 1, name: 'Full Stack Development' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'Cybersecurity Basics' }
  ];

  timeSlots: string[] = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM'
  ];

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      course: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.bookingForm.valid) {
   
      console.log("Booking Details:", this.bookingForm.value);
      
      
      this.bookingConfirmed = true;
      setTimeout(() => this.bookingConfirmed = false, 3000);
      this.bookingForm.reset();
    }
  }

}





