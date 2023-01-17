import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MenuDto } from 'src/app/dto/menu.dto';
import { colMenu, colMenuDetail, Menu } from 'src/app/models/menu.model';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { nationalRegexPatternLaosValidator } from 'src/app/validators/globalValidators';
import { CategoryService } from 'src/app/services/category.service';
import { UnitService } from 'src/app/services/unit.service';
import { Category } from 'src/app/models/category.model';
import { Unit } from 'src/app/models/unit.model';
import { StockService } from 'src/app/services/stock.service';
import { Stock } from 'src/app/models/stock.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { MenudetailsService } from 'src/app/services/menudetails.service';
import { nationalRegexPatternEn, nationalRegexPatternLaos, nationalRegexPatternThai, nationalRegexPatternVn } from 'src/app/utilConstant/index.util';
import { LanguageService } from 'src/app/services/language.service';
import { Language } from 'src/app/models/language.model';
import { UtilServiceService } from 'src/app/services/util-service.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-in-out', style({
          opacity: 1,
        })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s ease-in-out', style({
          opacity: 0,
        })),
      ]),
    ]),
  ],
})
export class MenuComponent implements OnInit {
  public menuFormData = new FormData();
  public disabled: boolean = true;
  public destroy$: Subject<boolean> = new Subject();
  public data$: Observable<Menu[]> = this.menuService.dataObs$;
  public data: Menu[];
  public col: any[];
  public extraCol: any[];
  public modalDisplay: boolean = false;
  public modalEditDisplay: boolean = false;
  public form: FormGroup;
  public brchId: number;
  public dataId: number;
  public categoryOptions: any[];
  public unitOptions: any[];
  public productOptions: any[];
  public imageData: any;
  public imageEditData: any;
  /* menudetails */
  public menudetails: any[] = [];
  public menudetailsStatus: any;
  public productNameEdit: undefined | number;
  public amountEdit: undefined | number;
  public statusEdit: undefined | number;
  public amountEditValue: undefined | number;
  public languageData: Language[];
  public languageDataEdit: any[] = [];
  public imagePath = 'assets/images/crud/menu.png';
  constructor(private menuService: MenuService,
    private ngxSpinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    private utilService: UtilServiceService,
    private fb: FormBuilder,
    private confirmDialog: ConfirmationService,
    private authService: AuthService,
    private pMessageService: PMsgServiceService,
    private categoryService: CategoryService,
    private unitService: UnitService,
    private stockService: StockService,
    private menuDetailsService: MenudetailsService,
    private languageService: LanguageService,
  ) {
  }

