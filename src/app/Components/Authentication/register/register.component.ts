import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SplashService} from '../../splash/Service/splash.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'account-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFG: FormGroup;
  submitted = false;
  school: number;
  private sub: any;
  @ViewChild('schoolFinder') schoolFinder: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private splashService: SplashService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.school = +params.school; // (+) converts string 'school' to number
    });
    this.registerFG = this.formBuilder.group({
      school: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  exit() {

  }

  updateSchool($event) {
    this.school = $event;
  }

  register(): void {

  }

}
