import { Injectable,NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth,) { }
   // Sign in with Google
   GoogleAuth() {
    return this.AuthLogin( new firebase.default.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      //  this.ngZone.run(() => {
      //     this.router.navigate(['dashboard']);
      //   })
      // this.SetUserData(result.user);
      console.log(result);

    }).catch((error) => {
      window.alert(error)
    })
  }
}
