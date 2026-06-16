import { Page } from '@playwright/test';
import { Client } from 'pg';

export interface Login {
    jamesUsername : string,
    jamesPassword : string
    }

export interface ResetPassword {
    forgetEmail: string, 
    newPassword: string,
    }

export const loginInfo: Login = {
  jamesUsername: '0888614919',
  jamesPassword: 'P@ssw0rd',
}
