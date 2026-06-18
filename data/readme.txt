ปรับเป็น 4 folders
- action -> เอาไว้เก็บ function
- data -> เอาไว้เก็บข้อมูลที่จะกรอก
- locator -> เอาไว้เก็บ locator ของแต่ละ element บนหน้าจอ
- main -> file หลักไว้ run test


1. ภายใน folder action ยังไม่แน่ใจว่าควรตั้งชื่อไฟล์ยังไงให้เหมาะสม
2. ภายใน folder data ให้ตั้งชื่อไฟล์เป็นชื่อหน้า เช่น Login.ts , Register.ts , RacerInfo.ts หรือตั้งตามที่เห็นว่าสมควร
3. ภายใน folder locator ให้ตั้งชื่อไฟล์เป็นชื่อหน้า เช่น Login.ts , Register.ts , RacerInfo.ts หรือตั้งตามที่เห็นว่าสมควร
4. ภายใจ folder main ให้ตั้งตาม test case ตัวเองเป็น (พอดี Scenario ที่ gen มามันยาวไปหน่อย ตั้งเป็นเลข test case ไปก่อน เล่น TC_001)

Note: ใครมีไฟล์ค้างอยู่ในไฟล์ Actions.ts , Assert.ts , Auth.ts ย้ายไปใสใน file .ts ของหน้าตัวเองด้วย