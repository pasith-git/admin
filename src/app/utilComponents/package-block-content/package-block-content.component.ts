import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { BehaviorSubject, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BranchesService } from 'src/app/services/branches.service';
import { OnlinePaymentService } from 'src/app/services/online-payment.service';
import { PMsgServiceService } from 'src/app/services/p-msg-service.service';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-package-block-content',
  templateUrl: './package-block-content.component.html',
  styleUrls: ['./package-block-content.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.5)',
        }),
        animate('0.2s ease-in-out', style({
          opacity: 1,
          transform: 'scale(1)',
        })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
        animate('0.2s ease-in-out', style({
          opacity: 0,
          transform: 'scale(0.5)',
        })),
      ]),
    ]),
  ],
})
export class PackageBlockContentComponent implements OnInit {
  public packageSub = new BehaviorSubject<any>([]);
  public data$ = this.packageSub.asObservable();
  public dropData: any;
  public brchId: number | undefined;
  public displayQR: boolean = false;
  public opData: any;
  public qrData: any;
  public paymentStatus: "gen" | "pay" = "gen";
  constructor(private pb: PackageService,
    private op: OnlinePaymentService,
    private confirmationService: ConfirmationService,
    private packageService: PackageService,
    private branchService: BranchesService,
    private authService: AuthService,
    private pMessageService: PMsgServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private ngxSpinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.branchService.getData().pipe(map(data => {
      let result: any[] = [];
      data.map(value => {
        if (value.expired) {
          result.push({
            name: value.name,
            value: value.id,
          })
        } else {

        }
      });
      return result;
    })).subscribe({
      next: (data) => {
        this.dropData = data;
      }
    })

    this.pb.getData().subscribe({
      next: (data) => {
        this.packageSub.next(data);
      }
    });
  }

  packagePayment(data: any) {
    this.confirmationService.confirm({
      message: "ສະແດງ QR ໃນການຊຳລະ",
      accept: () => {
        this.ngxSpinner.show();
        this.op.generateQRcode({
          packageDetailId: data.packageDetailId,
          packageId: data.packageId,
          branchId: this.brchId as number,
          restaurantId: parseInt(this.authService.getRestaurantId() as string),
        }).subscribe({
          next: (data) => {
            this.paymentStatus = "pay";
            this.qrData = data;
            this.op.mcid = this.qrData.mcid;
            this.op.subscribe({ uuid: this.qrData.uuid }, (result: any) => {
              if (this.qrData.uuid === result.uuid) {
                this.packageService.close();
                this.ngxSpinner.show();
                this.op.updatedQRcode({
                  restaurantId: parseInt(this.authService.getRestaurantId() as string),
                  branchId: this.brchId!,
                  packageDetailId: this.qrData.packageDetailId,
                  packageId: this.qrData.packageId,
                  purchaseId: this.qrData.purchaseId,
                  paymentResult: result,
                }).subscribe({
                  next: (data: any) => {
                    localStorage.setItem("expired", data.expired.toString())
                  },
                  complete: () => {
                    this.pMessageService.customMessageSuccess("ການຊຳລະແພັກເກັດສຳເລັດ");
                    this.ngxSpinner.hide();
                  }
                })
              }
            })
          },
          complete: () => {
            this.ngxSpinner.hide();
          }
        })
      },
      reject: () => {

      }
    })
  }
  close() {
    this.pb.close();
    this.brchId = undefined;
    localStorage.setItem("expired", "false");
    this.opData = undefined;
    this.displayQR = false;
  }
  @ViewChild('cd') cd: ConfirmDialog;
  checkPayment() {
    if (this.brchId) {
      this.cd.accept();
    } else {
      this.pMessageService.customMessageWarn('ກະລຸນາເລືອກສາຂາກ່ອນ');
    }
  }
}
