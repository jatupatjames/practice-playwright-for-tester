export interface button{
RegisterBtn : string // ปุ่มสมัครสมาชิกบน header หน้า login/register
LoginBtn : string // ปุ่มเข้าสู่ระบบบน header หน้า login/register
RegisterTab : string // tab สมัครสมาชิกในกล่อง login/register
LoginTab : string // tab เข้าสู่ระบบในกล่อง login/register
SubmitRegister : string // ปุ่ม submit สมัครสมาชิกในหน้า register
SubmitLogin : string // ปุ่ม submit เข้าสู่ระบบในหน้า login
Logout : string //  ปุ่มออกจากระบบหลัง แบบหน้าจอเล็ก
LogoutX : string // ปุ่มออกจากระบบหลัง แบบหน้าจอใหญ่
History : string // ปุ่มดูประวัติ เมื่อเปิดจอใหญ่ อยู่ข้าง logout
RegisterMore : string // ปุ่มลงทะเบียนเพิ่ม
ClosePopup : string // ปุ่ม X ปิด modal/popup
SelectCompetition : string // ปุ่ม/การ์ดเลือกสมัครเข้าร่วมการแข่งขันใน popup รายการ event
CancelPopup : string // ปุ่มยกเลิกใน popup
ReadPDPA : string // ปุ่มอ่านนโยบายความเป็นส่วนตัวในหน้า consent
ReadRules : string // ปุ่มอ่านกฎกติกาทั้งหมดในหน้า consent
ForgotPassword : string // ปุ่มลืมรหัสผ่าน
RegisterNew : string // ปุ่มสมัครสมาชิกใหม่ 
Back : string // ปุ่มกลับในหน้า forgot password
SendOTP : string // ปุ่มส่งรหัส OTP ในหน้า forgot password
VerifyOTP : string // ปุ่มยืนยัน OTP ใน flow forgot password
SaveNewPassword : string // ปุ่มบันทึกรหัสผ่านใหม่ใน flow forgot password
BackToLogin : string // ปุ่มกลับเข้าสู่ระบบหลัง reset password สำเร็จ
PasswordToggle : string // icon แสดง/ซ่อนรหัสผ่านในช่อง password
RegistrationHistory : string // ปุ่ม/แท็บประวัติการลงทะเบียนบนหน้าประวัติ
HistoryCard : string // การ์ดรายการประวัติการลงทะเบียนของนักแข่ง
EditInfo : string // ปุ่มแก้ไขข้อมูลในรายการประวัติ
AgreeAndAccept : string // ปุ่มรับทราบและยอมรับใน modal PDPA และ modal กฎกติกา
Continue : string // ปุ่มดำเนินการต่อใน step ลงทะเบียน
BackStep : string // ปุ่มย้อนกลับใน step ลงทะเบียน
CloseTextPopup : string // ปุ่มปิดแบบข้อความใน modal
Download : string // ปุ่ม download เอกสารใน modal PDPA/rules
ReadAgain : string // ปุ่มเปิดอ่านอีกครั้งในหน้า consent
RaceDateSaturday : string // ปุ่มเลือกวันแข่งวันเสาร์ในฟอร์มข้อมูลนักแข่ง
RaceDateSunday : string // ปุ่มเลือกวันแข่งวันอาทิตย์ในฟอร์มข้อมูลนักแข่ง
ShirtSizeS : string // ปุ่มเลือกไซส์เสื้อ S ใน Step 3 ข้อมูลนักแข่ง
ShirtSizeM : string // ปุ่มเลือกไซส์เสื้อ M ใน Step 3 ข้อมูลนักแข่ง
ShirtSizeL : string // ปุ่มเลือกไซส์เสื้อ L ใน Step 3 ข้อมูลนักแข่ง
ShirtSizeXL : string // ปุ่มเลือกไซส์เสื้อ XL ใน Step 3 ข้อมูลนักแข่ง
ShirtSizeXXL : string // ปุ่มเลือกไซส์เสื้อ XXL ใน Step 3 ข้อมูลนักแข่ง
AddRacer : string // ปุ่มเพิ่มนักแข่งอีกคนใน Step 3 ข้อมูลนักแข่ง
DeleteRacerIcon : string // ปุ่ม icon delete ใน section นักแข่งที่เพิ่มใน Step 3
ExtraCategoryDropdown : string // dropdown รุ่นเสริมที่เปิดใช้งานแล้วใน Step 3
ActiveSelectDropdown : string // dropdown options ที่กำลังเปิดอยู่และมองเห็นได้
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
SelectCompetition : '.ant-modal-body strong:has-text("สมัครเข้าร่วมการแข่งขันนี้")',
CancelPopup : 'button.ant-btn:has-text("ยกเลิก")',
ReadPDPA :'button:has-text("อ่านนโยบายความเป็นส่วนตัว")',
ReadRules :'button:has-text("อ่านกฎกติกาทั้งหมด")',
ForgotPassword : 'button:has-text("ลืมรหัสผ่าน?")',
RegisterNew : 'button:has-text("สมัครสมาชิกใหม่")',
Back : 'button:text-is("กลับ")',
SendOTP : 'button[type="submit"]:has-text("ส่งรหัส OTP")',
VerifyOTP : 'button:has-text("ยืนยัน OTP")',
SaveNewPassword : 'button:has-text("บันทึกรหัสผ่านใหม่")',
BackToLogin : 'button:has-text("กลับเข้าสู่ระบบ")',
PasswordToggle : 'span.ant-input-password-icon[role="button"]',
RegistrationHistory : 'button:has-text("ประวัติการลงทะเบียน")',
HistoryCard : 'button:has-text("#")',
EditInfo : 'button:has-text("แก้ไขข้อมูล")',
AgreeAndAccept : 'button:has-text("รับทราบและยอมรับ")',
Continue : 'button:has-text("ดำเนินการต่อ")',
BackStep : 'button:has-text("ย้อนกลับ")',
CloseTextPopup : '.ant-modal-container button:has-text("ปิด")',
Download : 'button[type="button"]:has(.lucide-download)',
ReadAgain : 'button:has-text("เปิดอ่านอีกครั้ง")',
RaceDateSaturday : 'button:has-text("เสาร์")',
RaceDateSunday : 'button:has-text("อาทิตย์")',
ShirtSizeS : '.shirt-size-label:text-is("S")',
ShirtSizeM : '.shirt-size-label:text-is("M")',
ShirtSizeL : '.shirt-size-label:text-is("L")',
ShirtSizeXL : '.shirt-size-label:text-is("XL")',
ShirtSizeXXL : '.shirt-size-label:text-is("XXL")',
AddRacer : 'button:has-text("เพิ่มนักแข่งอีกคน")',
DeleteRacerIcon : 'button.ant-btn-icon-only.ant-btn-dangerous:has(.lucide-trash-2)',
ExtraCategoryDropdown : '.ant-select-multiple:not(.ant-select-disabled)',
ActiveSelectDropdown : '.ant-select-dropdown:not(.ant-select-dropdown-hidden)',
}
