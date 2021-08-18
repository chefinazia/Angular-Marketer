import { Component, OnInit } from '@angular/core';
import {CampaignService} from '../../services/campaign.service'
import {Campaign} from '../../store/models/campaign.model'
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
title="Campaign"
  constructor(public campaignService:CampaignService) { }

  ngOnInit(): void {
    this.campaignService.getCampaign().subscribe(data =>{
      this.listOfData = data.map(e=>{
        console.log(
          e.payload.doc.id
        );

        return Object.assign({id: e.payload.doc.id },e.payload.doc.data())
      })
      this.updateEditCache();
    })
  }
  searchValue = '';
  visible = false;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Campaign[] = [];
  listOfData: readonly Campaign[] = [];
  setOfCheckedId = new Set<any>();
  editCache: { [key: string]: { edit: boolean; data: Campaign } } = {};
  // editCache = new Map()
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

  onCurrentPageDataChange($event: readonly Campaign[]): void {
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
    this.listOfCurrentPageData = this.listOfData.filter((item: Campaign) => item.name.indexOf(this.searchValue) !== -1);
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
    this.campaignService.updateCampaign(id,this.editCache[id].data)
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
    this.campaignService.deleteCampaign(id)
  }
}
