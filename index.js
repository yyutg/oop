// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'light' ? '🌞' : '🌚';

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌞' : '🌚';
});

// Бургер-меню
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Плавная прокрутка для якорей
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
        }
    });
});

// Обработка формы AI
const aiForm = document.getElementById('ai-form');
if (aiForm) {
    aiForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(aiForm);
        const submitButton = aiForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const spinner = submitButton.querySelector('.loading-spinner');
        
        // Показываем лоадер
        buttonText.textContent = 'Генерация...';
        spinner.classList.remove('hidden');
        submitButton.disabled = true;
        
        // Здесь будет запрос к API
        try {
            // Имитация запроса (замените на реальный API-вызов)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Пример успешного ответа
            const mockResponse = {
                success: true,
                plan: `
                    <h3>Ваш персональный план тренировок</h3>
                    <p><strong>Цель:</strong> ${formData.get('goal') === 'weight_loss' ? 'Похудение' : 'Набор массы'}</p>
                    <p><strong>Уровень:</strong> ${formData.get('level')}</p>
                    <div class="workout-plan">
                        <h4>План на неделю:</h4>
                        <ul>
                            <li>Понедельник: Кардио 30 мин + Силовая</li>
                            <li>Среда: Интервальная тренировка</li>
                            <li>Пятница: Силовая + Растяжка</li>
                        </ul>
                    </div>
                    <p class="tip">* Сохраните этот план или распечатайте</p>
                `
            };
            
            document.getElementById('ai-result').innerHTML = mockResponse.plan;
        } catch (error) {
            document.getElementById('ai-result').innerHTML = `
                <div class="error">Ошибка: ${error.message}</div>
            `;
        } finally {
            // Восстанавливаем кнопку
            buttonText.textContent = 'Сгенерировать план';
            spinner.classList.add('hidden');
            submitButton.disabled = false;
        }
    });
}

// Анимация при скролле
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate, .animate-delay-1, .animate-delay-2, .animate-delay-3, .animate-delay-4');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
// Запускаем при загрузке
animateOnScroll();