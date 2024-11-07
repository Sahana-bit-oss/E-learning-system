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

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isVisible: boolean = false;
  isHoverCourses = false;
  isHoverUsers = false;
  isHoverEnrollments = false;
  isHoverSales = false;
  activeMenu: string = '';
  courseForm: FormGroup;
  userForm: FormGroup;
  enrollmentForm: FormGroup;
  courses: Course[] = [];
  editingCourse: Course | null = null;
  users: User[] = [];
  editingUser: User | null = null;
  enrollments: Enrollment[] = [];
  editingEnrollment: Enrollment | null = null;
  private nextEnrollmentId = 1;
  private nextUserId = 1;
  private nextId = 1;
  selectedFile: File | null = null;
  imagePreview: string | null = null;


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
  }

  showSideNav() {
    this.isVisible = !this.isVisible;
  }

  setActiveMenu(section: string) {
    this.activeMenu = section;
  }

  addOrUpdateCourse(): void {
    if (this.courseForm.invalid) {
      return;
    }

    const formValue = this.courseForm.value;

    if (this.editingCourse) {
      const updatedCourse: Course = { ...this.editingCourse, ...formValue };
      const index = this.courses.findIndex(c => c.id === updatedCourse.id);
      if (index !== -1) {
        this.courses[index] = updatedCourse;
      }
      this.editingCourse = null;
    } else {
      const newCourse: Course = { id: this.nextId++, ...formValue, image: this.imagePreview || '' };
      this.courses.push(newCourse);
    }

    this.courseForm.reset();
    this.imagePreview = null;
    this.setActiveMenu('courses');
  }

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

  deleteCourse(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
  }

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
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }

  editUser(user: User): void {
    this.editingUser = user;
    this.userForm.patchValue(user);
    this.setActiveMenu('add-user');
  }

  addOrUpdateEnrollment(): void {
    if (this.enrollmentForm.invalid) {
      return;
    }

    const formValue = this.enrollmentForm.value;

    if (this.editingEnrollment) {
      // Update existing enrollment
      const updatedEnrollment: Enrollment = { ...this.editingEnrollment, ...formValue };
      const index = this.enrollments.findIndex(e => e.id === updatedEnrollment.id);
      if (index !== -1) {
        this.enrollments[index] = updatedEnrollment;
      }
      this.editingEnrollment = null;
    } else {
      // Add new enrollment
      const newEnrollment: Enrollment = { id: this.nextEnrollmentId++, ...formValue };
      this.enrollments.push(newEnrollment);
    }

    this.enrollmentForm.reset();
    this.setActiveMenu('enrollments');
  }

  deleteEnrollment(id: number): void {
    this.enrollments = this.enrollments.filter(enrollment => enrollment.id !== id);
  }

  editEnrollment(enrollment: Enrollment): void {
    this.editingEnrollment = enrollment;
    this.enrollmentForm.patchValue(enrollment);
    this.setActiveMenu('add-enrollment');
  }

}


