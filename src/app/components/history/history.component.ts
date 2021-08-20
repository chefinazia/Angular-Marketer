import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {State} from '../../store/models/state.model'
import {MailerService} from '../../services/mailer.service'
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
title="History"
date=null
historyList$:Observable<any>;
historyList
  constructor(private store: Store<State>,public mailerServices:MailerService) {
    if(this.date === null){
    mailerServices.getHistory(this.date)
    }
   }

  ngOnInit(): void {
    this.historyList$ = this.store.select((store) => store.history)
    this.historyList$.subscribe(profile => console.log(profile)
     )
  }
  onChange(result: Date[]): void {
   this.mailerServices.getHistory(this.date)
  }

}
