import {Component} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {AuthService} from '../../../auth/services/auth.service';
import {baseUri} from '../../../app.config';

interface LoginOptionDto {
  label: string;
  loginUri: string;
  isSameAuthority: boolean;
}

// function loginOptions(http: HttpClient): Observable<Array<LoginOptionDto>> {
//   return http
//     .get('/bff/login-options')
//     .pipe(map((dto: any) => dto as LoginOptionDto[]));
// }

@Component({
  selector: 'tm-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoginModalDisplayed = false;
  isSameAuthority = false;
  iframeSrc?: SafeUrl;
  private loginUri?: string;

  constructor(http: HttpClient,
              private authService: AuthService,
              private router: Router,
              private sanitizer: DomSanitizer) {

    http
      .get('/bff/login-options')
      .pipe(
        map((dto: any) => dto as LoginOptionDto[])
      )
      .subscribe((opts) => {
        if (opts.length) {
          this.loginUri = opts[0].loginUri;
          this.isSameAuthority = opts[0].isSameAuthority;
        }
      });

    // loginOptions(http).subscribe((opts) => {
    //   if (opts.length) {
    //     this.loginUri = opts[0].loginUri;
    //     this.isSameAuthority = opts[0].isSameAuthority;
    //   }
    // });
  }

  get isLoginEnabled(): boolean {
    return (
      !!this.loginUri && !this.authService.userinfo.isAuthenticated
    );
  }

  get isAuthenticated(): boolean {
    return this.authService.userinfo.isAuthenticated;
  }

  login() {
    if (!this.loginUri) {
      return;
    }

    const url = new URL(this.loginUri);
    url.searchParams.append(
      'post_login_success_uri',
      `${baseUri}${this.router.url}`
    );
    url.searchParams.append(
      'post_login_failure_uri',
      `${baseUri}/login-error`
    );
    const loginUrl = url.toString();

    if (this.isSameAuthority) {
      this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(loginUrl);
      this.isLoginModalDisplayed = true;
    } else {
      window.location.href = loginUrl;
    }
  }

  onIframeLoad(event: any) {
    if (!!event.currentTarget.src) {
      this.authService.refresh();
      this.isLoginModalDisplayed = !this.authService.userinfo.isAuthenticated;
    }
  }

}
