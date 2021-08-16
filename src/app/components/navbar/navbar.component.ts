import { Component, OnInit,Input,HostListener, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {Profile} from '../../store/models/profile.model'
import {State} from '../../store/models/state.model'
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 @Input() title : string;


 profile$:Observable<Profile>
 profile :Profile
 selectedFiles: FileList;
 @ViewChild("myModal") modal :ElementRef

 formData:Profile = {
  displayName: "",
  mobile:0
 }
  constructor(private store: Store<State>,public auth:AuthService) {


   }

  ngOnInit(): void {
    this.profile$ = this.store.select((store) => store.profile)
     this.profile$.subscribe(profile =>this.profile = profile )
    this.formData={
      displayName: this.profile.displayName,
      mobile:this.profile.mobile
    }

  }
  openModal(){
    this.modal.nativeElement.style.display = "block";
  }
  closeModal(){
    this.modal.nativeElement.style.display = "none";
  }
  @HostListener('window:click', ['$event'])
  function(event) {
    if (event.target == this.modal.nativeElement) {
      this.modal.nativeElement.style.display = "none";
    }
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    // console.log(this.selectedFiles[0]);
  this.auth.imageUpload(this.selectedFiles[0],this.profile.uid)
  }

  updateProfile(){
    console.log(this.formData);
    if(this.formData.displayName!=""||this.formData.mobile!=0){
    this.auth.profileUpdate(this.formData,this.profile.uid)
    }
    this.modal.nativeElement.style.display = "none";
  }

}
