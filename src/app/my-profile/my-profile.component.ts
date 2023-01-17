import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
import { TokenService } from '../team-service/token.service';
import { PrincipalComponent } from '../principal.component';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent extends PrincipalComponent implements OnInit{

  team: Team | null | undefined

  teamuser: any = null;

  constructor(private teamService: TeamService, private tokenService: TokenService) {
    super();
    this.teamuser = this.tokenService.getId();
  }

  ngOnInit() {
    this.loadMyProfile();
  }

  loadMyProfile() {
    this.teamService.getTeamById(this.teamuser).subscribe({
        next: (t) => {
          this.team = t;
        },
        error: (e) => {
            this.returnPrincipalError(e)
        }
    })
  }

  public deleteTeam(){
    const userId = this.tokenService.getId() || '';
    this.teamService.deleteTeam(userId).subscribe(
      (team) => {
        this.team = null;
        console.log("Equipo eliminado")
      },
      (error) => {
        console.log(error);
        this.team = null;
        console.log("No tienes equipo para eliminar");
      }
    );
  }

}
