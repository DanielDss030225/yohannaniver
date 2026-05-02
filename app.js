// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDJy0O49LZ7vJHrX9K_hJERTuG83Oxc70A",
    authDomain: "yohanna-niver.firebaseapp.com",
    databaseURL: "https://yohanna-niver-default-rtdb.firebaseio.com",
    projectId: "yohanna-niver",
    storageBucket: "yohanna-niver.firebasestorage.app",
    messagingSenderId: "501860169828",
    appId: "1:501860169828:web:f4feb381601ba52d6f4771",
    measurementId: "G-YDDEMJCP2Y"
};

// Inicialização
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Listas de Convidados
const family = [
    "Tia Cátia", "Tio Toninho", "Primo Carlos e Namorada", "Prima Karen", "Tia Fátima",
    "Prima Sirlene", "Primo Tiago", "Irmão Vinícius", "Cunhada Carla", "Irmão Lekin",
    "Irmão Adriano", "Irmã Taís", "Irmã Jéssica", "Cunhado Daniel", "Mãe Maria",
    "Pai Fernando", "Tio Denis", "Tia Daniela", "Vanderli (madrasta)", "Jaquiline Prima e Júnior",
    { name: "Beto", phone: "31985536906" }
];

const friends = [
    { name: "Hilari", phone: "31998653038" },
    { name: "Yasmin", phone: "31991711451" },
    { name: "Gabriela", phone: "31973301252" },
    { name: "Dafne", phone: "31973652766" },
    { name: "Emilly", phone: "31981128044" },
    { name: "Jean", phone: "31983218007" },
    { name: "Renata", phone: "31992140622" },
    { name: "Vitória", phone: "31972659565" },
    { name: "Thaila", phone: "319980212307" },
    { name: "Anny", phone: "319982860737" },
    { name: "Daniela", phone: "319702008265" },
    { name: "Julia", phone: "319996480113" },
    { name: "Letícia", phone: "319972240440" },
    { name: "Ester", phone: "31986773451" },
    { name: "Aila", phone: "319972360203" },
    { name: "Bernardo", phone: "31999423445" },
    { name: "Tiago", phone: "31987573236" },
    { name: "Adriano", phone: "3194619958" },
    { name: "Cadu", phone: "31985969260" },
    { name: "Luiz", phone: "31990801312" },
    { name: "Bianca", phone: "31988070035" },
    { name: "Liliane", phone: "31987351512" },
    { name: "Alice", phone: "31992627603" },
    { name: "Thiago", phone: "31992403636" },
    { name: "Sara", phone: "31997697129" },
    { name: "Gustavo", phone: "31993530799" },
    { name: "Juquinha", phone: "********" },
    { name: "Ana Paula", phone: "31987890723" },
    { name: "Caio", phone: "31990698988" },
    { name: "Isabella", phone: "*******" }
];

const giftSuggestions = {
    "Beleza e Autocuidado": [
        "Maleta de maquiagem", "Kit de maquiagem profissional", "Espelho com LED", "Escova secadora",
        "Chapinha profissional", "Babyliss", "Kit skincare", "Perfume importado", "Perfume nacional",
        "Hidratantes premium", "Kit de unhas", "Esmaltes importados", "Nécessaire personalizada",
        "Kit spa (sais, velas)", "Massagem relaxante (voucher)"
    ],
    "Joias e Acessórios": [
        "Anel de debutante", "Colar com inicial", "Pulseira de prata", "Brincos delicados",
        "Relógio feminino", "Gargantilha", "Choker estilosa", "Pingente personalizado",
        "Berloques para pulseira", "Corrente dourada", "Anel com pedra", "Kit de acessórios",
        "Óculos de sol", "Bolsa pequena elegante", "Mochila fashion"
    ],
    "Tecnologia": [
        "Celular (tipo iPhone ou Samsung)", "Tablet", "Notebook", "Fone Bluetooth",
        "Headset gamer", "Caixa de som portátil", "Smartwatch", "Kindle", "Ring light",
        "Tripé para celular", "Teclado gamer", "Mouse gamer", "Capa personalizada",
        "Power bank", "Alexa / assistente virtual"
    ],
    "Moda e Estilo": [
        "Vestido para festa", "Tênis estiloso", "Sandália elegante", "Salto alto",
        "Jaqueta jeans", "Jaqueta de couro", "Conjunto de roupas", "Bolsa de marca",
        "Roupas de academia", "Pijama fofo", "Cropped + saia", "Blazer feminino",
        "Calça jeans premium", "Chinelo de marca", "Boné estiloso"
    ],
    "Criativos e Personalizados": [
        "Quadro com fotos", "Álbum personalizado", "Scrapbook", "Caneca personalizada",
        "Livro de mensagens", "Caixa surpresa", "Caixa de fotos explosiva",
        "Ilustração personalizada", "Luminária com nome", "Porta-retrato digital"
    ],
    "Cultura e Hobbies": [
        "Livros (romance/fantasia)", "Box de livros", "Curso online (maquiagem, desenho)",
        "Aula de dança", "Aula de canto", "Aula de equitação", "Curso de idiomas",
        "Curso de fotografia", "Material de pintura", "Instrumento musical"
    ],
    "Quarto e Decoração": [
        "LED para quarto", "Cortina estilosa", "Almofadas decorativas", "Tapete fofo",
        "Poltrona para quarto", "Espelho grande", "Painel de fotos", "Luminária decorativa",
        "Difusor de aromas", "Kit decoração completo"
    ],
    "Experiências": [
        "Viagem", "Dia de princesa (spa completo)", "Ensaio fotográfico", "Festa surpresa",
        "Jantar especial", "Ingresso de show", "Passeio de helicóptero", "Dia em resort",
        "Curso VIP (maquiagem/moda)", "Dinheiro ou Pix (ela escolhe o que quiser 💸)"
    ]
};

