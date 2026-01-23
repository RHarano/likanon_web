/**
 * LIKaNON - Clean JavaScript
 * v3.0
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Smooth Loading
    // ========================================
    document.body.classList.add('loaded');

    // ========================================
    // Design Gallery - Dynamic Image Loading & Shuffle
    // ========================================
    const galleryImages = [
        '1.jpg',
        '15432791467667.jpg',
        '15432791550336.jpg',
        '15432791624730.jpg',
        '15432791716347.jpg',
        '15432791822638.jpg',
        '15659288076168.jpg',
        '15988070653453.jpg',
        '16204168443955.jpg',
        '16211026669132.jpg',
        '16304749296046.jpg',
        '16351992344981.jpg',
        '20240705-01_0.jpg',
        '3265.jpg',
        '3464-scaled.jpg',
        '3E76700BBDE7A857E473DD175E42723D13CFFE9F-scaled.jpeg',
        '506486649669287964 (1).jpg',
        '5204A700174E44C2773BDA3E29ED227C9D288ABF.jpeg',
        '6E28BC212AC54A44B2176E89BD94E1F6680F1748.jpeg',
        '72949B341AE6FF89C58141884FF711E5AEA443DB.png',
        '7DF4AC58DF67BAFC9FF8733123F2ACDBAE9AFA39.jpeg',
        '9921FB49EDB455A4DC7892A9D218ADB422917D59.png',
        'A321E949F625FAEE51FF789FF2A98982D037EF6F.jpeg',
        'AB61398A0A7B67787CB5244EEA48F4AA8A0D4110-scaled.jpeg',
        'B5D272B81F71E98EEE6566C6F822437B6A0E571A.jpeg',
        'E57024104A357CDABF403B7F854CDD64E0F1E8F8-scaled.jpeg',
        'IMG_0105.jpg',
        'IMG_0107.jpg',
        'IMG_0108.jpg',
        'IMG_0109.jpg',
        'IMG_0110.jpg',
        'IMG_0114.jpg',
        'IMG_0115.jpg',
        'IMG_0116.jpg',
        'IMG_0117.jpg',
        'IMG_0343-2.jpg',
        'IMG_1152.jpg',
        'IMG_1154.jpg',
        'IMG_1155.jpg',
        'IMG_1157.jpg',
        'IMG_1159.jpg',
        'IMG_1606.jpg',
        'IMG_1804 (1).jpg',
        'IMG_1925.jpg',
        'IMG_1926.jpg',
        'IMG_2229-1-scaled.jpg',
        'IMG_3773 (1).jpg',
        'IMG_3824 (1).jpg',
        'IMG_4429 (1).jpg',
        'IMG_4495 (1).jpg',
        'IMG_4514-2.jpg',
        'IMG_4908 (1).jpg',
        'IMG_5308-scaled.jpg',
        'IMG_5720 (1).jpg',
        'IMG_5846.jpg',
        'IMG_5950 (1).jpg',
        'IMG_6024.jpg',
        'IMG_6039.jpg',
        'IMG_6250 (1).jpg',
        'IMG_6294 (1).jpg',
        'IMG_6295 (1).jpg',
        'IMG_6296 (1).jpg',
        'IMG_6705.png',
        'IMG_7437-scaled.jpg',
        'IMG_8545-scaled.jpg',
        'IMG_8546 (1).jpg',
        'IMG_8547 (1).jpg',
        'IMG_8660 (1).jpg',
        'IMG_8661-2.jpg',
        'IMG_8663 (1).jpg',
        'IMG_8664 (1).jpg',
        'IMG_8685-2.jpg',
        'IMG_8686 (1).jpg',
        'IMG_8964 (1).jpg',
        'IMG_8964-1.jpg',
        'IMG_9038.jpg',
        'IMG_9039.jpg',
        'IMG_9040.jpg',
        'OR7V0F1.jpg',
        'busnescard-mockup227.png',
        'cacchette-scaled.jpg',
        'harunosora.jpg',
        'hase-bc-scaled.jpg',
        'lapot-18-1.jpg',
        'lapot-18-2.jpg',
        'linotime-png-gold-500x500-1.png',
        'logo-01 (1).png',
        'mockup.jpg',
        'r-logo-instA.jpg',
        'true-care-9-golg-jpg-01-scaled.jpg',
        'true-care11-01-scaled.jpg',
        'valentin-b-kremer-7gc5g8clNUE-unsplash-scaled.jpg'
    ];

    // Fisher-Yates shuffle
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    const designGallery = document.getElementById('design-gallery');
    const galleryToggle = document.getElementById('gallery-toggle');
    const INITIAL_DISPLAY = 12;
    let isExpanded = false;

    if (designGallery) {
        const shuffledImages = shuffleArray(galleryImages);

        shuffledImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            if (index >= INITIAL_DISPLAY) {
                item.classList.add('gallery-hidden');
            }

            item.innerHTML = `
                <div class="gallery-image">
                    <img src="img/${img}" alt="デザイン作品" loading="lazy">
                </div>
            `;

            designGallery.appendChild(item);
        });

        // Toggle gallery
        if (galleryToggle) {
            galleryToggle.addEventListener('click', function() {
                const hiddenItems = designGallery.querySelectorAll('.gallery-hidden');
                const toggleText = this.querySelector('.toggle-text');
                const toggleIcon = this.querySelector('.toggle-icon');

                if (!isExpanded) {
                    hiddenItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.remove('gallery-hidden');
                            item.classList.add('gallery-show');
                        }, index * 30);
                    });
                    toggleText.textContent = '閉じる';
                    toggleIcon.style.transform = 'rotate(180deg)';
                    isExpanded = true;
                } else {
                    const allItems = designGallery.querySelectorAll('.gallery-item');
                    allItems.forEach((item, index) => {
                        if (index >= INITIAL_DISPLAY) {
                            item.classList.remove('gallery-show');
                            item.classList.add('gallery-hidden');
                        }
                    });
                    toggleText.textContent = 'もっと見る';
                    toggleIcon.style.transform = 'rotate(0deg)';
                    isExpanded = false;

                    // Scroll to gallery section
                    designGallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }

    // ========================================
    // Lightbox for gallery images
    // ========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (designGallery && lightbox) {
        // Click on gallery item to open lightbox
        designGallery.addEventListener('click', function(e) {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem) {
                const img = galleryItem.querySelector('img');
                if (img) {
                    lightboxImage.src = img.src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ========================================
    // Header scroll effect
    // ========================================
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========================================
    // Mobile navigation
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-list a');
    let isNavOpen = false;

    function toggleNav() {
        isNavOpen = !isNavOpen;
        hamburger.classList.toggle('active', isNavOpen);
        nav.classList.toggle('active', isNavOpen);
        document.body.style.overflow = isNavOpen ? 'hidden' : '';
    }

    function closeNav() {
        isNavOpen = false;
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleNav);

    navLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', function(e) {
        if (isNavOpen && !nav.contains(e.target) && !hamburger.contains(e.target)) {
            closeNav();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isNavOpen) {
            closeNav();
        }
    });

    // ========================================
    // Smooth scroll for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // ========================================
    // Counter Animation for Hero Stats
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    let statsAnimated = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeProgress * target);

                stat.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Trigger counter animation when hero is in view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                setTimeout(animateCounters, 800);
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // ========================================
    // Portfolio Filter
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items with animation
            portfolioItems.forEach((item, index) => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.transitionDelay = `${index * 0.05}s`;
                    item.classList.remove('hidden');
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // ========================================
    // Fade-in animation on scroll
    // ========================================
    const fadeElements = document.querySelectorAll(
        '.service-card, .web-work-item, .comparison-item, .feature-card, .merit-card, .support-card, .other-card, .renewal-problems, .renewal-solution'
    );

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Slide animations for specific elements
    const slideLeftElements = document.querySelectorAll('.renewal-problems');
    const slideRightElements = document.querySelectorAll('.renewal-solution');

    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
    });

    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    slideLeftElements.forEach(el => {
        fadeObserver.observe(el);
    });

    slideRightElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // ========================================
    // Parallax effect on scroll
    // ========================================
    const heroForParallax = document.querySelector('.hero');

    if (heroForParallax && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const heroHeight = heroForParallax.offsetHeight;

            if (scrollY < heroHeight) {
                const opacity = 1 - (scrollY / heroHeight) * 0.5;
                heroForParallax.style.opacity = opacity;
            }
        }, { passive: true });
    }

    // ========================================
    // Web Works Image Loading with Skeleton
    // ========================================
    const webWorkImages = document.querySelectorAll('.web-work-image img');

    webWorkImages.forEach(img => {
        // 画像が既に読み込まれている場合
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
            img.parentElement.classList.add('loaded');
        } else {
            // 画像読み込み完了時
            img.addEventListener('load', function() {
                this.classList.add('loaded');
                this.parentElement.classList.add('loaded');
            });

            // 画像読み込みエラー時はスケルトンを非表示
            img.addEventListener('error', function() {
                this.parentElement.classList.add('loaded');
            });
        }
    });

    // ========================================
    // Smooth number counting animation
    // ========================================
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + range * easeOutQuart);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end;
            }
        }

        requestAnimationFrame(update);
    }



    // ========================================
    // Form handling with validation & EmailJS
    // ========================================
    const contactForm = document.getElementById('contact-form');

    // EmailJS Configuration - 要設定
    const EMAILJS_PUBLIC_KEY = '-OReOLPf7bJxodiyB';
    const EMAILJS_SERVICE_ID = 'service_gdk8rj2';
    const EMAILJS_TEMPLATE_NOTIFY = 'template_0ge2rep';      // info@likanon.com への通知用
    const EMAILJS_TEMPLATE_AUTOREPLY = 'template_zzv5vad'; // 自動返信用

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, select, textarea');

        // Real-time validation
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;

            // Remove existing error state
            field.classList.remove('error');
            field.style.borderColor = '';

            if (field.required && !value) {
                isValid = false;
            }

            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                }
            }

            if (!isValid) {
                field.classList.add('error');
                field.style.borderColor = '#ef4444';
            }

            return isValid;
        }

        // サービス名を日本語に変換
        function getServiceName(value) {
            const services = {
                'web': 'Web制作について',
                'support': 'HP管理・運用代行について',
                'sns': 'SNS運用について',
                'design': 'デザイン制作について',
                'other': 'その他'
            };
            return services[value] || value;
        }

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            let isFormValid = true;

            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                // Shake animation for form
                contactForm.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);
                return;
            }

            // Get form data
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                company: contactForm.querySelector('#company').value || '未入力',
                service: getServiceName(contactForm.querySelector('#service').value),
                message: contactForm.querySelector('#message').value
            };

            // Success state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;

            try {
                // 1. info@likanon.com への通知メール送信
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_NOTIFY, formData);

                // 2. お客様への自動返信メール送信
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_AUTOREPLY, formData);

                // 送信成功
                submitBtn.textContent = '送信完了!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);

            } catch (error) {
                console.error('EmailJS Error:', error);
                submitBtn.textContent = '送信失敗';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);

                alert('送信に失敗しました。お手数ですが、メールまたはInstagramよりお問い合わせください。');
            }
        });
    }

    // Add shake animation
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);




    // ========================================
    // Reveal text animation
    // ========================================
    const revealElements = document.querySelectorAll('.section-title');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ========================================
    // Active nav link highlighting
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });
    }

});

// ========================================
// Page visibility handling
// ========================================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = 'LIKaNON | Web制作・デザイン';
    } else {
        document.title = 'LIKaNON | プロのWeb制作・デザイン | 個人事業主ならではの丁寧なサポート';
    }
});

// ========================================
// Floating CTA (PC用追従ボタン)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const floatingCta = document.getElementById('floatingCta');
    const contactSection = document.getElementById('contact');

    if (floatingCta) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // 300px以上スクロールで表示
            if (scrollY > 300) {
                // コンタクトセクションに近づいたら非表示
                if (contactSection) {
                    const contactTop = contactSection.offsetTop;
                    if (scrollY + windowHeight > contactTop + 100) {
                        floatingCta.classList.remove('visible');
                    } else {
                        floatingCta.classList.add('visible');
                    }
                } else {
                    floatingCta.classList.add('visible');
                }
            } else {
                floatingCta.classList.remove('visible');
            }
        }, { passive: true });
    }
});

// ========================================
// Promo Banner (限定バナー)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const promoBanner = document.getElementById('promoBanner');
    const promoClose = document.getElementById('promoClose');
    const header = document.getElementById('header');

    // バナーが閉じられたかセッションストレージで確認
    const bannerClosed = sessionStorage.getItem('promoBannerClosed');

    if (promoBanner && !bannerClosed) {
        // ヘッダーの位置を調整
        if (header) {
            header.classList.add('with-banner');
        }

        // 閉じるボタン
        if (promoClose) {
            promoClose.addEventListener('click', function() {
                promoBanner.classList.add('hidden');
                if (header) {
                    header.classList.remove('with-banner');
                }
                sessionStorage.setItem('promoBannerClosed', 'true');
            });
        }
    } else if (promoBanner && bannerClosed) {
        promoBanner.classList.add('hidden');
    }
});
