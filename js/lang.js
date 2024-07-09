const translations = {
    en: {
        greeting: "Hello! Please click the settings button in the top right corner.",
        settings: "Settings",
        connect: "Connect TON wallet",
        disconnect: "Disconnect TON wallet",
        buy: "Buy",
        transactions: "Transactions:",
        address: "Address:",
        balance: "Balance:",
        close: "Close"
    },
    ru: {
        greeting: "Здравствуйте! Пожалуйста, нажмите кнопку настроек в правом верхнем углу.",
        settings: "Настройки",
        connect: "Подключить TON кошелек",
        disconnect: "Отключить TON кошелек",
        buy: "Купить",
        transactions: "Транзакции:",
        address: "Адрес:",
        balance: "Баланс:",
        close: "Закрыть"
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    updateUI();
}

function t(key) {
    return translations[currentLang][key];
}