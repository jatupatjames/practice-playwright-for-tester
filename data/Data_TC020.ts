export interface RacerInfo {
    thFirstName : string,
    thLastName : string,
    enFirstName : string,
    enLastName : string,
    nickname : string,
    birthDate: string,
    shirtSize: string,
    gender : string,
    raceDate : string,
    mainCategory : string,
    subCategory? : string
}

export const racer1 : RacerInfo = {
  thFirstName: 'วัชรพล',
  thLastName: 'ดีใจ',
  enFirstName: 'Watcharapon',
  enLastName: 'Deejai',
  nickname: 'Wan',
  birthDate: '01/01/2018',
  shirtSize: 'M',
  gender : 'ชาย (Boy)',
  raceDate : 'เสาร์',
  mainCategory : 'รุ่นอายุ 8.1-10.0 ปี',
  subCategory : 'รุ่นโอเพ่นโปร เกิดปี 2013-2019 (Open Pro/2013-2019) - 600 ฿'
};

export const racer2 : RacerInfo = {
  thFirstName: 'กชพรรณ',
  thLastName: 'ดีใจ',
  enFirstName: 'Kodchaphan',
  enLastName: 'Deejai',
  nickname: 'Kade',
  birthDate: '01/01/2020',
  shirtSize: 'S',
  gender : 'หญิง (Girl)',
  raceDate : 'เสาร์',
  mainCategory : 'รุ่นอายุ 6 ปี "B"'
};

export interface GuardianInfo {
    fullName : string,
    address : string,
    mobileNo : string,
    email : string
}

export const guardian : GuardianInfo = {
  fullName: 'ธนิสร แสงสว่าง',
  address: '12/34 ตำบลช้างเผือก อำเภอเมือง จังหวัดเชียงใหม่ 50300',
  mobileNo: '0812345678',
  email: 'Tanisorn@gmail.com'
};

export const coupon = {
  code: 'COUPON10'
};

export const taxInvoice = {
  taxId: '0105536000062',
  taxFullName: 'บริษัท runbike จำกัด',
  taxAddress: '12/3 ถนนสาทร',
  taxEmail: 'tax@gmail.com',
  taxSubDistrict: 'สีลม',
  taxDistrict: 'บางรัก',
  taxProvince: 'กรุงเทพมหานคร',
  taxZipcode: '10500'
};
