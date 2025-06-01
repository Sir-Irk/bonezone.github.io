// Card emojis (same as your node-canvas version)
const CARD_EMOJIS = {
    'A♠': '🂡', '2♠': '🂢', '3♠': '🂣', '4♠': '🂤', '5♠': '🂥', '6♠': '🂦',
    '7♠': '🂧', '8♠': '🂨', '9♠': '🂩', '10♠': '🂪', 'J♠': '🂫', 'Q♠': '🂭', 'K♠': '🂮',
    'A♥': '🂱', '2♥': '🂲', '3♥': '🂳', '4♥': '🂴', '5♥': '🂵', '6♥': '🂶',
    '7♥': '🂷', '8♥': '🂸', '9♥': '🂹', '10♥': '🂺', 'J♥': '🂻', 'Q♥': '🂽', 'K♥': '🂾',
    'A♦': '🃁', '2♦': '🃂', '3♦': '🃃', '4♦': '🃄', '5♦': '🃅', '6♦': '🃆',
    '7♦': '🃇', '8♦': '🃈', '9♦': '🃉', '10♦': '🃊', 'J♦': '🃋', 'Q♦': '🃍', 'K♦': '🃎',
    'A♣': '🃑', '2♣': '🃒', '3♣': '🃓', '4♣': '🃔', '5♣': '🃕', '6♣': '🃖',
    '7♣': '🃗', '8♣': '🃘', '9♣': '🃙', '10♣': '🃚', 'J♣': '🃛', 'Q♣': '🃝', 'K♣': '🃞',
    'BACK': '🂠'
};

function renderSlotMachine() {
    const canvas = document.getElementById('slotCanvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f3460');
    gradient.addColorStop(1, '#16537e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText('🎰 SLOT MACHINE 🎰', canvas.width / 2, 50);

    // Generate random symbols
    const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣'];
    const reels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];

    // Draw slot machine frame
    ctx.fillStyle = '#333';
    ctx.fillRect(150, 100, 300, 120);
    ctx.fillStyle = '#000';
    ctx.fillRect(160, 110, 280, 100);

    // Draw reels
    ctx.font = '64px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';

    reels.forEach((symbol, index) => {
        const x = 200 + (index * 90);
        const y = 180;
        ctx.fillText(symbol, x, y);
    });

    // Check for win
    const isWin = reels[0] === reels[1] && reels[1] === reels[2];

    // Result text
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = isWin ? '#00FF00' : '#FF4444';
    ctx.textAlign = 'center';
    ctx.fillText(
        isWin ? '🎉 JACKPOT! 🎉' : 'Try Again!',
        canvas.width / 2,
        280
    );

    // Bet info
    ctx.font = '20px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Bet: $100 | Balance: $5,000', canvas.width / 2, 320);
}

function renderBlackjack() {
    const canvas = document.getElementById('slotCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a472a');
    gradient.addColorStop(1, '#0d2818');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText('♠ BLACKJACK ♥', canvas.width / 2, 40);

    // Generate random cards
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    function randomCard() {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const rank = ranks[Math.floor(Math.random() * ranks.length)];
        return { rank, suit };
    }

    // Player cards
    const playerCards = [randomCard(), randomCard()];
    const dealerCards = [randomCard(), { rank: 'BACK', suit: '' }];

    // Draw dealer section
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText('Dealer:', 50, 100);

    ctx.font = '48px Arial';
    dealerCards.forEach((card, index) => {
        const emoji = card.rank === 'BACK' ? CARD_EMOJIS.BACK :
            CARD_EMOJIS[`${card.rank}${card.suit}`] || '🂠';
        ctx.fillText(emoji, 50 + (index * 60), 140);
    });

    // Draw player section
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Player:', 50, 220);

    ctx.font = '48px Arial';
    playerCards.forEach((card, index) => {
        const emoji = CARD_EMOJIS[`${card.rank}${card.suit}`] || '🂠';
        ctx.fillText(emoji, 50 + (index * 60), 260);
    });

    // Calculate player value (simplified)
    let playerValue = 0;
    playerCards.forEach(card => {
        if (card.rank === 'A') playerValue += 11;
        else if (['J', 'Q', 'K'].includes(card.rank)) playerValue += 10;
        else playerValue += parseInt(card.rank) || 0;
    });

    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`Player Value: ${playerValue}`, 50, 300);

    if (playerValue === 21) {
        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🎉 BLACKJACK! 🎉', canvas.width / 2, 330);
    }
}

function renderRoulette() {
    const canvas = document.getElementById('slotCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#0a4d0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText('🎯 ROULETTE 🎯', canvas.width / 2, 40);

    // Draw roulette wheel
    const centerX = canvas.width / 2;
    const centerY = 180;
    const radius = 80;

    // Outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#8B4513';
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();

    // Random winning number
    const winningNumber = Math.floor(Math.random() * 37); // 0-36
    const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(winningNumber);
    const color = winningNumber === 0 ? 'green' : (isRed ? 'red' : 'black');

    // Draw winning number
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(winningNumber.toString(), centerX, centerY + 10);

    // Result
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = color === 'red' ? '#FF0000' :
        color === 'black' ? '#000000' : '#00AA00';
    ctx.fillText(`Winning: ${winningNumber} (${color.toUpperCase()})`, centerX, 300);

    // Bet result
    ctx.font = '18px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Your bet on RED: $50', centerX, 330);

    if (isRed && winningNumber !== 0) {
        ctx.fillStyle = '#00FF00';
        ctx.fillText('🎉 You Win $50! 🎉', centerX, 350);
    } else {
        ctx.fillStyle = '#FF4444';
        ctx.fillText('💸 You Lose! 💸', centerX, 350);
    }
}

// Initialize with slot machine
window.onload = function () {
    renderSlotMachine();
};
