import { NgOptimizedImage } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../models/user';

import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';

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
      const dbUser = await this._userService.getUser(result.user.uid).toPromise();
      if (result.user.uid !== dbUser._id) {
        const userData: User = {
          _id: result.user.uid,
          email: result.user.email!,
          name: result.user.displayName!,
          createdAt: new Date(result.user.metadata.creationTime!),
          updatedAt: null,
          photoURL: result.user.photoURL,
        };
        await this._userService.createUser(userData).toPromise();
        this._router.navigateByUrl('/');
      }
      else
      {
        this._router.navigateByUrl('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
