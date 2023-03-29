import { Component } from '@angular/core';
import { GROUPS, STUDENTS_DATA } from 'src/app/shared-data/fake-data';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {

  students = STUDENTS_DATA;
  search = faSearch;
  groups = GROUPS;

  groupById(id: number) {
    return this.groups.find(g => g.id == id);
  }

}
