import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Match } from "../models/match";
import { TokenService } from "../team-service/token.service";

const MY_PLAYERS_LIST = 'my-players-list'

const baseUrl = environment.player_serv_url;

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    // CONSTRUCTOR
    constructor(private http: HttpClient, private tokenService: TokenService) { }

    // LIST
    public getMyPlayers(): Observable<any> {
        return this.http.get(`${environment.player_serv_url}/api/v1/players/`);
    }
}