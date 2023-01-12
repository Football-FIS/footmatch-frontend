import { Component, OnInit, ViewChild } from '@angular/core';
import { Match } from '../models/match';
import { PrincipalComponent } from '../principal.component';
import { MatchService } from '../services/match.service';

@Component({
    selector: 'my-matches',
    templateUrl: './my-matches.component.html',
    styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent extends PrincipalComponent implements OnInit {

    /***************************
            GENERAL
    ***************************/

    // list of matches
    my_matches: Array<Match> = []

    // selected match to edit
    selected_match: any = null

    


    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(private matchService: MatchService) {
        super()
    }


    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnInit() {
        this.loadMyMatches()
    }

    loadMyMatches() {
        this.matchService.getMyMatches().subscribe({
            next: (n) => {
                this.containError = false
                this.my_matches = n
            },
            error: (e) => {
                this.returnPrincipalError(e)
            }
        })
    }

    create() {
        this.selected_match = null
        this.show_modal = true
    }

    edit(m: Match) {
        this.selected_match = m
        this.show_modal = true
    }

}
