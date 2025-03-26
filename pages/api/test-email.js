// pages/api/test-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // SMTPの設定情報をログ出力
  console.log('SMTP設定情報:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USER ? '設定済み' : '未設定',
    pass: process.env.SMTP_PASSWORD ? '設定済み' : '未設定',
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
  });

  try {
    // トランスポーター作成
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
    // トランスポーターの検証
    await transporter.verify();
    console.log('SMTPサーバーへの接続成功');
    
    // テストメール送信
    const result = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'info@effect.moe',
      subject: 'テストメール',
      text: 'これはテストメールです。このメールが届いていれば、メール送信機能は正常に動作しています。',
    });
    
    console.log('メール送信成功:', result);
    return res.status(200).json({ success: true, message: 'テストメール送信成功', messageId: result.messageId });
  } catch (error) {
    console.error('メール送信エラー:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'メール送信に失敗しました', 
      error: error.message,
      stack: error.stack,
      code: error.code,
    });
  }
}