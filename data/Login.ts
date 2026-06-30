export interface Login {
    jamesUsername : string,
    jamesPassword : string,
    BenzUsername : string,
    BenzPassword : string,
    aingUsername : string,
    aingPassword : string,
    }

export const loginInfo: Login = {
  jamesUsername: '0888614919',
  jamesPassword: 'P@ssw0rd',
  BenzUsername: '0966614947',
  BenzPassword: 'defJBenz4443',
  aingUsername: 'nuengruethai180444@gmail.com',
  aingPassword: 'Test1234',
}


export interface ResetPassword {
    forgetEmail: string, 
    newPassword: string,
    }

export const forgetInfo: ResetPassword = {
  forgetEmail: 'sarunyoochimmalee@gmail.com',
  newPassword: 'ABC456',
}
