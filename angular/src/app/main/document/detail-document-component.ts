import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { CreateDocumentInput, DocumentListDto, DocumentServiceProxy } from '@shared/service-proxies/service-proxies';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'detailDocumentModal',
    templateUrl: './detail-document-component.html'
})
export class DetailDocumentComponent extends AppComponentBase {
    document: DocumentListDto = null;
    visible: boolean = false;
    constructor(
        injector: Injector,
        private http: HttpClient
    ){
        super(injector)
    }
    show(document: any): void {
        this.document = document;
        this.visible = true;
        console.log(this.document.idNumber)
    }
    preViewDocument(): void {
        console.log(this.document.filePath)
        this.http.get(`https://localhost:44301/DownloadFile?filename=${this.document.filePath}`, { observe: 'response', responseType: 'blob' })
            .subscribe((resp) => {
                console.log(resp)
                const blobData = resp.body;
                const url = window.URL.createObjectURL(blobData);
                const link = document.createElement('a');
                link.href = url;
                link.target= "blank"
                // link.download = this.document.filePath;
                link.click();
                // Clean up the blob URL
                window.URL.revokeObjectURL(url);
            });
    }
    getDocumentTypeAsString(type: any): string{
        switch(type){
            case 0:
                return 'PDF';
            case 1:
                return 'Word';
            default:
                return "-";
        }
    }
}
