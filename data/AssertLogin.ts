export interface Login {
  title: string,
  welcomeText: string,
  username: string,
  password: string,
  usernamePlaceholder: string,
  passwordPlaceholder: string,
  forgotPassword: string,
  rememberMe: string,
  loginButton: string,
  noAccount: string,
  registerButton: string,
  url: RegExp
  loginSuccessMessage: RegExp
}


export const assertLogin: Login = {
    title: 'เข้าสู่ระบบ',
    welcomeText: 'ยินดีต้อนรับกลับ! เข้าสู่ระบบเพื่อลงทะเบียนนักแข่ง',
    username: 'อีเมลหรือเบอร์โทรศัพท์',
    password: 'รหัสผ่าน',
    usernamePlaceholder: 'email@example.com หรือ 0912345678',
    passwordPlaceholder: '••••••••',
    forgotPassword: 'ลืมรหัสผ่าน?',
    rememberMe: 'จดจำฉันในระบบ',
    loginButton: 'เข้าสู่ระบบ',
    noAccount: 'ยังไม่มีบัญชี?',
    registerButton: 'สมัครสมาชิกใหม่',
    url: /login/,
    loginSuccessMessage: /สวัสดี\s+.*\s+·\s+นี่คือรายการนักแข่งที่คุณลงทะเบียนไว้/
};