import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Match } from "../models/match";
import { TokenService } from "../team-service/token.service";

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    // URL
    matchUrl = environment.match_serv_url + '/api/v1/match/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

    /*
    *
    * OPERATIONS ACTIVES
    * 
    */

    // GET
    public getMatchById(matchId: string): Observable<any> {
        let url = this.matchUrl + matchId
        return this.httpClient.get<any>(url)
    }

    // LIST
    public getMyMatches(): Observable<any> {
        let url = this.matchUrl + 'list'
        return this.httpClient.get<any>(url)
    }

    // CREATE
    public createMatch(match: Match): Observable<any> {
        let url = this.matchUrl
        return this.httpClient.post<any>(url, match)
    }

    // UPLOAD
    public updateMatch(match: Match): Observable<any> {
        let url = this.matchUrl
        return this.httpClient.put<any>(url, match)
    }

    // DELETE
    public deleteMatch(matchId: string): Observable<any> {
        let url = this.matchUrl + matchId
        return this.httpClient.delete<any>(url)
    }


}