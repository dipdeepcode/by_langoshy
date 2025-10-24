import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

interface UserinfoDto {
  username: string;
  email: string;
  roles: string[];
  exp: number;
}

export class Userinfo {
  static readonly ANONYMOUS = new Userinfo('', '', []);

  constructor(readonly name: string,
              readonly email: string,
              readonly roles: string[]) {
  }

  get isAuthenticated(): boolean {
    return !!this.name;
  }

  hasAnyRole(...roles: string[]): boolean {
    for (const r of roles) {
      if (this.roles.includes(r)) {
        return true;
      }
    }
    return false;
  }
}

@Injectable()
export class AuthService {
  private user$ = new BehaviorSubject<Userinfo>(Userinfo.ANONYMOUS);
  private refreshSub?: Subscription;

  constructor(private http: HttpClient) {
    this.refresh();
  }

  refresh(): void {
    this.refreshSub?.unsubscribe();
    this.http.get('/bff/resource-server/api/me').subscribe({
      next: (dto: any) => {
        const user = dto as UserinfoDto;
        if (
          user.username !== this.user$.value.name ||
          user.email !== this.user$.value.email ||
          (user.roles || []).toString() !== this.user$.value.roles.toString()
        ) {
          this.user$.next(
            user.username
              ? new Userinfo(
                user.username || '',
                user.email || '',
                user.roles || []
              )
              : Userinfo.ANONYMOUS
          );
        }
        if (user.exp > 0 && user.exp < Number.MAX_SAFE_INTEGER / 1000) {
          const now = Date.now();
          const expMs = user.exp * 1000; // Convert expiration time to milliseconds safely

          if (expMs > now) { // Ensure expiration is in the future
            const delay = (expMs - now) * 0.8;

            if (delay > 2000 && delay < Number.MAX_SAFE_INTEGER) {
              this.refreshSub = interval(delay).subscribe(() => this.refresh());
            }
          }
        }
      },
      error: (error) => {
        console.warn(error);
        this.user$.next(Userinfo.ANONYMOUS);
      },
    });
  }

  get valueChanges(): Observable<Userinfo> {
    return this.user$;
  }

  get userinfo(): Userinfo {
    return this.user$.value;
  }

}
