# Baneronetwo Web

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-1.0.0-161618?logo=radix-ui)](https://www.radix-ui.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.45.0-EC5990?logo=react-hook-form)](https://react-hook-form.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.15.0-CA4245?logo=react-router)](https://reactrouter.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.7.2-22B5BF)](https://recharts.org/)

</div>

## 🌐 Доступні мови

<div align="center">

[![English](https://img.shields.io/badge/English-README-blue)](README.md)
[![Русский](https://img.shields.io/badge/Русский-README-blue)](README.ru.md)
[![Українська](https://img.shields.io/badge/Українська-README-blue)](README.uk.md)
[![Deutsch](https://img.shields.io/badge/Deutsch-README-blue)](README.de.md)
[![日本語](https://img.shields.io/badge/日本語-README-blue)](README.ja.md)
[![Polski](https://img.shields.io/badge/Polski-README-blue)](README.pl.md)
[![简体中文](https://img.shields.io/badge/简体中文-README-blue)](README.zh-CN.md)
[![Беларуская](https://img.shields.io/badge/Беларуская-README-blue)](README.be.md)

</div>

---

## Огляд

Baneronetwo Web - це сучасний, чутливий веб-додаток, створений з використанням React, TypeScript та Tailwind CSS. Він відрізняється багатим набором UI-компонентів на основі примітивів Radix UI та стилізованих за допомогою Tailwind CSS, забезпечуючи плавний користувацький досвід на всіх пристроях.

<div align="center">
<img src="https://via.placeholder.com/800x400?text=Baneronetwo+Web+Screenshot" alt="Скріншот Baneronetwo Web" width="800"/>
</div>

## ✨ Особливості

- **Сучасні UI-компоненти**: Акордеони, випадаючі меню, навігаційні меню, селекти, діалоги, спливаючі підказки та багато іншого
- **Чутливий дизайн**: Повністю адаптивний макет, що працює на всіх пристроях від мобільних до настільних
- **Типобезпечність**: Створено з використанням TypeScript для кращого досвіду розробника та якості коду
- **Швидка розробка**: Працює на Vite для блискавичної збірки та гарячої заміни модулів
- **Інтернаціоналізація**: Повна підтримка кількох мов з перекладами на основі контексту
- **Валідація форм**: Інтегрований React Hook Form для ефективної обробки та валідації форм
- **Візуалізація даних**: Красиві графіки та діаграми за допомогою Recharts
- **Маршрутизація**: Плавна навігація з React Router
- **Теми оформлення**: Підтримка світлого та темного режимів з легким налаштуванням

## 🚀 Початок роботи

```bash
# Клонування репозиторію
git clone https://github.com/yourusername/baneronetwo-web.git
cd baneronetwo-web

# Встановлення залежностей
npm install

# Запуск сервера розробки
npm run dev

# Збірка для продакшену
npm run build

# Попередній перегляд продакшен-збірки
npm run preview
```

## 🛠️ Технологічний стек

### Основні технології

- **Фронтенд-фреймворк**: [React](https://reactjs.org/) - JavaScript бібліотека для створення користувацьких інтерфейсів
- **Мова**: [TypeScript](https://www.typescriptlang.org/) - JavaScript з синтаксисом для типів
- **Стилізація**: [Tailwind CSS](https://tailwindcss.com/) - CSS-фреймворк, заснований на утилітах
- **Інструмент збірки**: [Vite](https://vitejs.dev/) - Інструментарій нового покоління для фронтенду

### UI-компоненти

- **Бібліотека компонентів**: [Radix UI](https://www.radix-ui.com/) - Нестилізовані, доступні компоненти для створення високоякісних дизайн-систем
- **Іконки**: [Lucide Icons](https://lucide.dev/) - Красиві та узгоджені іконки
- **Типографіка**: Користувацька система типографіки на основі Tailwind CSS

### Управління станом та обробка даних

- **Обробка форм**: [React Hook Form](https://react-hook-form.com/) - Продуктивні, гнучкі та розширювані форми
- **Отримання даних**: [SWR](https://swr.vercel.app/) - React-хуки для отримання даних
- **Візуалізація даних**: [Recharts](https://recharts.org/) - Переосмислена бібліотека графіків, створена за допомогою React та D3

### Маршрутизація та навігація

- **Маршрутизація**: [React Router](https://reactrouter.com/) - Декларативна маршрутизація для React

### Інструменти розробки

- **Лінтинг**: ESLint з користувацькою конфігурацією
- **Форматування**: Prettier
- **Тестування**: Vitest та React Testing Library

## 📂 Структура проекту

```
├── src/                  # Вихідні файли
│   ├── components/       # Багаторазові UI-компоненти
│   ├── context/          # React контекст-провайдери
│   ├── hooks/            # Користувацькі React-хуки
│   ├── lib/              # Службові бібліотеки
│   ├── pages/            # Сторінки додатку
│   ├── translations/     # Файли інтернаціоналізації
│   └── utils/            # Службові функції
├── public/               # Статичні ресурси
└── ...                   # Конфігураційні файли
```

## 🌍 Інтернаціоналізація

Baneronetwo Web підтримує кілька мов через систему перекладів на основі контексту. Додаток визначає бажану мову користувача та автоматично відображає контент цією мовою, якщо він доступний.

Підтримувані мови:
- Англійська (English)
- Російська (Русский)
- Українська
- Німецька (Deutsch)
- Японська (日本語)
- Польська (Polski)
- Спрощена китайська (简体中文)
- Білоруська (Беларуская)

## 🤝 Участь у розробці

Внески вітаються! Будь ласка, не соромтеся надсилати Pull Request.

## 📄 Ліцензія

Цей проект ліцензований під ліцензією MIT - див. файл LICENSE для отримання детальної інформації.