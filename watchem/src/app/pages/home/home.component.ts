import { Component, inject } from '@angular/core';
import  { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  hide = false;

  private _router = inject(Router);

  private authservice = inject(AuthService);

  ngOnInit() {
    this.authservice.authState$.subscribe((user) => {
      if (user) {
        this.hide = true;
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
