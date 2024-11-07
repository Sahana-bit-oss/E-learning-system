import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
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

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  isVisible:boolean=false;
  activeMenu: string = 'profile';

  showSideNav(){
    this.isVisible=!this.isVisible;
  }
  isEditing: boolean = false;

  userProfile: UserProfile = {
    name: 'Pricilla Ruby',
    email: 'pricillaruby@gmail.com',
    joinDate: '2024-011-01'
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
    this.setActiveMenu('edit-profile')
  }
  
  saveProfile() {
    this.userProfile = { ...this.editedProfile };
    this.setActiveMenu('profile');
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
}

