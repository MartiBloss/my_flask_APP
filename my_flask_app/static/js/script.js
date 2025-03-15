// Криптографически безопасный генератор случайных чисел
function getRandomIndex(max) {
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    return randomValues[0] % max;
}

// Функция для проверки сложности пароля
function ensureComplexity(password, uppercase, lowercase, numbers, symbols) {
    if (uppercase && !/[A-Z]/.test(password)) return false;
    if (lowercase && !/[a-z]/.test(password)) return false;
    if (numbers && !/[0-9]/.test(password)) return false;
    if (symbols && !/[^A-Za-z0-9]/.test(password)) return false;
    return true;
}

// Функция для генерации пароля
function generatePassword(length, uppercase, lowercase, numbers, symbols) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?~-=';

    let allowedChars = '';
    let password = '';

    if (uppercase) allowedChars += uppercaseChars;
    if (lowercase) allowedChars += lowercaseChars;
    if (numbers) allowedChars += numberChars;
    if (symbols) allowedChars += symbolChars;

    if (allowedChars.length === 0) return 'Варианты не выбраны';

    // Генерация пароля с проверкой сложности
    do {
        password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = getRandomIndex(allowedChars.length);
            password += allowedChars[randomIndex];
        }
    } while (!ensureComplexity(password, uppercase, lowercase, numbers, symbols));

    return password;
}

// Обработчик для кнопки "Сгенерировать пароль"
document.getElementById('generateButton').addEventListener('click', function () {
    const length = parseInt(document.getElementById('length').value, 10);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    document.getElementById('passwordOutput').textContent = password;
    updateStrengthIndicator(password);
});

// Обработчик для кнопки "Копировать пароль"
document.getElementById('copyButton').addEventListener('click', function () {
    const password = document.getElementById('passwordOutput').textContent;
    if (password) {
        navigator.clipboard.writeText(password).then(() => {
            const copyMessage = document.getElementById('copyMessage');
            copyMessage.textContent = 'Пароль скопирован в буфер обмена!';
            copyMessage.style.display = 'block';
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000);
        });
    }
});

// Функция для оценки надежности пароля
function calculateStrength(password) {
    let strength = 0;

    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    if (password.length >= 12) strength++;

    return strength;
}

// Функция для обновления индикатора надежности
function updateStrengthIndicator(password) {
    const strengthBar = document.querySelector('#indicatorBar div');
    const strengthText = document.getElementById('strengthText');
    const strength = calculateStrength(password);

    if (strength < 3) {
        strengthBar.style.width = '33%';
        strengthBar.style.backgroundColor = 'red';
        strengthText.textContent = 'Ненадёжный: высокая вероятность потери аккаунта.';
    } else if (strength < 5) {
        strengthBar.style.width = '66%';
        strengthBar.style.backgroundColor = 'orange';
        strengthText.textContent = 'Средний: средняя вероятность потери аккаунта.';
    } else {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'green';
        strengthText.textContent = 'Надёжный: минимальная вероятность потери аккаунта.';
    }
}