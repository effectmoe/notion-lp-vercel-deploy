document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded イベント発火 (script.js)');
    
    // ハンバーガーメニュー機能
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function() {
            const isActive = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', !isActive);
            mobileMenu.setAttribute('aria-hidden', isActive);
            
            // ESCキーでモバイルメニューを閉じる機能
            const onKeyDown = (e) => {
                if (e.key === 'Escape') {
                    mobileMenu.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    mobileMenu.setAttribute('aria-hidden', 'true');
                    document.removeEventListener('keydown', onKeyDown);
                }
            };
            
            if (!isActive) {
                document.addEventListener('keydown', onKeyDown);
                
                // モバイルメニュー内の最初のリンクにフォーカスを移動
                const firstLink = mobileMenu.querySelector('a');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
        
        // モバイルメニュー内のリンククリック時にメニューを閉じる
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }
    
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
        // 入力フィールドごとのバリデーション関数
        const validators = {
            name: value => {
                if (!value.trim()) return '必須項目です';
                if (value.length > 100) return '100文字以内で入力してください';
                return '';
            },
            email: value => {
                if (!value.trim()) return '必須項目です';
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) 
                    return '有効なメールアドレスを入力してください';
                return '';
            },
            phone: value => {
                if (value.trim() && !/^[0-9\-+\s()]*$/.test(value)) 
                    return '有効な電話番号を入力してください';
                return '';
            },
            message: value => {
                if (!value.trim()) return '必須項目です';
                if (value.length < 10) return '10文字以上入力してください';
                if (value.length > 1000) return '1000文字以内で入力してください';
                return '';
            }
        };

        // インプットフィールドのリアルタイムバリデーション
        const fields = ['name', 'email', 'phone', 'message'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(`${fieldId}-error`);
            
            if (field && errorElement) {
                field.addEventListener('blur', function() {
                    const error = validators[fieldId]?.(field.value) || '';
                    errorElement.textContent = error;
                    errorElement.style.display = error ? 'block' : 'none';
                    field.setAttribute('aria-invalid', error ? 'true' : 'false');
                    
                    if (error) {
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // すべてのフィールドを検証
            let isValid = true;
            const formValues = {};
            
            fields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                const errorElement = document.getElementById(`${fieldId}-error`);
                
                if (field && errorElement && validators[fieldId]) {
                    const error = validators[fieldId](field.value);
                    errorElement.textContent = error;
                    errorElement.style.display = error ? 'block' : 'none';
                    field.setAttribute('aria-invalid', error ? 'true' : 'false');
                    
                    if (error) {
                        field.classList.add('error');
                        isValid = false;
                    } else {
                        field.classList.remove('error');
                        formValues[fieldId] = field.value;
                    }
                }
            });
            
            // 会社名フィールドの追加（必須ではない）
            const companyField = document.getElementById('company');
            if (companyField) {
                formValues.company = companyField.value || '';
            }
            
            if (isValid) {
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
                    const errorElement = document.getElementById('form-error');
                    errorElement.textContent = error.message || '送信中にエラーが発生しました。しばらく経ってから再度お試しください。';
                    errorElement.style.display = 'block';
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