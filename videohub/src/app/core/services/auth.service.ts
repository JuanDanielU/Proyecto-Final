import { Injectable, inject } from '@angular/core';
import {
  Auth,
  AuthProvider,
  GoogleAuthProvider,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  authState,
  signInWithPopup,
} from '@angular/fire/auth';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  readonly authState$ = authState(this.auth);

  logOut(): Promise<void> {
    return this.auth.signOut();
  }

  userId(): string {
    return this.auth.currentUser?.uid ?? '';
  }

  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  logInWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  // providers
  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();

    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);

      return result;
    } catch (error: any) {
      return error;
    }
  }
}
