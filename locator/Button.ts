export interface button{
RegisterBtn : string
LoginBtn : string
RegisterTab : string
LoginTab : string
SubmitRegister : string
SubmitLogin : string
Logout : string
LogoutX : string
History : string
RegisterMore : string
ClosePopup : string
SelectCompetition : string
CancelPopup : string
ReadPDPA : string
ReadRules : string
}

export const Btn:button={
RegisterBtn : 'button.ant-btn-primary.ant-btn-dangerous:has-text("สมัครสมาชิก")',
LoginBtn : 'button.ant-btn-text:has-text("เข้าสู่ระบบ")',
RegisterTab : 'div.ant-segmented-item-label[title="สมัครสมาชิก"]',
LoginTab : 'div.ant-segmented-item-label[title="เข้าสู่ระบบ"]',
SubmitRegister : 'button[type="submit"]:has-text("สมัครสมาชิก")',
SubmitLogin : 'button[type="submit"]:has-text("เข้าสู่ระบบ")',
Logout :'button[type="button"]:has-text("ออก")',
LogoutX : 'svg.lucide-x.hover\:text-white', // ใส่ "\" เพื่อบอกให้ระบบรู้ว่านี่คือชื่อคลาสปกติ ไม่ใช่ Pseudo-class
History : 'button[type="button"]:has-text("ประวัติของฉัน")',
RegisterMore :'button[type="button"]:has-text("ลงทะเบียนเพิ่ม")',
ClosePopup : 'button.ant-modal-close',
SelectCompetition : 'div:has(strong:has-text("สมัครเข้าร่วมการแข่งขันนี้"))',
CancelPopup : 'button.ant-btn:has-text("ยกเลิก")',
ReadPDPA :'button:has-text("อ่านนโยบายความเป็นส่วนตัว")',
ReadRules :'button:has-text("อ่านกฎกติกาทั้งหมด")',
}
