import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faPeopleGroup, faPlus, faSearch, faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [FontAwesomeModule, RouterModule]
})
export class NavbarComponent {
  home = faHome;
  table = faTable;
  group = faPeopleGroup;
  search = faSearch;
  plus = faPlus;
}
