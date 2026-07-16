export interface field {
    thFirstName: string,
    thLastName: string,
    enFirstName: string,
    enLastName: string,
    nickname: string,
    country: string,
    dateOfBirth: string
    racerGpNo: string
    RaceDateOption: string
    RaceTypeDropdown: string
    RaceTypeOption: string,
    racerShirtSize: string,
    category: string,
    nextButton: string,
    gdFirstName: string,
    gdAddress: string,
    gdEmail: string,
    gdPhone: string,
}

export const racerInfo: field = {
    thFirstName: '#racerList_0_firstnameTh',
    thLastName: '#racerList_0_lastnameTh',
    enFirstName: '#racerList_0_firstnameEn',
    enLastName: '#racerList_0_lastnameEn',
    nickname: '#racerList_0_nickname',
    country: '#racerList_0_nationality',
    dateOfBirth: '#racerList_0_dateOfBirth',
    racerGpNo: '#racerList_0_racerGpNo',
    gdFirstName: '#parentFullname',
    gdAddress: '#parentAddress',
    gdEmail: '#parentEmail',
    gdPhone: '#parentMobileNo',
    RaceDateOption: 'button:has-text("สถานที่")',
    RaceTypeDropdown: '.ant-select:not(.ant-select-disabled)',
    RaceTypeOption: '.ant-select-dropdown:visible span.ant-typography',
    racerShirtSize: '.shirt-size-label',
    category: '.ant-select-lg:has-text("คลิกเพื่อเลือกรุ่นการแข่งขันหลัก")',
    nextButton: '.ant-btn:has-text("ดำเนินการต่อ")'


}

export const racerInfo2: field = {
    thFirstName: '#racerList_1_firstnameTh',
    thLastName: '#racerList_1_lastnameTh',
    enFirstName: '#racerList_1_firstnameEn',
    enLastName: '#racerList_1_lastnameEn',
    nickname: '#racerList_1_nickname',
    country: '#racerList_1_nationality',
    dateOfBirth: '#racerList_1_dateOfBirth',
    racerGpNo: '#racerList_1_racerGpNo',
    gdFirstName: '#parentFullname',
    gdAddress: '#parentAddress',
    gdEmail: '#parentEmail',
    gdPhone: '#parentMobileNo',
    RaceDateOption: '#root > div > div > div:nth-child(2) > div > form > div > div > div.ant-space.css-ypkju9.ant-space-vertical.css-var-_r_0_ > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div.ant-row.css-ypkju9.css-var-_r_0_ > div:nth-child(17) > div > div.ant-space.css-ypkju9.ant-space-vertical.css-var-_r_0_ > div > div > div.ant-card-body > div > div:nth-child(1)',
    RaceTypeDropdown: '#root > div > div > div:nth-child(2) > div > form > div > div > div.ant-space.css-ypkju9.ant-space-vertical.css-var-_r_0_ > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div.ant-row.css-ypkju9.css-var-_r_0_ > div:nth-child(17) > div > div.ant-flex.css-ypkju9.css-var-_r_0_.ant-flex-align-stretch.ant-flex-vertical > div.ant-flex.css-ypkju9.css-var-_r_0_.ant-flex-align-stretch.ant-flex-vertical > div > div > div > div.ant-card-body > div > div.ant-card.css-zn1hci.ant-card-bordered.css-9bmmw4.css-ypkju9.css-var-_r_0_ > div.ant-card-body > div',
    RaceTypeOption: 'body > div:nth-child(9) > div',
    racerShirtSize: '.shirt-size-label',
    category: '.ant-select-lg:has-text("คลิกเพื่อเลือกรุ่นการแข่งขันหลัก")',
    nextButton: '.ant-btn:has-text("ดำเนินการต่อ")'
}
