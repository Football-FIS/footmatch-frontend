import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MatchStatus } from "../models/matchStatus";
import { TokenService } from "../team-service/token.service";
import { FormControl, FormGroup } from '@angular/forms';
import { Match } from "../models/match";
const SELECTED_MATCH = 'SelectedMatch'
const MATCH_STATUS_LIST = 'MatchStatusList'
@Injectable({
    providedIn: 'root'
})
export class MatchStatusService {
    // URL
    matchStatusUrl = environment.match_status_serv_url + '/api/v1/match_status/'
    // CONSTRUCTOR
    constructor(private httpClient: HttpClient, private tokenService: TokenService) { }
    /*
    *
    * OPERATIONS ACTIVES
    * 
    */
    // GET
    public getMatchStatusById(matchStatusId: string): Observable<any> {
        let url = this.matchStatusUrl + matchStatusId
        return this.httpClient.get<any>(url)
    }
    // GET By MATCHID 
    public getMatchStatusByMatchId(matchId: string): Observable<any> {
        let url = this.matchStatusUrl + 'matchid/' + matchId
        return this.httpClient.get<any>(url)
    }
    // CREATE
    public createMatchStatus(matchStatus: MatchStatus): Observable<any> {
        let url = this.matchStatusUrl
        return this.httpClient.post<any>(url, matchStatus)
    }
    // POST TEMPORAL
    public postMatchStatus(form:FormGroup): Observable<any> {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer test'
        })
      };
      let url = this.matchStatusUrl
      return this.httpClient.post<any>(url, form.value, httpOptions)
  }
    // UPLOAD
    public updateMatchStatus(matchStatus: MatchStatus): Observable<any> {
        let url = this.matchStatusUrl
        return this.httpClient.put<any>(url, matchStatus)
    }
    // DELETE
    public deleteMatchStatus(matchStatusId: string): Observable<any> {
        let url = this.matchStatusUrl + matchStatusId
        return this.httpClient.delete<any>(url)
    }
    /*
    *
    * LOCALSTORAGE CACHE
    * 
    */
    public getMatchStatusInCache(matchUrl: any): Array<MatchStatus> {
        let ls = localStorage.getItem(MATCH_STATUS_LIST)
        let m = localStorage.getItem(SELECTED_MATCH)
        if(ls!=null && m==matchUrl) {
            return JSON.parse(ls)
        }
        return []
    }
    public setMatchStatusesInCache(matchUrl: any, myMatches: Array<MatchStatus>): void {
        localStorage.setItem(SELECTED_MATCH, matchUrl)
        localStorage.setItem(MATCH_STATUS_LIST, JSON.stringify(myMatches))
    }
}