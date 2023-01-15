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

  constructor(private teamService: TeamService, private tokenService: TokenService) {
  }

}