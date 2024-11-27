import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  profilePicture: string; 
}


interface EnrolledCourse {
  name: string;
  instructor: string;
  duration: string;
  progress: number;  
  status: string;    
}


interface Course {
  id: number;
  name: string;
  instructor: string;
  duration: string;
}

interface Progress {
  name: string;
  progress: number;  
}

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  rating: number;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  isVisible:boolean=false;
  activeMenu: string = 'profile';
  unreadCount: number = 3;
  notifications: any;
  feedbackForm: FormGroup;   
  feedbacks: Feedback[] = []; 
  private nextFeedbackId = 1;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' | 'info' = 'info';
  isAlertVisible: boolean = false;

  showSideNav(){
    this.isVisible=!this.isVisible;
  }

  constructor(private fb: FormBuilder) {
      this.feedbackForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        message: ['', Validators.required],
        rating: ['', Validators.required]
      });
    }

  isEditing: boolean = false;

  userProfile: UserProfile = {
    name: 'Pricilla Ruby',
    email: 'pricillaruby@gmail.com',
    joinDate: '2024-011-01',
    profilePicture: ''
  };

  
  enrolledCourses: EnrolledCourse[] = [
    {
      name: 'Introduction to Angular',
      instructor: 'Pricilla',
      duration: '4 weeks',
      progress: 75,
      status: 'In Progress'
    },
    {
      name: 'Advanced TypeScript',
      instructor: 'Ruby',
      duration: '3 weeks',
      progress: 100,
      status: 'Completed'
    }
  ];

  enrolledCoursesProgress: Progress[] = [
    { name: 'Introduction to Angular', progress: 75 },
    { name: 'Advanced TypeScript', progress: 100 },
    { name: 'CSS for Beginners', progress: 45 }
  ];

  favoriteCourses: Course[] = [
    { id: 1, name: 'Introduction to Angular', instructor: 'Pricilla', duration: '4 weeks' },
    { id: 2, name: 'Advanced TypeScript', instructor: 'Ruby', duration: '6 weeks' },
  ];

  setActiveMenu(section: string) {
    this.activeMenu = section;
    if (this.activeMenu === 'edit-profile') {
      this.editedProfile = { ...this.userProfile }; 
    }
  }

  editedProfile = { ...this.userProfile }; 

  ngOnInit() {
    this.editedProfile = { ...this.userProfile }; 
  
  }

  editProfile(){
    this.setActiveMenu('edit-profile');
  }
  
  saveProfile() {
    this.userProfile = { ...this.editedProfile };
    this.setActiveMenu('profile');
    this.showAlert('User updated successfully!', 'info');
  }

  cancelEdit() {
    this.setActiveMenu('profile');
  }


  removeFromFavorites(course: Course) {
    this.favoriteCourses = this.favoriteCourses.filter(c => c.id !== course.id);
  }

  addToFavorites(course: Course) {
    const exists = this.favoriteCourses.some(c => c.id === course.id);
    if (!exists) {
      this.favoriteCourses.push(course);
    }
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
  showAlert(message: string, type: 'success' | 'error' | 'info'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.isAlertVisible = true;
    setTimeout(() => {
      this.isAlertVisible = false;
    }, 3000);
  }

  onProfilePictureChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editedProfile.profilePicture = reader.result as string; 
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  document.querySelector('.notification-icon-container').addEventListener('click', () => {
    const dropdown = document.querySelector('.notification-dropdown');
    dropdown.classList.toggle('open');
  });
  
  function viewAllNotifications() {
    const notifications = document.querySelectorAll('.notification-item');
    notifications.forEach(item => item.classList.remove('unread'));

    document.querySelector('.badge')?.textContent = '';
 
  }
  
 

  document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
      dropdown.classList.remove('open');
    }
  });
  
}
