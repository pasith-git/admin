import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { zip } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { CouponService } from 'src/app/services/coupon.service';
import { MenuService } from 'src/app/services/menu.service';
import { PrinterService } from 'src/app/services/printer.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductService } from 'src/app/services/product.service';
import { StockInService } from 'src/app/services/stock-in.service';
import { StockOutService } from 'src/app/services/stock-out.service';
import { StockUnitService } from 'src/app/services/stock-unit.service';
import { StockService } from 'src/app/services/stock.service';
import { UnitService } from 'src/app/services/unit.service';
import { UserService } from 'src/app/services/user.service';
import { UtilServiceService } from 'src/app/services/util-service.service';

@Component({
  selector: 'app-branch-board',
  templateUrl: './branch-board.component.html',
  styleUrls: ['./branch-board.component.css'],
})
export class BranchBoardComponent implements OnInit {
  public branchBoardList: any[] = [];
  public brchId: number;
  constructor(private userService: UserService,
    private router: Router,
    private utilService: UtilServiceService,
    private menuService: MenuService,
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    private unitService: UnitService,
    private stockService: StockService,
    private stockUnitService: StockUnitService,
    private printerService: PrinterService,
    private categoryService: CategoryService,
    private stockinService: StockInService,
    private stockOutService: StockOutService,
    private couponService: CouponService,
    private cbr: ChangeDetectorRef) {
    this.utilService.subChange.subscribe(data => {
      this.getBranchBoard();
    })
  }

  ngOnInit(): void {
    this.brchId = parseInt(this.router.url.split('/')[2]);
    this.getBranchBoard();
  }

  getBranchBoard() {
    zip(this.userService.getDataByBranch(this.brchId),
      this.menuService.findAll(this.brchId),
      this.productService.findAll(this.brchId),
      this.productTypeService.findAll(this.brchId),
      this.unitService.findAll(this.brchId),
      this.stockService.findAll(this.brchId),
      this.stockUnitService.findAll(this.brchId),
      this.categoryService.findAll(this.brchId),
      this.printerService.findAll(this.brchId),
      this.couponService.findAll(this.brchId),
      this.stockinService.findAll(this.brchId),
      this.stockOutService.findAll(this.brchId),
    ).subscribe({
      next: ([user, menu, product, productType, unit, stock, stockUnit, category, printer, coupon, stockIn, stockOut]) => {
        this.branchBoardList[0] = { name: 'ຜູ້ໃຊ້', value: user.length, type: 'ຄົນ' };
        this.branchBoardList[1] = { name: 'ເມນູ', value: menu.length, type: 'ລາຍການ' };
        this.branchBoardList[2] = { name: 'ສິນຄ້າ', value: product.length, type: 'ລາຍການ' };
        this.branchBoardList[3] = { name: 'ປະເພດສິນຄ້າ', value: productType.length, type: 'ລາຍການ' };
        this.branchBoardList[4] = { name: 'ຫົວໜ່ວຍ', value: unit.length, type: 'ລາຍການ' };
        this.branchBoardList[5] = { name: 'ສະຕ໊ອກ', value: stock.length, type: 'ລາຍການ' };
        this.branchBoardList[6] = { name: 'ສະຕ໊ອກຫົວໜ່ວຍ', value: stockUnit.length, type: 'ລາຍການ' };
        this.branchBoardList[7] = { name: 'ປະເພດ', value: category.length, type: 'ລາຍການ' };
        this.branchBoardList[8] = { name: 'ປິ່ນເຕີ້', value: printer.length, type: 'ລາຍການ' };
        this.branchBoardList[9] = { name: 'ຄູປອງ', value: coupon.length, type: 'ລາຍການ' };
        this.branchBoardList[10] = { name: 'ຮັບສິນຄ້າເຂົ້າ', value: stockIn.length, type: 'ລາຍການ' };
        this.branchBoardList[11] = { name: 'ນຳສິນຄ້າອອກ', value: stockOut.length, type: 'ລາຍການ' };
      },
      error: () => {
        this.branchBoardList = [];
        return;
      }
    })
  }
}
