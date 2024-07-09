function updateUI() {
    document.getElementById('greeting').textContent = t('greeting');
    document.getElementById('settingsBtn').textContent = t('settings');
    document.getElementById('walletConnectBtn').textContent = walletAddress ? t('disconnect') : t('connect');
    document.getElementById('buyBtn').textContent = t('buy');
    document.getElementById('counter').innerHTML = `${t('transactions')} <span id="txCount">${transactionCount}</span>`;
    document.getElementById('closeModal').textContent = t('close');

    if (walletAddress) {
        document.getElementById('walletInfo').innerHTML = `
            <p>${t('address')} ${walletAddress}</p>
            <p>${t('balance')} <span id="balance">...</span> TON</p>
        `;
        document.getElementById('buyBtn').style.display = 'block';
        document.getElementById('counter').style.display = 'block';
        updateBalance();
    } else {
        document.getElementById('walletInfo').innerHTML = '';
        document.getElementById('buyBtn').style.display = 'none';
        document.getElementById('counter').style.display = 'none';
    }
}

async function updateBalance() {
    if (walletAddress) {
        try {
            const provider = new ton.TonClient({
                endpoint: 'https://toncenter.com/api/v2/jsonRPC'
            });
            const balance = await provider.getBalance(walletAddress);
            document.getElementById('balance').textContent = ton.fromNano(balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
            document.getElementById('balance').textContent = 'Error';
        }
    }
}

function showSettings() {
    document.getElementById('settingsModal').style.display = 'block';
}

function hideSettings() {
    document.getElementById('settingsModal').style.display = 'none';
}