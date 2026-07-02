export interface RacerInfo {
    thFirstName : string,
    thLastName : string,
    enFirstName : string,
    enLastName : string,
    nickname : string,
    birthDate: string,
    shirtSize: string,
    country : string,
    gender : string,
    raceDate : string,
    category : string
}


export const racer1 : RacerInfo = {
  thFirstName: 'ฟาริท',
  thLastName: 'ป้องภัย',
  enFirstName: 'Farith',
  enLastName: 'Pongpai',
  nickname: 'Jay',
  birthDate: '10/10/2018',
  shirtSize: 'M',
  country: 'Thailand',
  gender : 'ชาย (Boy)',
  raceDate : 'เสาร์',
  category : 'รุ่นอายุ 7.1 -8.0 ปี'

};

export const racer2 : RacerInfo = {
  thFirstName: 'ธนิน',
  thLastName: 'แก้วมาลา',
  enFirstName: 'Tanin',
  enLastName: 'Kaewmala',
  nickname: 'Alex',
  birthDate: '20/04/2020',
  shirtSize: 'S',
  country: 'Thailand',
  gender : 'ชาย (Boy)',
  raceDate : 'เสาร์',
  category : 'รุ่นอายุ 6 ปี "B"'

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
