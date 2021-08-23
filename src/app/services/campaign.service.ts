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
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Campaign } from '../store/models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  url$:BehaviorSubject<string> = new BehaviorSubject("")
  constructor( public afs: AngularFirestore,
    private store: Store<State>,
    private storage: AngularFireStorage
    ) {
      // this.url$=null
     }


    getCampaign(){
      return this.afs.collection('Campaigns').snapshotChanges();
    }

    updateCampaign(id:string,campaign: Campaign){
      this.afs.doc('Campaigns/' + id).update(campaign);
  }
  deleteCampaign(id: string){
    this.afs.doc('Campaigns/' + id).delete();
  }
  imageUpload(file){
    const filePath = `campaignImage/${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask
    .snapshotChanges()
    .pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL) => {

          this.url$.next(downloadURL)
        });
      })
    )
    .subscribe();

  }
  createCampaign(campaign: Campaign){
    return this.afs.collection('Campaigns').add(campaign);
}
}
