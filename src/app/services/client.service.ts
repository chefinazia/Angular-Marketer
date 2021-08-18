import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { State } from '../store/models/state.model';
import {Client} from '../store/models/client.model'
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    public afs: AngularFirestore,
    private store: Store<State>
    ) {

    }

    getClient(){
      return this.afs.collection('Clients').snapshotChanges();
    }

    updateClient(id:string,client: Client){
      this.afs.doc('Clients/' + id).update(client);
  }
  deleteClient(id: string){
    this.afs.doc('Clients/' + id).delete();
  }
}
