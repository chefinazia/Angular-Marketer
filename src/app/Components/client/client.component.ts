import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  headers: any = ["Name", "Email", "Company Name", "Customer Type", "Phone Number", "Actions"];
  rows: any = [
    {
      "Name": "Rishabh Arya",
      "Email": "	rishwebd@gmail.com",
      "Company Name": "Orange Mantra",
      "Customer Type": "B2B",
      "Phone Number": "1234-567-890"
    },
    {
      "Name": "Aman Sikarwar",
      "Email": "sikarwaraman26@gmail.com",
      "Company Name": "Orange Mantra",
      "Customer Type": "B2B",
      "Phone Number": "1234-567-890"
    },
    {
      "Name": "Rachit Arora",
      "Email": "abc@gmail.com",
      "Company Name": "Orange Mantra",
      "Customer Type": "B2B",
      "Phone Number": "1234-567-890"
    },
    {
      "Name": "Rahul",
      "Email": "abc@gmail.com",
      "Company Name": "Orange Mantra",
      "Customer Type": "B2B",
      "Phone Number": "1234-567-890"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
