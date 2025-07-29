import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    private http: HttpClient
  ){}

  triggerSteamSync(steam_id: string | undefined){
    return axios.get(`http://localhost:3000/user-search/games/${steam_id}`);
  }

  loadGameDataFromDB(steam_id: string | undefined, params: any){
    return this.http.get<any>(`http://localhost:3000/user-search/games/${steam_id}/metadata?${params.toString()}`)
  }

  startPolling(steam_id: string | undefined, page: number | undefined, size: number | undefined){
    return this.http.get<any>(`http://localhost:3000/user-search/games/${steam_id}/metadata?page=${page}&size=${size}`)
  }

  fetchGenres(steam_id: string | undefined){
    return this.http.get<any>(`http://localhost:3000/user-search/games/${steam_id}/genres`);
  }
}
