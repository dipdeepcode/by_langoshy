import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'tm-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public userName = '';/*StringUtils.EMPTY;*/

  constructor(/*private authService: AuthService,*/
              private router: Router,
              /*private logger: NGXLogger*/) {
  }

  public ngOnInit(): void {
    this.userName = 'this.userName';/*this.authService.getUser().username;*/
  }

  public logout(): void {
    /*this.authService.logOut();*/
    // this.router.navigate(['/login']).catch(reason => {
    //   console.error(reason);
    // });
  }

}
