import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../models/match';
import { PrincipalComponent } from '../principal.component';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent extends PrincipalComponent implements OnInit {

  url: string = ''
  match: Match | null | undefined

  constructor(private route: ActivatedRoute, private matchService: MatchService) {
    super();
  }

  ngOnInit() {

    // set url
    this.route.params.subscribe(params => {
      this.url = params['url'];
      console.log('URL is: ' + this.url)
    });

    // get match information
    this.matchService.getMatchByUrl(this.url).subscribe({
      next: (n) => {
        this.containError = false
        this.match = n
      },
      error: (e) => {
        this.returnPrincipalError(e)
      }
    })

  }

}
