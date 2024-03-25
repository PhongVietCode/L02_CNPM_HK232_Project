import { Component, Injector, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { IAjaxResponse, TokenService } from 'abp-ng2-module';
import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
    selector: 'fileUpload',
    templateUrl: './file-upload.component.html',
})

export class FileUploadComponent extends AppComponentBase implements OnInit {
    fileUploaded: boolean = false;
    public getJSonValue: any;
    public postJSonValue: string = "Hành trình_43b0.pdf";
    private formData: FormData;
    constructor(injector: Injector, private _tokenService: TokenService, private http: HttpClient) {
        super(injector);
    }
    ngOnInit() {

    }
    onFileChange(event: any): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.formData = new FormData();
            this.formData.append('file', file);
        }
    }
    save(): void {
        if (this.formData && this.fileUploaded) {
            this.http.post("https://localhost:44301/UploadFile", this.formData).subscribe((resp: any) => {
                if (resp.success) {
                    this.message.success(this.l('FileSavedSuccessfully', resp));
                    console.log(resp)
                    this.fileUploaded= true;
                    this.postJSonValue = resp["result"];
                } else {
                    this.message.error(resp.error.message);
                }
            })
        }
    }
    onDownloadFile(event: any): void{
        this.http.get('https://localhost:44301/DownloadFile?filename=Hành trình_43b0.pdf', { observe: 'response',responseType: 'blob' })
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

}