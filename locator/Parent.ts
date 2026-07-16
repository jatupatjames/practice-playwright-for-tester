export interface ParentInfo {
    fullName : string,
    address : string,
    email : string,
    mobile : string,
    nextButton : string
}

export const parentInfo:ParentInfo = {
fullName: '#parentFullname',
address: '#parentAddress',
email : '#parentEmail',
mobile : '#parentMobileNo',
nextButton : '.ant-btn:has-text("ดำเนินการต่อ")'

}
