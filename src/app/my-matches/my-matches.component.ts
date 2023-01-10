import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
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

    // open modal edit: create / update / delete
    @ViewChild('openMatchEditModal') openMatchEditModal: any

    // list of matches
    my_matches: Array<Match> = []


    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(private matchService: MatchService, private http: HttpClient) {
        super()
    }

    ngOnInit() {
        this.loadMyMatches()
    }

    loadMyMatches() {
        this.matchService.getMyMatches().subscribe({
            next: (n) => {
                this.containError = false
                this.my_matches = n.content
            },
            error: (e) => {
                this.returnPrincipalError(e)
            }
        })

        // this.http.get<any>(environment.match_serv_url + '/api/v1/match/list').subscribe({
        //     next: (n) => {
        //         this.containError = false
        //         this.my_matches = n.content
        //     },
        //     error: (e) => {
        //         this.returnPrincipalError(e)
        //     }
        // })
    }


}
