const elitePortfolio = {
    "projects": [
        {
            "title": "Global E-Commerce Platform v2.0",
            "description": "Enterprise e-commerce dengan microservices architecture. 10M+ transactions/month. Real-time inventory, AI recommendation engine.",
            "tech": ["React", "Node.js", "MongoDB", "Redis", "Kubernetes", "AWS"],
            "year": "2026",
            "impact": "99.99% uptime, 60% conversion boost"
        },
        {
            "title": "AI Cyber Threat Platform",
            "description": "Real-time threat detection menggunakan ML + behavioral analysis. Zero false positives dalam 6 bulan testing.",
            "tech": ["Python", "TensorFlow", "Elasticsearch", "Kafka", "Docker"],
            "year": "2026",
            "impact": "Detected 500+ zero-day attacks"
        },
        {
            "title": "Banking API Fortress",
            "description": "Zero-trust API gateway untuk 5 bank nasional. Passed 10.000+ penetration tests.",
            "tech": ["Node.js", "Go", "OAuth2", "Redis", "HashiCorp Vault"],
            "year": "2025",
            "impact": "ISO 27001 certified"
        },
        {
            "title": "Real-time Figma Clone",
            "description": "Collaboration tool 1000+ concurrent users. CRDT-based real-time editing.",
            "tech": ["Vue 3", "Socket.io", "PostgreSQL", "Redis"],
            "year": "2026",
            "impact": "Sub 50ms latency"
        },
        {
            "title": "Ultimate Pentest Framework",
            "description": "Custom framework dengan 200+ modules. Used by top cybersecurity firms.",
            "tech": ["Python", "Rust", "Nmap", "Metasploit"],
            "year": "2026",
            "impact": "Found 100+ CVEs"
        },
        {
            "title": "Blockchain Supply Chain DLT",
            "description": "Hyperledger Fabric implementation untuk 50+ manufacturers.",
            "tech": ["Hyperledger", "Solidity", "IPFS", "React"],
            "year": "2025",
            "impact": "$500M+ tracked assets"
        }
    ]
};

async function loadPortfolio() {
    const container = document.getElementById('portfolioGrid');
    container.innerHTML = '<div class="loading">Loading elite projects...</div>';
    
    setTimeout(() => {
        container.innerHTML = '';
        elitePortfolio.projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'portfolio-item';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <div class="project-meta">
                    <span class="project-year">${project.year}</span>
                    <span class="project-impact">${project.impact}</span>
                </div>
            `;
            card.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(card);
        });
    }, 1200);
}

window.elitePortfolio = elitePortfolio;