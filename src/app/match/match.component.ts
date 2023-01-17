import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../models/match';
import { MatchStatus } from '../models/matchStatus';
import { PrincipalComponent } from '../principal.component';
import { MatchService } from '../services/match.service';
import { MatchStatusService } from '../services/matchStatus.service';

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

  constructor(private route: ActivatedRoute, private matchService: MatchService, private matchStatusService: MatchStatusService) {
    super();
  }

  ngOnInit() {

    // set url
    this.route.params.subscribe(params => {
      this.url = params['url'];
      console.log('URL is: ' + this.url)
    });

    // get match information
    this.matchService.getMatchById(this.url).subscribe({
      next: (n) => {
        this.containError = false
        //crear funcion para insertar lista de eventos
        this.match = n
      },
      error: (e) => {
        this.returnPrincipalError(e)
      }
    })

    // get match status information
    this.matchStatusService.getMatchStatusByMatchId(this.url).subscribe({
      next: (n) => {
        this.containError = false
        this.matchStatusList = n
      },
      error: (e) => {
        this.returnPrincipalError(e)
      }
    })

    // now, sort the list to bring us the newest status
    this.matchStatusList.sort((a: MatchStatus, b: MatchStatus) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.matchStatus = this.matchStatusList[0];
  }


  getLatestMatchStatus(): MatchStatus[] {
    return this.matchStatusList.slice(-3);
  }

}
