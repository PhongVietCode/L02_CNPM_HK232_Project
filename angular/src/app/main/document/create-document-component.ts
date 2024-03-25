import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { CreateDocumentInput, DocumentServiceProxy } from '@shared/service-proxies/service-proxies';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'createDocumentModal',
    templateUrl: './create-document-component.html'
})
export class CreateDocumentComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modal', { static: false }) modal: ModalDirective;
    @ViewChild('titleInput', { static: false }) titleInput: ElementRef;

    document: CreateDocumentInput = new CreateDocumentInput();

    active: boolean = false;
    saving: boolean = false;
    visible: boolean = false;

    private formData: FormData;
    documentFilePath: string = "";

    constructor(
        injector: Injector,
        private _documentService: DocumentServiceProxy,
        private http: HttpClient
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.document = new CreateDocumentInput();
        this.modal.show();
    }

    onShown(): void {
        this.titleInput.nativeElement.focus();
    }

    save(): void {
        
        this.saving = true;
        this._documentService.createDocument(this.document)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(this.document);
                this.documentFilePath = null;
            });
    }
    saveFile(): void {
        if (this.formData) {
            this.http.post("https://localhost:44301/UploadFile", this.formData).subscribe((resp: any) => {
                if (resp.success) {
                    this.message.success(this.l('FileSavedSuccessfully', resp));
                    this.document.filePath = resp["result"];
                } else {
                    this.message.error(resp.error.message);
                }
            })
        }
      }
    onFileChange(event: any): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log(file)
            if (file) {
                this.formData = new FormData();
                this.formData.append('file', file);
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.documentFilePath = e.target.result;
                }
                reader.readAsArrayBuffer(file);
            }
        }
    }
    onDownloadFile(event: any): void {
        this.http.get('https://localhost:44301/DownloadFile?filename=Hành trình_43b0.pdf', { observe: 'response', responseType: 'blob' })
            .subscribe((resp) => {
                console.log(resp)
                const blobData = resp.body;
                const url = window.URL.createObjectURL(blobData);
                const link = document.createElement('a');
                link.href = url;
                link.download = "File.pdf";
                link.click();
                // Clean up the blob URL
                window.URL.revokeObjectURL(url);
            });
    }
    showDiaglog(): void {
        this.visible = true
    }
    close(): void {
        this.modal.hide();
        this.active = false;
    }
}
