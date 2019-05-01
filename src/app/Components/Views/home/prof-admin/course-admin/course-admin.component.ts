import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CourseInfo} from '../../../../../Models/Course/CourseInfo';
import {CourseService} from '../../../../../Services/Courses/course.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {CurrentUserService} from '../../../../../Services/Users/CurrentUser/current-user.service';
import {AnnouncementService} from '../../../../../Services/Announcements/announcement.service';

@Component({
  selector: 'course-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.scss']
})
export class CourseAdminComponent implements OnInit {

  private _courseNumber: number;
  courseInfo: CourseInfo;
  initialized = false;
  updating = false;
  currentUser;
  @ViewChild('annEditor') annEditor: ElementRef;
  annFormGroup: FormGroup;
  annError;
  annSuccess = false;
  annEditorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    placeholder: 'Hello class...',
    translate: 'no',
    uploadUrl: '', // if needed
    customClasses: [ // optional

    ]
  };

  verified = false;
  @Input() set course(c: number) {
    this._courseNumber = c;
    if (this.initialized) {
      this.updateCourse();
    }
  }

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder,
              private currentUserService: CurrentUserService,
              private announcementService: AnnouncementService) { }

  ngOnInit() {
    this.currentUserService.getCurrentUser().then(user => {
      if (!user) {
        console.log('Unable to get user!');
        return;
      }
      this.currentUser = user;
      this.initialized = true;
      this.updateCourse();
    });
    this.annFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  updateCourse() {
    this.updating = true;
    let $this = this;
    this.courseService.getCourseInfoByID(this._courseNumber, this.currentUser.id).then((result) => {
      let $courseInfo = result;
      this.courseService.verifyCourseProfessor(this.currentUser.id, this._courseNumber)
        .subscribe(result => {
          $this.verified = result.verified;
          if (result.verified) {
            $this.courseInfo = $courseInfo;
            $this.updating = false;
          }
        });
    });
  }

  showItem(link, item) {
    $('.view-show').removeClass('view-show');
    $(item).addClass('view-show');
    $(link).parent().find('.active').removeClass('active');
    $(link).addClass('active');
  }

  makeAnnouncement() {
    if (this.annFormGroup.invalid) {
      if (this.annFormGroup.controls.title.errors.required) {
        this.annError = 'Please provide a title for your announcement'
      }
    } else {
      const title = this.annFormGroup.value.title,
        body = this.annFormGroup.value.body,
        course_term = this.courseInfo.semester + this.courseInfo.year;
      let $this = this;
      this.announcementService.makeAnnouncement(this.currentUser.id, this.courseInfo.id, title, body, course_term).subscribe(result => {
        if (result.error == undefined || result.error) {
          switch(result.error) {
            case 1:
              $this.annError = 'Invalid form submission!  Please try again later';
              break;
            case 2:
              $this.annError = 'Unable to submit! You are not a professor of this class!';
              break;
            case 3:
              $this.annError = 'We are currently having trouble with our database, please try again later';
              break;
            default:
              $this.annError = 'We are having technical difficulties, please try again later';
              break;
          }
        } else {
          $this.annSuccess = true;
          $this.annError = 'Announcement posted!';
        }
      });
    }
  }

}
