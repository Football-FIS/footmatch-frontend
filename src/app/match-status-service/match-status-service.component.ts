import { Component, OnInit } from '@angular/core';
import { MatchStatus } from '../models/matchStatus';
import { PrincipalComponent } from '../principal.component';

@Component({
  selector: 'app-match-status-service',
  templateUrl: './match-status-service.component.html',
  styleUrls: ['./match-status-service.component.scss']
})
export class MatchStatusServiceComponent extends PrincipalComponent implements OnInit {

      /***************************
            GENERAL
    ***************************/

    // list of matches
    my_matches: Array<MatchStatus> = []

    // selected match to edit
    selected_match: any = null

    


    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(private matchStatus: MatchStatus) {
        super()
    }

  ngOnInit(): void {
    //this.loadMyMatches()
  }

/*   loadMyMatches() {
    this.matchService.getMyMatches().subscribe({
        next: (n) => {
            this.containError = false
            this.my_matches = n
        },
        error: (e) => {
            this.returnPrincipalError(e)
        }
    })
  } */

  create() {
    this.selected_match = null
    this.show_modal = true
  }

  edit(m: MatchStatus) {
    this.selected_match = m
    this.show_modal = true
  }

}
