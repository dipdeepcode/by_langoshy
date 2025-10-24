import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../auth/services/auth.service';
import {baseUri} from '../../../app.config';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'tm-logout',
  standalone: false,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(private http: HttpClient, private user: AuthService) {
  }

  logout() {
    lastValueFrom(
      this.http.post('/bff/logout', null, {
        headers: {
          'X-POST-LOGOUT-SUCCESS-URI': baseUri,
        },
        observe: 'response',
      })
    )
      .then((resp) => {
        const logoutUri = resp.headers.get('Location');
        if (!!logoutUri) {
          window.location.href = logoutUri;
        }
      })
      .finally(() => {
        this.user.refresh();
      });
  }

}
