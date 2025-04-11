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
            'Морозостойкость',
            'Долговечное покрытие, устойчивое к выцветанию'
        ],
        'interior': [
            'Для внутренних работ',
            'Эластичная структура',
            'Легко наносится',
            'Устойчива к стеканию с вертикальной поверхности',
            'Стойкая к возникновению усадочных трещин',
            'Стойкая к ударным воздействиям',
            'Разнообразие фактур и эффектов',
            'Экологически безопасна'
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
    
    // Детальные характеристики товаров по ID или названию
    const productDetails = {
        'Декоративная штукатурка': {
            'Тип': 'Силикатно-силиконовая',
            'Область применения': 'Для внутренних и наружных работ',
            'Назначение': 'Для систем теплоизоляции фасадов на основе минеральной ваты и пенополистирола',
            'Свойства': [
                'Эластичная',
                'Легко наносится',
                'Устойчива к стеканию с вертикальной поверхности',
                'Устойчивость к загрязнению – эффект самоочищения',
                'Стойкость к ультрафиолетовым лучам',
                'Высокая паропроницаемость',
                'Устойчивость от грибка и плесени',
                'Высокая гидрофобность – водоотталкивающий эффект',
                'Стойкая к возникновению усадочных трещин',
                'Атмосферо- и морозостойкая',
                'Стойкая к ударным воздействиям'
            ],
            'Базовый цвет': 'Белый',
            'Колеровка': 'Колеруется в цвета RAL',
            'Состав': 'Акриловая дисперсия, водная дисперсия силикатов калия и сополимеров силиконов, минеральные наполнители, пигменты, функциональные и антисептические добавки',
            'Плотность': '1,5-1,9 кг/дм3',
            'Время до затирки': 'Определяется опытным путем и зависит от толщины слоя и температурно-влажностного режима окружающей среды',
            'Вес нетто': '25 кг',
            'Эффекты': [
                'Короед',
                'Сахара',
                'Бриз',
                'Файн'
            ],
            'Размер зерна': ['1мм-1,5мм', '1,5мм-2мм']
        },
        'Грунтовка Бетоноконтакт адгезионная': {
            'Тип': 'Адгезионная грунтовка',
            'Область применения': 'Для внутренних и наружных работ',
            'Назначение': 'Для обработки плотных и слабовпитывающих влагу оснований: бетонные блоки, бетонные потолки, монолитный бетон, старые плиточные облицовки, влагостойкие плиты ГКЛ и ГВЛ',
            'Свойства': [
                'Улучшенная адгезия',
                'Сверхпрочность и надежность основания',
                'Антисептические добавки против плесени и грибков',
                'Возможность колеровки',
                'Зимняя версия морозостойкая (до 5 циклов замораживания/оттаивания)'
            ],
            'Основной цвет': 'Розовый (возможна колеровка в другие цвета)',
            'Расход': '140-200 г/м² в зависимости от типа основания',
            'Состав': 'Акриловая дисперсия, минеральный наполнитель, функциональные и антисептические добавки',
            'Разбавитель': 'Вода',
            'Время высыхания': '2-3 часа при температуре 20°С и влажности 55%',
            'Варианты фасовки': [
                {
                    'вес': '15 кг',
                    'цена': '1516 р',
                    'текст': 'Ведро 15 кг - 1516 р'
                },
                {
                    'вес': '25 кг',
                    'цена': '2119 р',
                    'текст': 'Ведро 25 кг - 2119 р'
                }
            ],
            'Хранение': 'В фирменной упаковке в течение 12 месяцев от даты производства при температуре от +5°С до +30°С',
            'Особенности': 'Свежая грунтовка легко удаляется водой, засохшие остатки - растворителем'
        },
        'Штукатурка декоративная акриловая': {
            'Тип': 'Акриловая',
            'Область применения': 'Для внутренних и наружных работ',
            'Назначение': 'Для отделки по минеральным основаниям, цементной штукатурке, гипсокартону, бетону, ЦСП, асбестоцементным листам, ДСП и т.п.',
            'Свойства': [
                'Готовая к применению',
                'Легкость в нанесении',
                'Супер-эластичность',
                'Устойчивость к деформациям',
                'Отличная паропроницаемость',
                'Устойчивость к атмосферным воздействиям',
                'Морозостойкость',
                'Стойкость к образованию трещин'
            ],
            'Базовый цвет': 'Белый',
            'Колеровка': 'Допускается колеровка водными специальными колеровочными пастами',
            'Состав': 'Водная дисперсия сополимеров с минеральными наполнителями и пигментами',
            'Плотность': '1,5-1,9 кг/дм3',
            'Время до затирки': 'Определяется опытным путем и зависит от толщины слоя и температурно-влажностного режима окружающей среды',
            'Вес нетто': '25 кг',
            'Эффекты': [
                'Короед 1,5-2,0 мм',
                'Короед Лайт 1,0-1,5 мм',
                'Сахара 1,0-1,5 мм',
                'Сахара Бархан 1,5-2,0 мм',
                'Бриз 0,1-0,4 мм',
                'Файн 0,5-1,0 мм'
            ],
            'Примечание': 'Не рекомендован для нанесения на гипсо- и известь-содержащие поверхности без специальной предварительной подготовки'
        },
        'Штукатурка фасадная декоративная': {
            'Тип': 'Силикатно-силиконовая',
            'Область применения': 'Для внутренних и наружных работ',
            'Назначение': 'Для систем теплоизоляции фасадов на основе минеральной ваты и пенополистирола',
            'Свойства': [
                'Эластичная',
                'Легко наносится',
                'Устойчива к стеканию с вертикальной поверхности',
                'Устойчивость к загрязнению – эффект самоочищения',
                'Стойкость к ультрафиолетовым лучам',
                'Высокая паропроницаемость',
                'Устойчивость от грибка и плесени',
                'Высокая гидрофобность – водоотталкивающий эффект',
                'Стойкая к возникновению усадочных трещин',
                'Атмосферо- и морозостойкая',
                'Стойкая к ударным воздействиям'
            ],
            'Базовый цвет': 'Белый',
            'Колеровка': 'Колеруется в цвета RAL',
            'Состав': 'Акриловая дисперсия, водная дисперсия силикатов калия и сополимеров силиконов, минеральные наполнители, пигменты, функциональные и антисептические добавки',
            'Плотность': '1,5-1,9 кг/дм3',
            'Время до затирки': 'Определяется опытным путем и зависит от толщины слоя и температурно-влажностного режима окружающей среды',
            'Вес нетто': '25 кг',
            'Эффекты': [
                'Короед',
                'Сахара',
                'Бриз',
                'Файн'
            ],
            'Размер зерна': ['1мм-1,5мм', '1,5мм-2мм']
        },
        'Интерьерная декоративная штукатурка': {
            'Тип': 'Акриловая',
            'Область применения': 'Для внутренних работ',
            'Назначение': 'Предназначена для устройства декоративно-защитного финишного слоя наносимого на ровные, прочные недеформирующиеся основания: цементные штукатурки и шпатлевки, бетон, кирпич, ГКЛ, ГВЛ, ЦСП и т.п.',
            'Свойства': [
                'Эластичная',
                'Легко наносится',
                'Устойчива к стеканию с вертикальной поверхности',
                'Стойкая к возникновению усадочных трещин',
                'Стойкая к ударным воздействиям'
            ],
            'Базовый цвет': 'Белый',
            'Состав': 'Акриловая дисперсия, водная дисперсия силикатов калия и сополимеров силиконов, минеральные наполнители, пигменты, функциональные и антисептические добавки',
            'Плотность': '1,5-1,9 кг/дм3',
            'Время до затирки': 'Определяется опытным путем и зависит от толщины слоя и температурно-влажностного режима окружающей среды',
            'Вес нетто': '25 кг',
            'Эффекты': [
                'Короед',
                'Сахара',
                'Сахара Бархан',
                'Файн',
                'Бриз'
            ],
            'Размер зерна': ['0,3мм-1мм', '1,5мм-2мм'],
            'Примечание': 'Не рекомендована для нанесения на гипсо- и известь-содержащие поверхности без специальной предварительной подготовки'
        },
        'Краска Лотос': {
            'Тип': 'Краска силикон-акриловая фасадная',
            'Название': 'Expert Lotos',
            'Применение': 'Водоотталкивающий фасад',
            'Разбавитель': 'Вода',
            'Инструменты': 'Кисть, валик, распылитель',
            'Сухой остаток (масс)': '62%',
            'Плотность': '1,5 кг/л',
            'Водопроницаемость': '0,3 кг/(м2*ч0,5)',
            'Паропроницаемость Sd,m?': '430,0 г/(м2*день)',
            'Паропроницаемость (класс)': '1 (высокая)',
            'Время до финиша': '1 час',
            'Полное высыхание': '2-4 часа',
            'Расход': 'До 10 м²/л (в 1 слой)',
            'Вес': '14 кг',
            'Описание': 'Фасадная краска, защищающая поверхность от воздействия снега, дождя и солнца. Покрытие обладает водоотталкивающим эффектом. Специальные добавки в составе препятствуют образованию плесени и грибков. Наносится легко ровным слоем. Краска со временем не выцветает, не трескается, не теряет своих эксплуатационных качеств. Используется для наружных работ. Наносится на просохшие минеральные поверхности: кирпич, бетон, каменная кладка, штукатурка и пр. Материал экологичен.',
            'Область применения': 'Для наружных работ. Подходит для нанесения на полностью просохшие гладкие минеральные поверхности: отштукатуренные, кирпичные, бетонные, в том числе легкие оштукатуренные системы утепления ("Мокрый фасад") и каменную кладку. Для окрашивания фактурных покрытий, декоративных штукатурок наносите краску тонкими слоями. Рекомендуется для окраски фасадов жилых и общественных зданий в любых климатических зонах.',
            'Особенности применения': 'Перед применением разбавить в рекомендованной пропорции и тщательно перемешать. Произвести подготовку поверхности. Рекомендуется наносить в два слоя при температуре от +5 °C до +30 °С, относительной влажности воздуха от 40 до 80 %. Заданный уровень атмосферостойкости покрытие достигает через 10-12 дней после окрашивания.',
            'Технический лист': 'files/expert-lotos.pdf'
        },
        'Гидроизоляция мастика': {
            'Тип': 'Мастика гидроизоляционная',
            'Название': 'Aqua Stop Mastic',
            'Свойства': [
                '100% защита от протечек',
                'Растягивается до 300%',
                'Подходит для тёплых полов',
                'Для бассейнов',
                'Легко наносится',
                'Для внутренних и наружных работ',
                'Суперустойчива к деформации/усадке'
            ],
            'Вес нетто': '6 кг',
            'Основной цвет': 'голубой',
            'Относительное удлинение при разрыве': '300%',
            'Температура проведения работ': 'от +5 до +30 °С',
            'Расход (2 слоя)': '0,6-0,85 кг/м²',
            'Толщина нанесения': '0,1 - 0,5 мм',
            'Перекрытие трещин (без армирования)': 'до 4 мм',
            'Перекрытие трещин (с армированием)': 'более 4 мм',
            'Прочность сцепления с бетоном': '1 МПа (через 28 суток)',
            'Водонепроницаемость (прямое давление)': 'W10',
            'Область применения': 'Мастика предназначена для устройства мастичных слоев гидроизоляции строительных конструкций. Наносится на ровные, прочные основания: цементные и гипсовые штукатурки, шпатлевки, бетон, кирпич, камень, стяжки, ГКЛ, ГВЛ, ЦСП, ДСП и т.п. Полностью защищает поверхность от влаги. Используется в помещениях с повышенной влажностью (душевые, ванные, бассейны, санузлы, кухни, балконы, лоджии, подвалы), а также для системы "Теплый пол". Рекомендуется под плиточную облицовку. Образует ровное, эластичное, матовое, влагостойкое покрытие. Не выделяет вредных веществ.',
            'Подготовка поверхности': 'Основание должно быть сухим, прочным, очищенным от грязи, краски, масел. Слабые участки удалить. Поверхности, покрытые мелом/известью, очистить. Гладким поверхностям придать шероховатость. При необходимости обработать металлической щеткой, обезжирить. Неизвестные покрытия проверить на совместимость. Трещины и неровности заделать шпаклёвкой. Пористые основания обработать грунтовкой глубокого проникновения.',
            'Выполнение работ': 'Перед применением перемешать. Наносить валиком или кистью в два слоя (общая толщина 0,45-0,5 мм). Второй слой наносить после полного высыхания первого. Работать при t от +5 до +30°С и влажности 50±5%. Время высыхания 1 слоя - 2 часа (при t 25°C, влажн. 50%), полное - 24 часа. Свежую мастику удалять водой, засохшую - растворителем. Защищать свежее покрытие от солнца, влаги, дождя, мороза до полного высыхания. Морозостойкий (до 5 циклов).',
            'Меры предосторожности': 'Работать в спецодежде, перчатках, при распылении - респиратор. При попадании в глаза/на слизистые - промыть водой. Руки вымыть с мылом. Не сливать в канализацию. Не смешивать с другими мастиками.',
            'Хранение': 'В фирменной упаковке 12 месяцев при t от +5 до +30°С, вдали от отопления и солнца.',
            'Технический лист': 'files/aquastopmastic.pdf'
        },
        'Finish Premium': {
            'Тип': 'Краска акриловая универсальная для стен и потолков',
            'Назначение': 'Влагостойкая, интерьерная',
            'Основной цвет': 'супербелый',
            'Расход (1 слой)': '110 гр/м²',
            'Состав': 'акриловая дисперсия, минеральные наполнители, пигменты, функциональные и антисептические добавки',
            'Разбавитель': 'вода',
            'Время высыхания': '2 часа (зависит от t и влажности)',
            'Стойкость к статическому воздействию воды': 'не менее 24 часов',
            'Фасовка': '14 кг',
            'Описание': 'Универсальная акриловая краска для отделки стен и потолков. Рекомендуется использовать грунтовку MEGAPOLIMER. Создает стойкое покрытие. Применяется в жилых помещениях с повышенными требованиями к белизне. Наносится на бетонные, кирпичные, оштукатуренные, шпатлеванные, гипсовые поверхности, ГКЛ, структурные и стекловолоконные обои (кроме напольных оснований). Легко наносится, не течет, образует ровный слой без брызг и пятен. Быстро сохнет (от 1 часа). Обладает отличными декоративными свойствами, укрывистостью, паропроницаемостью, прочным сцеплением и экономичным расходом. Подходит для обновления старых водно-дисперсионных покрытий. Образует ровное матовое влагостойкое покрытие, не выделяет вредных веществ, без растворителей. Допускает протирку влажной тканью. Колеруется в любой цвет.',
            'Область применения': 'Окраска стен и потолков внутри жилых и промышленных помещений с высокими требованиями к белизне и стойкости покрытия.',
            'Меры предосторожности': 'Работать в спецодежде, перчатках, при распылении - респиратор. При попадании в глаза/на слизистые - промыть водой. Руки вымыть с мылом. Не сливать в канализацию.',
            'Инструмент': 'Кисть, валик, краскораспылитель',
            'Подготовка поверхности': 'Поверхность очистить от старых красок. Непрочные покрытия удалить. Поверхности, покрытые мелом/известью, очистить. Трещины, выбоины заделать шпаклёвкой и зашлифовать. Загрунтовать поверхность перед покраской.',
            'Хранение': 'В фирменной упаковке 12 месяцев при t от +5 до +30°С. Предохранять от замораживания.',
            'Технический лист': 'files/finishpremium.pdf'
        }
    };
    
    // Получаем все кнопки "Подробнее"
    const detailsButtons = document.querySelectorAll('.btn-details');
    
    // Получаем все кнопки "Оформить заказ"
    const orderButtons = document.querySelectorAll('.btn-order');
    
    // Функция для обновления итоговой цены
    function updateTotalPrice(price, quantity) {
        const total = (price * quantity).toFixed(2);
        orderTotalPrice.textContent = total + ' р';
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
            } else if (productCard.classList.contains('interior')) {
                features = productFeatures.interior;
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
            
            // Проверяем, есть ли детальная информация для этого товара
            if (productDetails[productTitle]) {
                // Используем свойства из детальной информации вместо общих особенностей
                const details = productDetails[productTitle];
                
                // Создаем список особенностей (без дублирования заголовка, т.к. он уже есть в HTML)
                const featuresList = document.createElement('ul');
                
                // Используем свойства из детальной информации
                if (details['Свойства'] && Array.isArray(details['Свойства'])) {
                    details['Свойства'].forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature;
                        featuresList.appendChild(li);
                    });
                    productDetailsFeatures.appendChild(featuresList);
                }
            } else {
                // Если нет детальной информации, используем стандартные особенности из productFeatures
                features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    productDetailsFeatures.appendChild(li);
                });
            }
            
            // Добавляем подробные характеристики, если они есть
            if (productDetails[productTitle]) {
                const details = productDetails[productTitle];
                
                // Добавляем заголовок раздела характеристик
                const specsTitle = document.createElement('h3');
                specsTitle.textContent = 'Технические характеристики';
                specsTitle.classList.add('specs-title');
                productDetailsFeatures.appendChild(specsTitle);
                
                const specsList = document.createElement('ul');
                specsList.className = 'product-specs-list';
                
                // Добавляем основные характеристики
                for (const [key, value] of Object.entries(details)) {
                    // Проверяем, что ключ не относится к свойствам, которые мы отображаем отдельно
                    if (key !== 'Свойства' && key !== 'Эффекты' && (!Array.isArray(value) || key === 'Размер зерна')) {
                        const li = document.createElement('li');
                        li.innerHTML = `<strong>${key}:</strong> `;
                        
                        if (Array.isArray(value)) {
                            // Для массивов создаем подсписок
                            const ul = document.createElement('ul');
                            ul.style.marginLeft = '20px';
                            ul.style.marginTop = '5px';
                            
                            value.forEach(item => {
                                const subLi = document.createElement('li');
                                subLi.textContent = item;
                                ul.appendChild(subLi);
                            });
                            
                            li.appendChild(ul);
                        } else {
                            li.innerHTML += value;
                        }
                        
                        specsList.appendChild(li);
                    }
                }
                
                // Добавляем отображение цены, если она указана
                if (details['Цена']) {
                    // Обновляем отображаемую цену в верхней части модального окна
                    productDetailsPrice.textContent = details['Цена'];
                }
                
                // Добавляем эффекты в отдельном разделе
                if (details['Эффекты'] && details['Эффекты'].length > 0) {
                    const effectsTitle = document.createElement('h3');
                    effectsTitle.textContent = 'Доступные эффекты';
                    effectsTitle.style.marginTop = '30px';
                    effectsTitle.classList.add('effects-title');
                    productDetailsFeatures.appendChild(effectsTitle);
                    
                    const effectsList = document.createElement('ul');
                    
                    details['Эффекты'].forEach(effect => {
                        const li = document.createElement('li');
                        li.textContent = effect;
                        effectsList.appendChild(li);
                    });
                    
                    productDetailsFeatures.appendChild(effectsList);
                }
                
                // Добавляем размеры зерна
                if (details['Размер зерна']) {
                    const li = document.createElement('li');
                    li.innerHTML = '<strong>Размер зерна:</strong> ' + details['Размер зерна'].join(', ');
                    specsList.appendChild(li);
                }
                
                // Добавляем варианты фасовки как отдельный элемент, если они есть
                if (details['Варианты фасовки'] && Array.isArray(details['Варианты фасовки'])) {
                    const packagingTitle = document.createElement('h3');
                    packagingTitle.textContent = 'Варианты фасовки';
                    packagingTitle.classList.add('effects-title');
                    packagingTitle.style.marginTop = '20px';
                    productDetailsFeatures.appendChild(packagingTitle);
                    
                    const packagingList = document.createElement('ul');
                    packagingList.className = 'product-packaging-list';
                    
                    // Первый элемент выбираем по умолчанию для начального отображения цены
                    let firstItemSelected = false;
                    
                    details['Варианты фасовки'].forEach((packaging, index) => {
                        const li = document.createElement('li');
                        
                        // Проверяем, старый формат или новый
                        if (typeof packaging === 'string') {
                            // Старый формат (строка)
                            li.textContent = packaging;
                            
                            // Извлекаем цену из строки
                            const priceMatch = packaging.match(/(\d+)\s*р\/банка/);
                            if (priceMatch && priceMatch[1] && index === 0 && !firstItemSelected) {
                                productDetailsPrice.textContent = priceMatch[1] + '₽';
                                li.classList.add('selected');
                                firstItemSelected = true;
                            }
                        } else {
                            // Новый формат (объект)
                            li.textContent = packaging.текст;
                            
                            // Выбираем первый элемент по умолчанию
                            if (index === 0 && !firstItemSelected) {
                                productDetailsPrice.textContent = packaging.цена;
                                li.classList.add('selected');
                                firstItemSelected = true;
                            }
                        }
                        
                        // Добавляем возможность выбора варианта фасовки
                        li.style.cursor = 'pointer';
                        li.addEventListener('click', function() {
                            // Выделяем выбранный вариант
                            packagingList.querySelectorAll('li').forEach(item => {
                                item.classList.remove('selected');
                            });
                            li.classList.add('selected');
                            
                            // Обновляем отображаемую цену
                            if (typeof packaging === 'string') {
                                // Старый формат (строка)
                                const priceMatch = packaging.match(/(\d+)\s*р\/банка/);
                                if (priceMatch && priceMatch[1]) {
                                    productDetailsPrice.textContent = priceMatch[1] + '₽';
                                }
                            } else {
                                // Новый формат (объект)
                                productDetailsPrice.textContent = packaging.цена;
                            }
                        });
                        
                        packagingList.appendChild(li);
                    });
                    
                    productDetailsFeatures.appendChild(packagingList);
                }
                
                productDetailsFeatures.appendChild(specsList);
            }
            
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
                orderProductPrice.textContent = productDetailsPrice.textContent;
                
                // Устанавливаем начальное значение итоговой цены
                const priceText = productDetailsPrice.textContent;
                // Извлекаем числовое значение цены, независимо от валюты
                const priceValue = parseFloat(priceText.replace(/[^\d.]/g, ''));
                
                // Проверяем, есть ли у товара варианты фасовки
                const packagingOptionsContainer = document.querySelector('.form-packaging-options');
                if (packagingOptionsContainer) {
                    // Удаляем предыдущие варианты фасовки, если они были
                    packagingOptionsContainer.remove();
                }
                
                // Если это товар "Грунтовка Бетоноконтакт", добавляем селектор выбора фасовки
                if (productTitle === "Грунтовка Бетоноконтакт адгезионная" && productDetails[productTitle] && productDetails[productTitle]['Варианты фасовки']) {
                    // Создаем контейнер для вариантов фасовки
                    const packagingContainer = document.createElement('div');
                    packagingContainer.className = 'form-group form-packaging-options';
                    
                    // Создаем заголовок
                    const packagingLabel = document.createElement('label');
                    packagingLabel.for = 'orderPackaging';
                    packagingLabel.textContent = 'Выберите фасовку';
                    
                    // Создаем селектор
                    const packagingSelect = document.createElement('select');
                    packagingSelect.id = 'orderPackaging';
                    packagingSelect.name = 'orderPackaging';
                    
                    // Добавляем варианты фасовки
                    productDetails[productTitle]['Варианты фасовки'].forEach((packaging, index) => {
                        const option = document.createElement('option');
                        option.value = packaging.вес;
                        option.textContent = packaging.текст;
                        option.dataset.price = packaging.цена;
                        packagingSelect.appendChild(option);
                        
                        // Устанавливаем выбранный вариант, если это текущая отображаемая цена
                        if (productDetailsPrice.textContent === packaging.цена) {
                            packagingSelect.selectedIndex = index;
                        }
                    });
                    
                    // Обработчик изменения выбранной фасовки
                    packagingSelect.addEventListener('change', function() {
                        const selectedOption = this.options[this.selectedIndex];
                        const newPrice = selectedOption.dataset.price;
                        
                        // Обновляем отображаемую цену
                        orderProductPrice.textContent = newPrice;
                        
                        // Обновляем итоговую сумму
                        const priceValue = parseFloat(newPrice.replace(/[^\d.]/g, ''));
                        const quantity = parseInt(orderQuantityInput.value) || 1;
                        updateTotalPrice(priceValue, quantity);
                    });
                    
                    // Добавляем элементы в контейнер
                    packagingContainer.appendChild(packagingLabel);
                    packagingContainer.appendChild(packagingSelect);
                    
                    // Вставляем контейнер с вариантами фасовки перед полем количества
                    const quantityGroup = document.querySelector('#orderQuantity').closest('.form-group');
                    quantityGroup.parentNode.insertBefore(packagingContainer, quantityGroup);
                }
                
                updateTotalPrice(priceValue, 1);
                
                // Показываем модальное окно заказа
                orderModal.style.display = 'flex';
                
                // Обновляем итоговую сумму при изменении количества
                orderQuantityInput.onchange = function() {
                    const quantity = parseInt(this.value) || 1;
                    
                    // Если есть селектор фасовки, используем цену из выбранного варианта
                    const packagingSelect = document.getElementById('orderPackaging');
                    let currentPriceValue = priceValue;
                    
                    if (packagingSelect) {
                        const selectedOption = packagingSelect.options[packagingSelect.selectedIndex];
                        const selectedPrice = selectedOption.dataset.price;
                        currentPriceValue = parseFloat(selectedPrice.replace(/[^\d.]/g, ''));
                    }
                    
                    updateTotalPrice(currentPriceValue, quantity);
                };
                
                orderQuantityInput.oninput = function() {
                    const quantity = parseInt(this.value) || 1;
                    
                    // Если есть селектор фасовки, используем цену из выбранного варианта
                    const packagingSelect = document.getElementById('orderPackaging');
                    let currentPriceValue = priceValue;
                    
                    if (packagingSelect) {
                        const selectedOption = packagingSelect.options[packagingSelect.selectedIndex];
                        const selectedPrice = selectedOption.dataset.price;
                        currentPriceValue = parseFloat(selectedPrice.replace(/[^\d.]/g, ''));
                    }
                    
                    updateTotalPrice(currentPriceValue, quantity);
                };
            };
            
            // Определяем путь к файлу для скачивания
            let downloadPath = '';
            if (productDetails[productTitle] && productDetails[productTitle]['Технический лист']) {
                downloadPath = productDetails[productTitle]['Технический лист'];
            } else {
                // Общая логика для файлов, если нет специального
                if (productTitle.includes('фасадная')) {
                    downloadPath = 'files/artfasadSS.pdf';
                } else if (productTitle.includes('Интерьерная')) {
                    downloadPath = 'files/artinterier.pdf';
                } else if (productTitle.includes('акриловая')) {
                    downloadPath = 'files/artakril.pdf';
                } else if (productTitle.includes('Бетоноконтакт')) {
                    downloadPath = 'files/betonocontakt.pdf';
                } else if (productTitle.includes('Гидроизоляция')) {
                    downloadPath = 'files/aquastopmastic.pdf';
                } else if (productTitle.includes('Finish Premium')) {
                    downloadPath = 'files/finishpremium.pdf';
                }
            }
            
            if (downloadPath) {
                // Настраиваем кнопку "Скачать тех. лист"
                productDetailsDownloadBtn.style.display = 'inline-block'; // Показываем кнопку
                const downloadLink = document.createElement('a');
                downloadLink.href = downloadPath;
                downloadLink.download = productTitle.toLowerCase().replace(/\s+/g, '_') + '_тех_лист.pdf'; // Имя файла при скачивании
                
                productDetailsDownloadBtn.onclick = () => {
                    downloadLink.click();
                };
            } else {
                // Скрываем кнопку, если файла нет
                productDetailsDownloadBtn.style.display = 'none';
            }
        });
    });
    
    // Функция для закрытия модального окна с подробной информацией
    function closeProductDetailsModal() {
        productDetailsModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Функция для закрытия модального окна заказа
    function closeOrderModal() {
        orderModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Закрытие модального окна с подробной информацией при клике на крестик
    productDetailsCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeProductDetailsModal();
    });
    
    // Добавляем дополнительный обработчик mousedown для повышения надежности закрытия
    productDetailsCloseBtn.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeProductDetailsModal();
    });
    
    // Закрытие модального окна с подробной информацией при клике вне его содержимого
    productDetailsModal.addEventListener('click', function(event) {
        if (event.target === productDetailsModal) {
            closeProductDetailsModal();
        }
    });
    
    // Открытие модального окна при клике на кнопку "Оформить заказ"
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('.product-image').src;
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Извлекаем числовое значение цены, независимо от валюты
            const priceValue = parseFloat(productPrice.replace(/[^\d.]/g, ''));
            
            // Заполняем данные товара в модальном окне
            orderProductImage.src = productImage;
            orderProductTitle.textContent = productTitle;
            orderProductPrice.textContent = productPrice;
            
            // Проверяем, есть ли у товара варианты фасовки
            const packagingOptionsContainer = document.querySelector('.form-packaging-options');
            if (packagingOptionsContainer) {
                // Удаляем предыдущие варианты фасовки, если они были
                packagingOptionsContainer.remove();
            }
            
            // Если это товар "Грунтовка Бетоноконтакт", добавляем селектор выбора фасовки
            if (productTitle === "Грунтовка Бетоноконтакт адгезионная" && productDetails[productTitle] && productDetails[productTitle]['Варианты фасовки']) {
                // Создаем контейнер для вариантов фасовки
                const packagingContainer = document.createElement('div');
                packagingContainer.className = 'form-group form-packaging-options';
                
                // Создаем заголовок
                const packagingLabel = document.createElement('label');
                packagingLabel.for = 'orderPackaging';
                packagingLabel.textContent = 'Выберите фасовку';
                
                // Создаем селектор
                const packagingSelect = document.createElement('select');
                packagingSelect.id = 'orderPackaging';
                packagingSelect.name = 'orderPackaging';
                
                // Добавляем варианты фасовки
                productDetails[productTitle]['Варианты фасовки'].forEach((packaging, index) => {
                    const option = document.createElement('option');
                    option.value = packaging.вес;
                    option.textContent = packaging.текст;
                    option.dataset.price = packaging.цена;
                    packagingSelect.appendChild(option);
                });
                
                // Обработчик изменения выбранной фасовки
                packagingSelect.addEventListener('change', function() {
                    const selectedOption = this.options[this.selectedIndex];
                    const newPrice = selectedOption.dataset.price;
                    
                    // Обновляем отображаемую цену
                    orderProductPrice.textContent = newPrice;
                    
                    // Обновляем итоговую сумму
                    const priceValue = parseFloat(newPrice.replace(/[^\d.]/g, ''));
                    const quantity = parseInt(orderQuantityInput.value) || 1;
                    updateTotalPrice(priceValue, quantity);
                });
                
                // Добавляем элементы в контейнер
                packagingContainer.appendChild(packagingLabel);
                packagingContainer.appendChild(packagingSelect);
                
                // Вставляем контейнер с вариантами фасовки перед полем количества
                const quantityGroup = document.querySelector('#orderQuantity').closest('.form-group');
                quantityGroup.parentNode.insertBefore(packagingContainer, quantityGroup);
            }
            
            // Устанавливаем начальное значение итоговой цены
            updateTotalPrice(priceValue, 1);
            
            // Показываем модальное окно
            orderModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Обновляем итоговую сумму при изменении количества
            orderQuantityInput.onchange = function() {
                const quantity = parseInt(this.value) || 1;
                
                // Если есть селектор фасовки, используем цену из выбранного варианта
                const packagingSelect = document.getElementById('orderPackaging');
                let currentPriceValue = priceValue;
                
                if (packagingSelect) {
                    const selectedOption = packagingSelect.options[packagingSelect.selectedIndex];
                    const selectedPrice = selectedOption.dataset.price;
                    currentPriceValue = parseFloat(selectedPrice.replace(/[^\d.]/g, ''));
                }
                
                updateTotalPrice(currentPriceValue, quantity);
            };
            
            orderQuantityInput.oninput = function() {
                const quantity = parseInt(this.value) || 1;
                
                // Если есть селектор фасовки, используем цену из выбранного варианта
                const packagingSelect = document.getElementById('orderPackaging');
                let currentPriceValue = priceValue;
                
                if (packagingSelect) {
                    const selectedOption = packagingSelect.options[packagingSelect.selectedIndex];
                    const selectedPrice = selectedOption.dataset.price;
                    currentPriceValue = parseFloat(selectedPrice.replace(/[^\d.]/g, ''));
                }
                
                updateTotalPrice(currentPriceValue, quantity);
            };
        });
    });
    
    // Закрытие модального окна при клике на крестик
    orderCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeOrderModal();
    });
    
    // Добавляем дополнительный обработчик mousedown для повышения надежности закрытия
    orderCloseBtn.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeOrderModal();
    });
    
    // Закрытие модального окна при клике вне его содержимого
    orderModal.addEventListener('click', function(event) {
        if (event.target === orderModal) {
            closeOrderModal();
        }
    });
    
    // Закрытие модальных окон по клавише Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (orderModal.style.display === 'flex') {
                closeOrderModal();
            }
            if (productDetailsModal.style.display === 'flex') {
                closeProductDetailsModal();
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
        
        // Проверяем, есть ли выбор фасовки
        let packagingInfo = '';
        const packagingSelect = document.getElementById('orderPackaging');
        if (packagingSelect) {
            packagingInfo = `<b>Выбранная фасовка:</b> ${packagingSelect.options[packagingSelect.selectedIndex].textContent}\n`;
        }
        
        // Формируем сообщение для отправки в Telegram
        const telegramMessage = `
<b>Новый заказ с сайта</b>
<b>Товар:</b> ${productTitle}
<b>Цена:</b> ${productPrice}
${packagingInfo}<b>Количество:</b> ${quantity}
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