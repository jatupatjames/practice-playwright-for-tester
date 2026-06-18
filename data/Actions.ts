import { Page } from '@playwright/test';

export interface Checkbox {
    AnnualMember : string
    }

export const checkboxName:Checkbox = {
AnnualMember: '#racerList_0_annualMember'

}

//UploadAuthorizeFile
export interface UploadAuthFile{
UploadBtn : string
deleteBth : string
}

export const locatorUploadAuthorizeFile:UploadAuthFile = {
    UploadBtn:'span.ant-upload-btn',
    deleteBth : '//*[@id="racerList_0_authorizeFile"]/div/div/button',
}

//Ann test 

