import { animate, state, style, transition, trigger } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddressService } from '../services/address.service';
import { AuthService } from '../services/auth.service';
import { PMsgServiceService } from '../services/p-msg-service.service';
import { TestService } from '../services/test.service';
import { UserService } from '../services/user.service';
import { minValidator, numberValidator, stringValidator } from '../validators/globalValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        transform: 'translateX(-100%)',
      })),
      state('close', style({
        transform: 'translateX(0%)',
      })),
      transition('* <=> *', [
        animate('250ms ease-in-out'),
      ])
    ]),
    trigger('hidden', [
      // ...
      state('hide', style({
        visibility: 'hidden',
      })),
      transition('* <=> *', [
        animate('250ms ease-in-out'),
      ])
    ]),
  ],

})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public errMessage: boolean;
  public display: boolean;
  public stateRegister: any[];
  public state = false;

  public gender: any[];
  public province: any[];
  public district: any[] = [];

  @ViewChildren('otpInput') otpInput: QueryList<any>;
  constructor(private fb: FormBuilder, private authService: AuthService,
    private route: Router, private testService: TestService, private addressService: AddressService, private userService: UserService
    , private ngxSpinnerService: NgxSpinnerService, private pMessageService: PMsgServiceService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, stringValidator()]],
      lastname: ['', [Validators.required, stringValidator()]],
      genderForm: ['', [Validators.required]],
      phone: ['', [Validators.required, numberValidator(), minValidator(10)]],
      role: [''],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      village: ['', [Validators.required, stringValidator()]],
      province: ['', [Validators.required]],
      district: ['', [Validators.required]],
      verifyCode: [''],
    });
  }
  /* login */
  get username() {
    return this.loginForm.get('username')?.value;
  }

  get password() {
    return this.loginForm.get('password')?.value;
  }

  /* register */
  get rgUsername() {
    return this.registerForm.get('username');
  }
  get rgFirstname() {
    return this.registerForm.get('firstname');
  }
  get rgLastname() {
    return this.registerForm.get('lastname');
  }
  get rgPassword() {
    return this.registerForm.get('password');
  }

  get rgProvince() {
    return this.registerForm.get('province');
  }

  get rgDistrict() {
    return this.registerForm.get('district');
  }

  get rgVillage() {
    return this.registerForm.get('village');
  }

  get rgPhone() {
    return this.registerForm.get('phone');
  }

  get rgGender() {
    return this.registerForm.get('genderForm');
  }

  ngOnInit(): void {
    this.addressService.getProvince().subscribe((data: any) => {
      const result = data.provinces.map((value: any) => {
        return {
          name: value.name,
          code: value.id,
        }
      })
      this.province = result;
    })
    this.gender = [
      { name: 'ຍິງ', code: 'm' },
      { name: 'ຊາຍ', code: 'f' },
    ]
    this.stateRegister = [
      { state: 'register', active: true },
      { state: 'otp', active: false },
    ]
  }
  submitForm() {
    this.ngxSpinnerService.show();
    this.authService.makeCredentials(this.username, this.password).subscribe({
      next: ({ accessToken, roles, restaurantId, firstname, expiresIn,...data}) => {
        this.authService.setRestaurantId(restaurantId);
        this.authService.setLSAuth(accessToken);
        this.authService.setFirstname(firstname);
        this.authService.setLSexpiredDate(expiresIn);
      },
      error: (data) => {
        this.ngxSpinnerService.hide();
        this.loginForm.get('username')?.markAsDirty();
        this.loginForm.get('password')?.markAsDirty();
        this.errMessage = true;
      },
      complete: () => {
        this.ngxSpinnerService.hide();
        this.errMessage = false;
        this.route.navigate(['/']);
      },
    });
  }

  showRegisterDialog() {
    this.display = true;
  }

  register() {
    if (this.state) {
      this.ngxSpinnerService.show();
      const filterOtp = this.otpInput.filter((ef: ElementRef) => ef.nativeElement.value);
      if (filterOtp.length > 0) {
        let otpResult = '';
        this.otpInput.map((ef: ElementRef) => {
          otpResult += ef.nativeElement.value;
        });
        this.userService.register({
          firstname: this.rgFirstname?.value,
          lastname: this.rgLastname?.value,
          roles: [4, 5],
          districtId: this.rgDistrict?.value,
          village: this.rgVillage?.value,
          provinceId: this.rgProvince?.value,
          gender: this.rgGender?.value,
          username: this.rgUsername?.value,
          password: this.rgPassword?.value,
          phone: '+856' + this.rgPhone?.value,
          verifyCode: otpResult
          ,
        }).subscribe({
          error: (data) => {
            console.log(data);
            this.ngxSpinnerService.hide();
            this.pMessageService.defaultError();
          },
          complete: () => {
            this.ngxSpinnerService.hide();
            this.pMessageService.registerSuccess();
            this.display = false;
          }
        })
      }
    } else {
      const formControlsLength = Object.keys(this.registerForm.controls);
      formControlsLength.map((data: any) => {
        this.registerForm.controls[data].markAsDirty();
      });
      if (this.registerForm.valid) {
        this.userService.otp({
          phone: '+856' + this.rgPhone?.value,
        }).subscribe();
        this.state = true;
      }
    }
  }

  activeProvince(data: any) {
    this.addressService.getDistrict(data.value).subscribe((data: any) => {
      this.district = data.districts.map((value: any) => {
        return {
          name: value.name,
          code: value.id,
        }
      })
    })
  }

  backState() {
    this.state = false;
  }

  otpKeypress(e: KeyboardEvent, index: number) {
    if (/[0-9]{1}/.test(e.key)) {
      if (this.otpInput.get(5).nativeElement === document.activeElement) {
        this.otpInput.get(0).nativeElement.focus();
      } else {
        this.otpInput.get(index + 1).nativeElement.focus();
      }
      this.otpInput.get(index).nativeElement.value = e.key;
    } else {
      this.otpInput.get(index).nativeElement.value = 0;
    }

  }

  registerDialogHide() {
    this.registerForm.reset();
    this.state = false;
  }
  closeRegister() {
    this.display = false;
  }
}

