export interface MasterCardData {
  accountID: string;
  expiryDate: string;
  CVC: string;
  nameAccount: string;
}

export const masterCard: MasterCardData = {
  accountID: '5372074248113841',
  expiryDate: '12/30',
  CVC: '123',
  nameAccount: 'Test Payment',
};