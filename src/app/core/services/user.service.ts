import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(
    private http: HttpClient
  ){}

  updateDescription(description: string) {
    return this.http.post<any>(`http://localhost:3000/users/update-description`, {
      description
    });
  }

  getUser(id: string){
    return this.http.get<any>(`http://localhost:3000/users/find/${id}`)
      .pipe(
        map(
          res => {
            return res
          }
        )
      );
  }
}
