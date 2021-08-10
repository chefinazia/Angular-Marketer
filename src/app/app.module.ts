import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ClientComponent } from './Components/client/client.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CampaignsComponent } from './Components/campaigns/campaigns.component';
import { MailersComponent } from './Components/mailers/mailers.component';
import { HistoryComponent } from './Components/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    ClientComponent,
    DashboardComponent,
    CampaignsComponent,
    MailersComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
