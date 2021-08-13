import { Component, OnInit,Input,Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 @Input() title : string;
  constructor() { }

  ngOnInit(): void {
  }

}
