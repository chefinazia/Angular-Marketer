import { Component, OnInit,Input,Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {User} from '../../shared/services/user'
import {Profile} from '../../store/models/profile.model'
import {State} from '../../store/models/state.model'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 @Input() title : string;

 profile$:Observable<Profile>
 profile :Profile
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.profile$ = this.store.select((store) => store.profile)
     this.profile$.subscribe(profile =>this.profile = profile )
  }

}
