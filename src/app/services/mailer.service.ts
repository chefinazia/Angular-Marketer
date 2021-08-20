import { Injectable } from '@angular/core';
import * as Firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../store/models/state.model';
import {historyAction,historyClearAction} from '../store/actions/history.action'
@Injectable({
  providedIn: 'root',
})
export class MailerService {
  public toggle :any= true
  public array =[]
  clientData: BehaviorSubject<any> = new BehaviorSubject(this.array);
  result$ = this.clientData.asObservable()
  constructor(public afs: AngularFirestore,private message: NzMessageService,public router:Router, private store: Store<State>) {}

async sendMail(window,clientData,campaignData){
  clientData.map(async e =>{
    const obj = {
      campaignName:campaignData.name,
      campaignSubject:campaignData.subject,
      clientName:e.name,
      clientEmail:e.email,
      createdAt:new Date(),
    }
    await this.afs.collection('history').add(obj);
   })
   let clientEmail= clientData.map(e => e.email)
   try {
      window.Email.send({
        SecureToken : "a66a457c-0910-429b-9643-b6a48a3c16c2",
        To : clientEmail,
        From : "reactjs137@gmail.com",
        Subject : campaignData.subject,
        Body : campaignData.content,
        Attachments : [
            {
                name : "markater.png",
                path : campaignData.image&&campaignData.image
            }]
    }).then(
      messages => {
        this.message.create("success","Mail Sent")
      this.toggle=true
    }
    );

} catch (error) {
  this.message.create("error","Mail not Sent")
}
 }

 getHistory(date){
  this.store.dispatch(new historyClearAction())
   if(date!==null){
    this.store.dispatch(new historyClearAction())
   this.afs.collection('history',ref => ref.where("createdAt", ">",date[0]).where("createdAt", "<",date[1])).snapshotChanges().subscribe(data =>{
     data.map(e =>{
       this.store.dispatch(new historyAction(Object.assign({id: e.payload.doc.id },e.payload.doc.data())))

     })
   })
  }else{
    this.store.dispatch(new historyClearAction())
    this.afs.collection('history').snapshotChanges().subscribe(data =>{
      data.map(e =>{
        this.store.dispatch(new historyAction(Object.assign({id: e.payload.doc.id },e.payload.doc.data())))

      })
    })
  }
}




}
