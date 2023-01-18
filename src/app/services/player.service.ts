import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Player } from "../models/player";
import { TokenService } from "../team-service/token.service";

const MY_PLAYERS_LIST = 'my-players-list'

const baseUrl = environment.player_serv_url;

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    /** Constructor */
    constructor(private http: HttpClient, private tokenService: TokenService) { }

    /** Get my list of players */
    public getMyPlayers(): Observable<any> {
        return this.http.get(`${environment.player_serv_url}/api/v1/players/`);
    }

    /** Create a player */
    public createPlayer(player: Player): Observable<any> {
        return this.http.post<Player>(`${environment.player_serv_url}/api/v1/player/`, player);
    }

    /** Delete a player */
    public deletePlayer(player: Player): Observable<any> {
        return this.http.delete(`${environment.player_serv_url}/api/v1/player/${player._id}`);
    }

    /** Delete a player */
    public updatePlayer(player: Player): Observable<any> {
        return this.http.put<Player>(`${environment.player_serv_url}/api/v1/player/${player._id}`, player);
    }
}