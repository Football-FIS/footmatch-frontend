import { Component, OnInit } from '@angular/core';
import { TokenService } from '../team-service/token.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private tokenService: TokenService) { 
  }

  ngOnInit(): void {
  }

  public getUsername() {
    return this.tokenService.getUsername()
  }

  public logout(){
    this.tokenService.logOut()
  }

}
