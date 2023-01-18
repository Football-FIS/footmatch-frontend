import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { PrincipalComponent } from '../principal.component';
import { PlayerService } from '../services/player.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
    selector: 'players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss']
})
export class PlayersComponent extends PrincipalComponent implements OnInit {

    /***************************
            GENERAL
    ***************************/

    // list of matches
    players: Array<Player> = []
    // players = [1, 2, 3]

    // selected match to edit
    selected_match: any = null

    


    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(private playerService: PlayerService) {
        super()
    }

    ngOnInit() {
        this.loadPlayers()
    }

    loadPlayers() {
        this.playerService.getMyPlayers().subscribe(
            response => {
                console.log(response.players)
                this.players = response.players
            },
            error => {
              console.log(error);
            });
    }

    create() {
    }

    edit(m: Player) {
    }

}
