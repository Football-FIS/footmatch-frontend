import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { TeamServiceComponent } from './team-service/team-service.component';
import { ProfileComponent } from './profile/profile.component';
import { MatchComponent } from './match/match.component';
import { MatchStatusServiceComponent } from './match-status-service/match-status-service.component';
import { TeamComponent } from './team/team.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { UpdateTeamComponent } from './update-team/update-team.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: TeamServiceComponent },
  // { path: 'my-matches', component: MyMatchesComponent },
  { path: 'profile', component:ProfileComponent},
  { path: 'match/:url', component:MatchComponent},
  {path: 'match-status', component:MatchStatusServiceComponent},
  {path: 'create-team', component:CreateTeamComponent},
  {path: 'update-team', component:UpdateTeamComponent},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
