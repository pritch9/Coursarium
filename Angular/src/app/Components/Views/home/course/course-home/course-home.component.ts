import {Component, OnInit} from '@angular/core';
import {CourseComponentService} from '../CourseService/course-component.service';
import {CourseService} from '../../../../../Services/Courses/course.service';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
})
export class CourseHomeComponent implements OnInit {

  constructor(private courseCompService: CourseComponentService,
              private courseService: CourseService) { }

  course: any;
  faculty: Faculty[];
  enrolled = false;


  assignments = [
    {
      name: 'Upcoming',
      initial_expand: false,
      incomplete: 0,
      items: [
        {
          id: 5,
          name: 'Assignment #5',
          complete: true
        },
        {
          id: 4,
          name: 'Assignment #4',
          complete: true
        }
      ]
    },
    {
      name: 'Due Today',
      initial_expand: true,
      incomplete: 1,
      items: [
        {
          id: 3,
          name: 'Assignment #3',
          complete: false
        }
      ]
    },
    {
      name: 'Past Due',
      initial_expand: false,
      incomplete: 2,
      items: [
        {
          id: 2,
          name: 'Assignment #2',
          complete: false
        },
        {
          id: 1,
          name: 'Assignment #1',
          complete: false
        }
      ]
    }
  ];

  ngOnInit() {
    this.courseCompService.getCourse().then(result => {
      this.course = result;
      this.enrolled = result.course_role != undefined;
      this.courseService.getFacultyByCourseID(this.course.id).then(faculty => {
        this.faculty = faculty;
        console.log(JSON.stringify(faculty));
      });
    });
  }

  toggleCollapsible($event) {
    const collapsible = $($event.target).closest('.collapsible');
    const collapse = $(collapsible).hasClass('expand');
    if (collapse) {
      $(collapsible).removeClass('expand');
      $(collapsible).find('.list').slideUp('fast');
    } else {
      $(collapsible).addClass('expand');
      $(collapsible).find('.list').slideDown('fast');
    }
  }

  expand(element) {
    setTimeout(() => {
      $(element).find('.list').slideDown('fast');
    }, 50);
  }

  activate($event) {
    const target = $($event.target).closest('.profile');
    $(target).addClass('open-menu');
  }

  deactivate(item) {
    $(item).removeClass('open-menu');
  }

}

class Faculty {
  first_name: string;
  last_name: string;
  avi: string;
  role: string;
}
