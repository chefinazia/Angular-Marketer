import { Injectable,NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {User} from '../shared/services/user'
import { Observable,BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import {State} from '../store/models/state.model'
import {UpdateProfileAction} from '../store/actions/profile.action'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone ,
    public afs: AngularFirestore,
    private store: Store<State>
    ) {
      this.afAuth.onAuthStateChanged(async(user) => {
        if (user) {
           const data = await this.getUserData(user.uid)
           console.log(data);
           this.store.dispatch(new UpdateProfileAction(data));
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          // this.router.navigate(['dashboard']);
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
          // this.router.navigate(['login']);
        }
      })
     }
   // Sign in with Google
   GoogleAuth() {
    return this.AuthLogin( new firebase.default.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      localStorage.setItem('user', JSON.stringify(result.user))
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
      const userData: User = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        emailVerified: result.user.emailVerified
      }
      this.store.dispatch(new UpdateProfileAction(userData));
      console.log(result);

    }).catch((error) => {
      window.alert(error)
    })


  }
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  async getUserData(id){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${id}`);
    // console.log(userRef.get());
    //  this.afs.doc(`users/${id}`).get()
   return userRef.ref.get().then(data =>{
      if (data.exists) {
        return  {uid:data.id,...data.data()}

    } else {
        console.error('No matching invoice found');
    }
    })
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user===null){
      // this.router.navigate(['login']);
      return false
    }else{
      return true
    }
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
}
