"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PMsgServiceService = void 0;
var core_1 = require("@angular/core");
var PMsgServiceService = /** @class */ (function () {
    function PMsgServiceService(messageService) {
        this.messageService = messageService;
    }
    PMsgServiceService.prototype.success = function () {
        this.messageService.add({ severity: 'success', summary: 'ສຳເລັດ' });
    };
    PMsgServiceService.prototype.limitTableMessage = function () {
        this.messageService.add({ severity: 'warn', summary: 'ຈຳນວນເກີນລາຍການ' });
    };
    PMsgServiceService.prototype.filterDateMessage = function () {
        this.messageService.add({ severity: 'warn', summary: 'ບໍ່ພົບຂໍ້ມູນໃນວັນທີເລືອກ' });
    };
    PMsgServiceService.prototype.nonePendingData = function () {
        this.messageService.add({ severity: 'error', summary: 'ບໍ່ພົບຂໍ້ມູນ' });
    };
    PMsgServiceService.prototype.selectedFailed = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາເລືອກຂໍ້ມູນທີ່ຕ້ອງການຍົກເລີກ' });
    };
    PMsgServiceService.prototype.reasonEmpty = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາໃສ່ເຫດຜົນ' });
    };
    PMsgServiceService.prototype.reasonListEmpty = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາໃສ່ເຫດຜົນໃຫ້ຄົບຕາມທີ່ເລືອກ' });
    };
    PMsgServiceService.prototype.moneyIsNotEnough = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາໃສ່ເງິນໃຫ້ຄົບຕາມຈຳນວນ' });
    };
    PMsgServiceService.prototype.rnBankFailed = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາໃສ່ເລກອ້າງອີງບັດເຄດິດ' });
    };
    PMsgServiceService.prototype.selectPaymentFailed = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາເລືອກປະເພດການຊຳລະ' });
    };
    PMsgServiceService.prototype.putMoneySuccess = function () {
        this.messageService.add({ severity: 'success', summary: 'ປ້ອນຂໍ້ມູນການຊຳລະສຳເລັດ' });
    };
    PMsgServiceService.prototype.billPaymentWarn = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາປ້ອນຂໍ້ມູນການຊຳລະກ່ອນ' });
    };
    PMsgServiceService.prototype.emptyBillpayment = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ' });
    };
    PMsgServiceService.prototype.paymentSuccess = function () {
        this.messageService.add({ severity: 'success', summary: 'ການຊຳລະສຳເລັດ' });
    };
    PMsgServiceService.prototype.createSuccess = function () {
        this.messageService.add({ severity: 'success', summary: 'ການເພີ່ມຂໍ້ມູນສຳເລັດ' });
    };
    PMsgServiceService.prototype.updateSuccess = function () {
        this.messageService.add({ severity: 'success', summary: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ' });
    };
    PMsgServiceService.prototype.deleteSuccess = function () {
        this.messageService.add({ severity: 'success', summary: 'ລົບຂໍ້ມູນສຳເລັດ' });
    };
    PMsgServiceService.prototype.dataDuplicate = function () {
        this.messageService.add({ severity: 'warn', summary: 'ຂໍ້ມູນຊ້ຳກັນ' });
    };
    PMsgServiceService.prototype.searchFailed = function () {
        this.messageService.add({ severity: 'warn', summary: 'ຄົ້ນຫາບໍ່ພົບຂໍ້ມູນ' });
    };
    PMsgServiceService.prototype.selectMenuFailed = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາເລືອກເມນູທີ່ຕ້ອງການຈ່າຍ' });
    };
    PMsgServiceService.prototype.overflowPayment = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາເລືອກປ້ອນຈຳນວນເງິນໃຫ້ຖືກຕ້ອງ' });
    };
    PMsgServiceService.prototype.duoGtFailed = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາເລືອກປ້ອນຈຳນວນເງິນຮັບ ແລະ ເງິນທອນໃຫ້ຖືກຕ້ອງ' });
    };
    PMsgServiceService.prototype.defaultError = function () {
        this.messageService.add({ severity: 'warn', summary: 'ເກີດຄວາມຜິດພາດ' });
    };
    /* coupon */
    PMsgServiceService.prototype.couponNotFound = function () {
        this.messageService.add({ severity: 'warn', summary: 'ບໍ່ພົບລະຫັດຄູປອງ' });
    };
    PMsgServiceService.prototype.couponExpired = function () {
        this.messageService.add({ severity: 'warn', summary: 'ລະຫັດຄູປອງໝົດອາຍຸ' });
    };
    PMsgServiceService.prototype.couponAdded = function () {
        this.messageService.add({ severity: 'success', summary: 'ເພີ່ມສ່ວນຫຼຸດສຳເລັດ' });
    };
    PMsgServiceService.prototype.customMessageWarn = function (message) {
        this.messageService.add({ severity: 'warn', summary: message });
    };
    PMsgServiceService.prototype.customMessageSuccess = function (message) {
        this.messageService.add({ severity: 'success', summary: message });
    };
    PMsgServiceService.prototype.empty = function () {
        this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ' });
    };
    PMsgServiceService.prototype.permissionFailed = function () {
        this.messageService.add({ severity: 'warn', summary: 'ບໍ່ມີສິດໃນການໃຊ້' });
    };
    PMsgServiceService.prototype.branchNotFound = function () {
        this.messageService.add({ severity: 'warn', summary: 'ບໍ່ພົບສາຂາ' });
    };
    PMsgServiceService.prototype.registerSuccess = function () {
        this.messageService.add({ severity: 'success', summary: 'ການລົງທະບຽນສຳເລັດ' });
    };
    PMsgServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PMsgServiceService);
    return PMsgServiceService;
}());
exports.PMsgServiceService = PMsgServiceService;
