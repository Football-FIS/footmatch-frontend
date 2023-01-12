import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { TeamServiceComponent } from './team-service/team-service.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: TeamServiceComponent },
  { path: 'my-matches', component: MyMatchesComponent },
  {path: 'profile', component:ProfileComponent},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
