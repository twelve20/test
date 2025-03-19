// Скрипт для переключения активной кнопки фильтра
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Скрипт для мобильного меню
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
const menuOverlay = document.querySelector('.menu-overlay');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
});

menuOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.classList.remove('menu-open');
});

// Изменение шапки при прокрутке
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Активные ссылки в меню
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Обновление счетчика корзины при нажатии кнопки "В корзину"
const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');
const cartCounts = document.querySelectorAll('.cart-count');
let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartCounts.forEach(count => {
            count.textContent = cartCount;
        });
        button.textContent = "Добавлено!";
        setTimeout(() => {
            button.textContent = "В корзину";
        }, 1000);
    });
});

// Слайдер в hero блоке
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');
const prevArrow = document.querySelector('.slider-arrow.prev');
const nextArrow = document.querySelector('.slider-arrow.next');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Обработка выхода за пределы массива
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function startSlideTimer() {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
}

// Обработчики событий для слайдера
prevArrow.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    resetSlideTimer();
});

nextArrow.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    resetSlideTimer();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetSlideTimer();
    });
});

// Запускаем слайдер
startSlideTimer();

// Параллакс эффект при прокрутке
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('hero');
    const heroSlides = document.querySelectorAll('.hero-slide');

    if (scrolled < 600) {
        heroSlides.forEach(slide => {
            slide.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }
});

// Фильтрация продуктов по категории
const filterCategoryBtns = document.querySelectorAll('.filter-btn[data-filter]');
const productCards = document.querySelectorAll('.product-card');

filterCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Сначала удаляем активный класс со всех кнопок
        filterCategoryBtns.forEach(b => b.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
            } else if (card.classList.contains(filterValue)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Поиск по товарам
const searchInput = document.querySelector('.search-products');

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();

    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const description = card.querySelector('.product-description').textContent.toLowerCase();

        if (title.includes(searchValue) || description.includes(searchValue)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});

// Добавление товаров в избранное
const wishlistBtns = document.querySelectorAll('.btn-wishlist');

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');

        if (btn.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
});

// Быстрый просмотр товара
const quickViewBtns = document.querySelectorAll('.product-quick-view');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Здесь будет открываться модальное окно быстрого просмотра
        alert('Функция быстрого просмотра будет доступна в следующей версии');
    });
});

// Вкладки в блоке "О нас"
const aboutTabs = document.querySelectorAll('.about-tab');
const aboutContents = document.querySelectorAll('.about-content');

aboutTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');

        // Удаляем активный класс со всех вкладок и содержимого
        aboutTabs.forEach(t => t.classList.remove('active'));
        aboutContents.forEach(c => c.classList.remove('active'));

        // Добавляем активный класс выбранной вкладке и соответствующему содержимому
        tab.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Анимация счетчиков
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;

    statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 секунды
        const step = target / (duration / 20); // 20 - интервал в мс
        let current = 0;

        const updateCounter = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(updateCounter);
            }
            counter.textContent = Math.floor(current);
        }, 20);
    });

    countersStarted = true;
}

// Запускаем счетчики при прокрутке до блока "О нас"
window.addEventListener('scroll', () => {
    const aboutSection = document.getElementById('about');
    const aboutPosition = aboutSection.getBoundingClientRect();

    if (aboutPosition.top <= window.innerHeight / 2 && aboutPosition.bottom >= window.innerHeight / 2) {
        startCounters();
    }
});

// FAQ функционал
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Закрываем все остальные FAQ элементы
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('open');
            }
        });

        // Переключаем состояние текущего элемента
        item.classList.toggle('open');
    });
});

// Обработка отправки формы
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Здесь будет отправка формы на сервер
        // Имитируем успешную отправку
        setTimeout(() => {
            successMessage.classList.add('show');
            contactForm.reset();

            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }, 1000);
    });
}

// Интерактивная карта
const mapOverlay = document.querySelector('.map-overlay');
const mapContainer = document.querySelector('.map-container');

if (mapOverlay) {
    mapOverlay.addEventListener('click', function () {
        window.open('https://maps.google.com/maps?ll=55.756391,37.623451&z=17&t=m&hl=ru&gl=RU&mapclient=embed&q=%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D0%9A%D1%80%D0%B5%D0%BC%D0%BB%D1%8C');
    });
}