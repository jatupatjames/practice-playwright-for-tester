import { Locator } from "@playwright/test";

export interface LoginLocator {
    username: string;
    password: string;
    loginButton: string;
    forgotPassword: string;
    rememberMe: string;
    registerButton: string;
    loginMode: string;
    signupMode: string;
}

export const loginLocator: LoginLocator = {
    username: '#identifier',
    password: '#password',
    loginButton: 'button[type="submit"]',
    forgotPassword: 'button:has-text("ลืมรหัสผ่าน?")',
    rememberMe: 'label:has-text("จดจำฉันในระบบ")',
    registerButton: 'button:has-text("สมัครสมาชิกใหม่")',
    loginMode: 'div[title="เข้าสู่ระบบ"]',
    signupMode: 'div[title="สมัครสมาชิก"]',
};
