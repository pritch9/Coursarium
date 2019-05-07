import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../../Services/Courses/course.service';
import {CurrentUserService} from '../../../../Services/Users/CurrentUser/current-user.service';
import {UserInfo} from '../../../../Models/User/userinfo';

@Component({
  selector: 'app-prof-admin',
  templateUrl: './prof-admin.component.html',
  styleUrls: ['./prof-admin.component.scss']
})
export class ProfAdminComponent implements OnInit {

  @ViewChild('drop') drop: ElementRef;
  dropped = false;
  courses = [];
  currentCourse: number;
  selected = false;
  user: UserInfo;

  constructor(private route: ActivatedRoute,
              private courseService: CourseService,
              private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.currentUserService.getCurrentUser().then(user => {
      this.courseService.getCoursesOfProfessor(user.id).subscribe(result => {
        // Assume courses are existant
        for (let course of result) {
          course.selected = false;
          this.courses.push(course);
        }
        this.route.params.subscribe(params => {
          const course = +params.course_id;
          if (!isNaN(course)) {
            const course_obj = this.courses.find(x => x.course_id === course);
            if (course_obj) {
              this.currentCourse = course_obj.course_id;
              this.selected = true;
              course_obj.selected = true;
              setTimeout(() => {
                $('.selected').remove().prependTo(this.drop.nativeElement);
              });
            }
          }
        });
      });
    });
  }

  showDrop() {
    if (!this.dropped) {
      $(this.drop.nativeElement).addClass('open');
      var height = $(this.drop.nativeElement).children().length * 50;
      $(this.drop.nativeElement).animate({'height': height + 'px'}, 200, 'easeInOutCubic', () => {
        this.dropped = true;
      });
    }
  }

  hideDrop() {
    if (this.dropped) {
      $(this.drop.nativeElement).animate({'height': '50px'}, 200, 'easeInOutCubic', () => {
        this.dropped = false;
      });
      $(this.drop.nativeElement).removeClass('open');
    }
  }

  setSelected($event, item, course) {
    if (this.dropped) {
      $event.preventDefault();
      this.selected = true;
      $('.selected').removeClass('selected');
      $(item).addClass('selected');
      $(item).remove();
      $(this.drop.nativeElement).prepend(item);
      this.currentCourse = course.course_id;
      window.history.replaceState({}, '',`/profadmin/${this.currentCourse}`);
      setTimeout(() => {
        this.hideDrop();
      });
    }
  }


}
