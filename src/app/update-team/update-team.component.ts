import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
import { PrincipalComponent } from '../principal.component';
import { TokenService } from '../team-service/token.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent extends PrincipalComponent implements OnInit {
  /***************************
    GENERAL
  ***************************/

  // select my team
  my_Team: Team = new Team('','','','','','','','',0,'','','','',new Date(),'',0)

  team_id: any = null
  team: any = null;

  teamForm: FormGroup

  /***************************
          CONSTRUCTOR
  ***************************/

  constructor(private teamService: TeamService, private tokenService: TokenService, public formBuilder: FormBuilder) {
      super()
      this.team_id = this.tokenService.getId();
      this.teamForm = this.formBuilder.group({
        name: ['', []],
        country: ['', []],
        state: ['', []],
        city: ['', []],
        address: ['', []],
        coach_name: ['', []],
        stadium_name: ['', []],
        capacity_stadium: ['', []],
        president_name: ['', []],
        league_name: ['', []],
        latitude: ['', []],
        longitude: ['', []],
        expiration: ['', []],
        plan_type: ['', []],
        matches_month_created: ['', []]
      })
  }


  /***************************
      METHODS -> GENERAL
  ***************************/

  ngOnInit() {
      this.loadMyTeam();
  }

  getTeam(): Team {
    let m = new Team(
      this.team_id,
      this.teamForm.value.name,
      this.teamForm.value.country,
      this.teamForm.value.state,
      this.teamForm.value.city,
      this.teamForm.value.address,
      this.teamForm.value.coach_name,
      this.teamForm.value.stadium_name,
      this.teamForm.value.capacity_stadium,
      this.teamForm.value.president_name,
      this.teamForm.value.league_name,
      this.teamForm.value.latitude,
      this.teamForm.value.longuitude,
      this.teamForm.value.expiration,
      this.teamForm.value.plan_type,
      this.teamForm.value.matches_month_created,
    )
    return m
}

  loadMyTeam() {
      this.teamService.getTeamById(this.team_id).subscribe({
          next: (t) => {
              this.team = t;
              if(this.team != null) {
                this.teamForm = this.formBuilder.group({
                  name: [this.team.name, []],
                  country: [this.team.country, []],
                  state: [this.team.state, []],
                  city: [this.team.city, []],
                  address: [this.team.address, []],
                  coach_name: [this.team.coach_name, []],
                  stadium_name: [this.team.stadium_name, []],
                  capacity_stadium: [this.team.capacity_stadium, []],
                  president_name: [this.team.president_name, []],
                  league_name: [this.team.league_name, []],
                  latitude: [this.team.latitude, []],
                  longitude: [this.team.longuitude, []],
                  expiration: [this.team.expiration, []],
                  plan_type: [this.team.plan_type, []],
                  matches_month_created: [this.team.matches_month_created, []]
                })
            }
          },
          error: (e) => {
              this.returnPrincipalError(e)
          }
      })
  }

  submitForm() {
    this.teamService.updateTeam(this.getTeam(), this.team_id).subscribe({
      next: (t) => {
        this.my_Team = t
        console.log("Este es mi equipo actualizado" + this.my_Team.user);
      },
      error: (e) => {
          this.returnPrincipalError(e)
      }   
    });
  }
}
