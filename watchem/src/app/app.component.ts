import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'videohub';

  hide = false;
  hideLogin = false;
  userName: string = "";

  private _router = inject(Router);

  private authservice = inject(AuthService);

  gotoHome(): void {
    this._router.navigateByUrl('/home');
  }
  
  ngOnInit() {
    if (this._router.url === '/auth/login' || this._router.url === '/auth/signup') {
      this.hideLogin = true;
    }
    this.authservice.authState$.subscribe((user) => {
      if (user) {
        this.hide = true;
        this.userName = user?.displayName ?? '';
      }
      else {
        this.hide = false;
      }
    });
  }

  gotoUpload(): void {
    this._router.navigateByUrl('/upload');
  }

  async logIn(): Promise<void> {
    this._router.navigateByUrl('/auth/login');
    this.hideLogin = true;
  }

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/login');

    } catch (error) {
      console.log(error);
    }
  }
}
