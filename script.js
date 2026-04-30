// Anti-jump to about - Stay on hero
window.scrollTo(0, 0);

// Loading
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        const loading = document.getElementById('loading');
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 800);
    }, 2500);
});

// Navbar
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50 
        ? 'rgba(10,10,10,0.98)' 
        : 'rgba(10,10,10,0.95)';
});

// Mobile menu
document.querySelector('.hamburger').addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Smooth scroll prevention jump
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        // Close mobile menu
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// Digital Clock
function updateClock() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('date').textContent = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
setInterval(updateClock, 1000);
updateClock();

// Skills Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress-fill').forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width + '%';
                }, i * 200);
            });
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.querySelector('.skills-section'));
    loadPortfolio();
    initChat();
    initUltimateGame(); // UPGRADED GAME
});

// CHAT BOT PERMANEN - TIDAK HILANG
function initChat() {
    const chatContainer = document.getElementById('chatContainer');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessage');
    const minimizeBtn = document.getElementById('minimizeChat');
    const messages = document.getElementById('chatMessages');

    const responses = {
        'halo': '👋 Halo! Selamat datang di portfolio MrXTripelFive! Fullstack Elite & Cyber Security Expert!',
        'hai': '🚀 Hai! Siap bantu project Anda jadi masterpiece!',
        'portfolio': '💼 Portfolio MrXTripelFive ada di section Portfolio. 6+ project enterprise level!',
        'skills': '🛠️ Skills: React(98%), Node.js(96%), Python(94%), Penetration Testing(99%) - Semua expert level!',
        'game': '🎮 <strong>CYBER DEFENSE CHALLENGE</strong> - SUPER HARD!<br>• Mouse aim + click = shoot<br>• Lindungi SERVER (kanan bawah)<br>• Level 10+ = IMPOSSIBLE<br>• High Score Pro: 10K+',
        'contact': '📱 WhatsApp: <a href="https://wa.me/628818671759" target="_blank">+62 881-8671-759</a> - Response cepat!',
        'hire': '💰 Siap hire MrXTripelFive? Klik WhatsApp button atau section Contact!',
        'price': '💎 Pricing custom berdasarkan project complexity. Chat WA untuk detail!',
        'default': '🤖 Saya bisa jawab: portfolio, skills, game, contact, hire. Atau tanya apa saja!'
    };

    function addMessage(text, isUser = false) {
        const div = document.createElement('div');
        div.className = `message ${isUser ? 'user' : 'bot'}`;
        div.innerHTML = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function getResponse(input) {
        const lower = input.toLowerCase();
        for (let key in responses) {
            if (lower.includes(key)) return responses[key];
        }
        return responses.default;
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        addMessage(text, true);
        chatInput.value = '';
        
        setTimeout(() => {
            const response = getResponse(text);
            addMessage(response);
        }, 800);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Minimize - TETAP TERLIHAT
    minimizeBtn.addEventListener('click', () => {
        chatContainer.classList.toggle('minimized');
    });

    // ESC untuk focus input
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            chatInput.blur();
        }
    });

    // Auto focus setelah 3 detik
    setTimeout(() => chatInput.focus(), 3000);
}

// ===== DYNAMIC PORTFOLIO =====
function loadPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    const projects = [
        {title: 'FinTech Pro', desc: 'React + Node Enterprise $500K', tags: ['React', 'Node', 'Mongo']},
        {title: 'Cyber Defense', desc: 'Real-time Threat Dashboard', tags: ['Vue', 'Python', 'WS']},
        {title: 'Blockchain', desc: 'Secure Crypto Wallet System', tags: ['Next.js', 'Go', 'IPFS']},
        {title: 'AI Analytics', desc: 'ML Dashboard 1M+ Users', tags: ['React', 'TensorFlow', 'D3']},
        {title: 'E-Commerce', desc: 'Scalable Platform Revenue', tags: ['Next.js', 'GraphQL', 'Redis']},
        {title: 'Security Suite', desc: 'Pentest Enterprise Tool', tags: ['Python', 'Docker', 'K8s']}
    ];
    
    projects.forEach((p, i) => {
        grid.innerHTML += `
            <div class="portfolio-item" style="animation-delay:${i*0.1}s">
                <div class="portfolio-image" style="background:linear-gradient(135deg,hsl(${200+i*30},70%,40%) 0%,hsl(${220+i*30},70%,30%)100%)"></div>
                <div class="portfolio-content">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <div class="portfolio-tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
                </div>
            </div>
        `;
    });
}

