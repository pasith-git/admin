"use strict";
exports.__esModule = true;
exports.pPDFBilling = exports.pPdfExport = void 0;
var moment = require("moment");
var jspdf_1 = require("jspdf");
var html2canvas_1 = require("html2canvas");
exports.pPdfExport = function (htmlStringId, fileName) {
    var momentName = moment().unix();
    /*     doc.addFileToVFS('NotoSansLao-Regular.ttf', boonBanRegular);
        doc.addFont('NotoSansLao-Regular.ttf', 'NotoSansLao-Regular', 'normal');
        doc.setFont('NotoSansLao-Regular');
        doc.addFileToVFS('BoonBan-Regular.ttf', boonBanRegular);
        doc.addFont('BoonBan-Regular.ttf', 'BoonBan-Regular', 'normal');
        doc.setFont('BoonBan-Regular'); */
    html2canvas_1["default"](document.getElementById(htmlStringId), {
        scale: 1,
        imageTimeout: 0,
        onclone: function (clonedDoc) {
            clonedDoc.getElementById(htmlStringId).style.display = 'block';
        }
    }).then(function (canvas) {
        var pdf = new jspdf_1["default"]('p', 'mm');
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        var widthRatio = width / canvas.width;
        var heightRatio = height / canvas.height;
        var ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
        pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, canvas.width * ratio, canvas.height * ratio);
        pdf.save(fileName + "-" + momentName + ".pdf");
    });
    /* autoTable(doc, {
        head: [col],
        headStyles: {
            font: 'BoonBan-Regular',
            fontStyle: 'normal',
            fillColor: '#1D72BF',
            textColor: 'white',
            fontSize: 6
        },
        body: dataBody,
        bodyStyles: {
            font: 'BoonBan-Regular',
            fontStyle: 'normal',
            fontSize: 6
        },
        foot: footer,
        footStyles: {
            font: 'BoonBan-Regular',
            fontStyle: 'normal',
            fontSize: 7,
            fillColor: '#F4F4F4',
            textColor: 'black',
        },
        theme: 'plain',
    }); */
};
exports.pPDFBilling = function (id) {
    var data = document.getElementById(id);
    console.log(data);
    html2canvas_1["default"](data, {
        useCORS: true,
        allowTaint: true
    }).then(function (canvas) {
        var contentDataURL = canvas.toDataURL('image/png', 1.0);
        console.log(contentDataURL);
        var pdf = new jspdf_1["default"]({
            orientation: 'p',
            unit: 'mm',
            format: [100, 140]
        });
        pdf.addImage(contentDataURL, 'PNG', 12.5, 0, 75, 140);
        window.open(pdf.output("bloburl"));
    });
};
