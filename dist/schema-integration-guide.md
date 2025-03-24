# Schema.org 構造化データ実装ガイド

このガイドでは、Schema.org 構造化データをウェブサイトに実装する方法について説明します。構造化データを実装することで、検索エンジンはコンテンツをより正確に理解し、リッチスニペットとして検索結果に表示できるようになります。

## 実装方法

### 方法1: 静的 JSON-LD タグの追加（推奨）

各HTMLファイルの `<head>` セクション内に、Schema.orgデータを直接埋め込みます。これは最も確実で高速な方法です。

```html
<head>
    <!-- 既存のメタタグなど -->
    
    <!-- Schema.org データ -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "EFFECT Co. Ltd.",
      "url": "https://effect.co.jp",
      <!-- 他の Organization データ -->
    }
    </script>
    
    <!-- 他のスキーマタイプも同様に追加 -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      <!-- WebSite スキーマデータ -->
    }
    </script>
    
    <!-- 残りのhead要素 -->
</head>
```

### 方法2: JavaScriptによる動的追加

`schema-loader.min.js` ファイルを使用して、JavaScriptで動的にSchema.orgデータを追加します。

```html
<head>
    <!-- 既存のメタタグなど -->
    
    <!-- Schema.org ローダースクリプト (非同期読み込み) -->
    <script src="/dist/schema-loader.min.js" defer></script>
    
    <!-- 残りのhead要素 -->
</head>
```

## どのページにどのスキーマを実装するか

1. **すべてのページに実装するスキーマ**:
   - Organization
   - WebSite
   
2. **トップページ（index.html）のみに実装するスキーマ**:
   - SoftwareApplication (Product)
   - Service
   
3. **FAQセクションがあるページに実装するスキーマ**:
   - FAQPage
   
4. **顧客の声/レビューセクションがあるページに実装するスキーマ**:
   - Review

## 実装手順

### 1. 静的 JSON-LD タグの追加 (方法1)

1. 各HTMLファイルの `<head>` セクション内の既存のSchema.orgタグを確認します
2. `dist/schema.org-data.js` からコピーした構造化データを、JSONに変換して追加します
3. 複数のスキーマタイプを追加する場合は、それぞれ別の `<script type="application/ld+json">` タグ内に配置します

### 2. JavaScript による動的追加 (方法2)

1. 各HTMLファイルの `<head>` セクション内に次のスクリプトタグを追加します:
   ```html
   <script src="/dist/schema-loader.min.js" defer></script>
   ```

2. このスクリプトは、DOMContentLoadedイベント時に自動的にすべてのSchema.orgデータを追加します

## 検証方法

実装後、以下のツールを使用して構造化データが正しく実装されているか確認してください:

1. [Google リッチリザルトテスト](https://search.google.com/test/rich-results)
2. [Schema.org Validator](https://validator.schema.org/)

## スキーマ一覧

当サイトで実装する構造化データは以下の通りです:

1. **Product/SoftwareApplication**: Notionコンサルティングサービスの詳細情報
2. **FAQPage**: よくある質問と回答
3. **Review**: お客様の声/レビュー
4. **Organization**: 会社情報
5. **WebSite**: ウェブサイト全体の情報
6. **Service**: 提供サービスの詳細情報

## 注意事項

- 構造化データ内の情報はウェブサイト上の実際のコンテンツと一致する必要があります
- 連絡先情報や住所など、機密情報は公開前に確認してください
- 更新があった場合は、構造化データも適宜更新してください