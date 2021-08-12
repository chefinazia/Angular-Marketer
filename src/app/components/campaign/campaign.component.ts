import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { EmployeeService } from 'src/app/shared/employee.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
 

  constructor(public service: EmployeeService,
    private firestore:AngularFirestore,
    private toastr:ToastrService,
    private http: HttpClient,
    private af:AngularFireStorage) { }

  ngOnInit(): void {
    this.resetForm()
  }

  path:String;

  onFileSelected($event:any){
    // console.log(event);
    this.path=$event.target.files[0];
    console.log("hii")
    console.log(this.path);
  }
 
  

  onUpload(){
    console.log("p",this.path);
    console.log("hii");
    this.af.upload("/files"+Math.random()+this.path,this.path);

  }

  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData={
      // fullName:'',
      // position:'',
      // empCode:'',
      // mobile:'',
      // path:'gs://form-427b9.appspot.com/files0.4080164953319365[object File]'
      name:'',
      subject:'',
      content:'',
      path:'',
      createdAt:new Date().toISOString(),


    }
  }

  

  onSubmit(form:NgForm){
    let data=form.value;
    if(!this.service.formData.name){
      this.toastr.error('Please Provide Campaign Name');
      
    }
    if(!this.service.formData.subject){
      this.toastr.error('Please Provide Subject');
      
    }
    if(!this.service.formData.content){
      this.toastr.error('Please Provide Content');
      
    }
    // if(!this.service.formData.path){
    //   this.toastr.error('Please Provide Image');
      
    // }
    if(this.service.formData.name && this.service.formData.subject && this.service.formData.content){
      this.firestore.collection('Campaigns').add(data);
      this.toastr.success('Submitted','Campaign Registered')
      this.resetForm(form);
    }
    // this.firestore.collection('employees').add(data);
    // this.resetForm(form);
    // this.toastr.success('Submitted','EMP. Register')
  }

 
}
