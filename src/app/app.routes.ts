import { Routes } from '@angular/router';

import { HomePageComponent } from './features/home/ui/home-page';
import { LoginPageComponent } from './features/auth/ui/login-page';
import { SignupPageComponent } from './features/auth/ui/signup-page';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '**', redirectTo: '' },
];
