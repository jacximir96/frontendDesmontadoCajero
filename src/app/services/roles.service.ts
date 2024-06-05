import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private currentUser: any = {user:"Usuario",role:"admin"};

  constructor() { }


  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getUserRole(): string {
    return this.currentUser ? this.currentUser.role : '';
  }
}
