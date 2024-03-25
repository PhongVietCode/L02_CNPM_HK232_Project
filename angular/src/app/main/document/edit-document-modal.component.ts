import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DocumentServiceProxy, EditDocumentInput } from '@shared/service-proxies/service-proxies';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'editDocumentModal',
  templateUrl: './edit-document-modal.component.html'
})
export class EditDocumentModalComponent extends AppComponentBase {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>(); // this will be called by parent component

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('documentInput') documentInput: ElementRef;

  document: EditDocumentInput = new EditDocumentInput();
  oldDocument: any;

  active: boolean = false;
  saving: boolean = false;
  isShowDiv: boolean = true;
  formData: FormData;
  documentFilePath: any;
  _documentFilePath: any;

  visible: boolean = false;

  constructor(
    injector: Injector,
    private _documentService: DocumentServiceProxy,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    super(injector);
  }

  show(documentId: any): void {
    this.active = true;
    this._documentService.getDocumentForEdit(documentId).subscribe((result) => {
      this.document = result;
      this.oldDocument = this.document;
      this.documentFilePath = this.document.filePath;
      this.modal.show();
    });
  }
  onShown(): void {
    this.documentInput.nativeElement.focus();
  }

  save(): void {
    this.message.confirm(
      "This step can not be undone.", "Save the file",
      (isConfirmed) => {
        if (isConfirmed) {
          this.saving = true;
          this._documentService.editDocument(this.document)
            .subscribe(() => {
              this.notify.info(this.l('SavedSuccessfully'));
              this.close();
              this.modalSave.emit(this.document);
            });
          this.saving = false;
          console.log("is confirmed")
        }
      }
    )

  }

  close(): void {
    this.modal.hide();
    this.active = false;
    this.isShowDiv = false;
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData = new FormData();
      this.formData.append('file', file);
      if (file) {
        this.formData = new FormData();
        this.formData.append('file', file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this._documentFilePath = e.target.result;
        }
        reader.readAsArrayBuffer(file);
      }
    }
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
  showDiaglog(): void {
    this.visible = true
  }
  deleteFileUpLoad(): void {
    this.documentFilePath = null;
    this.document.filePath = null;
  }
}
