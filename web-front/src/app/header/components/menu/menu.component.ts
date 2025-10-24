import {Component, OnInit} from '@angular/core';
import {MenuItem} from '../../models/menu-item.model';

@Component({
  selector: 'tm-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  public static HOME = new MenuItem(1, 'Home', '/home', 'fa-home');
  public static CREATE_TASK = new MenuItem(2, 'Create task', '/tasks/new', 'fa-plus');

  public menuItems: Array<MenuItem> = [];

  public ngOnInit(): void {
    this.menuItems.push(MenuComponent.HOME);
    this.menuItems.push(MenuComponent.CREATE_TASK);
  }

}