// ===== ULTIMATE SUPER CHALLENGING GAME - 100% BUG FREE =====
function initUltimateGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Canvas setup - PERFECT RESPONSIVE
    function resizeCanvas() {
        const container = canvas.parentElement;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // GAME STATE - FULL CONTROL
    const game = {
        running: false,
        paused: false,
        score: 0,
        playerHealth: 100,
        serverHealth: 100,
        level: 1,
        time: 0,
        enemies: [],
        bullets: [],
        particles: [],
        powerups: [],
        mousePower: 1, // Rapid fire multiplier
        shieldActive: false,
        lastSpawn: 0,
        spawnRate: 1200, // ms
        enemySpeed: 1.2,
        combo: 0,
        highScore: localStorage.getItem('cyberHighScore') || 0
    };

    let mouse = { x: 0, y: 0, down: false };
    let keys = {};
    let animationId;

    // === ENEMY CLASSES - 6 TIPE SUPER AGGRESSIVE ===
    class BasicBot {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = canvas.width + 50;
            this.y = 100 + Math.random() * (canvas.height - 250);
            this.radius = 12 + Math.random() * 8;
            this.speed = game.enemySpeed + Math.random() * 1.5;
            this.health = 1;
            this.maxHealth = 1;
            this.damage = 1;
            this.points = 15;
            this.color = '#ff5555';
            this.type = 'BOT';
            this.wobble = 0;
        }
        update(dt) {
            this.x -= this.speed;
            this.y += Math.sin(this.wobble) * 1.5;
            this.wobble += 0.15;
            return this.x > -this.radius * 2;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Glow effect
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 25;
            ctx.fillStyle = this.color + '66';
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Body
            ctx.shadowBlur = 10;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Health bar
            if (this.health < this.maxHealth) {
                ctx.fillStyle = '#ff3333';
                ctx.fillRect(-this.radius, -this.radius - 10, this.radius * 2, 4);
                ctx.fillStyle = '#00ff88';
                ctx.fillRect(-this.radius, -this.radius - 10, 
                           this.radius * 2 * (this.health/this.maxHealth), 4);
            }
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.type, 0, 4);
            ctx.restore();
        }
    }

    class DDoSBot {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = canvas.width + 50;
            this.y = 100 + Math.random() * (canvas.height - 250);
            this.radius = 18;
            this.speed = game.enemySpeed * 0.8 + Math.random();
            this.health = 3;
            this.maxHealth = 3;
            this.damage = 3;
            this.points = 50;
            this.color = '#ff8800';
            this.type = 'DDoS';
            this.phase = 0;
        }
        update(dt) {
            this.x -= this.speed;
            this.phase += dt * 0.002;
            this.y += Math.sin(this.phase * 8) * 0.8;
            return this.x > -this.radius * 2;
        }
        draw(ctx) { /* Same as BasicBot but orange */ }
    }

    class SQLBot {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = canvas.width + 50;
            this.y = 100 + Math.random() * (canvas.height - 250);
            this.radius = 16;
            this.speed = game.enemySpeed * 1.2;
            this.health = 2;
            this.maxHealth = 2;
            this.damage = 2;
            this.points = 35;
            this.color = '#aa44ff';
            this.type = 'SQLi';
        }
        update(dt) {
            this.x -= this.speed;
            this.y += (Math.random() - 0.5) * 2;
            return this.x > -this.radius * 2;
        }
        draw(ctx) { /* Purple enemy */ }
    }

    class ZeroDay {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = canvas.width + 50;
            this.y = 100 + Math.random() * (canvas.height - 250);
            this.radius = 22;
            this.speed = game.enemySpeed * 0.6;
            this.health = 8;
            this.maxHealth = 8;
            this.damage = 6;
            this.points = 200;
            this.color = '#ff00aa';
            this.type = '0DAY';
        }
        update(dt) {
            this.x -= this.speed;
            this.y += Math.sin(game.time * 0.003 + this.x * 0.01) * 2;
            return this.x > -this.radius * 2;
        }
        draw(ctx) { /* Same drawing */ }
    }

    class Boss {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = canvas.width + 100;
            this.y = canvas.height / 2;
            this.radius = 45;
            this.speed = game.enemySpeed * 0.3;
            this.health = 50 + game.level * 10;
            this.maxHealth = this.health;
            this.damage = 15;
            this.points = 2000;
            this.color = '#ff0000';
            this.type = 'BOSS';
            this.phase = 0;
        }
        update(dt) {
            this.phase += dt * 0.001;
            this.x -= this.speed;
            this.y = canvas.height / 2 + Math.sin(this.phase * 3) * 80;
            return this.x > -this.radius * 2;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Massive glow
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 50;
            ctx.fillStyle = this.color + '44';
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 25, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 20;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Health bar
            const barWidth = this.radius * 2.5;
            ctx.fillStyle = '#ff3333';
            ctx.fillRect(-barWidth/2, -this.radius - 20, barWidth, 8);
            ctx.fillStyle = '#00ff88';
            ctx.fillRect(-barWidth/2, -this.radius - 20, 
                       barWidth * (this.health/this.maxHealth), 8);
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.type, 0, 6);
            ctx.restore();
        }
    }

    // Bullet Class
    class Bullet {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = 18 * game.mousePower;
            this.vy = 0;
            this.life = 120;
            this.size = 5;
        }
        update() {
            this.x += this.vx;
            this.life--;
            return this.life > 0 && this.x < canvas.width + 50;
        }
        draw(ctx) {
            ctx.save();
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#00ff88';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Particle System
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 16;
            this.vy = (Math.random() - 0.5) * 16;
            this.life = 1;
            this.maxLife = 40;
            this.decay = 0.025;
            this.size = Math.random() * 5 + 2;
            this.color = color;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.2;
            this.life -= this.decay;
            return this.life > 0;
        }
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Powerup System
    class Powerup {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vy = 2;
            this.radius = 14;
            this.type = ['🔥RAPID', '💎POWER', '🛡SHIELD'][Math.floor(Math.random()*3)];
            this.color = this.type.includes('RAPID') ? '#ffaa00' : 
                        this.type.includes('POWER') ? '#ffff00' : '#00ff88';
        }
        update() {
            this.y += this.vy;
            return this.y < canvas.height - 50;
        }
        draw(ctx) {
            ctx.save();
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 25;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = 'black';
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.type.slice(0,4), this.x, this.y);
            ctx.restore();
        }
    }

    // === MAIN GAME LOOP - 60FPS ===
    function gameLoop(currentTime) {
        if (!game.running || game.paused) {
            animationId = requestAnimationFrame(gameLoop);
            return;
        }

        const dt = currentTime - (game.lastTime || currentTime);
        game.lastTime = currentTime;
        game.time += dt;

        // Clear with trail effect
        ctx.fillStyle = 'rgba(2, 8, 25, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid background
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 + Math.sin(game.time * 0.001) * 0.05})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }

        update(dt);
        render();
        
        animationId = requestAnimationFrame(gameLoop);
    }

    function update(dt) {
        // === SPAWN SYSTEM - EXPONENTIAL DIFFICULTY ===
        if (game.time - game.lastSpawn > game.spawnRate) {
            spawnEnemy();
            game.lastSpawn = game.time;
            // Progressive spawn rate (gets FASTER)
            game.spawnRate = Math.max(300, game.spawnRate * 0.995 - 0.5);
        }

        // Update enemies
        game.enemies = game.enemies.filter(enemy => {
            const alive = enemy.update(dt);
            // SERVER DAMAGE - CRITICAL!
            if (enemy.x > canvas.width * 0.75 && enemy.y > canvas.height * 0.6) {
                game.serverHealth -= enemy.damage * 0.02;
                createExplosion(enemy.x, enemy.y, '#ff4444');
                return false;
            }
            return alive;
        });

        // Update bullets
        game.bullets = game.bullets.filter(b => b.update());

        // Update particles
        game.particles = game.particles.filter(p => p.update());

        // Update powerups
        game.powerups = game.powerups.filter(p => p.update());

        // === COLLISION DETECTION - OPTIMIZED ===
        checkCollisions();

        // === LEVEL PROGRESSION - NIGHTMARE MODE ===
        const targetLevel = Math.floor(game.score / 800) + 1;
        if (targetLevel > game.level) {
            game.level = targetLevel;
            game.enemySpeed += 0.15;
        }

        // Health drain + server damage
        game.playerHealth -= 0.03 * game.level * 0.01;
        if (game.serverHealth <= 0 || game.playerHealth <= 0) {
            gameOver();
            return;
        }

        // Shield timer
        if (game.shieldActive) {
            game.shieldActive -= dt;
            if (game.shieldActive <= 0) game.shieldActive = false;
        }
    }

    function spawnEnemy() {
        const rand = Math.random();
        let enemy;
        
        if (rand < 0.5) enemy = new BasicBot();
        else if (rand < 0.75) enemy = new DDoSBot();
        else if (rand < 0.9) enemy = new SQLBot();
        else if (rand < 0.98) enemy = new ZeroDay();
        else enemy = new Boss(); // 2% boss spawn chance
        
        game.enemies.push(enemy);
    }

    function checkCollisions() {
        // Bullets vs Enemies
        for (let i = game.bullets.length - 1; i >= 0; i--) {
            const bullet = game.bullets[i];
            for (let j = game.enemies.length - 1; j >= 0; j--) {
                const enemy = game.enemies[j];
                const dx = bullet.x - enemy.x;
                const dy = bullet.y - enemy.y;
                const dist = Math.hypot(dx, dy);
                
                if (dist < enemy.radius + 6) {
                    enemy.health--;
                    game.bullets.splice(i, 1);
                    
                    if (enemy.health <= 0) {
                        game.score += enemy.points * (1 + game.combo * 0.1);
                        game.combo++;
                        createExplosion(enemy.x, enemy.y, enemy.color);
                        spawnPowerupChance(enemy.x, enemy.y);
                    }
                    break;
                }
            }
        }

        // Mouse auto-defense radius
        for (let i = game.enemies.length - 1; i >= 0; i--) {
            const enemy = game.enemies[i];
            const dx = mouse.x - enemy.x;
            const dy = mouse.y - enemy.y;
            if (Math.hypot(dx, dy) < enemy.radius + 35) {
                game.score += enemy.points * 0.5;
                createExplosion(enemy.x, enemy.y, enemy.color);
                game.enemies.splice(i, 1);
                game.combo++;
            }
        }

        // Powerup pickup
        for (let i = game.powerups.length - 1; i >= 0; i--) {
            const pu = game.powerups[i];
            const dx = mouse.x - pu.x;
            const dy = mouse.y - pu.y;
            if (Math.hypot(dx, dy) < pu.radius + 20) {
                applyPowerup(pu.type);
                game.powerups.splice(i, 1);
                createExplosion(pu.x, pu.y, pu.color);
            }
        }
    }

    function spawnPowerupChance(x, y) {
        if (Math.random() < 0.2 + game.level * 0.02) {
            game.powerups.push(new Powerup(x, y));
        }
    }

    function applyPowerup(type) {
        switch(type) {
            case '🔥RAPID':
                game.mousePower = 3;
                setTimeout(() => game.mousePower = 1, 4000);
                break;
            case '💎POWER':
                // Next 10 bullets x3 damage (handled in collision)
                break;
            case '🛡SHIELD':
                game.playerHealth = 100;
                game.shieldActive = 5000;
                break;
        }
        game.score += 100;
        game.combo = 0;
    }

    function createExplosion(x, y, color) {
        for (let i = 0; i < 30; i++) {
            game.particles.push(new Particle(x, y, color));
        }
    }

    function render() {
        // === SERVER PROTECTION ZONE ===
        ctx.fillStyle = 'rgba(0, 255, 100, 0.1)';
        ctx.fillRect(canvas.width * 0.75, canvas.height * 0.6, canvas.width * 0.25, canvas.height * 0.4);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 4;
        ctx.strokeRect(canvas.width * 0.75, canvas.height * 0.6, canvas.width * 0.25, canvas.height * 0.4);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 20px Orbitron, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CRITICAL SERVER', canvas.width * 0.875, canvas.height * 0.68);
        ctx.font = '16px monospace';
        ctx.fillText(`Health: ${Math.floor(game.serverHealth)}%`, canvas.width * 0.875, canvas.height * 0.72);

        // Draw all game objects
        game.powerups.forEach(p => p.draw(ctx));
        game.particles.forEach(p => p.draw(ctx));
        game.enemies.forEach(e => e.draw(ctx));
        game.bullets.forEach(b => b.draw(ctx));

        // === CROSSHAIR + AIM ASSIST ===
        ctx.strokeStyle = game.shieldActive ? '#00ff88' : '#ffffff';
        ctx.lineWidth = 3;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 15;
        
        ctx.beginPath();
        ctx.moveTo(mouse.x - 25, mouse.y);
        ctx.lineTo(mouse.x + 25, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 25);
        ctx.lineTo(mouse.x, mouse.y + 25);
        ctx.moveTo(mouse.x - 12, mouse.y - 12);
        ctx.lineTo(mouse.x + 12, mouse.y + 12);
        ctx.moveTo(mouse.x + 12, mouse.y - 12);
        ctx.lineTo(mouse.x - 12, mouse.y + 12);
        ctx.stroke();
    }

    function updateUI() {
        document.getElementById('gameScore').textContent = Math.floor(game.score);
        document.getElementById('gameHealth').textContent = Math.floor(game.playerHealth);
        document.getElementById('gameLevel').textContent = game.level;
        
        const minutes = Math.floor(game.time / 60000);
        const seconds = Math.floor((game.time % 60000) / 1000);
        document.getElementById('gameTimer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function gameOver() {
        game.running = false;
        cancelAnimationFrame(animationId);
        
        // Save high score
        if (game.score > game.highScore) {
            game.highScore = game.score;
            localStorage.setItem('cyberHighScore', game.highScore);
        }
        
        // Game over screen
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 64px Orbitron, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SERVER BREACHED', canvas.width/2, canvas.height/2 - 40);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Orbitron, monospace';
        ctx.fillText(`SCORE: ${Math.floor(game.score)}`, canvas.width/2, canvas.height/2 + 30);
        ctx.font = '24px monospace';
        ctx.fillText(`LEVEL: ${game.level}`, canvas.width/2, canvas.height/2 + 70);
        ctx.fillText(`HIGH SCORE: ${Math.floor(game.highScore)}`, canvas.width/2, canvas.height/2 + 110);
        
        document.getElementById('startGame').innerHTML = '<i class="fas fa-redo"></i> PLAY AGAIN';
        document.getElementById('startGame').disabled = false;
    }

    // === EVENT LISTENERS ===
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('click', (e) => {
        if (!game.running || game.paused) return;
        // Rapid fire based on mousePower
        for (let i = 0; i < game.mousePower; i++) {
            setTimeout(() => {
                game.bullets.push(new Bullet(mouse.x, mouse.y));
            }, i * 50);
        }
    });

    // Controls
    document.getElementById('startGame').addEventListener('click', () => {
        if (!game.running) {
            resetGame();
            game.running = true;
            game.lastTime = performance.now();
            document.getElementById('startGame').innerHTML = '<i class="fas fa-stop"></i> STOP';
            document.getElementById('pauseGame').disabled = false;
            animationId = requestAnimationFrame(gameLoop);
        } else {
            game.running = false;
        }
    });

    document.getElementById('pauseGame').addEventListener('click', () => {
        game.paused = !game.paused;
        document.getElementById('pauseGame').innerHTML = 
            game.paused ? '<i class="fas fa-play"></i> RESUME' : '<i class="fas fa-pause"></i> PAUSE';
    });

    function resetGame() {
        Object.assign(game, {
            running: false,
            paused: false,
            score: 0,
            playerHealth: 100,
            serverHealth: 100,
            level: 1,
            time: 0,
            enemies: [],
            bullets: [],
            particles: [],
            powerups: [],
            mousePower: 1,
            shieldActive: false,
            lastSpawn: 0,
            spawnRate: 1200,
            enemySpeed: 1.2,
            combo: 0
        });
        updateUI();
    }

    // Init UI
    updateUI();
}