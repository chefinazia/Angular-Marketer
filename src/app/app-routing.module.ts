import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsComponent } from './Components/campaigns/campaigns.component';
import { ClientComponent } from './Components/client/client.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HistoryComponent } from './Components/history/history.component';
import { MailersComponent } from './Components/mailers/mailers.component';

const routes: Routes = [
  {path: "",component: DashboardComponent},
  {path: "client",component: ClientComponent},
  {path: "campaigns",component: CampaignsComponent},
  {path: "mailer",component: MailersComponent},
  {path: "history",component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
