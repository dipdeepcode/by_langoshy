import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';

@Component({
  selector: 'tm-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public userName: string | undefined;

  constructor(private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.userName = this.authService.userinfo.name;
  }

  get isAuthenticated(): boolean {
    return this.authService.userinfo.isAuthenticated;
  }

}
