import { Component, OnInit } from '@angular/core';
import {Campaign} from '../../store/models/campaign.model'
import {CampaignService} from '../../services/campaign.service'
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
 title = "Campaigns"
 formData:Campaign={
   name:"",
   subject:"",
   image:"",
   content:""
 }
 selectedFile:FileList;
  constructor(public campaignService:CampaignService,public router:Router,private message: NzMessageService) { }

  ngOnInit(): void {


  }

  imageUpload($event){
   this.selectedFile = $event.target.files
   this.campaignService.imageUpload(this.selectedFile[0])
   this.campaignService.url$.subscribe(url => this.formData.image = url )
  }



  onSubmit(){
    if(this.formData.name!==""&&this.formData.subject!==""&&this.formData.image!==""&&this.formData.content!==""){
     console.log(this.formData);
     this.campaignService.createCampaign(this.formData)
     this.router.navigate(["campaign"])
    }
    else{
      this.message.create("error", `All field Are required`);
    }
  }
}
