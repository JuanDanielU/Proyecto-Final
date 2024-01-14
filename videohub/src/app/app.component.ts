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
import { User } from './models/user';
import { UserService } from './core/services/user.service';

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
  private _userService = inject(UserService);
  private _authservice = inject(AuthService);

  gotoHome(): void {
    this._router.navigateByUrl('/home');
  }

  ngOnInit() {
    this._authservice.authState$.subscribe((user) => {
      if (user) {
        return this.logged = true;
      }
      else{
        return this.logged = false;
      }
    });
  }

  gotoUpload(): void {
    this._router.navigateByUrl('/upload');
  }

  async logIn(): Promise<void> {
    try {
      const result = await this._authservice.signInWithGoogleProvider();
      const dateTimeNow = new Date(Date.now()).toString();
      const creationTime = new Date(result.user.metadata.creationTime!).toString();
      if (creationTime === dateTimeNow) {
        const user: User = {
          _id: result.user.uid,
          name: result.user.displayName!,
          email: result.user.email!,
          subscribers: [],
          createdAt: new Date(Date.now()),
          updatedAt: null,
          photoURL: result.user.photoURL,
        };
        await this._userService.createUser(user).toPromise();
      }
      this._router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }

  async logOut(): Promise<void> {
    try {
      await this._authservice.logOut();
      this._router.navigateByUrl('/');

    } catch (error) {
      console.log(error);
    }
  }
}
