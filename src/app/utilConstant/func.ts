import * as moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export const pPdfExport = (htmlStringId: string, fileName: string) => {
    const momentName = moment().unix();
    /*     doc.addFileToVFS('NotoSansLao-Regular.ttf', boonBanRegular);
        doc.addFont('NotoSansLao-Regular.ttf', 'NotoSansLao-Regular', 'normal');
        doc.setFont('NotoSansLao-Regular');
        doc.addFileToVFS('BoonBan-Regular.ttf', boonBanRegular);
        doc.addFont('BoonBan-Regular.ttf', 'BoonBan-Regular', 'normal');
        doc.setFont('BoonBan-Regular'); */
    html2canvas(document.getElementById(htmlStringId) as HTMLElement, {
        scale: 1,
        imageTimeout: 0,
        onclone: function (clonedDoc: Document) {
            (clonedDoc.getElementById(htmlStringId) as HTMLElement).style.display = 'block';
        }
    }).then(function (canvas) {
        let pdf = new jsPDF('p', 'mm');
        let width = pdf.internal.pageSize.getWidth();
        let height = pdf.internal.pageSize.getHeight();

        let widthRatio = width / canvas.width;
        let heightRatio = height / canvas.height;

        let ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
        pdf.addImage(
            canvas.toDataURL('image/png', 1.0),
            'PNG',
            0,
            0,
            canvas.width * ratio,
            canvas.height * ratio,
        )
        pdf.save(`${fileName}-${momentName}.pdf`);

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
}

export const pPDFBilling = (id: string) => {
    let data = <HTMLElement>document.getElementById(id);
    console.log(data);
    html2canvas(data, {
        useCORS: true,
        allowTaint: true,
    }).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png', 1.0)
        console.log(contentDataURL);
        let pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: [100, 140]
        });
        pdf.addImage(contentDataURL, 'PNG', 12.5, 0, 75, 140);
        window.open(pdf.output("bloburl"));
    });
}