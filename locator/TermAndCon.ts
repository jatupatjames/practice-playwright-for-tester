export interface TermAndCon {
    pdpa : string,
    rules : string,
    agree : string,
    next : string,
    }

export const TermAndCon: TermAndCon = {
    pdpa :'button:has-text("อ่านนโยบายความเป็นส่วนตัว")',
    rules : 'button:has-text("อ่านกฎกติกาทั้งหมด")',
    agree : 'button:has-text("รับทราบและยอมรับ")',
    next : 'button:has-text("ดำเนินการต่อ")',
}