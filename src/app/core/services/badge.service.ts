import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Badge } from '../interfaces/badge.interface';
import { map } from 'rxjs';

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

  getUserBadges(id: number){
    return this.http.get<Badge[]>(`http://localhost:3000/badges/user/${id}`);
  }
}
