import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import axios from 'axios';
import MetaData from '../interfaces/metadata.interface';

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

  startPolling(steam_id: string, page: number | undefined, size: number | undefined){
    return this.http.get<any>(`http://localhost:3000/user-search/games/${steam_id}/metadata?page=${page}&size=${size}`)
  }

  fetchGenres(steam_id: string | undefined){
    return this.http.get<any>(`http://localhost:3000/user-search/games/${steam_id}/genres`);
  }

  fetchRecommended(steamid: string, amount: number = 10) {
    return this.http.get<any>(`http://localhost:3000/user-search/games/${steamid}/recommended`, {
      params: {
        amount: amount
      }
    }).pipe(
      map(
        res => res
      )
    );
  }

  searchGames(steamid: string | undefined, search: string, page: number, size: number){
    return this.http.get<any>(`http://localhost:3000/user-search/games/${steamid}/search`, {
      params: {
        search,
        page,
        size
      }
    }).pipe(
      map(res => {
        return res
      })
    );
  }

  getGameMetadata(appid: string | null, steamid?: string){
    return this.http.get<{ metadata: MetaData, userData: any}>(`http://localhost:3000/user-search/game/${appid}`,
      {
        params: {
          steamid: steamid ?? ''
        }
      }
    )
      .pipe(
        map(res => {
          return res
        })
      );
  }

  markCompleted(appid: number){
    return this.http.post(`http://localhost:3000/game-status/completed`, {
      appid: appid
    });
  }

  markNotCompleted(appid: number){
    return this.http.post(`http://localhost:3000/game-status/not-completed`, {
      appid: appid
    });
  }
}
