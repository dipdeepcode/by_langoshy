import {Component, Input} from '@angular/core';
import {MenuItem} from '../../models/menu-item.model';

@Component({
  selector: 'tm-menu-item',
  standalone: false,
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {

  @Input()
  public item?: MenuItem;

}
