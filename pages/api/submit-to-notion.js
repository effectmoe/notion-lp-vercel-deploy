// pages/api/submit-to-notion.js
import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // デバッグ情報を追加
    console.log('環境変数:', {
      apiKey: process.env.NOTION_API_KEY ? '設定済み' : '未設定',
      dbId: process.env.NOTION_DATABASE_ID ? '設定済み' : '未設定'
    });
    
    console.log('リクエストボディ:', req.body);

    // APIキーとデータベースIDのチェック
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionDatabaseId = process.env.NOTION_DATABASE_ID;

    if (!notionApiKey) {
      console.error('NOTION_API_KEY is missing');
      return res.status(500).json({ 
        success: false, 
        message: 'サーバー設定エラー: APIキーが設定されていません' 
      });
    }

    if (!notionDatabaseId) {
      console.error('NOTION_DATABASE_ID is missing');
      return res.status(500).json({ 
        success: false, 
        message: 'サーバー設定エラー: データベースIDが設定されていません' 
      });
    }

    // Notion API クライアントの初期化
    const notion = new Client({
      auth: notionApiKey,
    });

    const { name, email, company, phone, message } = req.body;
    const databaseId = notionDatabaseId || req.body.databaseId;
    
    // リクエストデータの検証
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: '必須項目を入力してください' 
      });
    }

    // Notionへのリクエスト直前にデータを記録
    console.log('Notionへ送信するデータ:', {
      database_id: databaseId,
      properties: {
        Name: name,
        Email: email,
        Company: company || '',
        Phone: phone || '',
        Message: message
      }
    });

    // Notionデータベースに新しいページ（エントリー）を作成
    try {
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

      console.log('Notion API レスポンス:', response.id);
      
      return res.status(200).json({ 
        success: true, 
        message: 'お問い合わせを受け付けました',
        pageId: response.id
      });
    } catch (notionError) {
      console.error('Notion API エラー詳細:', notionError);
      
      // より詳細なエラーメッセージ
      let errorDetail = '';
      if (notionError.body) {
        errorDetail = `Code: ${notionError.body.code}, Message: ${notionError.body.message}`;
        console.error('Notion エラー詳細:', errorDetail);
      }
      
      throw notionError; // 外側のcatchブロックで処理
    }
  } catch (error) {
    console.error('エラータイプ:', error.constructor.name);
    console.error('エラーメッセージ:', error.message);
    
    // エラーメッセージをより詳細に
    let errorMessage = '内部エラーが発生しました';
    
    if (error.code === 'validation_error') {
      errorMessage = 'フォームの入力内容に問題があります';
    } else if (error.code === 'unauthorized') {
      errorMessage = 'APIキーの認証に失敗しました';
    } else if (error.code === 'object_not_found') {
      errorMessage = '指定されたデータベースが見つかりません';
    }
    
    return res.status(500).json({ 
      success: false, 
      message: errorMessage, 
      error: error.message 
    });
  }
}