let selectedGuest = null;

// UI Elements
const guestListContainer = document.getElementById('guest-list');
const giftListContainer = document.getElementById('gift-list');
const phoneModal = document.getElementById('phone-modal');
const modalGuestName = document.getElementById('modal-guest-name');
const phoneInput = document.getElementById('guest-phone-input');
const btnFinalConfirm = document.getElementById('btn-final-confirm');
const searchInput = document.getElementById('pesquisarNome');

// Welcome Modal & Audio Elements
const welcomeModal = document.getElementById('welcome-modal');
const btnStartMusic = document.getElementById('btn-start-music');
const bgMusic = document.getElementById('bg-music');

// --- Functions ---

function generateId(str) {
    // Safe base64 for UTF-8
    return btoa(unescape(encodeURIComponent(str))).replace(/[/+=]/g, '');
}

function renderGuests() {
    guestListContainer.innerHTML = '';

    // Unifica família e amigos mapeando a categoria de origem
    const listFamily = family.map(item => ({ 
        name: typeof item === 'string' ? item : item.name, 
        phone: typeof item === 'string' ? '' : item.phone || '', 
        category: 'Família'
    }));
    
    const listFriends = friends.map(item => ({
        name: typeof item === 'string' ? item : item.name,
        phone: typeof item === 'string' ? '' : item.phone || '',
        category: 'Amigo'
    }));

    const list = [...listFamily, ...listFriends];

    list.forEach(item => {
        const id = generateId(item.name);
        
        // Define as cores das badges
        const badgeColor = item.category === 'Família' 
            ? 'background: #C5A059; color: #FFFFFF;' // Gold color
            : 'background: var(--olive-light); color: var(--text-dark);';

        const card = document.createElement('div');
        card.className = 'guest-card';
        card.id = `guest-${id}`;
        
        card.innerHTML = `
            <div class="guest-info" style="display: flex; flex-direction: column; gap: 6px; align-items: flex-start;">
                <h4 style="margin: 0; line-height: 1;">${item.name}</h4>
                <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                    <span style="${badgeColor} padding: 0.15rem 0.5rem; border-radius: 12px; font-size: 0.65rem; font-weight: 600; text-transform: uppercase;">${item.category}</span>
                    ${item.phone && item.phone !== '********' && item.phone !== '*******' ? `<span class="phone-badge">${item.phone}</span>` : ''}
                </div>
                <div id="status-${id}" style="font-size: 0.8rem; color: #28a745; font-weight: 600; margin-top: 2px; display: none;">✓ Confirmado</div>
            </div>
            <button class="btn-confirm" onclick="openRSVPModal('${item.name}', '${item.phone}')" id="btn-${id}">Confirmar</button>
        `;
        guestListContainer.appendChild(card);

        // Check DB for confirmation
        db.ref(`rsvp/${id}`).once('value').then(snapshot => {
            if (snapshot.exists()) {
                markAsConfirmed(id);
            }
        }).catch(err => {
            console.warn(`Erro ao carregar status para ${name}: Certifique-se de que as Regras do Firebase estão como 'public'.`);
        });
    });
}

function openRSVPModal(name, expectedPhone) {
    selectedGuest = { name, expectedPhone, id: generateId(name) };
    modalGuestName.innerText = name;
    phoneModal.style.display = 'flex';
    phoneInput.value = '';
    phoneInput.focus();
}

function closeModal() {
    phoneModal.style.display = 'none';
}

