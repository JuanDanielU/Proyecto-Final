import { NgOptimizedImage } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../models/user';

export type Provider = 'google';

@Component({
  standalone: true,
  imports: [NgOptimizedImage],
  selector: 'app-button-providers',
  templateUrl: './button-providers.component.html',
  styleUrls: ['./button-providers.component.scss'],
})
export class ButtonProviders {
  @Input() isLogin = false;

  private _userService = inject(UserService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  async signUpWithGoogle(): Promise<void> {
    try {
      const result = await this._authService.signInWithGoogleProvider();
      const creationTime = new Date(result.user.metadata.creationTime!).toString();
      const dateTimeNow = new Date(Date.now()).toString();
      if (creationTime === dateTimeNow) {
        const user: User = {
          _id: result.user.uid,
          name: result.user.displayName!,
          email: result.user.email!,
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
}
