import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { ClientService } from 'src/app/services/client.service';
import { Campaign } from 'src/app/store/models/campaign.model';
import { Client } from 'src/app/store/models/client.model';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = "Dashboard";
  campData:any;
  listOfData: readonly Campaign[] = [];
  listOfDataClient: readonly Client[] = [];
  editCache: { [key: string]: { edit: boolean; data: Campaign } } = {};
  constructor(public auth:AuthService ,public campaignService:CampaignService,private clientService:ClientService) { }

  ngOnInit(){
  this.clientData();
  this.campaignData();

  }

 clientData(){
  this.clientService.getClient().subscribe(data =>{
    this.listOfData = data.map(e=>{
      console.log(
        e.payload.doc.id
      );

      return Object.assign({id: e.payload.doc.id },e.payload.doc.data())
    })
  })
 }

campaignData(){
  this.campaignService.getCampaign().subscribe(data =>{
    this.listOfDataClient = data.map(e=>{
      console.log(
        e.payload.doc.id
      );

      return Object.assign({id: e.payload.doc.id },e.payload.doc.data())
    })
  })
}


}