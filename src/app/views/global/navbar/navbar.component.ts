import { Component } from '@angular/core';
import { faHome, faPeopleGroup, faPlus, faSearch, faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  home = faHome;
  table = faTable;
  search = faSearch;
  group = faPeopleGroup;
  plus = faPlus;
}
