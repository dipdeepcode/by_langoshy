import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, Userinfo} from '../auth/services/auth.service';

@Component({
  selector: 'tm-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public userName = '';/*StringUtils.EMPTY;*/

  constructor(private authService: AuthService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.userName = 'this.userName';/*this.authService.getUser().username;*/
  }

  get isAuthenticated(): boolean {
    return this.authService.current.isAuthenticated;
  }

}
