import { Routes } from '@angular/router';

import { authGuard } from './core/guards';
import { UploadVideoComponent } from './pages/upload-video/upload-video.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayerComponent } from './pages/player/player.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'upload', canActivate: [authGuard], component: UploadVideoComponent},
  {path: 'player/:id', component: PlayerComponent},
  {path: 'search/:search', component: HomeComponent},
];
