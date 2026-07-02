export interface field {
    thFirstName : string,
    thLastName : string,
    enFirstName : string,
    enLastName : string,
    nickname : string,
    country : string,
    dateOfBirth : string
    racerGpNo : string
    RaceDateOption: string
    RaceTypeDropdown: string
    RaceTypeOption: string,
    racerShirtSize : string,
    category : string,
    nextButton : string,
    gdFirstName : string,
    gdAddress : string,
    gdEmail : string,
    gdPhone : string,
    }

export const racerInfo:field = {
    thFirstName: '#racerList_0_firstnameTh',
    thLastName: '#racerList_0_lastnameTh',
    enFirstName : '#racerList_0_firstnameEn',
    enLastName : '#racerList_0_lastnameEn',
    nickname : '#racerList_0_nickname',
    country : '#racerList_0_nationality',
    dateOfBirth: '#racerList_0_dateOfBirth',
    racerGpNo : '#racerList_0_racerGpNo',
    gdFirstName : '#parentFullname',
    gdAddress : '#parentAddress',
    gdEmail : '#parentEmail',
    gdPhone : '#parentMobileNo',
    RaceDateOption: 'button:has-text("สถานที่")',
    RaceTypeDropdown: '.ant-select:not(.ant-select-disabled)',
    RaceTypeOption: '.ant-select-dropdown:visible span.ant-typography',
    racerShirtSize : '.shirt-size-label',
    category : '.ant-select-lg:has-text("คลิกเพื่อเลือกรุ่นการแข่งขันหลัก")',
    nextButton : '.ant-btn:has-text("ดำเนินการต่อ")'


}
