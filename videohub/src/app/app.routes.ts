import { Routes } from '@angular/router';

import { authGuard, publicGuard } from './core/guards';
import { UploadVideoComponent } from './pages/upload-video/upload-video.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayerComponent } from './pages/player/player.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'upload', canActivate: [authGuard], component: UploadVideoComponent},
  {path: 'auth', canActivate: [publicGuard],
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
    ],
  },
  {path: 'player/:id', component: PlayerComponent},
];
