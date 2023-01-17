import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PMsgServiceService } from '../services/p-msg-service.service';
import { ResourcesService } from '../services/resources.service';
import { UserService } from '../services/user.service';
import { confirmPassword } from '../validators/globalValidators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  public userData = new Subject();
  public data$ = this.userData.asObservable();
  public roles: any[] = [];
  public rf: FormGroup;
  constructor(public rs: ResourcesService, private fb: FormBuilder, private userService: UserService, private ngxSpinner: NgxSpinnerService, private pmessage: PMsgServiceService) {
    this.ngxSpinner.show();
    this.rf = this.fb.group({
      password: ['', Validators.required],
      cPassword: [''],
    }, { validators: confirmPassword })
    this.rs.getData().subscribe({
      next: (d: any) => {
        this.userData.next(d);
        const uiRoles = (d.roles as []).map(role => {
          const r = Math.floor(Math.random() * 255);
          const g = Math.floor(Math.random() * 255);
          const b = Math.floor(Math.random() * 255);
          return {
            name: role,
            color: {
              r,
              g,
              b
            }
          }
        })
        this.roles = uiRoles;
      },
      complete: () => {
        this.ngxSpinner.hide();
      }
    })
  }
  get password() {
    return this.rf.get('password');
  }
  get cPassword() {
    return this.rf.get('cPassword');
  }
  ngOnInit(): void {
  }
  resetPassword() {
    this.password?.markAsDirty();
    this.cPassword?.markAsDirty();
    if (this.rf.valid) {
      this.ngxSpinner.show()
      this.rs.getData().subscribe((user: any) => {
        this.userService.resetPassword({
          userId: user.id,
          username: user.username,
          password: this.password?.value,
        }).subscribe({
          next: (ata) => {
          },
          complete: () => {
            this.ngxSpinner.hide();
            this.pmessage.customMessageSuccess('ການປ່ຽນລະຫັດຜ່ານສຳເລັດ')
            this.rf.reset();
          },
          error: (data) => {
          }
        })
      })
    }
  }
}
