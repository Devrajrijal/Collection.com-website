const emojis = ['❤️', '💖', '💕', '💗', '💓', '💞', '💘'];
let heartInterval;

function nextStage() {
    document.getElementById('stage1').classList.remove('active');
    document.getElementById('stage2').classList.add('active');
}

function showFinalMessage() {
    document.getElementById('stage2').classList.remove('active');
    
    const message = document.createElement("div");
    message.className = "message";
    message.textContent = "For You Maya";
    
    message.onclick = function() {
        this.style.animation = "messageMagic 2s forwards";
        setTimeout(() => this.remove(), 2000);
    };
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        const handContainer = document.querySelector('.hand-container');
        handContainer.style.display = 'block';
        startContinuousHearts();
    }, 3000);
}

function startContinuousHearts() {
    heartInterval = setInterval(createFlyingHeart, 50);
}

function createFlyingHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    
    const startSide = Math.floor(Math.random() * 4);
    let startX, startY;
    
    switch(startSide) {
        case 0: // Top
            startX = Math.random() * window.innerWidth;
            startY = -50;
            break;
        case 1: // Right
            startX = window.innerWidth + 50;
            startY = Math.random() * window.innerHeight;
            break;
        case 2: // Bottom
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight + 50;
            break;
        case 3: // Left
            startX = -50;
            startY = Math.random() * window.innerHeight;
            break;
    }

    const endX = Math.random() * window.innerWidth - startX;
    const endY = Math.random() * window.innerHeight - startY;

    heart.style.setProperty('--start-x', `${startX}px`);
    heart.style.setProperty('--start-y', `${startY}px`);
    heart.style.setProperty('--end-x', `${endX}px`);
    heart.style.setProperty('--end-y', `${endY}px`);

    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}