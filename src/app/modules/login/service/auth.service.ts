import { Injectable } from "@angular/core";
import { ApiService } from 'src/app/core/services/api.service';
import { Login } from '../models/login';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Token } from '../models/token';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: string;

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(loginInfo: Login) : Observable<Token> {
    return this.apiService.post('/authentication', loginInfo)
      .pipe(
        map(data => {
          this.currentUser = loginInfo.username
          this.jwtService.saveToken(data.token)
          return { token : data.token }
        })
      )
  }

  logout() : void {
      this.jwtService.destroyToken();
      this.currentUser = null;
  }

}
