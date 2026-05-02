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

// --- DATABASE E MIGRAÇÃO DE CONVIDADOS ---
window.currentGuestsFromDB = [];

// Mantemos a lista original apenas como backup temporário para a migração inicial
const originalFamily = [
    "Tia Cátia", "Tio Toninho", "Primo Carlos e Namorada", "Prima Karen", "Tia Fátima",
    "Prima Sirlene", "Primo Tiago", "Irmão Vinícius", "Cunhada Carla", "Irmão Lekin",
    "Irmão Adriano", "Irmã Taís", "Irmã Jéssica", "Cunhado Daniel", "Mãe Maria",
    "Pai Fernando", "Tio Denis", "Tia Daniela", "Vanderli (madrasta)", "Jaquiline Prima e Júnior",
    { name: "Beto", phone: "31985536906" }
];

const originalFriends = [
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

function migrateInitialDataToFirebase() {
    const listFamily = originalFamily.map(item => ({
        name: typeof item === 'string' ? item : item.name,
        phone: typeof item === 'string' ? '' : item.phone || '',
        category: 'Família'
    }));
    const listFriends = originalFriends.map(item => ({
        name: typeof item === 'string' ? item : item.name,
        phone: typeof item === 'string' ? '' : item.phone || '',
        category: 'Amigo'
    }));

    const all = [...listFamily, ...listFriends];
    all.forEach(g => {
        const id = generateId(g.name);
        db.ref(`guests/${id}`).set(g).catch(err => console.log("Permissão Admin:", err));
    });
}

const giftSuggestions = {
    "Beleza e Autocuidado": [
        "Maleta de maquiagem", "Kit de maquiagem profissional", "Espelho com LED", "Escova secadora",
        "Chapinha profissional", "Babyliss", "Kit skincare", "Perfume importado", "Perfume nacional",
        "Hidratantes premium", "Kit de unhas", "Esmaltes importados", "Nécessaire personalizada", "Massagem relaxante (voucher)"
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

// --- CUSTOM MODAL UTILS ---
const customAlertModal = document.getElementById('custom-alert-modal');
const customAlertTitle = document.getElementById('custom-alert-title');
const customAlertMessage = document.getElementById('custom-alert-message');
const customAlertInput = document.getElementById('custom-alert-input');
const customAlertBtnOk = document.getElementById('custom-alert-btn-ok');
const customAlertBtnCancel = document.getElementById('custom-alert-btn-cancel');

window.showCustomModal = function({ type = 'alert', title = 'Aviso', message = '', placeholder = '' }) {
    return new Promise((resolve) => {
        if(!customAlertModal) {
            // Em caso de falha no carregamento HTML
            if(type === 'prompt') resolve(prompt(message));
            else if(type === 'confirm') resolve(confirm(message));
            else { alert(message); resolve(true); }
            return;
        }

        customAlertTitle.innerText = title;
        customAlertMessage.innerHTML = message;
        
        customAlertInput.style.display = type === 'prompt' ? 'block' : 'none';
        customAlertInput.placeholder = placeholder;
        customAlertInput.value = '';
        if(type === 'prompt') customAlertInput.type = placeholder.toLowerCase().includes('senha') ? 'password' : 'text';
        
        const isAlert = type === 'alert';
        customAlertBtnCancel.style.display = isAlert ? 'none' : 'block';
        customAlertBtnOk.style.width = isAlert ? '100%' : '50%';
        customAlertBtnCancel.style.width = isAlert ? '100%' : '50%';
        
        customAlertModal.style.display = 'flex';
        if(type === 'prompt') setTimeout(() => customAlertInput.focus(), 100);
        
        const cleanup = () => {
            customAlertModal.style.display = 'none';
            customAlertBtnOk.onclick = null;
            customAlertBtnCancel.onclick = null;
        };
        
        customAlertBtnOk.onclick = () => {
            cleanup();
            if(type === 'prompt') resolve(customAlertInput.value);
            else if(type === 'confirm') resolve(true);
            else resolve(true);
        };
        
        customAlertBtnCancel.onclick = () => {
            cleanup();
            if(type === 'prompt') resolve(null);
            else resolve(false);
        };
    });
};

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

function loadGuestsFromFirebase() {
    const loader = document.getElementById('loading-guests');
    if (loader) loader.style.display = 'block';

    db.ref('guests').on('value', snapshot => {
        if (loader) loader.style.display = 'none';
        if (snapshot.exists()) {
            const data = snapshot.val();
            window.currentGuestsFromDB = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            renderGuestsList(window.currentGuestsFromDB);

            // Atualiza a lista admin se o modal estiver aberto
            if (document.getElementById('admin-modal') && document.getElementById('admin-modal').style.display === 'flex') {
                renderAdminList();
            }
        } else {
            // Primeiro acesso: Popula o banco com arrays locais salvos
            migrateInitialDataToFirebase();
        }
    });
}

function renderGuestsList(list) {
    guestListContainer.innerHTML = '';

    list.forEach(item => {
        const id = item.id || generateId(item.name);

        // Define as cores das badges
        const badgeColor = item.category === 'Família'
            ? 'background: #C5A059; color: #FFFFFF;' // Gold color
            : 'background: var(--olive-light); color: var(--text-dark);';

        const card = document.createElement('div');
        card.className = 'guest-card';
        card.id = `guest-${id}`;

        let displayPhone = item.phone || '';

        card.innerHTML = `
            <div class="guest-info" style="display: flex; flex-direction: column; gap: 6px; align-items: flex-start;">
                <h4 style="margin: 0; line-height: 1;">${item.name}</h4>
                <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                    <span style="${badgeColor} padding: 0.15rem 0.5rem; border-radius: 12px; font-size: 0.65rem; font-weight: 600; text-transform: uppercase;">${item.category}</span>
                    ${displayPhone && displayPhone !== '********' && displayPhone !== '*******' ? `<span class="phone-badge" id="display-phone-${id}">${displayPhone}</span>` : ''}
                </div>
                <div id="status-${id}" style="font-size: 0.8rem; color: #28a745; font-weight: 600; margin-top: 2px; display: none;">✓ Confirmado</div>
            </div>
            <button class="btn-confirm" onclick="openRSVPModal('${item.name.replace(/'/g, "\\'")}', '${displayPhone}', '${id}')" id="btn-${id}">Confirmar</button>
        `;
        guestListContainer.appendChild(card);

        // Check DB for confirmation
        db.ref(`rsvp/${id}`).once('value').then(snapshot => {
            if (snapshot.exists()) {
                markAsConfirmed(id, snapshot.val().phoneUsed);
            }
        }).catch(err => {
            console.warn(`Erro ao carregar status do convite. FireBase Regras ok?`);
        });
    });
}

function openRSVPModal(name, expectedPhone, id) {
    selectedGuest = { name, expectedPhone, id };
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
    if (!input) return alert("Por favor, digite seu telefone válido.");

    // Se for amigo e tiver telefone na lista, valida. Se for família, apenas salva o número digitado.
    if (selectedGuest.expectedPhone && selectedGuest.expectedPhone !== '********' && selectedGuest.expectedPhone !== '*******') {
        const cleanExpected = selectedGuest.expectedPhone.replace(/\D/g, '');
        if (input !== cleanExpected) {
            return alert("Número de telefone não confere com o registrado na lista.");
        }
    }

    // Registra Confirmação no RSVP e atualiza o Telefone Base nos Convidados em Tempo Real
    db.ref(`rsvp/${selectedGuest.id}`).set({
        confirmedAt: firebase.database.ServerValue.TIMESTAMP,
        phoneUsed: input
    }).then(() => {
        // Altera permanentemente o telefone como base principal
        db.ref(`guests/${selectedGuest.id}/phone`).set(input);

        markAsConfirmed(selectedGuest.id, input);
        closeModal();
        alert("Presença confirmada com sucesso! Mal podemos esperar para te ver!");
    }).catch(err => {
        console.error(err);
        alert("Erro ao confirmar presença. Verifique as Regras de Segurança no Console do Firebase.");
    });
};

function markAsConfirmed(id, phoneUsed) {
    const btn = document.getElementById(`btn-${id}`);
    const status = document.getElementById(`status-${id}`);
    const phoneBadge = document.getElementById(`display-phone-${id}`);

    if (btn) {
        btn.innerText = "Confirmado";
        btn.classList.add("confirmed");
        btn.disabled = true;
    }
    if (status) status.style.display = "block";

    // Opcional: Se desejar ofuscar a visualização do telefone no card visual ao vivo
    if (phoneBadge && phoneUsed) {
        const obscured = phoneUsed.length >= 8
            ? phoneUsed.substring(0, 4) + "****" + phoneUsed.substring(phoneUsed.length - 2)
            : phoneUsed;
        phoneBadge.innerText = obscured;
    }
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

window.claimGift = async function(giftName) {
    const name = await showCustomModal({ type: 'prompt', title: 'Reservar Presente', message: `Qual o seu nome para marcar este presente?<br><strong style="color:var(--olive-primary)">${giftName}</strong>`, placeholder: 'Seu Nome Completo' });
    if (!name) return;

    const giftId = generateId(giftName);
    db.ref(`gifts/${giftId}`).transaction((currentValue) => {
        if (currentValue === null) {
            return { claimedBy: name, timestamp: firebase.database.ServerValue.TIMESTAMP };
        } else {
            return; // Abort if already taken
        }
    }, async (error, committed, snapshot) => {
        if (committed) {
            await showCustomModal({ title: 'Reserva Realizada!', message: `Obrigado, ${name}! O presente foi marcado para você.` });
        } else {
            await showCustomModal({ title: 'Poxa...', message: 'Sinto muito, este presente acabou de ser marcado por outra pessoa.' });
        }
    });
}

// Init
window.onload = () => {
    loadGuestsFromFirebase();
    renderGifts();
    if (typeof createBackgroundFlowers === 'function') createBackgroundFlowers();

    // Welcome logic
    if (btnStartMusic) {
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

// --- ÁREA ADMINISTRATIVA ---
const btnAdmin = document.getElementById('btn-admin');
const adminModal = document.getElementById('admin-modal');
const adminSearch = document.getElementById('admin-search');

if (adminSearch) {
    adminSearch.addEventListener('input', (e) => {
        if(window.renderAdminList) window.renderAdminList(e.target.value);
    });
}

if (btnAdmin) {
    btnAdmin.onclick = async () => {
        const pwd = await showCustomModal({ type: 'prompt', title: 'SISTEMA VIP', message: 'Digite a senha de acesso administrativo:', placeholder: 'Senha VIP' });
        if (pwd === "132011") {
            adminModal.style.display = 'flex';
            renderAdminList();
        } else if (pwd !== null) {
            await showCustomModal({ title: 'Erro', message: 'Senha Incorreta. Acesso Negado.' });
        }
    }
}

window.editingGuestId = null;

window.saveGuest = async function() {
    const name = document.getElementById('admin-new-name').value.trim();
    const phone = document.getElementById('admin-new-phone').value.trim();
    const cat = document.getElementById('admin-new-cat').value;
    
    if(!name) return await showCustomModal({ title: 'Atenção', message: 'Por favor, digite o nome completo.' });
    
    // Se estiver editando, mantemos o ID para não perder histórico de RSVPs vinculados ao ID original
    const id = window.editingGuestId || generateId(name);
    
    db.ref(`guests/${id}`).update({
        name, phone, category: cat
    }).then(async () => {
        await showCustomModal({ title: 'Sucesso!', message: window.editingGuestId ? `${name} modificado(a) com sucesso!` : `${name} adicionado(a) com sucesso!` });
        window.cancelEdit();
    });
};

window.editGuest = function(id) {
    const guest = window.currentGuestsFromDB.find(g => g.id === id);
    if(guest) {
        document.getElementById('admin-new-name').value = guest.name;
        document.getElementById('admin-new-phone').value = guest.phone || '';
        document.getElementById('admin-new-cat').value = guest.category;
        
        document.getElementById('btn-admin-save').innerText = "Salvar Alterações";
        document.getElementById('btn-admin-cancel').style.display = 'block';
        window.editingGuestId = id;
    }
};

window.cancelEdit = function() {
    document.getElementById('admin-new-name').value = '';
    document.getElementById('admin-new-phone').value = '';
    document.getElementById('admin-new-cat').value = 'Família';
    document.getElementById('btn-admin-save').innerText = "Salvar na Lista";
    document.getElementById('btn-admin-cancel').style.display = 'none';
    window.editingGuestId = null;
};

window.removeGuest = async function(id) {
    const confirmed = await showCustomModal({ type: 'confirm', title: 'ATENÇÃO', message: `Deseja realmente excluir este convidado e desmarcar sua presença (caso exista)?<br><br>Esta ação não pode ser desfeita.`});
    if (confirmed) {
        // Exclui do cadastro e do RSVP
        db.ref(`guests/${id}`).remove();
        db.ref(`rsvp/${id}`).remove();
    }
};

window.renderAdminList = function(searchTerm = '') {
    const adminList = document.getElementById('admin-guest-list');
    if(!adminList) return;
    adminList.innerHTML = '';
    
    if(!window.currentGuestsFromDB) return;
    
    const term = searchTerm.toLowerCase();
    
    // Lista em ordem alfabética
    const sorted = [...window.currentGuestsFromDB].sort((a,b) => a.name.localeCompare(b.name));
    
    const filtered = sorted.filter(g => 
        g.name.toLowerCase().includes(term) || 
        (g.phone && g.phone.includes(term))
    );
    
    filtered.forEach(g => {
        const div = document.createElement('div');
        div.style = "display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 0.8rem 0;";
        div.innerHTML = `
            <div style="line-height:1.2; max-width: 60%">
                <strong style="color:var(--text-dark);">${g.name}</strong><br>
                <span style="font-size:0.75rem; color:#888;">${g.category} &nbsp;|&nbsp; Cel: ${g.phone || 'Sem nº'}</span>
            </div>
            <div style="display: flex; gap: 5px;">
                <button onclick="editGuest('${g.id}')" style="color: var(--olive-primary); border: 1px solid var(--olive-primary); background: transparent; border-radius: 4px; padding: 0.3rem 0.6rem; cursor: pointer; font-size: 0.70rem; font-weight: bold;">✎ Editar</button>
                <button onclick="removeGuest('${g.id}')" style="color: #dc3545; border: 1px solid #dc3545; background: transparent; border-radius: 4px; padding: 0.3rem 0.6rem; cursor: pointer; font-size: 0.70rem; font-weight: bold;">✕ Excluir</button>
            </div>
        `;
        adminList.appendChild(div);
    });
};
