import { provideRouter, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AdminRegisterComponent } from "./admin-register/admin-register.component";
import { StudentRegisterComponent } from "./student-register/student-register.component";
import { ContactComponent } from "./contact/contact.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

export const routes: Routes = 
   [ { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin-register', component: AdminRegisterComponent },
    { path: 'student-register', component: StudentRegisterComponent },
    {path:'resetpassword',component:ResetpasswordComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'admin-dashboard',component:AdminDashboardComponent}
   
];
export const appRoutingProviders=[provideRouter(routes)];
