export interface Login {
  jamesUsername: string,
  jamesPassword: string,
  BenzUsername: string,
  BenzPassword: string,
  aingUsername: string,
  aingPassword: string,
  ployUsername: string,
  ployPassword: string,
  toeyUsername: string,
  toeyPassword: string
}

export const loginInfo: Login = {
  jamesUsername: '0888614919',
  jamesPassword: 'P@ssw0rd',
  BenzUsername: '0966614947',
  BenzPassword: 'defJBenz4443',
  aingUsername: 'nuengruethai180444@gmail.com',
  aingPassword: 'Test1234',
  ployUsername: '0933199971',
  ployPassword: 'P@ssw0rd',
  toeyUsername: '0889818509',
  toeyPassword: 'Toey8509'
}


export interface ResetPassword {
  forgetEmail: string,
  newPassword: string,
}

export const forgetInfo: ResetPassword = {
  forgetEmail: 'sarunyoochimmalee@gmail.com',
  newPassword: 'ABC456',
}
