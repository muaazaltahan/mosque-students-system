import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { COURSES, GROUPS } from '../shared-data/fake-data';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  getCourses(mosqueId: number | string) {
    return of(COURSES);
  }

  getGroups(courseId: number | string) {
    return of(GROUPS);
  }

}
