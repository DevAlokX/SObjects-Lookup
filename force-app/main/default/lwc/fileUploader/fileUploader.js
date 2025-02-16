/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import uploadDocument from '@salesforce/apex/FileUploaderController.uploadDocument';
// eslint-disable-next-line no-unused-vars
import { RecordFieldDataType } from 'lightning/uiRecordApi';

export default class FileUploader extends LightningElement {
    // eslint-disable-next-line no-undef
    @api recordId;



    handleUpload(event) {
        const file = event.target.files[0];
        if (!file) {
            console.error("No file selected.");
            return;
        }
    
        const fileReader = new FileReader();
    
        fileReader.onload = () => {
            const base64Mark = 'base64,';
            const fileContents = btoa(fileReader.result); // Convert binary to base64
            this.uploadFile(file.name, fileContents);
        };
    
        fileReader.onerror = (error) => {
            console.error("Error reading file:", error);
        };
    
        fileReader.readAsBinaryString(file); // Reads the file as a binary string
    }
    

    uploadFile(file, fileContents) {   
        uploadDocument({ files: file, versionData: fileContents ,parent_id: this.recordId})
        .then(result => {
            console.log(result);
            //this.upLoaded = true;
            return refreshApex(this.wiredDocumentsResult);
        })
        .catch(error => {
            console.log(error);
        });
    }
}