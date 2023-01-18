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
  matchStatusList4update: MatchStatus[] = [];
  constructor(private route: ActivatedRoute, private matchService: MatchService, private matchStatusService: MatchStatusService) {
    super();
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
        this.loadMyStatus();
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
}