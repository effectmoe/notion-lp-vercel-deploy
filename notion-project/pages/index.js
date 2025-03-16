import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  
  // フォームステート管理
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  
  // フォーム送信状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  
  // 入力フィールド変更ハンドラ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  // フォーム送信ハンドラ
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 必須フィールドのバリデーション
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus({
        type: 'error',
        message: '必須項目を入力してください'
      });
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('/api/submit-to-notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          databaseId: '1b7b802cb0c6801f8ba3de20a22e93b1', // Notionデータベースのパブリックページ用ID
          ...formState
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'お問い合わせありがとうございます。近日中にご連絡いたします。'
        });
        setFormState({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error(data.message || '送信中にエラーが発生しました。');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        type: 'error',
        message: `エラーが発生しました: ${error.message}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 縦書きテキスト（文字ごとにレンダリング）
  const verticalText = 'そのシステム、イマドキですか？'.split('');
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Notion プラスアルファ - EFFECT Co. Ltd.</title>
        <meta name="description" content="Notionを活用したシステム構築で業務プロセスを改革。低コスト・短期間で導入可能な次世代の業務システムをご提案します。" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>EFFECT Co. Ltd.</div>
          <nav className={styles.mainNav}>
            <ul>
              <li><a href="#">ホーム</a></li>
              <li><a href="#">サービス</a></li>
              <li><a href="#">料金</a></li>
              <li><a href="#contact" className={styles.contactBtn}>お問い合わせはこちら</a></li>
            </ul>
          </nav>
          <div className={styles.mobileMenuBtn}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <div className={styles.notionLogo}>
                  <div className={styles.logoContainer}>
                    <img src="/Notion-logo-s.svg.png" alt="Notion Logo" className={styles.notionImg} />
                    <span className={styles.plus}>+</span>
                    {/* @マークを削除 */}
                  </div>
                </div>
                <h1 className={styles.heroTitle}>
                  Notionプラスア<br />ルファで作る<br />スマホ世代の簡単シス<br />テム
                </h1>
                <p className={styles.heroDescription}>
                  Notionを活用したシステム構築で業務プロセスを改革。<br />
                  低コスト・短期間で導入可能な次世代の業務システムをご提案します。
                </p>
                <div className={styles.ctaButtons}>
                  <a href="#contact" className={`${styles.btn} ${styles.primaryBtn}`}>無料相談を予約する</a>
                  <a href="#courses" className={`${styles.btn} ${styles.secondaryBtn}`}>Notionで学ぶ</a>
                  <a href="#demo" className={`${styles.btn} ${styles.orangeBtn}`}>デモを見る</a>
                </div>
              </div>
              <div className={styles.heroImage}>
                <img src="/1957dad0a3720.png" alt="ビジネスパーソンのイラスト" />
                
                {/* 縦書きテキスト */}
                <div className={styles.verticalContainer}>
                  {verticalText.map((char, index) => (
                    <div key={index} className={`${styles.verticalTextChar} ${styles[`char${index + 1}`]}`}>
                      {char}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 機能セクション */}
        <section className={styles.features} id="features">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>最先端のシステム統合機能</h2>
            <p className={styles.sectionDesc}>
              Notionの基本スキルで十分!便利なシステムのベストプラットフォーム。あらゆるビジネスプロセスを一緒に。複数のワークスペースも連携します。
            </p>
            
            <div className={styles.featuresGrid}>
              {/* 機能カード */}
              <div className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles.icon1}`}>
                  <i className="fas fa-globe"></i>
                </div>
                <h3>オールインワン情報管理</h3>
                <p>タスク管理、ドキュメント作成、知識ベース、顧客管理、営業管理などをひとつのプラットフォームで統合。サイロ化したデータからの解放を実現します。</p>
              </div>
              <div className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles.icon2}`}>
                  <i className="fas fa-cogs"></i>
                </div>
                <h3>内部ツール連携</h3>
                <p>Slack, Google Apps, Teams, Outlookなど、既に使用している社内ツールとノーコードで連携。追加の開発コスト無しでNotionと情報を共有します。</p>
              </div>
              <div className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles.icon3}`}>
                  <i className="fas fa-code"></i>
                </div>
                <h3>APIによるデータ連携</h3>
                <p>独自開発のAPIコネクタを使用して、既存システムやサードパーティサービスとNotionを連携。データの流れを自動化し、手動入力を削減します。</p>
              </div>
              {/* 追加の機能カード */}
              <div className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles.icon4}`}>
                  <i className="fas fa-project-diagram"></i>
                </div>
                <h3>ワークフロー自動化</h3>
                <p>ビジネスプロセスに合わせたワークフローをNotionで自動化。ステータス変更、通知、承認フローなど、煩雑な業務をスムーズに処理します。</p>
              </div>
              <div className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles.icon5}`}>
                  <i className="fas fa-database"></i>
                </div>
                <h3>マルチビューデータベース</h3>
                <p>同じデータを異なる視点で表示。カレンダー、カンバン、リスト、ギャラリーなど、用途に応じた最適な表示形式で情報を整理します。</p>
              </div>
              <div className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles.icon6}`}>
                  <i className="fas fa-lock"></i>
                </div>
                <h3>セキュリティとアクセス管理</h3>
                <p>ロールベースのアクセス制御、詳細な権限設定、監査ログ機能を実装。機密情報を保護しながら、必要な人に必要な情報だけを共有します。</p>
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section className={styles.contact} id="contact">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>お問い合わせ</h2>
            <p className={styles.sectionDesc}>
              Notionシステムに関するご質問やご相談は、お気軽にお問い合わせください。
            </p>
            
            <div className={styles.contactContent}>
              <div className={styles.companyInfo}>
                <div className={styles.companyLogo}>EFFECT</div>
                <div className={styles.companyDetails}>
                  <p><strong>Notionセットアップサービス</strong></p>
                  <p>お客様のニーズに合わせたNotionワークスペースのセットアップと構築をお手伝いします。</p>
                  <ul className={styles.companyLinks}>
                    <li><a href="#">導入事例</a></li>
                    <li><a href="#">Notionシステム開発について</a></li>
                    <li><a href="#">料金プラン</a></li>
                    <li><a href="#">よくあるご質問</a></li>
                  </ul>
                </div>
              </div>
              <div className={styles.contactForm}>
                <form id="inquiry-form" onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">お名前 <span className={styles.required}>*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formState.name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">メールアドレス <span className={styles.required}>*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formState.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="company">会社名</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formState.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">電話番号</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formState.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="message">お問い合わせ内容 <span className={styles.required}>*</span></label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '送信中...' : '無料相談を申し込む'}
                  </button>
                  
                  {formStatus.message && (
                    <div className={`${styles.formStatus} ${formStatus.type === 'success' ? styles.success : styles.error}`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>EFFECT Co. Ltd.</div>
            <div className={styles.footerLinks}>
              <ul>
                <li><a href="#">ホーム</a></li>
                <li><a href="#">サービス</a></li>
                <li><a href="#">事例</a></li>
                <li><a href="#">会社概要</a></li>
                <li><a href="#">お問い合わせ</a></li>
              </ul>
            </div>
            <div className={styles.footerSocial}>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className={styles.copyright}>
            <p>&copy; 2025 EFFECT Co. Ltd. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}