  @ViewChildren('mlInput') mlInput: QueryList<any>;
  @ViewChildren('mlInputEdit') mlInputEdit: QueryList<any>;
  @HostListener('click', ['$event.target']) clickedTable($event: any) {
    /*  const mdElement = document.getElementById('menudetails-table'); */
    const productName = Array.from(document.querySelectorAll('.productName-td'));
    const amountName = Array.from(document.querySelectorAll('.amount-td'));
    const statusName = Array.from(document.querySelectorAll('.status-td'));
    const productNameFilter = productName.filter(data => data.contains($event));
    const amountFilter = amountName.filter(data => data.contains($event));
    const statusFilter = statusName.filter(data => data.contains($event));

    if (productNameFilter.length > 0) {
      productName.map((data, index) => {
        if (data.contains($event)) {
          this.productNameEdit = index;
        }
      })
    } else {
      this.productNameEdit = undefined;
    }

    if (amountFilter.length > 0) {
      amountName.map((data, index) => {
        if (data.contains($event)) {
          this.amountEdit = index;
        }
      })
    } else {
      this.amountEdit = undefined;
    }

    if (statusFilter.length > 0) {
      statusName.map((data, index) => {
        if (data.contains($event)) {
          this.statusEdit = index;
        }
      })
    } else {
      this.statusEdit = undefined;
    }
    /*  const amount = document.querySelector('amount');
     const status = document.querySelector('status'); */
  }
  checkMenudetails(arrCheck: any[], value: Validators) {
    return arrCheck.length > 0 ? null : value;
  }
  ngOnInit(): void {
    this.languageService.getData().subscribe(data => {
      let result: any[] = [];
      const nData = data.filter(v => v.languageCode !== 'lo')
      while (nData.length) {

        result.push(nData.splice(0, 2));
      }
      this.languageData = result;
    })
    this.ngxSpinnerService.show();
    this.brchId = this.route.snapshot.params['id'];
    this.col = colMenu;
    this.extraCol = colMenuDetail;
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      price: ['', [Validators.min(1), Validators.required]],
      image: [''],
      product: [''],
      amount: ['0'],
      status: [''],
    });
    this.menuService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Menu[]) => {
        this.data = data;
        this.menuService.dataSub$.next(data);
      },
      error: () => {
        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
        this.disabled = false;
      },
    });
    this.categoryService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Category[]) => {
        const result = data.map((value: Category) => {
          return { name: value.name, code: value.id };
        })
        this.categoryOptions = result;
      }
    })

    this.unitService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Unit[]) => {
        const result = data.map((value: Unit) => {
          return { name: value.unitName, code: value.id };
        })
        this.unitOptions = result;
      }
    })
    this.stockService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Stock[]) => {
        const result = data.map(value => {
          return { name: value.productName, code: `${value.id},${value.productName}` };
        })
        this.productOptions = result;
      }
    })
    this.menudetailsStatus = [
      { name: 'sale', code: 'sale' },
      { name: 'free', code: 'free' },
    ]
  }
  get name() {
    return this.form.get('name');
  }
  get category() {
    return this.form.get('category');
  }
  get unit() {
    return this.form.get('unit');
  }
  get price() {
    return this.form.get('price');
  }
  get image() {
    return this.form.get('image');
  }
  get product() {
    return this.form.get('product');
  }
  get amount() {
    return this.form.get('amount');
  }
  get status() {
    return this.form.get('status');
  }
  dpEditEvent(obj: any) {
    this.ngxSpinnerService.show();
    this.menuService.findAllById(obj.id, this.brchId).subscribe({
      next: (data) => {
        if (data.languages!.length > 0) {

          let result: any[] = [];
          while ((data.languages as any[]).length) {

            result.push((data.languages as any[]).splice(0, 2));
          }
          this.languageDataEdit = result;
        } else {
          this.languageDataEdit = [];
        }
        this.dataId = data.id;
        this.form.setValue({
          name: data.name,
          price: data.price,
          category: data.categoryId,
          unit: data.unitId,
          image: null,
          product: null,
          amount: null,
          status: null,
        });
        this.imageEditData = data.image;
        const menuDetails = data.menudetails.map(data => {
          return {
            stockId: data.stockId.toString(),
            [data.stockId]: {
              id: data.id,
              stockId: data.stockId.toString(),
              productName: data.productName,
              amount: data.amount,
              status: data.status,
            }
          }
        })
        this.menudetails = menuDetails;
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    })

    this.modalEditDisplay = !this.modalEditDisplay;

  }

  dpRemoveEvent({ id }: any) {
    let currentData: any;
    this.data.map((data: Menu) => {
      if (data.id === id) {
        currentData = data;
      }
    })
    this.confirmDialog.confirm({
      message: `ຢືນຢັນການລົບເມນູ <b>${currentData.name}</b>`,
      accept: () => {
        const deleteDto: MenuDto = {
          restaurantId: parseInt(<string>this.authService.getRestaurantId()),
          branchId: this.brchId,
          menuId: id,
        }
        this.menuService.delete(deleteDto).subscribe({
          complete: () => {
            this.ngxSpinnerService.show();
            this.menuService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: Menu[]) => {
                this.pMessageService.deleteSuccess();
                this.data = data;
                this.menuService.dataSub$.next(data);
              },
              complete: () => {
                this.utilService.changeSubEvent();
                this.ngxSpinnerService.hide();
              }
            })
          },
        });
      },
      reject: () => {

      }
    })
  }

  onHide(e: boolean) {
    document.querySelector('body')!.style.overflowY = 'auto';
    this.modalDisplay = e;
    this.modalEditDisplay = e;
    this.form.reset();
    this.menudetails = [];
    this.menuFormData = new FormData();
    this.ml = false;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  create() {
    /*  const languagesData = [
       ...(this.form.controls['nameLa'].value ? [{ languageCode: 'LA', name: this.form.controls['nameLa'].value }] : []),
       ...(this.form.controls['nameTh'].value ? [{ languageCode: 'TH', name: this.form.controls['nameTh'].value }] : [])
     ]; */

    const languagesData: any = this.mlInput.map(d => {
      if (d.nativeElement.value) {
        return {
          languageCode: (d.nativeElement.dataset.code as string).toUpperCase(),
          name: d.nativeElement.value,
        }
      } else {
        return {};
      }

    });

    this.name?.markAsDirty();
    this.category?.markAsDirty();
    this.unit?.markAsDirty();
    this.price?.markAsDirty();
    this.image?.markAsDirty();

    if (this.form.valid) {
      this.ngxSpinnerService.show();

      const menudetailsData = this.menudetails.map(data => {
        return {
          stockId: data[data.stockId].stockId,
          amount: data[data.stockId].amount,
          status: data[data.stockId].status
        }
      });
      /* const createDto: MenuDto = {
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        name: this.name?.value,
        categoryId: this.category?.value,
        unitId: this.unit?.value,
        price: this.price?.value,
        languages: [],
        menudetails: menudetailsData.length > 0 ? menudetailsData : [],
        photo: this.imageData ? this.imageData : null,
      }; */

      this.menuFormData.append('restaurantId', this.authService.getRestaurantId() as string);
      this.menuFormData.append('branchId', (this.brchId as unknown) as string);
      this.menuFormData.append('name', this.name?.value);
      this.menuFormData.append('categoryId', this.category?.value);
      this.menuFormData.append('unitId', this.unit?.value);
      this.menuFormData.append('price', this.price?.value);
      for (let index in languagesData) {
        if (languagesData[index].languageCode && languagesData[index].name) {
          this.menuFormData.append(`languages[${index}][languageCode]`, languagesData[index].languageCode);
          this.menuFormData.append(`languages[${index}][name]`, languagesData[index].name);
        }
      }
      for (let index in menudetailsData) {
        this.menuFormData.append(`menudetails[${index}][stockId]`, menudetailsData[index].stockId);
        this.menuFormData.append(`menudetails[${index}][amount]`, menudetailsData[index].amount);
        this.menuFormData.append(`menudetails[${index}][status]`, menudetailsData[index].status);
      }
      this.menuService.create(this.menuFormData).subscribe({
        complete: () => {
          this.modalDisplay = false;
          this.pMessageService.createSuccess();
          this.menuService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Menu[]) => {
              this.data = data;
              this.menuService.dataSub$.next(data);
            },
            complete: () => {
              this.utilService.changeSubEvent();
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: (data) => {
          this.pMessageService.dataDuplicate();
          this.ngxSpinnerService.hide();
        }
      });

    }
  }

  update() {
    /* const languagesData = [
      ...(this.form.controls['nameLa'].value ? [{ languageCode: 'LA', name: this.form.controls['nameLa'].value }] : []),
      ...(this.form.controls['nameTh'].value ? [{ languageCode: 'TH', name: this.form.controls['nameTh'].value }] : [])
    ]; */

    const languagesData: any = this.mlInputEdit.map(d => {
      if (d.nativeElement.value) {
        return {
          id: d.nativeElement.dataset.id,
          languageCode: (d.nativeElement.dataset.code as string).toUpperCase(),
          name: d.nativeElement.value,
        }
      } else {
        return {};
      }

    });

    this.name?.markAsDirty();
    this.category?.markAsDirty();
    this.unit?.markAsDirty();
    this.price?.markAsDirty();
    this.image?.markAsDirty();
    if (this.form.valid) {
      this.ngxSpinnerService.show();
      const menudetailsData = this.menudetails.map(data => {
        return {
          id: data[data.stockId].id,
          stockId: data[data.stockId].stockId,
          amount: data[data.stockId].amount,
          status: data[data.stockId].status
        }
      });
      /* const createDto: MenuDto = {
        restaurantId: parseInt(<string>this.authService.getRestaurantId()),
        branchId: this.brchId,
        name: this.name?.value,
        categoryId: this.category?.value,
        unitId: this.unit?.value,
        price: this.price?.value,
        languages: [],
        menudetails: menudetailsData.length > 0 ? menudetailsData : [],
        photo: this.imageData ? this.imageData : null,
      }; */
      this.menuFormData.append('menuId', this.dataId.toString());
      this.menuFormData.append('restaurantId', this.authService.getRestaurantId() as string);
      this.menuFormData.append('branchId', this.brchId.toString());
      this.menuFormData.append('name', this.name?.value);
      this.menuFormData.append('categoryId', this.category?.value);
      this.menuFormData.append('unitId', this.unit?.value);
      this.menuFormData.append('price', this.price?.value);
      for (let index in languagesData) {
        if (languagesData[index].languageCode && languagesData[index].name) {
          this.menuFormData.append(`languages[${index}][id]`, languagesData[index].id);
          this.menuFormData.append(`languages[${index}][languageCode]`, languagesData[index].languageCode);
          this.menuFormData.append(`languages[${index}][name]`, languagesData[index].name);
        }
      }
      for (let index in menudetailsData) {
        this.menuFormData.append(`menudetails[${index}][id]`, menudetailsData[index].id);
        this.menuFormData.append(`menudetails[${index}][stockId]`, menudetailsData[index].stockId);
        this.menuFormData.append(`menudetails[${index}][amount]`, menudetailsData[index].amount);
        this.menuFormData.append(`menudetails[${index}][status]`, menudetailsData[index].status);
      }
      this.menuService.update(this.menuFormData).subscribe({
        complete: () => {
          this.modalEditDisplay = false;
          this.pMessageService.updateSuccess();
          this.menuService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: Menu[]) => {
              this.data = data;
              this.menuService.dataSub$.next(data);
            },
            complete: () => {
              this.ngxSpinnerService.hide();
            }
          })
        },
        error: () => {
          this.pMessageService.dataDuplicate();
          this.ngxSpinnerService.hide();
        }
      })
    }
  }

  addedMenudetails() {
    this.amount?.markAsDirty();
    this.product?.markAsDirty();
    this.status?.markAsDirty();
    if (this.product?.value && this.status?.value && this.amount?.value) {
      const [stockId, productName] = this.product?.value.split(',');
      /* filter same */
      const filterMenudetails = this.menudetails.filter((data) => stockId === data.stockId);
      if (filterMenudetails.length > 0) {
        this.menudetails.map((data, index) => {
          if (data.stockId === stockId) {
            this.menudetails[index] = {
              stockId,
              [stockId]: {
                ...data[stockId],
                productName,
                amount: data[stockId].amount + this.amount?.value > 100 ? 100 : data[stockId].amount + this.amount?.value,
                status: this.status?.value,
              }
            }
          }
        });
      } else {
        this.menudetails.push({
          stockId,
          [stockId]: {
            productName,
            stockId: stockId,
            amount: this.amount?.value,
            status: this.status?.value,
          }
        });
      }
      /*  */
    } else {
      this.pMessageService.empty();
    }

  }

  deletedMenudetails(index: number) {
    this.menudetails = this.menudetails.filter((_, i) => i !== index);
  }

  productNameEditEvent(event: any, index: number, oldStockId: number) {
    const [stockId, productName] = event.value.split(',');
    const filterMenu = this.menudetails.filter(data => data[data.stockId].productName === productName);
    if (filterMenu.length > 0) {
      return;
    } else {
      this.menudetails[index] = {
        stockId,
        [stockId]: {
          ...this.menudetails[index][oldStockId],
          productName,
        }
      }
    }
  }

  amountNameEditEvent(event: any, index: number, stockId: number) {
    this.menudetails[index] = {
      stockId,
      [stockId]: {
        ...this.menudetails[index][stockId],
        amount: this.amountEditValue ? this.amountEditValue : 1,
      }
    }
  }
  statusEditEvent(event: any, index: number, stockId: number) {
    this.menudetails[index] = {
      stockId,
      [stockId]: {
        ...this.menudetails[index][stockId],
        status: event.value,
      }
    }
  }
  imageUploaded(fileInput: any) {
    this.menuFormData.append('photo', fileInput.files[0], fileInput.files[0].name);
  }

  addedMenudetailsEdit() {
    if (this.product?.value && this.status?.value && this.amount?.value) {
      const [stockId, productName] = this.product?.value.split(',');
      this.ngxSpinnerService.show();
      const filterMenudetails = this.menudetails.filter((data) => stockId === data.stockId);
      if (filterMenudetails.length > 0) {
        this.menudetails.map((data, index) => {
          if (data.stockId === stockId) {

            /* editmenu */
            this.menuDetailsService.update({
              menuDetailId: data[data.stockId].id,
              menuId: this.dataId,
              stockId,
              amount: this.amount?.value,
              status: this.status?.value,
            }).pipe(takeUntil(this.destroy$)).subscribe({
              next: () => {
                this.menuService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
                  next: (data: Menu[]) => {
                    this.data = data;
                    this.menuService.dataSub$.next(data);
                    this.data.map(data => {
                      if (data.id === this.dataId) {
                        this.menudetails = data.menudetails.map(value => {
                          return {
                            stockId: value.stockId.toString(),
                            [value.stockId]: {
                              id: value.id,
                              stockId: value.stockId.toString(),
                              productName: value.productName,
                              amount: value.amount,
                              status: value.status,
                            }
                          }
                        });
                      }
                    })
                  },
                });
              },
              complete: () => {
                this.ngxSpinnerService.hide();
                this.pMessageService.updateSuccess();


              },
              error: (e) => {
                this.ngxSpinnerService.hide();
              }
            });

          }
        });
      } else {
        /* added new meu */
        this.menuDetailsService.create({
          menuId: this.dataId,
          stockId,
          amount: this.amount?.value,
          status: this.status?.value,
        }).pipe(takeUntil(this.destroy$)).subscribe({
          next: () => {
            this.menuService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
              next: (data: Menu[]) => {
                this.data = data;
                this.menuService.dataSub$.next(data);
                this.data.map(data => {
                  if (data.id === this.dataId) {
                    this.menudetails = data.menudetails.map(value => {
                      return {
                        stockId: value.stockId.toString(),
                        [value.stockId]: {
                          id: value.id,
                          stockId: value.stockId.toString(),
                          productName: value.productName,
                          amount: value.amount,
                          status: value.status,
                        }
                      }
                    });
                  }
                })
              },
            });
          },
          complete: () => {
            this.ngxSpinnerService.hide();
            this.pMessageService.customMessageSuccess("ເພີ່ມຂໍ້ມູນສຳເລັດ");


          },
          error: (e) => {
            this.ngxSpinnerService.hide();
          }
        });

      }

    } else {
      this.pMessageService.empty();
    }
  }

  deletedMenudetailsEdit({ menuDetailId, stockId }: any) {
    this.ngxSpinnerService.show();
    this.menuDetailsService.delete({
      menuDetailId,
      menuId: this.dataId,
      stockId: parseInt(stockId),
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.menuService.findAll(this.brchId).pipe(takeUntil(this.destroy$)).subscribe({
          next: (data: Menu[]) => {
            this.data = data;
            this.menuService.dataSub$.next(data);
            this.data.map(data => {
              if (data.id === this.dataId) {
                this.menudetails = data.menudetails.map(value => {
                  return {
                    stockId: value.stockId.toString(),
                    [value.stockId]: {
                      id: value.id,
                      stockId: value.stockId.toString(),
                      productName: value.productName,
                      amount: value.amount,
                      status: value.status,
                    }
                  }
                });
              }
            })
          },
        });
      },
      complete: () => {
        this.ngxSpinnerService.hide();
        this.pMessageService.deleteSuccess();


      },
      error: (e) => {
        this.ngxSpinnerService.hide();
      }
    })
  }
  public state: 'opened' | 'closed';
  public ml: boolean = false;


  mlOpen() {
    this.ml = !this.ml;
  }


  nameLaEvent() {
    if (nationalRegexPatternLaos().test(this.form.controls['nameLa'].value)) {
    } else {
      this.form.controls['nameLa'].setValue('');
    }
  }
  nameThEvent() {
    if (nationalRegexPatternThai().test(this.form.controls['nameTh'].value)) {
    } else {
      this.form.controls['nameTh'].setValue('');
    }
  }

  languagesDropEvent() {
    this.ml = false;
  }
  tt() {

  }
  checkMl(lcode: string) {
    this.mlInput.map(d => {
      if (d.nativeElement.dataset.code === 'th') {
        if (nationalRegexPatternThai().test(d.nativeElement.value as string)) {

        } else {
          d.nativeElement.value = '';
        }
      } else if (d.nativeElement.dataset.code === 'vn') {
        if (nationalRegexPatternVn().test(d.nativeElement.value as string)) {

        } else {
          d.nativeElement.value = '';
        }
      } else if (d.nativeElement.dataset.code === 'en') {
        if (nationalRegexPatternEn().test(d.nativeElement.value as string)) {

        } else {
          d.nativeElement.value = '';
        }
      }
    })
  }
  checkMlEdit(lcode: string, defaultValue: string) {
    this.mlInputEdit.map(d => {
      const dataSetCode = (d.nativeElement.dataset.code as string).toLowerCase();
      if (dataSetCode == 'th') {
        if (nationalRegexPatternThai().test(d.nativeElement.value as string)) {

        } else {
          d.nativeElement.value = defaultValue;
        }
      } else if (dataSetCode == 'vn') {
        if (nationalRegexPatternVn().test(d.nativeElement.value as string)) {

        } else {
          d.nativeElement.value = defaultValue;
        }
      } else if (dataSetCode == 'en') {
        if (nationalRegexPatternEn().test(d.nativeElement.value as string)) {

        } else {
          d.nativeElement.value = defaultValue;
        }
      }
    })
  }

  public resizeImageDisplay: boolean;
  public resizeImageUrl: string = '';
  resizeFullPic(image: string) {
    document.querySelector('body')!.style.overflowY = 'hidden';
    this.resizeImageUrl = 'https://rmstest.jlsipos.com/images/' + image;
    this.resizeImageDisplay = true;
  }
  closed() {
    document.querySelector('body')!.style.overflowY = 'auto';
    this.resizeImageDisplay = false;
  }
}
