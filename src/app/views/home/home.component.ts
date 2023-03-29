import { Component } from '@angular/core';
import { GROUPS } from 'src/app/shared-data/fake-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  groups = GROUPS;

}
