import { Component, OnInit } from '@angular/core';
import { MatchStatus } from '../models/matchStatus';
import { MatchStatusService } from '../services/matchStatus.service';
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

    // list of matchStatus
    my_matchStatus: Array<MatchStatus> = []

    // selected match to edit
    selected_matchStatus: any = null

    // select my team
    //my_Team: Team = new Team('','','','','','','','',0,'','','','',new Date(),'',0)
    


    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(private matchStatus: MatchStatusService) {
        super()
    }

  ngOnInit(): void {
    this.loadMyMatchStatus()
  }

   loadMyMatchStatus() {
    this.matchStatus.getMatchStatusById("asd").subscribe({
        next: (n) => {
            this.containError = false
            this.my_matchStatus = n
        },
        error: (e) => {
            this.returnPrincipalError(e)
        }
    })
  } 

  submitForm() {
    this.my_matchStatus.values = this.selected_matchStatus;
    this.matchStatus.getMatchStatus().subscribe({
        next: (t) => {
            console.log("Este es mi estado" + this.my_matchStatus.values)
        },
        error: (e) => {
            this.returnPrincipalError(e)
        }
    });
  }

}
