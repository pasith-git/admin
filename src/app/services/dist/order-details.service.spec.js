"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var order_details_service_1 = require("./order-details.service");
describe('OrderDetailsService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(order_details_service_1.OrderDetailsService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
