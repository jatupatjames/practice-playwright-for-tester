export interface Payment {
    cardNo : string,
    expDate : string,
    cvv : string,
    nameOnCard : string,
    paymentButton : string
}

export const payment:Payment = {
cardNo: '#:r0:',
expDate: '#:r1:',
cvv: '#:r2:',
nameOnCard: '#:r3:',
paymentButton: '.ant-btn:has-text("ชำระเงิน")'


}
