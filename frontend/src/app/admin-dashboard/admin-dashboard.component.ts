import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Course {
  id: number;
  name: string;
  skillLevel: string;
  description: string;
  duration: string;
  price: string;
  image: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Enrollment {
  id: number;
  studentName: string;
  courseName: string;
  enrollmentDate: string;
  status: string;
}

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  rating: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  activeMenu: string = 'dashboard';  
  isVisible: boolean = false;
  isHoverCourses = false;
  isHoverUsers = false;
  isHoverEnrollments = false;
  isHoverSales = false;
  courseForm: FormGroup;
  courses: Course[] = [];
  editingCourse: Course | null = null;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  private nextCourseId = 1;
  userForm: FormGroup;
  enrollmentForm: FormGroup;
  feedbackForm: FormGroup;                                
  users: User[] = [];
  enrollments: Enrollment[] = [];
  feedbacks: Feedback[] = [];
  editingUser: User | null = null;
  editingEnrollment: Enrollment | null = null;
  private nextFeedbackId = 1;
  private nextEnrollmentId = 1;
  private nextUserId = 1;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | 'info' = 'info';
  isAlertVisible: boolean = false;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      skillLevel: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
      image: ['']
    });
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

    this.enrollmentForm = this.fb.group({
      studentName: ['', Validators.required],
      courseName: ['', Validators.required],
      enrollmentDate: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  // Toggle view between sections
  setActiveMenu(section: string) {
    this.activeMenu = section;
  }

  showSideNav() {
    this.isVisible = !this.isVisible;
  }
  showAlert(message: string, type: 'success' | 'error' | 'info'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.isAlertVisible = true;
    setTimeout(() => {
      this.isAlertVisible = false;
    }, 3000);
  }

  // Handle adding or updating a course
  addOrUpdateCourse(): void {
    if (this.courseForm.invalid) {
      console.error("Course form is invalid:", this.courseForm.errors);
      return;
    }

    const formValue = this.courseForm.value;

    if (this.editingCourse) {
      // Update existing course
      const updatedCourse: Course = { ...this.editingCourse, ...formValue };
      const index = this.courses.findIndex(c => c.id === updatedCourse.id);
      if (index !== -1) {
        this.courses[index] = updatedCourse;
      }
      this.editingCourse = null;
    } else {
      // Add a new course
      const newCourse: Course = { id: this.nextCourseId++, ...formValue, image: this.imagePreview || '' };
      this.courses.push(newCourse);
    }

    // Reset form and image
    this.courseForm.reset();
    this.imagePreview = null;
    this.selectedFile = null;

    // Switch back to the course list view
    this.setActiveMenu('courses');
  }

  // Handle image file selection and preview
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Delete a course from the list
  deleteCourse(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
  }

  // Edit a course and load its details into the form
  editCourse(course: Course): void {
    this.editingCourse = course;
    this.courseForm.patchValue(course);
    this.imagePreview = course.image;
    this.setActiveMenu('add-course');
  }
  addOrUpdateUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    const formValue = this.userForm.value;

    if (this.editingUser) {
      const updatedUser: User = { ...this.editingUser, ...formValue };
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      this.editingUser = null;
    } else {
      const newUser: User = { id: this.nextUserId++, ...formValue };
      this.users.push(newUser);
    }

    this.userForm.reset();
    this.setActiveMenu('users');
    this.showAlert('User added successfully!', 'success');
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    this.showAlert('User deleted!', 'error');
  }

  editUser(user: User): void {
    this.editingUser = user;
    this.userForm.patchValue(user);
    this.setActiveMenu('add-user');
    this.showAlert('User updated successfully!', 'info');
  }

  addOrUpdateEnrollment(): void {
    if (this.enrollmentForm.invalid) {
      return;
    }

    const formValue = this.enrollmentForm.value;

    if (this.editingEnrollment) {
      const updatedEnrollment: Enrollment = { ...this.editingEnrollment, ...formValue };
      const index = this.enrollments.findIndex(e => e.id === updatedEnrollment.id);
      if (index !== -1) {
        this.enrollments[index] = updatedEnrollment;
      }
      this.editingEnrollment = null;
    } else {
      const newEnrollment: Enrollment = { id: this.nextEnrollmentId++, ...formValue };
      this.enrollments.push(newEnrollment);
    }

    this.enrollmentForm.reset();
    this.setActiveMenu('enrollments');
    this.showAlert('Enrolled successfully!', 'success');
  }

  deleteEnrollment(id: number): void {
    this.enrollments = this.enrollments.filter(enrollment => enrollment.id !== id);
    this.showAlert('Enrollments deleted!', 'error');
  }

  editEnrollment(enrollment: Enrollment): void {
    this.editingEnrollment = enrollment;
    this.enrollmentForm.patchValue(enrollment);
    this.setActiveMenu('add-enrollment');
    this.showAlert('Enrollment updated successfully!', 'info');
  }

  submitFeedback(): void {
    if (this.feedbackForm.invalid) {
      return;
    }

    const newFeedback: Feedback = {
      id: this.nextFeedbackId++,
      ...this.feedbackForm.value
    };

    this.feedbacks.push(newFeedback);
    this.feedbackForm.reset();
    this.setActiveMenu('feedbacks');
    this.showAlert('Submitted successfully!', 'success');
  }
}