btnFinalConfirm.onclick = () => {
    const input = phoneInput.value.trim().replace(/\D/g, '');
    if (!input) return alert("Por favor, digite seu telefone.");

    // Se for amigo e tiver telefone na lista, valida. Se for família, apenas salva o número digitado.
    if (selectedGuest.expectedPhone && selectedGuest.expectedPhone !== '********' && selectedGuest.expectedPhone !== '*******') {
        const cleanExpected = selectedGuest.expectedPhone.replace(/\D/g, '');
        if (input !== cleanExpected) {
            return alert("Número de telefone não confere com o da lista.");
        }
    }

    // Salva no Firebase
    db.ref(`rsvp/${selectedGuest.id}`).set({
        confirmedAt: firebase.database.ServerValue.TIMESTAMP,
        phoneUsed: input
    }).then(() => {
        markAsConfirmed(selectedGuest.id);
        closeModal();
        alert("Presença confirmada com sucesso! Mal podemos esperar para te ver!");
    }).catch(err => {
        console.error(err);
        alert("Erro ao confirmar presença. Verifique as Regras de Segurança no Console do Firebase.");
    });
};

function markAsConfirmed(id) {
    const btn = document.getElementById(`btn-${id}`);
    const status = document.getElementById(`status-${id}`);
    if (btn) {
        btn.innerText = "Confirmado";
        btn.classList.add("confirmed");
        btn.disabled = true;
    }
    if (status) status.style.display = "block";
}

// --- GIFTS LOGIC ---

function renderGifts() {
    giftListContainer.innerHTML = '';

    for (const [category, items] of Object.entries(giftSuggestions)) {
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'gift-category-title';
        categoryHeader.style = 'grid-column: 1 / -1; margin: 2rem 0 1rem; color: var(--olive-primary); border-bottom: 2px solid var(--olive-light); padding-bottom: 0.5rem; font-family: var(--font-serif); font-size: 1.5rem;';
        categoryHeader.innerText = category;
        giftListContainer.appendChild(categoryHeader);

        items.forEach(gift => {
            const giftId = generateId(gift);
            const card = document.createElement('div');
            card.className = 'gift-card';
            card.id = `gift-${giftId}`;
            card.innerHTML = `
                <h4 style="color: var(--olive-dark); font-size: 1rem;">${gift}</h4>
                <div id="gift-status-${giftId}" style="margin: 10px 0; font-size: 0.8rem; color: #666;">Disponível</div>
                <button class="btn-confirm" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="claimGift('${gift.replace(/'/g, "\\'")}')" id="btn-gift-${giftId}">Levar este</button>
            `;
            giftListContainer.appendChild(card);

            // Watch for changes in Realtime
            db.ref(`gifts/${giftId}`).on('value', snapshot => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    card.classList.add('taken');
                    document.getElementById(`gift-status-${giftId}`).innerHTML = `<strong>⚠️ Já escolhido por ${data.claimedBy || 'alguém'}</strong>`;
                    const btn = document.getElementById(`btn-gift-${giftId}`);
                    if (btn) {
                        btn.innerText = "Indisponível";
                        btn.disabled = true;
                    }
                }
            }, err => {
                console.warn("Erro ao monitorar presentes. Verifique as permissões do Firebase.");
            });
        });
    }
}

function claimGift(giftName) {
    const name = prompt("Qual o seu nome para marcar este presente?");
    if (!name) return;

    const giftId = generateId(giftName);
    db.ref(`gifts/${giftId}`).transaction((currentValue) => {
        if (currentValue === null) {
            return { claimedBy: name, timestamp: firebase.database.ServerValue.TIMESTAMP };
        } else {
            return; // Abort if already taken
        }
    }, (error, committed, snapshot) => {
        if (committed) {
            alert(`Obrigado, ${name}! O presente foi marcado para você.`);
        } else {
            alert("Sinto muito, este presente acabou de ser marcado por outra pessoa.");
        }
    });
}

// Init
window.onload = () => {
    renderGuests();
    renderGifts();

    // Welcome logic
    if(btnStartMusic) {
        btnStartMusic.onclick = () => {
            welcomeModal.style.display = 'none';
            // Start audio when user clicks
            bgMusic.play().catch(err => {
                console.warn("Navegador impediu a reprodução automática do áudio", err);
            });
        };
    }
    
    // Configura a Barra de Pesquisa
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.guest-card');
            
            cards.forEach(card => {
                const nameTarget = card.querySelector('h4');
                const phoneTarget = card.querySelector('.phone-badge');
                
                const name = nameTarget ? nameTarget.innerText.toLowerCase() : '';
                const phone = phoneTarget ? phoneTarget.innerText.toLowerCase() : '';
                
                if (name.includes(term) || phone.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
};
