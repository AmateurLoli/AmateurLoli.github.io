document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    document.body.style.backgroundColor = tg.themeParams.bg_color;
    document.body.style.color = tg.themeParams.text_color;

    const buttons = document.getElementsByTagName('button');
    for (let button of buttons) {
        button.style.backgroundColor = tg.themeParams.button_color;
        button.style.color = tg.themeParams.button_text_color;
    }

    initWallet();
    updateUI();

    document.getElementById('settingsBtn').addEventListener('click', showSettings);
    document.getElementById('closeModal').addEventListener('click', hideSettings);
    document.getElementById('walletConnectBtn').addEventListener('click', () => {
        if (walletAddress) {
            disconnectWallet();
        } else {
            connectWallet();
        }
    });
    document.getElementById('buyBtn').addEventListener('click', sendTransaction);
    document.getElementById('langSelect').addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
});