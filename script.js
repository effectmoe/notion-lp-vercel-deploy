document.addEventListener('DOMContentLoaded', function () {
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
    
    // モバイルメニューの処理
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function () {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-hidden', isExpanded);
        });
    }

    // アンカーリンクの処理
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            event.preventDefault();
            const targetId = href.replace('#', '');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const yOffset = -80; // ヘッダーの高さを考慮したオフセット
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });

                // モバイルメニューが開いている場合は閉じる
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    mobileMenu.setAttribute('aria-hidden', 'true');
                }
                
                // フォーカスを移動先に設定
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                // スクリーンリーダーに通知
                targetElement.setAttribute('aria-live', 'polite');
            }
        });
    });
    
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
    
    // フォームバリデーション機能
    const form = document.getElementById('inquiry-form');
    if (form) {
        // 各フィールドのバリデーションルール
        const validationRules = {
            name: {
                required: true,
                pattern: /.{1,100}/,
                message: '名前を入力してください（100文字以内）'
            },
            email: {
                required: true,
                pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '有効なメールアドレスを入力してください'
            },
            phone: {
                required: false,
                pattern: /^[0-9\-+\s()]*$/,
                message: '有効な電話番号を入力してください'
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000,
                message: 'お問い合わせ内容を10〜1000文字で入力してください'
            }
        };
        
        // フォーム送信前のバリデーション
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // 全フィールドのバリデーション
            Object.keys(validationRules).forEach(fieldName => {
                const field = document.getElementById(fieldName);
                const errorElement = document.getElementById(`${fieldName}-error`);
                const rules = validationRules[fieldName];
                
                if (field && errorElement) {
                    // エラーメッセージをリセット
                    errorElement.textContent = '';
                    field.classList.remove('invalid');
                    
                    // 必須チェック
                    if (rules.required && !field.value.trim()) {
                        isValid = false;
                        field.classList.add('invalid');
                        errorElement.textContent = rules.message || '入力してください';
                        return;
                    }
                    
                    // 最小長チェック
                    if (rules.minLength && field.value.length < rules.minLength) {
                        isValid = false;
                        field.classList.add('invalid');
                        errorElement.textContent = `${rules.minLength}文字以上で入力してください`;
                        return;
                    }
                    
                    // 最大長チェック
                    if (rules.maxLength && field.value.length > rules.maxLength) {
                        isValid = false;
                        field.classList.add('invalid');
                        errorElement.textContent = `${rules.maxLength}文字以内で入力してください`;
                        return;
                    }
                    
                    // パターンチェック
                    if (rules.pattern && field.value.trim() && !rules.pattern.test(field.value)) {
                        isValid = false;
                        field.classList.add('invalid');
                        errorElement.textContent = rules.message || '正しい形式で入力してください';
                        return;
                    }
                }
            });
            
            // 全てのバリデーションが通ったら送信処理
            if (isValid) {
                // フォームデータ取得
                const formData = new FormData(form);
                const formDataObj = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    company: formData.get('company') || '',
                    phone: formData.get('phone') || '',
                    message: formData.get('message'),
                    source: window.location.href,
                    timestamp: new Date().toISOString()
                };

                // 送信データ作成
                const requestData = {
                    data: formDataObj
                };

                // 送信ボタン無効化
                const submitBtn = form.querySelector('.submit-btn');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = '送信中...';
                submitBtn.disabled = true;

                // セキュリティ対策: CSRFトークン生成
                const csrfToken = Math.random().toString(36).substring(2, 15) + 
                                  Math.random().toString(36).substring(2, 15);
                
                // APIリクエスト送信
                fetch('/api/submit-to-notion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-Token': csrfToken
                    },
                    body: JSON.stringify(requestData)
                })
                .then(response => {
                    console.log('API応答:', response.status);
                    // レスポンスのJSONを解析
                    return response.json().then(data => {
                        console.log('API応答データ:', data);
                        if (response.ok) {
                            // 成功
                            document.getElementById('form-success').style.display = 'block';
                            document.getElementById('form-error').style.display = 'none';
                            form.reset();
                        } else {
                            // エラー
                            console.error('サーバーエラー:', response.status, data);
                            document.getElementById('form-error').style.display = 'block';
                            document.getElementById('form-success').style.display = 'none';
                        }
                    }).catch(error => {
                        console.error('JSON解析エラー:', error);
                        if (response.ok) {
                            // JSONではないがレスポンスは成功
                            document.getElementById('form-success').style.display = 'block';
                            document.getElementById('form-error').style.display = 'none';
                            form.reset();
                        } else {
                            // エラー
                            document.getElementById('form-error').style.display = 'block';
                            document.getElementById('form-success').style.display = 'none';
                        }
                    });
                })
                .catch(error => {
                    // ネットワークエラー
                    console.error('通信エラー:', error);
                    document.getElementById('form-error').style.display = 'block';
                    document.getElementById('form-error').textContent = '通信エラーが発生しました。ネットワーク接続を確認してください。';
                    document.getElementById('form-success').style.display = 'none';
                })
                .finally(() => {
                    // ボタンを元に戻す
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;

                    // 5秒後にメッセージ非表示
                    setTimeout(() => {
                        document.getElementById('form-success').style.display = 'none';
                        document.getElementById('form-error').style.display = 'none';
                    }, 5000);
                });
            }
        });
        
        // リアルタイムバリデーション
        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}-error`);
            
            if (field && errorElement) {
                field.addEventListener('blur', function() {
                    validateField(field, errorElement, validationRules[fieldName]);
                });
            }
        });
    }
    
    // フィールドバリデーション関数
    function validateField(field, errorElement, rules) {
        // エラーメッセージをリセット
        errorElement.textContent = '';
        field.classList.remove('invalid');
        
        // 必須チェック
        if (rules.required && !field.value.trim()) {
            field.classList.add('invalid');
            errorElement.textContent = rules.message || '入力してください';
            return false;
        }
        
        // 最小長チェック
        if (rules.minLength && field.value.length < rules.minLength) {
            field.classList.add('invalid');
            errorElement.textContent = `${rules.minLength}文字以上で入力してください`;
            return false;
        }
        
        // 最大長チェック
        if (rules.maxLength && field.value.length > rules.maxLength) {
            field.classList.add('invalid');
            errorElement.textContent = `${rules.maxLength}文字以内で入力してください`;
            return false;
        }
        
        // パターンチェック (必須でない場合は空白でなければチェック)
        if (rules.pattern && field.value.trim() && !rules.pattern.test(field.value)) {
            field.classList.add('invalid');
            errorElement.textContent = rules.message || '正しい形式で入力してください';
            return false;
        }
        
        return true;
    }
});