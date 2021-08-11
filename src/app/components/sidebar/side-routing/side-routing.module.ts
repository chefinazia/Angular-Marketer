import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component'
import {MailerComponent} from '../../mailer/mailer.component'
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard', outlet: "outlet1" },
  { path: "dashboard", component: DashboardComponent, outlet: "outlet1" },
  { path: "mailer", component: MailerComponent, outlet: "outlet1" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class SideRoutingModule { }
