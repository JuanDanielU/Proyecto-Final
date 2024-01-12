import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'videohub';

  logged = false;

  private _router = inject(Router);

  private authservice = inject(AuthService);

  gotoHome(): void {
    this._router.navigateByUrl('/home');
  }

  ngOnInit() {
    this.authservice.authState$.subscribe((user) => {
      if (user) {
        this.logged = true;
      }
      else{
        this.logged = false;
      }
    });
  }

  gotoUpload(): void {
    this._router.navigateByUrl('/upload');
  }

  async logIn(): Promise<void> {
    this.authservice.signInWithGoogleProvider();
  }

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/');

    } catch (error) {
      console.log(error);
    }
  }
}
