import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../models/match';
import { MatchStatus } from '../models/matchStatus';
import { PrincipalComponent } from '../principal.component';
import { MatchService } from '../services/match.service';
import { MatchStatusService } from '../services/matchStatus.service';
import { TeamService } from '../services/team.service';
import { TokenService } from '../team-service/token.service';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent extends PrincipalComponent implements OnInit {
  url: string = ''
  match: Match | null | undefined
  matchStatus: MatchStatus | null | undefined
  matchStatusList: MatchStatus[] = [];
  matchStatusList4update: MatchStatus[] = [];
  estadoActual: string | null = null;
  local: string | null | undefined;
  oponente: string | null | undefined;
  teamuser: any = null;
  weather: any
  temperature: any
  
  constructor(private route: ActivatedRoute, private matchService: MatchService, private tokenService: TokenService, private matchStatusService: MatchStatusService, private teamService: TeamService) {
    super();
    
    this.teamuser = this.tokenService.getId();
    console.log(this.tokenService)
  }

  ngOnInit() {
    // set url
    this.route.params.subscribe(params => {
      this.url = params['url'];
      console.log('URL is: ' + this.url)
    });
    this.matchStatusService.getMatchStatusInCache(this.url)
    // get match information
    this.matchService.getMatchByUrl(this.url).subscribe({
      next: (n) => {
        this.containError = false
        this.match = n
        this.getWeather()
        this.loadMyTeam();
        this.loadMyStatus();
        this.hasBreak();
      },
      error: (e) => {
        this.returnPrincipalError(e)
      }
    })
  }
  
  loadMyStatus(){
    // get match status information
    this.matchStatusService.getMatchStatusByMatchId(this.url).subscribe({
      next: (n) => {
        this.containError = false
        this.matchStatusService.setMatchStatusesInCache(this.url, n)
        this.matchStatusList = n
        // now, sort the list to bring us the newest status
        this.matchStatusList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.matchStatus = this.matchStatusList[0];
        this.matchStatusList4update = this.getLatestMatchStatus();
      },
      error: (e) => {
        this.returnPrincipalError(e)
      }
    })
  }

  getLatestMatchStatus(): MatchStatus[] {
    return this.matchStatusList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-3);
  }

  openModal() {
    this.show_modal = true
  }

  hasStatus(estado: string):Boolean{
    const filteredList = this.matchStatusList.filter(item => item.status_type === estado);
    return filteredList.length > 0;
  }

  hasBreak(){
    const estado = "BRE"
    if(this.matchStatus?.status_type==estado){
      this.estadoActual = 'DESCANSO'
    }else if(this.hasStatus(estado)){
      this.estadoActual = "SEGUNDA PARTE"
    }else{
      this.estadoActual = "PRIMERA PARTE"
    }
  }

  loadMatchInfo(mine: string){
    if(!this.match?.is_local){
      this.local = this.match?.opponent;
      this.oponente = mine;
    }else if(this.match.is_local){
      this.oponente = this.match.opponent;
      this.local = mine;
    }
  }

  loadMyTeam() {
    this.teamService.getTeamById(this.teamuser).subscribe({
        next: (t) => {
            this.containError = false
            this.loadMatchInfo(t['name']);
        },
        error: (e) => {
            this.returnPrincipalError(e)
        }
    })
  }

  getWeather() {
    // pictures only
    this.weather = null
    this.temperature = null
    if (this.match && this.match.weather) {
      // temperatures (ºC)
      let t = this.match.weather.split('Temperatura: ')[1].split('.')[0]
      this.temperature = t + ' ºC'
      // pictures
      if (this.match.weather.includes('rain')) {
        this.weather = 'rainy'
      } else if(this.match.weather.includes('cloud')) {
        this.weather = 'cloudy'
      } else {
        this.weather = 'sunny'
      }
    }
  }
}