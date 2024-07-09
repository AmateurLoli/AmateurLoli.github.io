let tonConnectUI;
let walletAddress = null;
let transactionCount = 0;

function initWallet() {
    tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://amateurloli.github.io/tonconnect-manifest.json',
        twaReturnUrl: 'https://t.me/o5_ban',
        //buttonRootId: 'connect',
        //uiPreferences: {
        //    theme: window.Telegram.WebApp.colorScheme
        //}
    });

    tonConnectUI.connectionRestored.then(restored => {
        if (restored) {
            console.log('Connection restored. Wallet:', JSON.stringify(tonConnectUI.wallet));
            walletAddress = tonConnectUI.account.address;
            updateUI();
        } else {
            console.log('Connection was not restored.');
        }
    });

    tonConnectUI.onStatusChange(wallet => {
        if (wallet) {
            walletAddress = wallet.account.address;
        } else {
            walletAddress = null;
        }
        updateUI();
    });
}

function isWalletConnected() {
    return tonConnectUI.connected && tonConnectUI.account && tonConnectUI.account.address;
}

async function connectWallet() {
    try {
        await tonConnectUI.connectWallet();
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

async function disconnectWallet() {
    try {
        await tonConnectUI.disconnect();
    } catch (error) {
        console.error('Error disconnecting wallet:', error);
    }
}

async function sendTransaction() {
    if (!walletAddress) {
        console.error('Wallet not connected');
        alert('Please connect your wallet first');
        return;
    }

    let tgUserId = 'unknown';
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
        tgUserId = window.Telegram.WebApp.initDataUnsafe.user.id || 'unknown';
    }
    const hash = btoa(tgUserId.toString()); // Simple base64 encoding of Telegram user ID or 'unknown'

    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // Увеличим время действия до 10 минут
        messages: [
            {
                address: walletAddress,
                amount: "10000000", // 0.01 TON
                //payload: hash
            }
        ]
    };

    try {
        const result = await tonConnectUI.sendTransaction(transaction);
        console.log('Transaction sent:', result);
        alert('Transaction sent successfully!');
        transactionCount++;
        updateUI();
    } catch (error) {
        console.error('Error sending transaction:', error);
        alert(`Error sending transaction: ${error.message || 'Unknown error'}`);
    }
}