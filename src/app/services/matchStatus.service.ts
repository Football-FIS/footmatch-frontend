import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MatchStatus } from "../models/matchStatus";
import { TokenService } from "../team-service/token.service";

@Injectable({
    providedIn: 'root'
})
export class MatchStatusService {

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

    // LIST CAMBIAR
    public getMatcheStatus(): Observable<any> {
        let url = this.matchUrl + 'list'
        return this.httpClient.get<any>(url)
    }

    // CREATE
    public createMatchStatus(matchStatus: MatchStatus): Observable<any> {
        let url = this.matchUrl
        return this.httpClient.post<any>(url, matchStatus)
    }

    // UPLOAD
    public updateMatchStatus(matchStatus: MatchStatus): Observable<any> {
        let url = this.matchUrl
        return this.httpClient.put<any>(url, matchStatus)
    }

    // DELETE
    public deleteMatchStatus(matchId: string): Observable<any> {
        let url = this.matchUrl + matchId
        return this.httpClient.delete<any>(url)
    }


}
/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  // Obtener un estado
  getStatus(id: number): Observable<any> {
    return this.http.get(API_URL + 'status/' + id);
  }

  // Crear un estado
  createStatus(status: Object): Observable<Object> {
    return this.http.post(API_URL + 'status/', status);
  }

  // Editar un estado
  updateStatus(id: number, value: any): Observable<Object> {
    return this.http.put(API_URL + 'status/' + id, value);
  }

  // Eliminar un estado
  deleteStatus(id: number): Observable<any> {
    return this.http.delete(API_URL + 'status/' + id, { responseType: 'text' });
  }

  // Listar estados
  getStatusesList(): Observable<any> {
    return this.http.get(API_URL + 'status/');
  }
}
*/