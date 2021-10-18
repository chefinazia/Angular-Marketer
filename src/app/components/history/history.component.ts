import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {State} from '../../store/models/state.model'
import {MailerService} from '../../services/mailer.service'
import {History} from '../../store/models/history.model';
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
listOfCurrentPageData
searchValue = '';
visible = false;
  constructor(private store: Store<State>,public mailerServices:MailerService) {
    if(this.date === null){
    mailerServices.getHistory(this.date)
    }
   }

  ngOnInit(): void {
    this.historyList$ = this.store.select((store) => store.history)
    this.historyList$.subscribe(profile => this.historyList = profile
     )
  }
  onChange(result: Date[]): void {
   this.mailerServices.getHistory(this.date)
  }

  onCurrentPageDataChange($event: readonly History[]): void {
    this.listOfCurrentPageData = this.historyList;
    // this.refreshCheckedStatus();
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }
  search(): void {
    this.visible = false;
    this.listOfCurrentPageData = this.historyList.filter((item: History) => item.clientName.indexOf(this.searchValue) !== -1);
  }
}
