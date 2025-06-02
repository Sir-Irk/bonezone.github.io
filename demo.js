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
    const canvas = document.getElementById('blackjackCanvas');
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
    const canvas = document.getElementById('rouletteCanvas');
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

let plinkoState = {
    ballX: 300,
    ballY: 50,
    currentRow: 0,
    isActive: false,
    finalSlot: null,
    path: []
};

function renderPlinko() {
    const canvas = document.getElementById('plinkoCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(25, 46, 20, 1.0)');
    gradient.addColorStop(1, 'rgba(25, 30, 20, 1.0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#02D000';
    ctx.textAlign = 'center';

    // Plinko board dimensions
    const boardWidth = 400;
    const boardHeight = 200;
    const startX = (canvas.width - boardWidth) / 2;
    const startY = 70;
    const rows = 7;
    const cols = 8;
    const slotSpacing = boardWidth / cols;

    // Draw pegs in proper triangular pattern
    ctx.fillStyle = '#8B4513';
    for (let row = 0; row < rows; row++) {
        const pegsInRow = cols;
        for (let col = 0; col < pegsInRow; col++) {
            //const pegX = startX + (row * slotSpacing / 2) + col * slotSpacing + (slotSpacing / 2);
            const pegX = startX + col * slotSpacing + (slotSpacing / 2);
            const pegY = startY + row * (boardHeight / rows);

            ctx.beginPath();
            ctx.arc(pegX, pegY, 5, 0, 2 * Math.PI);
            ctx.fill();

            // Store peg positions for collision detection
            if (!window.pegPositions) window.pegPositions = [];
            if (window.pegPositions.length < rows * cols) {
                window.pegPositions.push({ x: pegX, y: pegY, row: row, col: col });
            }
        }
    }

    // Draw slots at bottom
    const slotY = startY + boardHeight + 20;
    const multipliers = [100, 50, 25, 10, 10, 25, 50, 100];

    for (let i = 0; i < cols; i++) {
        const slotX = startX + i * slotSpacing;

        // Slot background
        ctx.fillStyle = i === 3 || i === 4 ? 'rgba(60, 100, 60)' : (i === 0 || i === 7) ? 'rgba(50, 130, 50)' : 'rgba(50, 110, 50)';
        ctx.fillRect(slotX, slotY, slotSpacing, 30);

        // Slot border
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 4;
        ctx.strokeRect(slotX, slotY, slotSpacing, 30);

        // Multiplier text
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(`${multipliers[i]}x`, slotX + slotSpacing / 2, slotY + 20);
    }

    // Draw ball
    if (plinkoState.isActive || plinkoState.finalSlot !== null) {
        // Draw trail
        ctx.strokeStyle = 'rgba(255, 8, 88, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        if (plinkoState.path.length > 1) {
            ctx.moveTo(plinkoState.path[0].x, plinkoState.path[0].y);
            for (let i = 1; i < plinkoState.path.length; i++) {
                ctx.lineTo(plinkoState.path[i].x, plinkoState.path[i].y);
            }
        }
        ctx.stroke();

        ctx.fillStyle = 'rgba(250, 10, 10, 1.0)';
        ctx.beginPath();
        ctx.arc(plinkoState.ballX, plinkoState.ballY, 9, 0, 2 * Math.PI);
        ctx.fill();
    }

    const pad = 8;
    // Show results
    if (plinkoState.finalSlot !== null) {
        const multiplier = multipliers[plinkoState.finalSlot];
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#00FF00';
        ctx.textAlign = 'center';
        ctx.fillText(`🎉 ${multiplier}x Multiplier! 🎉`, canvas.width / 2, canvas.height - pad);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`Winnings: ${100 * multiplier}`, canvas.width / 2, 340);
    } else if (plinkoState.isActive) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(`Step ${plinkoState.currentRow} of ${rows}`, canvas.width / 2, canvas.height - pad);
    } else {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText('Click "Step Plinko" to drop the ball!', canvas.width / 2, canvas.height - pad);
    }
}

function stepPlinko() {
    const canvas = document.getElementById('plinkoCanvas');
    if (!plinkoState.isActive && plinkoState.finalSlot === null) {
        // Start new game - reset peg positions
        window.pegPositions = [];
        plinkoState.isActive = true;
        plinkoState.ballX = canvas.width / 2; // Start at center
        plinkoState.ballY = 50;
        plinkoState.currentRow = 0;
        plinkoState.path = [{ x: plinkoState.ballX, y: plinkoState.ballY }];
        renderPlinko();
        return;
    }

    if (!plinkoState.isActive) return;

    const boardWidth = 400;
    const boardHeight = 200;
    //const startX = (600 - boardWidth) / 2;
    const startX = canvas.width / 2;
    const startY = 70;
    const rows = 7;
    const cols = 8;
    const slotSpacing = boardWidth / cols;
    const moveMagX = slotSpacing * 1.0;

    if (plinkoState.currentRow < rows) {
        // Find the pegs in the current row that the ball might hit
        const currentRowPegs = window.pegPositions.filter(peg => peg.row === plinkoState.currentRow);

        // Find the closest peg to the ball's current position
        let closestPeg = null;
        let closestDistance = Infinity;

        for (let peg of currentRowPegs) {
            const distance = Math.abs(peg.x - plinkoState.ballX);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestPeg = peg;
            }
        }

        if (closestPeg) {
            // Move ball to just above the peg
            plinkoState.ballY = closestPeg.y + 15;

            // Ball bounces left or right off the peg
            let bounceDirection = Math.random() < 0.5 ? -1 : 1;
            const future = plinkoState.ballX + moveMagX * bounceDirection;
            const thresh = boardWidth / 2;
            if (Math.abs(startX - future) >= thresh) {
                bounceDirection = -bounceDirection;
            }
            plinkoState.ballX = closestPeg.x + (bounceDirection * moveMagX);
        }

        plinkoState.path.push({ x: plinkoState.ballX, y: plinkoState.ballY });
        plinkoState.currentRow++;
    } else {
        // Ball reached bottom - determine final slot
        const boardLeft = (canvas.width / 2 - boardWidth / 2);
        const relativeX = plinkoState.ballX - boardLeft;
        plinkoState.finalSlot = Math.floor(relativeX / slotSpacing);
        plinkoState.finalSlot = Math.max(0, Math.min(cols - 1, plinkoState.finalSlot));

        // Position ball in center of final slot
        plinkoState.ballX = boardLeft + plinkoState.finalSlot * slotSpacing + slotSpacing * 0.5;
        plinkoState.ballY = startY + boardHeight + 35;
        plinkoState.path.push({ x: plinkoState.ballX, y: plinkoState.ballY });

        plinkoState.isActive = false;
    }

    renderPlinko();
}

function resetPlinko() {
    plinkoState = {
        ballX: 300,
        ballY: 50,
        currentRow: 0,
        isActive: false,
        finalSlot: null,
        path: []
    };
    renderPlinko();
}
// Initialize with slot machine
window.onload = function () {
    resetPlinko();
    renderSlotMachine();
    renderBlackjack();
    renderRoulette();
};
