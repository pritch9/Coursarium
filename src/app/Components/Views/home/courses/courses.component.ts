import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss',
              '../dashboard/dashboard.component.scss']
})
export class CoursesComponent implements OnInit {

  course = {
    course_id: 1,
    school_id: 1,
    term: 'Spring',
    year: 2019,
    course_subject: 'CSE',
    course_number: 442,
    course_name: 'Software Engineering',
    course_description: 'blah blah blah blah blah',
    seats_available: 1,
    professor: {
        user_id: 1,
        first_name: 'Will',
        last_name: 'Pritchard'
    }
  };
  course1 = {
    course_id: 2,
    school_id: 1,
    term: 'Spring',
    year: 2019,
    course_subject: 'CRJ',
    course_number: 234,
    course_name: 'Criminology for CRJ',
    course_description: 'blah blah blah blah blah',
    seats_available: 1,
    professor: {
      user_id: 1,
      first_name: 'Leena',
      last_name: 'Marren'
    }
  };
  courses = [];

  constructor() { }

  ngOnInit() {

  }

  activate($event) {
    const target = $($event.target).closest('.course');
    $(target).addClass('active');
  }

  deactivate(item) {
    $(item).removeClass('active');
  }

}
