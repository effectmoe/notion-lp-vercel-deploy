document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded イベント発火');
    
    // ヒーローセクションのフェードイン効果
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        setTimeout(() => {
            heroText.style.opacity = '1';
        }, 300);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '1';
        }, 600);
    }
    
    // ハンバーガーメニュー処理
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    console.log('モバイルメニュー要素:', {
        hamburgerBtn: hamburgerBtn ? '見つかりました' : '見つかりません',
        mobileMenu: mobileMenu ? '見つかりました' : '見つかりません'
    });
    
    if (hamburgerBtn && mobileMenu) {
        console.log('ハンバーガーメニューのイベントリスナーを設定します');
        
        hamburgerBtn.addEventListener('click', function() {
            console.log('ハンバーガーがクリックされました');
            
            // aria-expanded属性の切り替え
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // メニューの表示/非表示
            mobileMenu.classList.toggle('active');
            
            // aria-hidden属性の切り替え
            mobileMenu.setAttribute('aria-hidden', isExpanded);
            
            console.log('メニュー状態:', {
                active: mobileMenu.classList.contains('active'),
                'aria-expanded': !isExpanded,
                'aria-hidden': isExpanded
            });
        });
    }
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // モバイルメニューが開いていれば閉じる
                if (mobileMenu && mobileMenu.classList.contains('active') && hamburgerBtn) {
                    mobileMenu.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    mobileMenu.setAttribute('aria-hidden', 'true');
                }
            }
        });
    });
    
    // フォーム送信処理
    const contactForm = document.getElementById('inquiry-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 必須項目の検証
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    const errorElement = document.getElementById(`${field.id}-error`);
                    if (errorElement) {
                        errorElement.textContent = '必須項目です';
                        errorElement.style.display = 'block';
                    }
                } else {
                    field.classList.remove('error');
                    
                    const errorElement = document.getElementById(`${field.id}-error`);
                    if (errorElement) {
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                    }
                }
            });
            
            if (isValid) {
                // フォームデータの取得
                const formData = new FormData(contactForm);
                const formValues = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    company: formData.get('company') || '',
                    phone: formData.get('phone') || '',
                    message: formData.get('message')
                };
                
                // 送信ボタンの状態変更
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = '送信中...';
                submitBtn.disabled = true;
                
                // API送信
                fetch('/api/submit-to-notion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formValues)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`サーバーエラー: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        // 成功メッセージ表示
                        document.getElementById('form-success').style.display = 'block';
                        document.getElementById('form-error').style.display = 'none';
                        contactForm.reset();
                    } else {
                        throw new Error(data.message || 'フォーム送信に失敗しました');
                    }
                })
                .catch(error => {
                    console.error('送信エラー:', error);
                    document.getElementById('form-error').style.display = 'block';
                    document.getElementById('form-success').style.display = 'none';
                })
                .finally(() => {
                    // ボタンを元に戻す
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // 5秒後にメッセージを非表示
                    setTimeout(() => {
                        document.getElementById('form-success').style.display = 'none';
                        document.getElementById('form-error').style.display = 'none';
                    }, 5000);
                });
            }
        });
    }
    
    // アニメーション効果
    const revealElements = document.querySelectorAll('.feature-card, .why-card, .testimonial-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
        
        // リビールアニメーションのスタイル追加
        const style = document.createElement('style');
        style.textContent = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
});