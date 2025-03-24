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
const mobileMenuLinks = document.querySelectorAll('nav ul li a');

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

// Закрытие мобильного меню при клике на ссылку
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    });
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

// Удаление кода для кнопок wishlist и добавление функционала для модального окна заказа
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы модального окна заказа
    const orderModal = document.getElementById('orderModal');
    const orderCloseBtn = document.querySelector('.order-modal-close');
    const orderForm = document.getElementById('orderForm');
    const orderProductImage = document.getElementById('orderProductImage');
    const orderProductTitle = document.getElementById('orderProductTitle');
    const orderProductPrice = document.getElementById('orderProductPrice');
    const orderTotalPrice = document.getElementById('orderTotalPrice');
    const orderQuantityInput = document.getElementById('orderQuantity');
    
    // Получаем элементы модального окна с подробной информацией о товаре
    const productDetailsModal = document.getElementById('productDetailsModal');
    const productDetailsCloseBtn = document.querySelector('.product-details-close');
    const productDetailsTitle = document.getElementById('productDetailsModalTitle');
    const productDetailsImage = document.getElementById('productDetailsImage');
    const productDetailsPrice = document.getElementById('productDetailsPrice');
    const productDetailsOldPrice = document.getElementById('productDetailsOldPrice');
    const productDetailsRating = document.getElementById('productDetailsRating');
    const productDetailsDescription = document.getElementById('productDetailsDescription');
    const productDetailsOrderBtn = document.getElementById('productDetailsOrderBtn');
    const productDetailsDownloadBtn = document.getElementById('productDetailsDownloadBtn');
    const productDetailsFeatures = document.getElementById('productDetailsFeatures');
    
    // Массив особенностей товаров по категориям
    const productFeatures = {
        'plaster': [
            'Экологически чистый состав',
            'Высокая паропроницаемость',
            'Возможность создания различных фактур',
            'Эффективная звукоизоляция',
            'Устойчивость к механическим повреждениям',
            'Долговечность (до 20 лет без ремонта)'
        ],
        'facade': [
            'Для систем теплоизоляции фасадов',
            'Устойчивость к УФ-лучам',
            'Эффект самоочищения',
            'Высокая паропроницаемость',
            'Водоотталкивающий эффект',
            'Защита от грибка и плесени',
            'Устойчивость к ударным воздействиям',
            'Морозостойкость'
        ],
        'paint': [
            'Быстрое высыхание',
            'Устойчивость к истиранию и влаге',
            'Высокая укрывистость',
            'Простота нанесения',
            'Без запаха',
            'Широкая цветовая гамма'
        ]
    };
    
    // Получаем все кнопки "Подробнее"
    const detailsButtons = document.querySelectorAll('.btn-details');
    
    // Получаем все кнопки "Оформить заказ"
    const orderButtons = document.querySelectorAll('.btn-order');
    
    // Функция для обновления итоговой цены
    function updateTotalPrice(price, quantity) {
        const total = (price * quantity).toFixed(2);
        orderTotalPrice.textContent = '$' + total;
    }
    
    // Открытие модального окна с подробной информацией при клике на кнопку "Подробнее"
    detailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('.product-image').src;
            const productTitle = productCard.querySelector('.product-title').textContent;
            let productPrice = '';
            let productOldPrice = '';
            
            // Получаем цену товара
            const priceElement = productCard.querySelector('.product-price');
            if (priceElement) {
                productPrice = priceElement.textContent;
            }
            
            // Получаем старую цену товара, если есть
            const oldPriceElement = productCard.querySelector('.product-old-price');
            if (oldPriceElement) {
                productOldPrice = oldPriceElement.textContent;
                productDetailsOldPrice.textContent = productOldPrice;
                productDetailsOldPrice.style.display = 'none'; // Скрываем старую цену
            } else {
                productDetailsOldPrice.style.display = 'none';
                productDetailsOldPrice.textContent = '';
            }
            
            // Получаем описание товара
            const productDescription = productCard.querySelector('.product-description').textContent;
            
            // Определяем категорию товара и выбираем соответствующие особенности
            let features = [];
            if (productCard.classList.contains('plaster')) {
                features = productFeatures.plaster;
            } else if (productCard.classList.contains('facade')) {
                features = productFeatures.facade;
            } else if (productCard.classList.contains('paint')) {
                features = productFeatures.paint;
            }
            
            // Генерируем рейтинг товара
            let ratingHTML = '';
            const ratingElement = productCard.querySelector('.product-rating');
            if (ratingElement) {
                // Клонируем элементы рейтинга
                ratingHTML = ratingElement.innerHTML;
            }
            
            // Заполняем данные товара в модальном окне
            productDetailsTitle.textContent = productTitle;
            productDetailsImage.src = productImage;
            productDetailsPrice.textContent = productPrice;
            productDetailsDescription.textContent = productDescription;
            productDetailsRating.innerHTML = ratingHTML;
            productDetailsRating.style.display = 'none'; // Скрываем рейтинг
            
            // Заполняем особенности товара
            productDetailsFeatures.innerHTML = '';
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                productDetailsFeatures.appendChild(li);
            });
            
            // Показываем модальное окно
            productDetailsModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Добавляем обработчик для кнопки "Оформить заказ" в модальном окне
            productDetailsOrderBtn.onclick = function() {
                // Закрываем текущее модальное окно
                productDetailsModal.style.display = 'none';
                
                // Заполняем данные товара в модальном окне заказа
                orderProductImage.src = productImage;
                orderProductTitle.textContent = productTitle;
                orderProductPrice.textContent = productPrice;
                
                // Устанавливаем начальное значение итоговой цены
                const priceValue = parseFloat(productPrice.replace('$', ''));
                updateTotalPrice(priceValue, 1);
                
                // Показываем модальное окно заказа
                orderModal.style.display = 'flex';
                
                // Обновляем итоговую сумму при изменении количества
                orderQuantityInput.onchange = function() {
                    const quantity = parseInt(this.value) || 1;
                    updateTotalPrice(priceValue, quantity);
                };
                
                orderQuantityInput.oninput = function() {
                    const quantity = parseInt(this.value) || 1;
                    updateTotalPrice(priceValue, quantity);
                };
            };
            
            // Добавляем обработчик для кнопки "Скачать тех. лист" в модальном окне
            productDetailsDownloadBtn.onclick = function() {
                // Использование реального файла из папки files
                const fileUrl = 'files/artfasadsilicatesilicone.pdf';
                
                // Создаем временную ссылку для скачивания
                const downloadLink = document.createElement('a');
                downloadLink.href = fileUrl;
                downloadLink.download = 'Технический_лист_фасадная_штукатурка.pdf';
                downloadLink.target = '_blank';
                document.body.appendChild(downloadLink);
                
                // Запускаем скачивание
                downloadLink.click();
                
                // Удаляем временную ссылку
                setTimeout(() => {
                    document.body.removeChild(downloadLink);
                }, 100);
            };
        });
    });
    
    // Закрытие модального окна с подробной информацией при клике на крестик
    productDetailsCloseBtn.addEventListener('click', function() {
        productDetailsModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Закрытие модального окна с подробной информацией при клике вне его содержимого
    productDetailsModal.addEventListener('click', function(event) {
        if (event.target === productDetailsModal) {
            productDetailsModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Открытие модального окна при клике на кнопку "Оформить заказ"
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('.product-image').src;
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const priceValue = parseFloat(productPrice.replace('$', ''));
            
            // Заполняем данные товара в модальном окне
            orderProductImage.src = productImage;
            orderProductTitle.textContent = productTitle;
            orderProductPrice.textContent = productPrice;
            
            // Устанавливаем начальное значение итоговой цены
            updateTotalPrice(priceValue, 1);
            
            // Показываем модальное окно
            orderModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Обновляем итоговую сумму при изменении количества
            orderQuantityInput.onchange = function() {
                const quantity = parseInt(this.value) || 1;
                updateTotalPrice(priceValue, quantity);
            };
            
            orderQuantityInput.oninput = function() {
                const quantity = parseInt(this.value) || 1;
                updateTotalPrice(priceValue, quantity);
            };
        });
    });
    
    // Закрытие модального окна при клике на крестик
    orderCloseBtn.addEventListener('click', function() {
        orderModal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Закрытие модального окна при клике вне его содержимого
    orderModal.addEventListener('click', function(event) {
        if (event.target === orderModal) {
            orderModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (orderModal.style.display === 'flex') {
                orderModal.style.display = 'none';
                document.body.style.overflow = '';
            }
            if (productDetailsModal.style.display === 'flex') {
                productDetailsModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    });
    
    // Обработка отправки формы заказа
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем информацию о товаре
        const productTitle = document.getElementById('orderProductTitle').textContent;
        const productPrice = document.getElementById('orderProductPrice').textContent;
        const totalPrice = document.getElementById('orderTotalPrice').textContent;
        
        // Получаем данные клиента
        const name = document.getElementById('orderName').value;
        const phone = document.getElementById('orderPhone').value;
        const email = document.getElementById('orderEmail').value;
        const quantity = document.getElementById('orderQuantity').value;
        const comment = document.getElementById('orderComment').value;
        
        // Формируем сообщение для отправки в Telegram
        const telegramMessage = `
<b>Новый заказ с сайта</b>
<b>Товар:</b> ${productTitle}
<b>Цена:</b> ${productPrice}
<b>Количество:</b> ${quantity}
<b>Итого:</b> ${totalPrice}

<b>Информация о клиенте:</b>
<b>Имя:</b> ${name}
<b>Телефон:</b> ${phone}
<b>Email:</b> ${email}
<b>Комментарий:</b> ${comment || 'Не указан'}
`;
        
        // Отправляем данные в Telegram
        sendToTelegram(telegramMessage)
            .then(response => {
                alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
                
                // Закрываем модальное окно и сбрасываем форму
                orderModal.style.display = 'none';
                document.body.style.overflow = '';
                orderForm.reset();
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
                alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.');
            });
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

        // Собираем данные из формы
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const topic = document.getElementById('topic').value;
        const message = document.getElementById('message').value;

        // Формируем сообщение для отправки в Telegram
        const telegramMessage = `
<b>Новое сообщение с сайта</b>
<b>Имя:</b> ${name}
<b>Телефон:</b> ${phone}
<b>Email:</b> ${email}
<b>Тема:</b> ${topic}
<b>Сообщение:</b> ${message}
`;

        // Отправляем данные в Telegram
        sendToTelegram(telegramMessage)
            .then(response => {
                // Показываем сообщение об успешной отправке
            successMessage.classList.add('show');
            contactForm.reset();

            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
                alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
            });
    });
}

// Функция для отправки данных в Telegram
function sendToTelegram(message) {
    // URL нашего серверного API
    const apiUrl = '/send-to-telegram'; // Если серверный API на том же домене
    // const apiUrl = 'http://localhost:3000/send-to-telegram'; // Для локальной разработки
    
    // Параметры запроса
    const params = {
        message: message
    };
    
    // Отправляем запрос к нашему серверу
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(response => response.json());
}

// Интерактивная карта
const mapOverlay = document.querySelector('.map-overlay');
const mapContainer = document.querySelector('.map-container');

if (mapOverlay) {
    mapOverlay.addEventListener('click', function () {
        window.open('https://maps.google.com/maps?ll=55.756391,37.623451&z=17&t=m&hl=ru&gl=RU&mapclient=embed&q=%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D0%9A%D1%80%D0%B5%D0%BC%D0%BB%D1%8C');
    });
}

// Функциональность для модального окна галереи
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы модального окна
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.gallery-modal-close');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    
    // Получаем все элементы галереи
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Открытие модального окна при клике на элемент галереи
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('.gallery-item-info h3').textContent;
            const description = this.querySelector('.gallery-item-info p').textContent;
            
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalDesc.textContent = description;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Закрытие модального окна при клике на крестик
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    // Закрытие модального окна при клике вне картинки
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// ===== КОД ДЛЯ SEO ОПТИМИЗАЦИИ =====
// Оптимизация загрузки изображений с использованием LazyLoad
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработку LazyLoad для всех изображений
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    
                    // Если есть data-src, используем его как основной источник
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                    }
                    
                    // Если есть data-srcset, устанавливаем его для адаптивных изображений
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    
                    // Удаляем класс lazy, если он есть
                    lazyImage.classList.remove('lazy');
                    
                    // Прекращаем наблюдение за изображением
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        // Добавляем все изображения для наблюдения
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback для браузеров без поддержки IntersectionObserver
        // Простая загрузка всех изображений с небольшой задержкой
        setTimeout(function() {
            lazyImages.forEach(function(lazyImage) {
                if (lazyImage.dataset.src) {
                    lazyImage.src = lazyImage.dataset.src;
                }
                if (lazyImage.dataset.srcset) {
                    lazyImage.srcset = lazyImage.dataset.srcset;
                }
                lazyImage.classList.remove('lazy');
            });
        }, 500);
    }
    
    // Обработка ошибок загрузки изображений
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Если изображение не загружается, устанавливаем запасное
            this.src = 'img/fallback-image.jpg';
            this.alt = 'Изображение временно недоступно';
        });
    });
    
    // Добавляем атрибуты lang для улучшения SEO
    const htmlElement = document.querySelector('html');
    if (htmlElement && !htmlElement.getAttribute('lang')) {
        htmlElement.setAttribute('lang', 'ru');
    }
    
    // Обнаружение устройства для оптимизации контента
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
});

// Обработка канонических ссылок для страниц с параметрами
function handleCanonicalUrl() {
    const url = new URL(window.location.href);
    if (url.search) {
        // Если есть параметры в URL, добавляем каноническую ссылку
        let link = document.createElement('link');
        link.rel = 'canonical';
        link.href = url.origin + url.pathname;
        document.head.appendChild(link);
    }
}

// Установка метрики производительности с помощью Performance API
function reportWebVitals() {
    if ('performance' in window && 'PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                // Отправка данных о производительности (фактически будут отправляться на сервер аналитики)
                console.log(`[Performance]: ${entry.name} - ${entry.startTime.toFixed(0)}ms`);
            });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input-delay', 'cumulative-layout-shift'] });
    }
}

// Вызов функций оптимизации
handleCanonicalUrl();
reportWebVitals();