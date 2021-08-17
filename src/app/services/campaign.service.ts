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
export class CampaignService {

  constructor( public afs: AngularFirestore,
    private store: Store<State>) { }


    getCampaign(){
      return this.afs.collection('Campaigns').snapshotChanges();
    }

    updateCampaign(id:string,client: Client){
      this.afs.doc('Campaigns/' + id).update(client);
  }
  deleteCampaign(id: string){
    this.afs.doc('Campaigns/' + id).delete();
  }
}
