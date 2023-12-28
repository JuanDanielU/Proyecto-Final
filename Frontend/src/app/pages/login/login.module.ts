import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,

    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBbSSAPy_imYqBPP9I0_vywkJ5I5scWHxY",
      authDomain: "watchem-42dca.firebaseapp.com",
      databaseURL: "https://watchem-42dca-default-rtdb.firebaseio.com",
      projectId: "watchem-42dca",
      storageBucket: "watchem-42dca.appspot.com",
      messagingSenderId: "1084187948844",
      appId: "1:1084187948844:web:b63732b0f270d7d927de89",
      measurementId: "G-FV1CS6NWB5"
    })
  ]
})
export class LoginModule { }
