import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {MenuComponent} from './components/menu/menu.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AuthModule} from '../auth/auth.module';


@NgModule({
  declarations: [
    HeaderComponent,
    MenuItemComponent,
    MenuComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
