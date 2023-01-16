import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Match } from "../models/match";
import { TokenService } from "../team-service/token.service";

const MY_MATCHES_LIST = 'MyMatchesList'

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
    public getMatchByUrl(url: string): Observable<any> {
        let url2 = this.matchUrl + 'url/' + url
        return this.httpClient.get<any>(url2)
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

    /*
    *
    * LOCALSTORAGE CACHE
    * 
    */

    public getMyMatchesInCache(): Array<Match> {
        let a = localStorage.getItem(MY_MATCHES_LIST)
        if(a!=null) {
            return JSON.parse(a)
        }
        return []
    }

    public setMyMatchesInCache(myMatches: Array<Match>): void {
        localStorage.setItem(MY_MATCHES_LIST, JSON.stringify(myMatches))
    }


}