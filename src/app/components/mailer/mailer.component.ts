import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service'
import {CampaignService} from '../../services/campaign.service'
import {Client} from '../../store/models/client.model'
import {Campaign} from '../../store/models/campaign.model'
@Component({
  selector: 'app-mailer',
  templateUrl: './mailer.component.html',
  styleUrls: ['./mailer.component.css']
})
export class MailerComponent implements OnInit {
title="Mailer"
selectedValue
searchValue = '';
visible = false;
checked = false;
indeterminate = false;
listOfCurrentPageData: readonly Client[] = [];
listOfData: readonly Client[] = [];
setOfCheckedId = new Set<any>();
editCache: { [key: string]: { edit: boolean; data: Client } } = {};
campaignList: Campaign[] = []
  constructor(private clientService:ClientService,private campaignService:CampaignService) { }

  ngOnInit(): void {
    this.clientService.getClient().subscribe(data =>{
      this.listOfData = data.map(e=>{
        console.log(
          e.payload.doc.id
        );

        return Object.assign({id: e.payload.doc.id },e.payload.doc.data())
      })
      this.updateEditCache();
    })
    this.campaignService.getCampaign().subscribe(data =>{
   this.campaignList = data.map(e =>{
    return Object.assign({id: e.payload.doc.id },e.payload.doc.data())
   })
    })
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item =>{ console.log(item);
     this.updateCheckedSet(item.id, value)});
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Client[]): void {
    this.listOfCurrentPageData = this.listOfData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfCurrentPageData = this.listOfData.filter((item: Client) => item.name.indexOf(this.searchValue) !== -1);
  }
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }
  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }
  saveEdit(id: string): void {
    // const index = this.listOfData.findIndex(item => item.id === id);
    // Object.assign(this.listOfData[index], this.editCache[id].data);
    this.clientService.updateClient(id,this.editCache[id].data)
    this.editCache[id].edit = false;
  }
  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
      console.log(item);

    //   this.editCache.set(item.id,{edit: false,
    //     data: { ...item }})
    });
  }
  onDelete(id:string){
    this.clientService.deleteClient(id)
  }


}
