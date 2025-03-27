document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded イベント発火');
    
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    // Add fade-in effect for hero section
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
    
    // モバイルメニュー処理のデバッグログ
    console.log('モバイルメニュー初期化開始');
    
    // モバイルメニューの処理
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    console.log('要素検索結果:', { 
        hamburgerBtn: hamburgerBtn ? 'found' : 'not found', 
        mobileMenu: mobileMenu ? 'found' : 'not found' 
    });
    
    // ハンバーガーメニュークリック処理関数を先に定義
    function handleHamburgerClick() {
        console.log('ハンバーガーメニューがクリックされました');
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        const newState = !isExpanded;
        hamburgerBtn.setAttribute('aria-expanded', newState);
        mobileMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-hidden', isExpanded);
        console.log('ハンバーガーメニュー状態変更:', { 
            isExpanded: newState, 
            mobileMenuActive: mobileMenu.classList.contains('active') 
        });
    }

    if (hamburgerBtn && mobileMenu) {
        console.log('ハンバーガーメニューのクリックイベントを設定');
        
        // シンプルなクリックハンドラーを直接設定
        hamburgerBtn.addEventListener('click', handleHamburgerClick);
    } else {
        console.error('ハンバーガーメニュー要素が見つかりません');
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('inquiry-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if(!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // エラーメッセージの表示
                    const errorElement = document.getElementById(`${field.id}-error`);
                    if(errorElement) {
                        errorElement.textContent = '必須項目です';
                        errorElement.style.display = 'block';
                    }
                } else {
                    field.classList.remove('error');
                    // エラーメッセージをクリア
                    const errorElement = document.getElementById(`${field.id}-error`);
                    if(errorElement) {
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                    }
                }
            });
            
            if(isValid) {
                // フォームデータの取得
                const formData = new FormData(contactForm);
                
                // フォームデータをオブジェクトに変換
                const formDataObj = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    company: formData.get('company') || '',
                    phone: formData.get('phone') || '',
                    message: formData.get('message'),
                    source: window.location.href,
                    timestamp: new Date().toISOString()
                };
                
                // デバッグ用：送信データをコンソールに出力
                console.log('送信データ:', formDataObj);
                
                // APIリクエスト用のデータフォーマット
                const requestData = formDataObj;
                
                // フォーム送信中の表示
                const submitButton = contactForm.querySelector('.submit-btn');
                const originalBtnText = submitButton.textContent;
                submitButton.textContent = '送信中...';
                submitButton.disabled = true;
                
                // 成功・エラーメッセージ要素の取得
                const successElement = document.getElementById('form-success');
                const errorElement = document.getElementById('form-error');
                
                fetch('/api/submit-to-notion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                })
                .then(response => {
                    console.log('レスポンスステータス:', response.status);
                    
                    if (!response.ok) {
                        throw new Error(`サーバーエラー: ${response.status}`);
                    }
                    
                    return response.json();
                })
                .then(data => {
                    console.log('APIレスポンス:', data);
                    
                    if (data.success) {
                        // 成功時の処理
                        if(successElement) {
                            successElement.style.display = 'block';
                        }
                        if(errorElement) {
                            errorElement.style.display = 'none';
                        }
                        contactForm.reset();
                    } else {
                        // サーバーからのエラーメッセージがある場合
                        throw new Error(data.message || 'フォーム送信に失敗しました');
                    }
                })
                .catch(error => {
                    // エラー処理
                    console.error('フォーム送信エラー:', error);
                    
                    if(errorElement) {
                        errorElement.textContent = error.message || '送信中にエラーが発生しました。しばらく経ってから再度お試しください。';
                        errorElement.style.display = 'block';
                    }
                    if(successElement) {
                        successElement.style.display = 'none';
                    }
                })
                .finally(() => {
                    // ボタンを元に戻す
                    submitButton.textContent = originalBtnText;
                    submitButton.disabled = false;
                    
                    // 5秒後にメッセージを非表示
                    setTimeout(() => {
                        if(successElement) successElement.style.display = 'none';
                        if(errorElement) errorElement.style.display = 'none';
                    }, 5000);
                });
            }
        });
    }
    
    // Add an intersection observer for reveal animations
    const revealElements = document.querySelectorAll('.feature-card, .why-card, .testimonial-card');
    
    if('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
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
        
        // Add reveal class style
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