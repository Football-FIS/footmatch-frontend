import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { defaultPlayer, Player } from '../models/player';
import { PrincipalComponent } from '../principal.component';
import { PlayerService } from '../services/player.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
    selector: 'players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss']
})
export class PlayersComponent extends PrincipalComponent implements OnInit {

    // list of players
    players: Array<Player> = []
    // editing player
    showModal: boolean = false
    selected_player: any = defaultPlayer()
    selected_index: number = -1
    modal_error: any = null

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

    on_delete(player: Player) {
        this.playerService.deletePlayer(player).subscribe(
            response => {
                this.players = this.players.filter(item => item._id != player._id);
            },
            error => {
              alert(error);
        });
    }

    on_create() {
        let newDefaultPlayer = defaultPlayer();
        this.playerService.createPlayer(newDefaultPlayer).subscribe(
            newPlayer => {
                this.players.push(newPlayer)
            },
            error => {
                alert(error.error[0].msg);
        });
    }

    on_edit(player: Player, index: number) {
        this.selected_player = new Player(
            player._id, player.team_id, player.first_name, player.last_name, player.email, player.position)
        this.selected_index = index
        this.showModal = true
    }

    on_modal_close() {
        this.hideModal()
    }

    on_modal_save() {
        console.log(this.selected_player)
        this.playerService.updatePlayer(this.selected_player).subscribe(
            updatedPlayer => {
                this.players[this.selected_index] = updatedPlayer
                this.hideModal()
            },
            error => {
                console.log(error)
                this.modal_error = error.error[0].msg 
        });
    }

    hideModal() {
        this.selected_player = defaultPlayer()
        this.selected_index = -1
        this.showModal = false
        this.modal_error = null
    }

}
