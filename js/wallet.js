let tonConnectUI;
let walletAddress = null;
let transactionCount = 0;

function initWallet() {
    tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://amateurloli.github.io/tonconnect-manifest.json',
        twaReturnUrl: 'https://t.me/o5_ban'
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
        return;
    }

    const tgUserId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const hash = btoa(tgUserId.toString()); // Simple base64 encoding of Telegram user ID

    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
            {
                address: walletAddress,
                amount: "10000000", // 0.01 TON
                payload: hash
            }
        ]
    };

    try {
        const result = await tonConnectUI.sendTransaction(transaction);
        console.log('Transaction sent:', result);
        transactionCount++;
        updateUI();
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}