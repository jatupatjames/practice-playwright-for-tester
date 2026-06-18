export interface History {
    addRacer : string,
    registerRacer : string,
    }

export const history: History = {
    addRacer :'button:has-text("ลงทะเบียนเพิ่ม")',
    registerRacer : 'span:has-text("สมัครเข้าร่วมการแข่งขันนี้")',
}