import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {MailerComponent} from './components/mailer/mailer.component'
import {ClientComponent} from './components/client/client.component'
import {CampaignComponent} from './components/campaign/campaign.component'
import {HistoryComponent} from './components/history/history.component'
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: '/login' },
  {path:"login",component:LoginComponent},
  {path:"dashboard" ,component:DashboardComponent},
  {path:"client" ,component:ClientComponent},
  {path:"campaign" ,component:CampaignComponent},
  {path:"mailer" ,component:MailerComponent},
  {path:"history" ,component:HistoryComponent},
  {path:"create-campaign",component:CreateCampaignComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
