import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { CreateDocumentInput, DocumentServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'createDocumentModal',
    templateUrl: './create-document-component.html'
})
export class CreateDocumentComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modal' , { static: false }) modal: ModalDirective;
    @ViewChild('titleInput' , { static: false }) titleInput: ElementRef;

    document: CreateDocumentInput = new CreateDocumentInput();

    active: boolean = false;
    saving: boolean = false;

    constructor(
        injector: Injector,
        private _documentService: DocumentServiceProxy
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
        console.log(this.document.idNumber)
        this._documentService.createDocument(this.document)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(this.document);
            });
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }
}
