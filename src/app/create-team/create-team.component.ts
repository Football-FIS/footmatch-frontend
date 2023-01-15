import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
import { PrincipalComponent } from '../principal.component';
import { TokenService } from '../team-service/token.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent extends PrincipalComponent implements OnInit {
  /***************************
    GENERAL
  ***************************/

  // select my team
  my_Team: Team = new Team('','','','','','','','',0,'','','','',new Date(),'',0)

  // selected team to edit
  selected_team: any = null

  // team user
  teamuser: any = null;

  /***************************
          CONSTRUCTOR
  ***************************/

  constructor(private teamService: TeamService, private tokenService: TokenService) {
      super()
      this.teamuser = this.tokenService.getId();
      this.my_Team.user=this.teamuser
  }


  /***************************
      METHODS -> GENERAL
  ***************************/

  ngOnInit() {
      this.loadMyTeam()
  }

  loadMyTeam() {
      this.teamService.getTeamById(this.teamuser).subscribe({
          next: (t) => {
              this.containError = false
              this.my_Team = t
          },
          error: (e) => {
              this.returnPrincipalError(e)
          }
      })
  }

  submitForm() {
      this.my_Team.user = this.teamuser;
      this.teamService.createTeam(this.my_Team).subscribe({
          next: (t) => {
              console.log("Este es mi equipo" + this.my_Team.user)
          },
          error: (e) => {
              this.returnPrincipalError(e)
          }
      });
    }
}
