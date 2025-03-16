// Notion APIと通信するエンドポイント
import { Client } from '@notionhq/client';

// Notion API設定
const notion = new Client({
  auth: process.env.NOTION_API_KEY, // 環境変数からAPIキーを取得
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { databaseId, name, email, company, phone, message } = req.body;

    // Notionデータベースに新しいページ（エントリー）を作成
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name || '',
              },
            },
          ],
        },
        Email: {
          email: email || '',
        },
        Company: {
          rich_text: [
            {
              text: {
                content: company || '',
              },
            },
          ],
        },
        Phone: {
          phone_number: phone || '',
        },
        Message: {
          rich_text: [
            {
              text: {
                content: message || '',
              },
            },
          ],
        },
        Status: {
          select: {
            name: '未対応', // デフォルトのステータス
          },
        },
        'Created At': {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    return res.status(200).json({ 
      success: true, 
      message: 'お問い合わせを受け付けました',
      pageId: response.id
    });
  } catch (error) {
    console.error('Notion API Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: '内部エラーが発生しました', 
      error: error.message 
    });
  }
}