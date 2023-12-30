import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { UploadComponent } from './upload/upload.component';

import { authGuard, publicGuard } from './core/guards';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'upload', canActivate: [authGuard], component: UploadComponent},
  {path: 'auth', canActivate: [publicGuard],
    children:
    [
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
];
