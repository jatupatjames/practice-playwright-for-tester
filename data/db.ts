import { Client } from 'pg';

const dbConfig = {
  host: 'db.prior-dev.app',
  port: 2492,
  database: 'grandprix_db',
  user: 'grandprix_app',
  password: 'Ey6AxX322CPz2U8d',
};

//function ดึง OTP จาก DB
export async function getOtpFromDb(email: string): Promise<string> {
  const client = new Client(dbConfig);
  await client.connect();

  const result = await client.query(
    `SELECT o.otp
     FROM rb_otp o
     JOIN rb_user u ON u.user_id = o.user_id
     WHERE u.email = $1
       AND o.action_type = 'FORGOT_PASSWORD'
       AND o.expire_date > NOW()
     ORDER BY o.created_date DESC
     LIMIT 1`,
    [email]
  );

  await client.end();

  if (result.rows.length === 0) {
    throw new Error(`ไม่พบ OTP สำหรับ ${email}`);
  }

  return String(result.rows[0].otp);
}
