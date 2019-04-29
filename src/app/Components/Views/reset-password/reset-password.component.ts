import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserInfo} from '../../../Models/User/userinfo';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../Services/Users/UserService/user.service';
import * as $ from 'jquery';
import {ResetPasswordGuardService} from '../../../Services/Authentication/ResetPasswordGuard/reset-password-guard.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: [
    './reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  user: UserInfo;
  formGroup: FormGroup;
  hash;
  error: string;
  success: string;
  @ViewChild('np') newPasswordRef: ElementRef;
  @ViewChild('cf') confirmRef: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
              private rpService: ResetPasswordGuardService) {
  }



  ngOnInit() {
    this.hash = this.route.snapshot.params.hash;
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(
        '(?=^.{8,100}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;\'?/>.<,])(?!.*\\s).*$')]],
      confirm: ['', Validators.required]
    });
    this.userService.getUserInfo(this.route.snapshot.params.user_id).then(result => {
      this.user = result;
    }).catch(err => { console.log(err); });
  }

  removeInvalid($this) {
    $($this).removeClass('invalid');
  }

  submit() {
    if (this.formGroup.invalid) {
      // Error
      if (this.formGroup.controls.password.errors.required) {
        $(this.newPasswordRef.nativeElement).addClass('invalid');
        this.error = 'Please enter a new password';
      } else if (this.formGroup.controls.password.errors.pattern) {
        $(this.newPasswordRef.nativeElement).addClass('invalid');
        this.error = 'Password must consist of upper and lower case letters, a number, and a special character';
      } else if (this.formGroup.controls.confirm.errors.required) {
        $(this.confirmRef.nativeElement).addClass('invalid');
        this.error = 'Please confirm your password';
      }
    } else {
      // Submit
      const password = this.formGroup.value.password,
        confirm = this.formGroup.value.confirm;
      if (password != confirm) {
        this.error = 'Passwords do not match!';
        $(this.confirmRef.nativeElement).addClass('invalid');
        return;
      }
      // Passwords match
      this.rpService.resetPassword(this.user.id, this.hash, password).then(result => {
        if (result.error) {
          delete this.success;
          switch(result.error) {
            case 1:
              this.error = 'Verification information not found!  Please try again later';
              break;
            case 2:
              $(this.newPasswordRef.nativeElement).addClass('invalid');
              this.error = 'Password must consist of upper and lower case letters, a number, and a special character.';
              break;
            case 3:
              this.error = 'Server error occured. We are working on it, please try again later.';
              break;
            default:
              this.error = 'Unknown error!  We take these very seriously.  Thank you for your patience.';
              break;
          }
          return;
        }
        this.success = 'Password reset!';
        $(this.confirmRef.nativeElement).attr('disabled', 'disabled');
        $(this.newPasswordRef.nativeElement).attr('disabled', 'disabled');
      }).catch(() => {
        console.log('Unable to save password!');
      });
    }
  }


}
