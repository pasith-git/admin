import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserDto } from 'src/app/dto/user.dto';
import { colProfile, colUser, GenUser, Profile, User } from 'src/app/models/user.model';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { UserService } from 'src/app/services/user.service';
import { UtilServiceService } from 'src/app/services/util-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  public data$: Observable<GenUser[]> = this.userService.dataObs$;
  public data: GenUser[];
  public form: FormGroup;
  public disabled: boolean = true;
  public col: any[];
  public extraCol: any[];
  public brchId: number;
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public destroy$: Subject<boolean> = new Subject();
  public genderSelection: any[] = [];
  public provinceSelection: any[] = [];
  public districtSelection: any[] = [];
  public dataId: number;
  public imagePath = 'assets/images/crud/users.png';
  public rolesSelection: any[] = [];
  public roles: any[] = [];
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private utilService: UtilServiceService,
    private ngxSpinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private confirmDialog: ConfirmationService,
    private pMessageService: PMsgServiceService,
    private addressService: AddressService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      provinceId: ['', [Validators.required]],
      districtId: ['', [Validators.required]],
      village: ['', [Validators.required]],

    });
    this.addressService.getProvince().subscribe((data: any) => {
      const result = data.provinces.map((value: any) => {
        return {
          name: value.name,
          code: value.id,
        }
      })
      this.provinceSelection = result;
    })
    this.genderSelection = [
      { name: 'ຍິງ', code: 'm' },
      { name: 'ຊາຍ', code: 'f' },
    ]
    this.rolesSelection = [
      { name: 'cashier', code: { name: 'cashier', value: 7 } },
      { name: 'restaurantadmin', code: { name: 'restaurantadmin', value: 4 } },
      { name: 'branchmanager', code: { name: 'branchmanager', value: 5 } },
      { name: 'waiter', code: { name: 'waiter', value: 8 } },
    ]
    this.brchId = this.route.snapshot.params['id'];
    this.col = colUser;
    this.extraCol = colProfile;
    this.userService.getDataByBranch(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: User[]) => {
        const genData = data.map(value => {
          value['id'] = value['userId'];
          delete value['userId'];
          return {
            ...value,
            profile: [value.profile],
          }
        });

        this.data = genData;
        this.userService.dataSub$.next(genData);
      },
      error: () => {
        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
        this.disabled = false;
      },
    });

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get gender() {
    return this.form.get('gender');
  }
  get phone() {
    return this.form.get('phone');
  }
  get provinceId() {
    return this.form.get('provinceId');
  }
  get districtId() {
    return this.form.get('districtId');
  }
  get village() {
    return this.form.get('village');
  }

  activeProvince(data: any) {
    this.addressService.getDistrict(data.value).subscribe((data: any) => {
      this.districtSelection = data.districts.map((value: any) => {
        return {
          name: value.name,
          code: value.id,
        }
      })
    })
  }

  create() {
    const fControls = Object.keys(this.form.controls);
    fControls.map(fControl => {
      this.form.controls[fControl].markAsDirty();
    })

    const roles = this.roles.map(role => {
      return role.value;
    })
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const newUser: UserDto = {
        username: this.username?.value,
        password: this.password?.value,
        firstname: this.firstname?.value,
        lastname: this.lastname?.value,
        phone: this.username?.value,
        provinceId: this.provinceId?.value,
        districtId: this.districtId?.value,
        roles: this.roles.length > 0 ? roles : [7, 8],
        village: this.village?.value,
        gender: this.gender?.value,
        branchId: this.brchId,
        restaurantId: parseInt(this.authService.getRestaurantId() as string),
      }
      this.userService.create(newUser).subscribe({
        complete: () => {
          this.modalDisplay = false;
          this.pMessageService.createSuccess();
          this.userService.getDataByBranch(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: User[]) => {
              const genData = data.map(value => {
                value['id'] = value['userId'];
                delete value['userId'];
                return {
                  ...value,
                  profile: [value.profile],
                }
              });
              this.data = genData;
              this.userService.dataSub$.next(genData);
            },
            complete: () => {
              this.utilService.changeSubEvent();
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: (data) => {
          this.pMessageService.customMessageWarn(data.error.message);
          this.ngxSpinnerService.hide();
        }
      });
    }

  }

  dpEditEvent(obj: any) {
    this.form.controls['password'].removeValidators(Validators.required);
    this.data.map((data: GenUser) => {
      if (data.id === obj.id) {
        this.roles = this.rolesSelection.filter(role => data.roleIds.includes(role.code.value)).map(role => {
          return {
            name: role.name,
            value: role.code.value,
          }
        });
        this.dataId = data.id as number;
        this.form.setValue({
          username: data.username,
          password: '',
          firstname: data.profile[0].firstname,
          lastname: data.profile[0].lastname,
          phone: data.profile[0].phone,
          village: data.profile[0].village,
          provinceId: data.profile[0].provinceId,
          districtId: data.profile[0].districtId,
          gender: data.profile[0].gender,
        })
        this.addressService.getDistrict(data.profile[0].provinceId).subscribe((data: any) => {
          this.districtSelection = data.districts.map((value: any) => {
            return {
              name: value.name,
              code: value.id,
            }
          })
        })
      }
    })
    this.modalEditDisplay = !this.modalEditDisplay;
  }

  update() {
    const fControls = Object.keys(this.form.controls);
    fControls.map(fControl => {
      this.form.controls[fControl].markAsDirty();
    })
    this.form.controls['password'].removeValidators(Validators.required);
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const roles = this.roles.map(role => {
        return role.value;
      })
      const updateUser: UserDto = {
        userId: this.dataId,
        username: this.username?.value,
        password: this.password?.value,
        firstname: this.firstname?.value,
        lastname: this.lastname?.value,
        phone: this.username?.value,
        provinceId: this.provinceId?.value,
        districtId: this.districtId?.value,
        roles: this.roles.length > 0 ? roles : [7, 8],
        village: this.village?.value,
        gender: this.gender?.value,
      }
      this.userService.update(updateUser).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.userService.getDataByBranch(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: User[]) => {
              const genData = data.map(value => {
                value['id'] = value['userId'];
                delete value['userId'];
                return {
                  ...value,
                  profile: [value.profile],
                }
              });
              this.data = genData;
              this.userService.dataSub$.next(genData);
            },
            complete: () => {
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: (data) => {
          console.log(data);
          this.ngxSpinnerService.hide();
        }
      })
    }
  }
  dpRemoveEvent({ id }: any) {
    let currentData: any;
    this.data.map((data: GenUser) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບຜຸ້ໃຊ້ <b>${currentData.username}</b>`,
      accept: () => {
        const deleteDto: UserDto = {
          userId: currentData.id,
          username: currentData.username,
        }
        this.userService.delete(deleteDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.userService.getDataByBranch(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: User[]) => {
                const genData = data.map(value => {
                  value['id'] = value['userId'];
                  delete value['userId'];
                  return {
                    ...value,
                    profile: [value.profile],
                  }
                });
                this.pMessageService.deleteSuccess();
                this.data = genData;
                this.userService.dataSub$.next(genData);
              },
              complete: () => {
                this.utilService.changeSubEvent();
                this.ngxSpinnerService.hide();
              }
            })
          },
          error: (data) => {
            console.log(data);
          }
        });
      },
      reject: () => {

      }
    })
  }
  onHide(e: boolean) {
    this.form.controls['password'].addValidators(Validators.required);
    document.querySelector('body')!.style.overflowY = 'auto';
    this.modalDisplay = e;
    this.modalEditDisplay = e;
    this.form.reset();
  }

  activeRoles(role: any) {
    if (this.roles.length < 1) {
      this.roles.push(role);
    } else {
      const filterRoles = this.roles.filter(roleM => roleM.value === role.value);
      if (filterRoles.length === 0) {
        this.roles.push(role);
      }
    }
  }
  removeRoleSelection(index: number) {
    this.roles = this.roles.filter((d, i) => i !== index);
  }
}
