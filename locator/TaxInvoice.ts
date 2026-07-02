export interface tax {
    taxId: string,
    taxFullName: string,
    taxAddress: string,
    taxEmail: string,
    taxSubDistrict: string,
    taxDistrict: string,
    taxProvince: string,
    taxZipcode: string,

}

export const taxInvoiceInfo: tax = {
    taxId: '#taxId',
    taxFullName: '#taxFullname',
    taxAddress: '#taxAddress',
    taxEmail: '#taxEmail',
    taxSubDistrict: '#taxSubDistrict',
    taxDistrict: '#taxDistrict',
    taxProvince: '#taxProvince',
    taxZipcode: '#taxZipcode'

}
