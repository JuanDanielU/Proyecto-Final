import { Component, inject } from '@angular/core';
import  { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
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

  async signUp(): Promise<void> {
    this._router.navigateByUrl('/auth/signup');
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
