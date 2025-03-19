// Modal functionality for contact form popup
document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.createElement('div');
    modal.id = 'contact-modal';
    modal.className = 'modal';
    
    // Create modal content from existing form
    let contactForm = document.getElementById('contact').cloneNode(true);
    // Remove the section title and description to keep only the form part
    const formContainer = contactForm.querySelector('.contact-content');
    
    // Set up modal content
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>お問い合わせ</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="notification-context"></div>
                <div id="modal-form-container"></div>
            </div>
        </div>
    `;
    
    // Add to document body
    document.body.appendChild(modal);
    
    // Get the modal form container and add the form
    const modalFormContainer = document.getElementById('modal-form-container');
    if (formContainer) {
        modalFormContainer.appendChild(formContainer.cloneNode(true));
    }
    
    // Get close button
    const closeBtn = modal.querySelector('.modal-close');
    
    // Close modal functionality
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Function to open modal
    function openModal(notificationType) {
        // Reset form fields and messages
        const modalForm = modal.querySelector('form');
        if (modalForm) {
            modalForm.reset();
            const formSuccess = modal.querySelector('#form-success');
            const formError = modal.querySelector('#form-error');
            if (formSuccess) formSuccess.style.display = 'none';
            if (formError) formError.style.display = 'none';
        }
        
        // Set notification context
        const notificationContext = modal.querySelector('.notification-context');
        if (notificationContext) {
            if (notificationType === 'release') {
                notificationContext.innerHTML = '<p class="notification-message">リリース通知を受け取るには以下のフォームにご記入ください。</p>';
                notificationContext.classList.add('release-notification');
                notificationContext.classList.remove('dev-notification');
            } else if (notificationType === 'development') {
                notificationContext.innerHTML = '<p class="notification-message">開発状況の最新情報をお受け取りになるには以下のフォームにご記入ください。</p>';
                notificationContext.classList.add('dev-notification');
                notificationContext.classList.remove('release-notification');
            }
        }
        
        // Show modal with animation
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
            document.body.classList.add('modal-open');
        }, 10);
    }
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }, 300);
    }
    
    // Add event listeners to notification buttons and differentiate based on text content
    const releaseButtons = document.querySelectorAll('a[href="#notify"]');
    releaseButtons.forEach(button => {
        // If the button text contains '開発状況'
        if (button.textContent.includes('開発状況')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('development');
            });
        } else {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('release');
            });
        }
    });
    
    // Update form submission in the modal
    const modalInquiryForm = modal.querySelector('#inquiry-form');
    if (modalInquiryForm) {
        modalInquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(modalInquiryForm);
            
            // Convert form data to object
            const formDataObj = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company') || '',
                phone: formData.get('phone') || '',
                message: formData.get('message'),
                source: window.location.href,
                timestamp: new Date().toISOString(),
                // Add notification type
                notificationType: modal.querySelector('.notification-context').classList.contains('release-notification') ? 'リリース通知' : '開発状況'
            };
            
            // Debug: output data to console
            console.log('送信データ:', formDataObj);
            
            // Data for Notion API
            const requestData = {
                data: formDataObj
            };
            
            // Form submission display
            const submitBtn = modalInquiryForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;
            
            // Send data to Notion API
            fetch('https://notion-form-api.vercel.app/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then(response => {
                console.log('レスポンスステータス:', response.status);
                
                if (response.ok) {
                    // Success
                    modalInquiryForm.querySelector('#form-success').style.display = 'block';
                    modalInquiryForm.querySelector('#form-error').style.display = 'none';
                    modalInquiryForm.reset();
                } else {
                    // Error
                    console.error('サーバーエラー:', response.status);
                    modalInquiryForm.querySelector('#form-error').style.display = 'block';
                    modalInquiryForm.querySelector('#form-success').style.display = 'none';
                }
            })
            .catch(error => {
                // Network error etc.
                console.error('通信エラー:', error);
                modalInquiryForm.querySelector('#form-error').style.display = 'block';
                modalInquiryForm.querySelector('#form-success').style.display = 'none';
            })
            .finally(() => {
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide messages after 5 seconds
                setTimeout(() => {
                    modalInquiryForm.querySelector('#form-success').style.display = 'none';
                    modalInquiryForm.querySelector('#form-error').style.display = 'none';
                }, 5000);
                
                // Close modal after successful submission
                if (modalInquiryForm.querySelector('#form-success').style.display === 'block') {
                    setTimeout(() => {
                        closeModal();
                    }, 3000);
                }
            });
        });
    }
});