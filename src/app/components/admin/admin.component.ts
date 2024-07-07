import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { UserResponse } from 'src/app/responses/user/user.response';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  adminComponent: string = 'orders';
  userResponse?:UserResponse | null;

  constructor(
    private userService: UserService,   
    private tokenService: TokenService,
    private router: Router  
  ) {
    
   }

  ngOnInit(): void {
    debugger;
    this.userResponse = this.userService.getUserResponseFromLocalStorage();  
  }

  logout(): void{
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  showAdminComponent(componentName: string): void{
    this.adminComponent = componentName;
  }
}
