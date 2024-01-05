import { Routes } from '@angular/router';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';

import { authGuard, publicGuard } from './core/guards';
import { UploadVideoComponent } from './pages/upload-video/upload-video.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'upload', canActivate: [authGuard], component: UploadVideoComponent},
  {path: 'auth', canActivate: [publicGuard],
    children:
    [
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
];
