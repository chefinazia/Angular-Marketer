import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';



import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ClientComponent } from './components/client/client.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { MailerComponent } from './components/mailer/mailer.component';
import { HistoryComponent } from './components/history/history.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
// import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { EmployeeService } from './shared/employee.service';
// import { SideRoutingModule } from './components/sidebar/side-routing/side-routing.module';
// import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment';

// 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    ClientComponent,
    CreateClientComponent,
    MailerComponent,
    HistoryComponent,
    CampaignComponent,
    CreateCampaignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    // SideRoutingModule

   
    // AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule


  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
