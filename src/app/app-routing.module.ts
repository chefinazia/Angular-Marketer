import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {MailerComponent} from './components/mailer/mailer.component'
import {ClientComponent} from './components/client/client.component'
import {CampaignComponent} from './components/campaign/campaign.component'
import {HistoryComponent} from './components/history/history.component'
import {AuthGuard} from './guard/auth.guard'
import {PublicGuard} from './guard/public.guard'
const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: '/dashboard' },
  {path:"login",component:LoginComponent , canActivate:[PublicGuard]},
  {path:"dashboard" ,component:DashboardComponent, canActivate:[AuthGuard]},
  {path:"client" ,component:ClientComponent, canActivate:[AuthGuard]},
  {path:"campaign" ,component:CampaignComponent, canActivate:[AuthGuard]},
  {path:"mailer" ,component:MailerComponent, canActivate:[AuthGuard]},
  {path:"history" ,component:HistoryComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard,PublicGuard]
})
export class AppRoutingModule { }
