import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PMsgServiceService {

  constructor(private messageService: MessageService) { }
  success() {
    this.messageService.add({ severity: 'success', summary: 'ສຳເລັດ' });
  }
  limitTableMessage() {
    this.messageService.add({ severity: 'warn', summary: 'ຈຳນວນເກີນລາຍການ' });
  }

  filterDateMessage() {
    this.messageService.add({ severity: 'warn', summary: 'ບໍ່ພົບຂໍ້ມູນໃນວັນທີເລືອກ' });
  }
  nonePendingData() {
    this.messageService.add({ severity: 'error', summary: 'ບໍ່ພົບຂໍ້ມູນ' });
  }
  selectedFailed() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາເລືອກຂໍ້ມູນທີ່ຕ້ອງການຍົກເລີກ' });
  }
  reasonEmpty() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາໃສ່ເຫດຜົນ' });
  }
  reasonListEmpty() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາໃສ່ເຫດຜົນໃຫ້ຄົບຕາມທີ່ເລືອກ' });
  }
  moneyIsNotEnough() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາໃສ່ເງິນໃຫ້ຄົບຕາມຈຳນວນ' });
  }
  rnBankFailed() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາໃສ່ເລກອ້າງອີງບັດເຄດິດ' });
  }
  selectPaymentFailed() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາເລືອກປະເພດການຊຳລະ' });
  }
  putMoneySuccess() {
    this.messageService.add({ severity: 'success', summary: 'ປ້ອນຂໍ້ມູນການຊຳລະສຳເລັດ' });
  }
  billPaymentWarn() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາປ້ອນຂໍ້ມູນການຊຳລະກ່ອນ' });
  }
  emptyBillpayment() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ' });
  }
  paymentSuccess() {
    this.messageService.add({ severity: 'success', summary: 'ການຊຳລະສຳເລັດ' });
  }

  createSuccess() {
    this.messageService.add({ severity: 'success', summary: 'ການເພີ່ມຂໍ້ມູນສຳເລັດ' });
  }
  updateSuccess() {
    this.messageService.add({ severity: 'success', summary: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ' });
  }
  deleteSuccess() {
    this.messageService.add({ severity: 'success', summary: 'ລົບຂໍ້ມູນສຳເລັດ' });
  }
  dataDuplicate() {
    this.messageService.add({ severity: 'warn', summary: 'ຂໍ້ມູນຊ້ຳກັນ' });
  }
  searchFailed() {
    this.messageService.add({ severity: 'warn', summary: 'ຄົ້ນຫາບໍ່ພົບຂໍ້ມູນ' });
  }
  selectMenuFailed() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາເລືອກເມນູທີ່ຕ້ອງການຈ່າຍ' });
  }
  overflowPayment() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາເລືອກປ້ອນຈຳນວນເງິນໃຫ້ຖືກຕ້ອງ' });
  }
  duoGtFailed() {
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາເລືອກປ້ອນຈຳນວນເງິນຮັບ ແລະ ເງິນທອນໃຫ້ຖືກຕ້ອງ' });
  }
  defaultError() {
    this.messageService.add({ severity: 'warn', summary: 'ເກີດຄວາມຜິດພາດ' });
  }

  /* coupon */
  couponNotFound(){
    this.messageService.add({ severity: 'warn', summary: 'ບໍ່ພົບລະຫັດຄູປອງ' });
  }
  couponExpired(){
    this.messageService.add({ severity: 'warn', summary: 'ລະຫັດຄູປອງໝົດອາຍຸ' }); 
  }
  couponAdded(){
    this.messageService.add({ severity: 'success', summary: 'ເພີ່ມສ່ວນຫຼຸດສຳເລັດ' }); 
  }
  customMessageWarn(message: string){
    this.messageService.add({ severity: 'warn', summary: message }); 
  }
  customMessageSuccess(message: string){
    this.messageService.add({ severity: 'success', summary: message }); 
  }
  empty(){
    this.messageService.add({ severity: 'warn', summary: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ' });
  }
  permissionFailed(){
    this.messageService.add({ severity: 'warn', summary: 'ບໍ່ມີສິດໃນການໃຊ້' });
  }
  branchNotFound(){
    this.messageService.add({ severity: 'warn', summary: 'ບໍ່ພົບສາຂາ' });
  }
  registerSuccess(){
    this.messageService.add({ severity: 'success', summary: 'ການລົງທະບຽນສຳເລັດ' });
  }
}
