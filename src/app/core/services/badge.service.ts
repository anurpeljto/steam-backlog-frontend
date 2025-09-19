import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Badge } from '../interfaces/badge.interface';
import { map } from 'rxjs';
import { ResponseTypes } from '../enums/response-types.enum';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(
    private http: HttpClient
  ){}

  getAllBadges() {
    return this.http.get<Badge[]>(`http://localhost:3000/badges/all`);
  }

  getBadgeById(id: number) {
    return this.http.get<Badge>(`http://localhost:3000/badges/${id}`);
  }

  createBadge(badge: Badge) {
    return this.http.post<Badge>(`http://localhost:3000/badges/create`, badge);
  }

  deleteBadge(id: number) {
    return this.http.delete<Badge>(`http://localhost:3000/badges/${id}`);
  }

  getUserBadges(id: string){
    return this.http.get<Badge[]>(`http://localhost:3000/badges/user/${id}`);
  }

  getUserStreak(id: string){
    return this.http.get<any>(`http://localhost:3000/badges/streak/${id}`);
  }

  updateStreakProgress(id: string, response: ResponseTypes){
    return this.http
      .post(`http://localhost:3000/badges/progress/${id}`, {
        response
      });
  }

  selectStreakGame(id: number, appid: number, grace?: boolean) {
    return this.http
      .post(`http://localhost:3000/badges/streak/select/${id}`,
        {
          appid,
          grace
        }
      );
  }

  getProgressToNextBadge(steam_id: string){
    return this.http
      .get<any>(`http://localhost:3000/badges/streak/next-badge/${steam_id}`);
  }

  markGameSelected(steam_id: string, appid: number, grace?: boolean){
    return this.http
      .post<any>(`http://localhost:3000/badges/streak/select/${steam_id}`, {
        appid,
        grace
      });
  }

  getLeaderboards(page: number){
    return this.http
      .get<any>(`http://localhost:3000/badges/leaderboards`, {
        params: {
          page
        }
      });
  }
}
