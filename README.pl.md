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

## 🌐 Dostępne języki

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

## Przegląd

Baneronetwo Web to nowoczesna, responsywna aplikacja internetowa zbudowana przy użyciu React, TypeScript i Tailwind CSS. Charakteryzuje się bogatym zestawem komponentów UI opartych na prymitywach Radix UI i stylizowanych za pomocą Tailwind CSS, zapewniając płynne doświadczenie użytkownika na wszystkich urządzeniach.

<div align="center">
<img src="ScreenNig.png" alt="Zrzut ekranu Baneronetwo Web" width="800"/>
</div>

## ✨ Funkcje

- **Nowoczesne komponenty UI**: Akordeony, menu rozwijane, menu nawigacyjne, pola wyboru, dialogi, podpowiedzi i więcej
- **Responsywny design**: W pełni adaptowalny układ, który działa na wszystkich urządzeniach od mobilnych po desktopowe
- **Bezpieczeństwo typów**: Zbudowane z TypeScript dla lepszego doświadczenia programisty i jakości kodu
- **Szybki rozwój**: Napędzany przez Vite dla błyskawicznych kompilacji i gorącej wymiany modułów
- **Internacjonalizacja**: Pełne wsparcie dla wielu języków z tłumaczeniami opartymi na kontekście
- **Walidacja formularzy**: Zintegrowany React Hook Form dla efektywnej obsługi i walidacji formularzy
- **Wizualizacja danych**: Piękne wykresy i grafy dzięki Recharts
- **Routing**: Płynna nawigacja z React Router
- **Motywy**: Wsparcie dla trybu jasnego i ciemnego z łatwą personalizacją

## 🚀 Rozpoczęcie pracy

```bash
# Klonowanie repozytorium
git clone https://github.com/yourusername/baneronetwo-web.git
cd baneronetwo-web

# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Budowanie dla produkcji
npm run build

# Podgląd wersji produkcyjnej
npm run preview
```

## 🛠️ Stos technologiczny

### Podstawowe technologie

- **Framework frontendowy**: [React](https://reactjs.org/) - Biblioteka JavaScript do budowania interfejsów użytkownika
- **Język**: [TypeScript](https://www.typescriptlang.org/) - JavaScript z składnią dla typów
- **Stylizacja**: [Tailwind CSS](https://tailwindcss.com/) - Framework CSS oparty na narzędziach
- **Narzędzie do budowania**: [Vite](https://vitejs.dev/) - Narzędzia frontendowe nowej generacji

### Komponenty UI

- **Biblioteka komponentów**: [Radix UI](https://www.radix-ui.com/) - Niestylizowane, dostępne komponenty do budowania wysokiej jakości systemów projektowych
- **Ikony**: [Lucide Icons](https://lucide.dev/) - Piękne i spójne ikony
- **Typografia**: Niestandardowy system typograficzny oparty na Tailwind CSS

### Zarządzanie stanem i obsługa danych

- **Obsługa formularzy**: [React Hook Form](https://react-hook-form.com/) - Wydajne, elastyczne i rozszerzalne formularze
- **Pobieranie danych**: [SWR](https://swr.vercel.app/) - Hooki React do pobierania danych
- **Wizualizacja danych**: [Recharts](https://recharts.org/) - Przedefiniowana biblioteka wykresów zbudowana z React i D3

### Routing i nawigacja

- **Routing**: [React Router](https://reactrouter.com/) - Deklaratywny routing dla React

### Narzędzia deweloperskie

- **Linting**: ESLint z niestandardową konfiguracją
- **Formatowanie**: Prettier
- **Testowanie**: Vitest i React Testing Library

## 📂 Struktura projektu

```
├── src/                  # Pliki źródłowe
│   ├── components/       # Komponenty UI wielokrotnego użytku
│   ├── context/          # Dostawcy kontekstu React
│   ├── hooks/            # Niestandardowe hooki React
│   ├── lib/              # Biblioteki narzędziowe
│   ├── pages/            # Strony aplikacji
│   ├── translations/     # Pliki internacjonalizacji
│   └── utils/            # Funkcje narzędziowe
├── public/               # Zasoby statyczne
└── ...                   # Pliki konfiguracyjne
```

## 🌍 Internacjonalizacja

Baneronetwo Web obsługuje wiele języków poprzez system tłumaczeń oparty na kontekście. Aplikacja wykrywa preferowany język użytkownika i automatycznie wyświetla treść w tym języku, jeśli jest dostępna.

Obsługiwane języki:
- Angielski (English)
- Rosyjski (Русский)
- Ukraiński (Українська)
- Niemiecki (Deutsch)
- Japoński (日本語)
- Polski
- Uproszczony chiński (简体中文)
- Białoruski (Беларуская)

## 🤝 Współpraca

Wkłady są mile widziane! Zachęcamy do składania Pull Requestów.

## 📄 Licencja

Ten projekt jest licencjonowany na podstawie licencji MIT - szczegóły znajdują się w pliku LICENSE.