import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { UserResponse } from '../responses/user/user.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  };

  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService
  ) {}

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }

  getUserDetails(token: string) {
    return this.http.post(this.apiUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
       return; 
      }
      // Convert the user response to a JSON string
      const userResponseJson = JSON.stringify(userResponse);
      // Save the user response to local storage with the key 'user'
      localStorage.setItem('user', userResponseJson);
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }

  getUserResponseToLocalStorage() {
    try {
      // Retrieve the user response from local storage
      const userResponseJson = localStorage.getItem('user');
      // Parse the user response JSON string to a UserResponse object
      if(userResponseJson == null || userResponseJson == undefined) {
        return null;
      }
      const userResponse = JSON.parse(userResponseJson!);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error get user response from local storage:', error);
    }
  }
}
