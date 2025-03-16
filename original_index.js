import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ show: false, type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 入力データの変更を処理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // フォーム送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 必須項目の検証
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        show: true,
        type: 'error',
        message: '必須項目を入力してください'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-to-notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          databaseId: '1b7b802cb0c6801f8ba3de20a22e93b1',
          ...formData
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({
          show: true,
          type: 'success',
          message: 'お問い合わせありがとうございます。近日中にご連絡いたします。'
        });
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      } else {
        throw new Error(data.message || '送信中にエラーが発生しました。');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        show: true,
        type: 'error',
        message: 'エラーが発生しました: ' + error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // フェードインアニメーション効果
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) setTimeout(() => { heroText.style.opacity = '1'; }, 300);
    if (heroImage) setTimeout(() => { heroImage.style.opacity = '1'; }, 600);
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // インタセクションオブザーバー
    if ('IntersectionObserver' in window) {
      const revealElements = document.querySelectorAll('.feature-card, .why-card, .testimonial-card');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Notion プラスアルファ - EFFECT Co. Ltd.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Notionを活用したシステム構築で業務プロセスを改革。低コスト・短期間で導入可能な次世代の業務システム" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-color: #37352f;
          --secondary-color: #e16259;
          --accent-color: #2eaadc;
          --bg-light: #f7f7f7;
          --text-color: #37352f;
          --text-light: #6b7280;
          --border-color: #e5e7eb;
          --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          --container-width: 1200px;
        }

        body {
          font-family: 'Noto Sans JP', 'Inter', sans-serif;
          line-height: 1.6;
          color: var(--text-color);
          background-color: #fff;
        }

        .container {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header Styles */
        header {
          background-color: #37352f;
          padding: 15px 0;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 0 20px;
        }

        .logo {
          font-weight: 700;
          font-size: 18px;
          color: #ffffff;
        }

        .main-nav ul {
          display: flex;
          list-style: none;
          gap: 30px;
        }

        .main-nav a {
          text-decoration: none;
          color: #ffffff;
          font-weight: 500;
          transition: color 0.3s;
        }

        .main-nav a:hover {
          color: #F0B259;
        }

        .contact-btn {
          background-color: #9D7AB3;
          padding: 8px 16px;
          border-radius: 4px;
          color: #ffffff;
        }

        .contact-btn:hover {
          background-color: #9d7ab3a8;
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }

        .mobile-menu-btn span {
          display: block;
          width: 25px;
          height: 3px;
          background-color: #ffffff;
          border-radius: 3px;
        }

        /* Hero Section */
        .hero {
          padding: 80px 0;
          background-color: var(--bg-light);
          overflow: hidden;
        }

        .hero-content {
          display: flex;
          gap: 50px;
          align-items: center;
          position: relative;
        }

        .hero-text {
          flex: 1;
          opacity: 0;
          transition: opacity 0.8s ease;
        }

        .notion-logo {
          margin-bottom: 30px;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .notion-img {
          width: 140px;
          height: auto;
        }

        .plus {
          font-size: 24px;
          margin: 0 10px;
          font-weight: bold;
        }

        .hero-text h1 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.3;
          width: 280px;
        }

        .hero-text p {
          font-size: 16px;
          margin-bottom: 40px;
          color: var(--text-light);
        }

        .hero-image {
          flex: 1;
          position: relative;
          display: flex;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.8s ease;
        }

        .hero-image img {
          max-width: 100%;
          height: auto;
        }

        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .btn {
          padding: 10px 20px;
          border-radius: 4px;
          font-weight: 500;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          font-size: 14px;
          text-align: center;
        }

        .primary-btn {
          background-color: #9D7AB3;
          color: #fff;
        }

        .primary-btn:hover {
          background-color: #9d7ab3a8;
        }

        .secondary-btn {
          background-color: #4db6ac;
          color: #fff;
        }

        .secondary-btn:hover {
          background-color: #4DB6AC;
        }

        .orange-btn {
          background-color: #F0B259;
          color: #fff;
        }

        .orange-btn:hover {
          background-color: #d15249;
        }

        /* Vertical Text Container */
        .vertical-container {
          position: absolute;
          top: -40px;
          right: 280px;
          display: flex;
          flex-direction: column;
        }
        
        .vertical-text-char {
          writing-mode: vertical-rl;
          text-orientation: upright;
          margin: 0;
          font-weight: 500;
          font-size: 16px;
          color: #333;
          animation: fadeIn 0.15s forwards;
          opacity: 0;
          line-height: 1;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* 各文字に対して遅延設定 */
        .char-1 { animation-delay: 0.1s; }
        .char-2 { animation-delay: 0.25s; }
        .char-3 { animation-delay: 0.4s; }
        .char-4 { animation-delay: 0.55s; }
        .char-5 { animation-delay: 0.7s; }
        .char-6 { animation-delay: 0.85s; }
        .char-7 { animation-delay: 1s; }
        .char-8 { animation-delay: 1.15s; }
        .char-9 { animation-delay: 1.3s; }
        .char-10 { animation-delay: 1.45s; }
        .char-11 { animation-delay: 1.6s; }
        .char-12 { animation-delay: 1.75s; }
        .char-13 { animation-delay: 1.9s; }
        .char-14 { animation-delay: 2.05s; }
        .char-15 { animation-delay: 2.2s; }

        /* Contact Form */
        .contact {
          padding: 80px 0;
        }

        .contact-content {
          display: flex;
          gap: 40px;
          margin-top: 40px;
        }

        .company-info {
          flex: 1;
        }

        .company-logo {
          font-weight: 700;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .company-details p {
          margin-bottom: 15px;
          color: var(--text-light);
        }

        .company-links {
          list-style: none;
          margin-top: 30px;
        }

        .company-links li {
          margin-bottom: 8px;
        }

        .company-links a {
          color: var(--accent-color);
          text-decoration: none;
        }

        .company-links a:hover {
          text-decoration: underline;
        }

        .contact-form {
          flex: 1;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-family: inherit;
        }

        .required {
          color: #e16259;
        }

        .submit-btn {
          background-color: #8b5cf6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.3s;
        }

        .submit-btn:hover {
          background-color: #7c4fec;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-status {
          margin-top: 15px;
          padding: 10px;
          border-radius: 4px;
          display: none;
        }
        
        .form-status.success {
          display: block;
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .form-status.error {
          display: block;
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        /* Footer */
        footer {
          background-color: #37352f;
          color: white;
          padding: 60px 0 30px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .footer-logo {
          font-weight: 700;
          font-size: 20px;
        }

        .footer-links ul {
          list-style: none;
          display: flex;
          gap: 20px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: white;
        }

        .footer-social {
          display: flex;
          gap: 15px;
        }

        .footer-social a {
          color: rgba(255, 255, 255, 0.7);
          font-size: 20px;
          transition: color 0.3s;
        }

        .footer-social a:hover {
          color: white;
        }

        .copyright {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
          text-align: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-nav {
            display: none;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
          
          .hero-content {
            flex-direction: column;
          }
          
          .hero-text, .hero-image {
            flex: none;
            width: 100%;
          }
          
          .vertical-container {
            position: static;
            margin-top: 20px;
            flex-direction: row;
            justify-content: center;
          }
          
          .vertical-text-char {
            writing-mode: horizontal-tb;
          }
          
          .contact-content {
            flex-direction: column;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 20px;
            align-items: center;
          }
          
          .footer-links ul {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        .revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

      <header>
        <div className="header-content">
          <div className="logo">EFFECT Co. Ltd.</div>
          <nav className="main-nav">
            <ul>
              <li><a href="#">ホーム</a></li>
              <li><a href="#">サービス</a></li>
              <li><a href="#">料金</a></li>
              <li><a href="#contact" className="contact-btn">お問い合わせはこちら</a></li>
            </ul>
          </nav>
          <div className="mobile-menu-btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <div className="notion-logo">
                  <div className="logo-container">
                    <img src="/Notion-logo-s.svg.png" alt="Notion Logo" className="notion-img" />
                    <span className="plus">+</span>
                  </div>
                </div>
                <h1>Notionプラスア<br />ルファで作る<br />スマホ世代の簡単シス<br />テム</h1>
                <p>Notionを活用したシステム構築で業務プロセスを改革。<br />低コスト・短期間で導入可能な次世代の業務システムをご提案します。</p>
                <div className="cta-buttons">
                  <a href="#contact" className="btn primary-btn">無料相談を予約する</a>
                  <a href="#courses" className="btn secondary-btn">Notionで学ぶ</a>
                  <a href="#demo" className="btn orange-btn">デモを見る</a>
                </div>
              </div>
              <div className="hero-image">
                <img src="/1957dad0a3720.png" alt="ビジネスパーソンのイラスト" />
                
                <div className="vertical-container">
                  <div className="vertical-text-char char-1">そ</div>
                  <div className="vertical-text-char char-2">の</div>
                  <div className="vertical-text-char char-3">シ</div>
                  <div className="vertical-text-char char-4">ス</div>
                  <div className="vertical-text-char char-5">テ</div>
                  <div className="vertical-text-char char-6">ム</div>
                  <div className="vertical-text-char char-7">、</div>
                  <div className="vertical-text-char char-8">イ</div>
                  <div className="vertical-text-char char-9">マ</div>
                  <div className="vertical-text-char char-10">ド</div>
                  <div className="vertical-text-char char-11">キ</div>
                  <div className="vertical-text-char char-12">で</div>
                  <div className="vertical-text-char char-13">す</div>
                  <div className="vertical-text-char char-14">か</div>
                  <div className="vertical-text-char char-15">？</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container">
            <h2 className="section-title">お問い合わせ</h2>
            <p className="section-desc">Notionシステムに関するご質問やご相談は、お気軽にお問い合わせください。</p>
            
            <div className="contact-content">
              <div className="company-info">
                <div className="company-logo">EFFECT</div>
                <div className="company-details">
                  <p><strong>Notionセットアップサービス</strong></p>
                  <p>お客様のニーズに合わせたNotionワークスペースのセットアップと構築をお手伝いします。</p>
                  <ul className="company-links">
                    <li><a href="#">導入事例</a></li>
                    <li><a href="#">Notionシステム開発について</a></li>
                    <li><a href="#">料金プラン</a></li>
                    <li><a href="#">よくあるご質問</a></li>
                  </ul>
                </div>
              </div>
              <div className="contact-form">
                <form id="inquiry-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">お名前 <span className="required">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">メールアドレス <span className="required">*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">会社名</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">電話番号</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">お問い合わせ内容 <span className="required">*</span></label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '送信中...' : '無料相談を申し込む'}
                  </button>
                  {formStatus.show && (
                    <div className={`form-status ${formStatus.type}`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">EFFECT Co. Ltd.</div>
            <div className="footer-links">
              <ul>
                <li><a href="#">ホーム</a></li>
                <li><a href="#">サービス</a></li>
                <li><a href="#">事例</a></li>
                <li><a href="#">会社概要</a></li>
                <li><a href="#">お問い合わせ</a></li>
              </ul>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 EFFECT Co. Ltd. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}