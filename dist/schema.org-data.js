// Product Schema
const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Notion コンサルティングサービス",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Notionを活用したDX・業務効率化・プロジェクト管理システムを低コストで構築。ノーコードで顧客管理やタスク管理、データベース自動化を実現し、企業のデジタルトランスフォーメーションを加速します。",
  "offers": {
    "@type": "Offer",
    "price": "50000",
    "priceCurrency": "JPY",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "featureList": "プロジェクト管理、タスク管理、顧客管理、業務効率化、データベース自動化、ノーコード開発",
  "screenshot": "https://effect.co.jp/notion/images/notion-screenshot.webp",
  "provider": {
    "@type": "Organization",
    "name": "EFFECT Co. Ltd.",
    "url": "https://effect.co.jp"
  }
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Notionの導入にはどのくらいの期間がかかりますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "基本的な導入は2〜4週間で完了します。企業規模や要件の複雑さによって期間は変動しますが、段階的な導入プランをご提案し、迅速に効果を実感いただけるようサポートします。"
      }
    },
    {
      "@type": "Question",
      "name": "既存のシステムやツールとの連携は可能ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、可能です。NotionはAPI連携機能を備えており、Slack、Google Workspace、Microsoft Office、Salesforceなど多くの外部ツールと連携できます。既存システムとのシームレスな統合をサポートし、情報の分断を解消します。"
      }
    },
    {
      "@type": "Question",
      "name": "導入後のサポート体制はどうなっていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "導入後も安心のサポート体制を整えています。定期的なチェックイン、トレーニングセッション、技術サポート、カスタマイズ対応など、継続的なサービス改善と最適化をお約束します。サポートプランは、ベーシック、スタンダード、プレミアムの3種類からお選びいただけます。"
      }
    },
    {
      "@type": "Question",
      "name": "Notionの料金体系はどうなっていますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notionの基本ライセンス料金に加え、弊社のコンサルティングや構築サービスの料金が必要です。コンサルティングは初期費用50,000円〜、システム構築は要件に応じて100,000円〜となります。詳細は料金プランページでご確認いただけます。"
      }
    },
    {
      "@type": "Question",
      "name": "従業員向けのトレーニングは提供していますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、包括的なトレーニングプログラムを提供しています。基本操作から高度な機能まで、オンラインセミナーやハンズオンワークショップを通じて、従業員の方々が効果的にNotionを活用できるようサポートします。また、業務別のマニュアル作成もサポートしています。"
      }
    }
  ]
};

// Review Schema
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Notion コンサルティングサービス",
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "鈴木 健太"
      },
      "reviewBody": "Notionの導入により、社内のコミュニケーションが劇的に改善されました。以前は複数のツールを使い分けていましたが、今では一つのプラットフォームで完結しています。特にプロジェクト管理の効率化が顕著です。"
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "田中 美咲"
      },
      "reviewBody": "マーケティング部門でNotionを活用しています。キャンペーン管理やコンテンツカレンダーの運用が非常に楽になりました。操作性も良く、チーム全体の生産性が向上しています。"
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "佐藤 裕一"
      },
      "reviewBody": "弊社の営業プロセスがNotionによって可視化され、案件管理が格段に効率的になりました。カスタマイズの柔軟性と直感的な操作性が気に入っています。"
    }
  ]
};

// 企業情報のSchema.org
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EFFECT Co. Ltd.",
  "url": "https://effect.co.jp",
  "logo": "https://effect.co.jp/logo.png",
  "sameAs": [
    "https://twitter.com/effect_jp",
    "https://www.facebook.com/effect.jp",
    "https://www.linkedin.com/company/effect-jp"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+81-3-XXXX-XXXX",
    "contactType": "customer service",
    "availableLanguage": ["Japanese", "English"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "JP",
    "postalCode": "XXX-XXXX",
    "addressRegion": "Tokyo",
    "addressLocality": "Shibuya"
  }
};

// WebSite Schema（既存を拡張）
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Notionで実現するDX・業務効率化・プロジェクト管理",
  "url": "https://effect.co.jp/notion/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://effect.co.jp/notion/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "description": "Notionを活用したDX・業務効率化・プロジェクト管理システムを低コストで構築。ノーコードで顧客管理やタスク管理、データベース自動化を実現し、企業のデジタルトランスフォーメーションを加速します。",
  "publisher": {
    "@type": "Organization",
    "name": "EFFECT Co. Ltd."
  }
};

// サービスタイプのSchema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Notion コンサルティング",
  "provider": {
    "@type": "Organization",
    "name": "EFFECT Co. Ltd."
  },
  "name": "Notionシステム構築サービス",
  "description": "企業のデジタルトランスフォーメーションを加速するNotionベースの業務システム構築、コンサルティング、トレーニングを提供します。",
  "offers": {
    "@type": "Offer",
    "price": "50000",
    "priceCurrency": "JPY",
    "priceValidUntil": "2025-12-31"
  },
  "areaServed": "JP",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Notionサービスプラン",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "初期構築プラン"
        },
        "price": "100000",
        "priceCurrency": "JPY"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "カスタム開発プラン"
        },
        "price": "300000",
        "priceCurrency": "JPY"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "保守・サポートプラン"
        },
        "price": "50000",
        "priceCurrency": "JPY",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "50000",
          "priceCurrency": "JPY",
          "unitCode": "MON", 
          "billingDuration": "P1M"
        }
      }
    ]
  }
};