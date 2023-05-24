import { Component } from '@angular/core';
import { GROUPS, STUDENTS_DATA } from 'src/app/shared-data/fake-data';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
  imports: [
    RouterModule,
    FontAwesomeModule,
    DatePipe
  ]
})
export class StudentsTableComponent {

  students = STUDENTS_DATA;
  search = faSearch;
  groups = GROUPS;

  groupById(id: number) {
    return this.groups.find(g => g.id == id);
  }

}
