import { Component } from '@angular/core';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
import { TokenService } from '../team-service/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userHasTeam: boolean = false;
  team: Team = {
    user : '',
    name: '',
    country: '',
    state: '',
    city: '',
    address: '',
    coach_name: '',
    stadium_name: '',
    capacity_stadium: 0,
    president_name: '',
    league_name: '',
    latitude: '',
    longuitude: '',
    expiration: new Date(),
    plan_type: '',
    matches_month_created: 0
  };

  constructor(private teamService: TeamService, private tokenService: TokenService) {
      this.checkUserTeam();
  }

  checkUserTeam() {
      const userId = this.tokenService.getId() || '';
      this.teamService.getTeamById(userId).subscribe(
          (team) => {
              if (team != null) {
                  this.userHasTeam = true;
                  this.team = team;
              }
          },
          (error) => {
              console.log(error);
              console.log("No tienes equipo")
          }
      );
  }

  public getTeam(){
    return this.team;
  }
}