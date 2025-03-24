# ウェブサイト最適化ガイド

このガイドでは、サイトの読み込み速度を向上させるための最適化手順について説明します。

## 実装済みの最適化

1. **CSS・JavaScript の縮小 (ミニファイ)**
   - `styles.min.css`: 縮小版のCSSファイル
   - `script.min.js`: 縮小版のJavaScriptファイル

2. **画像の最適化**
   - すべての画像がWebP形式で最適化済み
   - `<picture>` タグの利用による互換性の確保

3. **共通ヘッダーの最適化**
   - `common-head.html`: 最適化された共通のヘッダー部分

## 実装手順

### 1. HTML ファイルの更新

各HTMLファイルで次の変更を行います：

```html
<!-- 変更前 -->
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>

<!-- 変更後 -->
<link rel="stylesheet" href="styles.min.css">
<script src="script.min.js" defer></script>
```

`defer` 属性を追加することで、JavaScriptの読み込みが非同期で行われ、ページの表示速度が向上します。

### 2. 共通ヘッダーの導入

各ページのヘッド部分を `common-head.html` の内容に置き換えて、SEO関連の meta タグなどを追加します。

### 3. 画像の遅延読み込み

重要でない画像に `loading="lazy"` 属性を追加します：

```html
<img src="image.webp" alt="説明" loading="lazy" width="300" height="200">
```

### 4. フォントの最適化

Googleフォントからの読み込みは、必要なウェイトのみに制限し、`preconnect` を使用して事前接続を行います：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## その他の推奨最適化

1. **サーバーサイドのキャッシュ設定**
   - 静的リソース（CSS、JS、画像）に適切なキャッシュヘッダーを設定
   - Cache-Control: max-age=31536000 (1年間)

2. **CDNの導入検討**
   - 静的ファイルをCDN（Cloudflare等）で配信することで速度向上

3. **コード分割の検討**
   - 機能ごとにJavaScriptを分割し、必要な部分のみ読み込む

4. **パフォーマンス監視**
   - Google PageSpeed Insights や Lighthouse を定期的に実行し、パフォーマンスを監視

## パフォーマンステスト

以下のツールを使用して、定期的にウェブサイトのパフォーマンスをテストしてください：

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 対応済みファイル

- dist/styles.min.css
- dist/script.min.js
- dist/index.optimized.html
- dist/common-head.html