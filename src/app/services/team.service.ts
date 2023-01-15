import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Team } from "../models/team";
import { TokenService } from "../team-service/token.service";

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    // URL
    teamUrl = environment.team_serv_url + '/api/v1/team/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

    /*
    *
    * OPERATIONS ACTIVES
    * 
    */

    // GET
    public getTeamById(teamId: string): Observable<any> {
        let url = this.teamUrl + teamId;
        return this.httpClient.get<any>(url)
    }

    // CREATE
    public createTeam(team: Team): Observable<any> {
        let url = this.teamUrl
        return this.httpClient.post<any>(url, team)
    }

    // UPDATE
    public updateTeam(team: Team, id: string): Observable<any> {
        let url = this.teamUrl + id + '/'
        return this.httpClient.put<any>(url, team)
    }

    // DELETE
    public deleteTeam(teamId: string): Observable<any> {
        let url = this.teamUrl + teamId
        return this.httpClient.delete<any>(url)
    }


}