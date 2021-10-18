import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service'
import {CampaignService} from '../../services/campaign.service'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {State} from '../../store/models/state.model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = "Dashboard"
  clientCount  = 0;
  campaignCount  = 0;
  historyList$:Observable<any>;
  public data: any=[]

  constructor(private clientService:ClientService,public campaignService:CampaignService,private store: Store<State>) { }

  ngOnInit(): void {




    // this.historyList$ = this.store.select((store) => store.history)
    // this.historyList$.subscribe(profile => {
    //   profile.map((e) =>{
    //       if(this.data.find(o => o.label ===e.date.toDate() )){
    //       let  objIndex = this.data.findIndex((obj => obj.label == e.date.toDate()));
    //       this.data[objIndex].value = this.data[objIndex].value+1
    //       }else{
    //         this.data.push({label:e.date.toDate(),value: 1})
    //       }

    //   })

    // }  )
    this.clientService.getClient().subscribe(data =>{
    data.forEach(e=>{
      this.clientCount = this.clientCount + 1;

      })

    })

    this.campaignService.getCampaign().subscribe(data =>{
      data.forEach(e=>{
         this.campaignCount = this.campaignCount + 1;
      })
    })

  }

}
