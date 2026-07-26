/**
 * Konda Tech - Interactive Article Reader Modal System
 */

import { showToast } from './utils.js';

export const ARTICLES = [
  {
    id: 'atlas-latency',
    title: 'Como Reduzimos a Latência de Rede para 0.4ms no Atlas Engine',
    category: 'Engenharia',
    readTime: '5 min de leitura',
    date: '20 de Julho, 2026',
    author: {
      name: 'Dr. Lucas Konda',
      role: 'Chief Architect & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    summary: 'Uma análise detalhada das otimizações de soquete TCP no nível de kernel Linux e contorno de chamadas de sistema com io_uring.',
    content: `
      <p class="article-lead">
        Em ambientes corporativos de altíssima escala, cada microssegundo conta. Quando projetamos a arquitetura do <strong>Atlas Engine</strong>, tínhamos uma meta audaciosa: processar mais de 1 milhão de requisições por segundo por nó com latência de p99 inferior a 1 milissegundo.
      </p>

      <h3>1. O Gargalo do Stack TCP/IP Tradicional</h3>
      <p>
        O modelo clássico de I/O em Linux baseado em <code>epoll</code> e chamadas de sistema síncronas introduz trocas de contexto (context switches) dispendiosas entre o espaço de usuário (User Space) e o espaço de kernel (Kernel Space). Em volumes de tráfego extremos, o custo dessas interrupções pode consumir até 35% do tempo total de CPU.
      </p>

      <h3>2. Adotando io_uring e Kernel Bypass Controlado</h3>
      <p>
        Substituímos as primitivas legadas por ring buffers compartilhados no modelo <strong>io_uring</strong> do Linux moderno. Com isso, os pacotes de rede são enfileirados e retirados diretamente da memória ring-buffer sem realizar trocas de contexto desnecessárias.
      </p>

      <div class="code-block-wrapper">
        <div class="code-header">
          <span>atlas_network_kernel.rs</span>
          <span>Rust / Linux Kernel API</span>
        </div>
        <pre><code>// Otimização de Ring Buffer e Zero-Copy no Atlas Engine
pub unsafe fn submit_io_uring_sqe(ring: *mut io_uring, fd: RawFd, buf: &mut [u8]) -> Result<usize> {
    let sqe = io_uring_get_sqe(ring);
    if sqe.is_null() {
        return Err(EngineError::RingFull);
    }
    io_uring_prep_read_fixed(sqe, fd, buf.as_mut_ptr() as *mut _, buf.len() as u32, 0);
    io_uring_sqe_set_flags(sqe, IOSQE_FIXED_FILE | IOSQE_ASYNC);
    Ok(buf.len())
}</code></pre>
      </div>

      <h3>3. Alocação de Memória Sem Trava (Lock-Free Arenas)</h3>
      <p>
        Para evitar a contenção no alocador global de memória, implementamos arenas por thread (Thread-Local Arenas) reutilizáveis. O resultado foi a eliminação completa da perda de pacotes e uma curva de latência p99 achatada em cravados <strong>0.41ms</strong>.
      </p>

      <div class="article-callout">
        <strong>Resultado em Produção:</strong> Redução de 68% no consumo de infraestrutura de servidores e tempo de resposta estável mesmo durante picos imprevistos de tráfego no Black Friday.
      </div>
    `
  },
  {
    id: 'zero-trust-passkeys',
    title: 'Implementando Zero-Trust com Passkeys e FIDO2 em Escala Enterprise',
    category: 'Segurança',
    readTime: '7 min de leitura',
    date: '14 de Julho, 2026',
    author: {
      name: 'Mariana Silva',
      role: 'VP de Cibersegurança',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    summary: 'Por que a senha tradicional está morta para ambientes corporativos e como migrar de forma segura com o Konda Auth.',
    content: `
      <p class="article-lead">
        Ataques de Phishing e roubo de credenciais continuam sendo a causa raiz de mais de 80% dos incidentes de segurança corporativa. O modelo de senhas legadas atingiu o seu limite de eficácia.
      </p>

      <h3>1. Por que o FIDO2 Muda o Jogo?</h3>
      <p>
        Ao contrário do 2FA tradicional baseado em SMS ou tokens TOTP (que ainda são vulneráveis a ataques de man-in-the-middle), o padrão <strong>FIDO2/WebAuthn</strong> utiliza criptografia de chave pública assimétrica ancorada em hardware seguro (como Apple Secure Enclave, YubiKeys ou TPM 2.0).
      </p>

      <h3>2. Arquitetura de Sessão Dinâmica no Konda Auth</h3>
      <p>
        O <strong>Konda Auth</strong> implementa validação contínua de postura de segurança (Continuous Adaptive Risk & Trust Assessment). A cada requisição crítica, a chave de assinatura da sessão é verificada dinamicamente sem impactar a experiência do usuário.
      </p>

      <ul class="article-list">
        <li><strong>Sem senhas nos bancos de dados:</strong> Eliminação total do risco de vazamento de hashes bcrypt/argon2.</li>
        <li><strong>Resistência Nativa a Phishing:</strong> O browser valida a origem do domínio criptograficamente.</li>
        <li><strong>Conformidade LGPD e SOC2 Type II:</strong> Auditoria completa e rastreabilidade ponta a ponta.</li>
      </ul>
    `
  },
  {
    id: 'webassembly-cloud',
    title: 'O Futuro do WebAssembly na Nuvem: Além do Navegador',
    category: 'Open Source',
    readTime: '4 min de leitura',
    date: '02 de Julho, 2026',
    author: {
      name: 'Gabriel Santos',
      role: 'Lead Open Source Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    summary: 'Descubra como o Wasm está transformando a infraestrutura de computação distribuída e eliminando contêineres pesados.',
    content: `
      <p class="article-lead">
        WebAssembly nasceu para rodar código de alta performance nos navegadores, mas sua evolução no ecossistema server-side está revolucionando a computação Serverless e Edge Computing.
      </p>

      <h3>1. O Fim do Cold Start de Contêineres</h3>
      <p>
        Um contêiner Docker tradicional leva centenas de milissegundos para carregar o sistema operacional, runtime de linguagem e dependências. Módulos WebAssembly (Wasm) no formato WASI iniciam em menos de <strong>50 microssegundos</strong> com um consumo de memória até 100x menor.
      </p>

      <h3>2. Isolamento Criptográfico e Segurança Nível Sandbox</h3>
      <p>
        A máquina virtual Wasm do <strong>Atlas Craft</strong> fornece isolamento estrito por padrão. O código só pode acessar recursos do sistema explicitamente concedidos pelo host, garantindo multi-tenancy totalmente seguro na nuvem.
      </p>
    `
  },
  {
    id: 'event-driven-flow',
    title: 'Arquitetura Event-Driven de Alta Concorrência com Konda Flow',
    category: 'Arquitetura',
    readTime: '6 min de leitura',
    date: '28 de Junho, 2026',
    author: {
      name: 'Rodrigo Oliveira',
      role: 'Staff Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    summary: 'Orquestrando fluxos distribuídos com garantia de entrega, controle de backpressure e replicação ativa multi-região.',
    content: `
      <p class="article-lead">
        Sistemas distribuídos modernos precisam lidar com picos imprevisíveis de mensagens sem perder eventos nem sobrecarregar bancos de dados downstream.
      </p>

      <h3>1. Mecanismo de Backpressure Automático</h3>
      <p>
        O <strong>Konda Flow</strong> monitora a saturação dos consumidores em tempo real e desacelera suavemente a ingestão antes de atingir limites de buffer, evitando quedas em cascata (cascading failures).
      </p>

      <h3>2. Replicação Multi-Region Ativa</h3>
      <p>
        Com ordenação causal de eventos e algoritmos de consenso otimizados, o Konda Flow sincroniza mensagens entre continentes com RPO = 0 e RTO de fração de segundos.
      </p>
    `
  },
  {
    id: 'jit-rust-compiler',
    title: 'Compilação JIT Customizada em Rust: Bastidores do Atlas Engine',
    category: 'Compiladores',
    readTime: '8 min de leitura',
    date: '15 de Junho, 2026',
    author: {
      name: 'Camila Torres',
      role: 'Principal Compiler Engineer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    summary: 'Como a geração de código LLVM IR dinâmico otimiza consultas analíticas complexas em tempo de execução.',
    content: `
      <p class="article-lead">
        Em bancos de dados analíticos de última geração, interpretar planos de consulta traz uma sobrecarga proibitiva. A solução do Atlas Engine é compilar as consultas diretamente em código de máquina nativo durante a execução.
      </p>

      <h3>1. Vectorization e Instruções SIMD</h3>
      <p>
        Geramos instruções AVX-512 e ARM Neon dinamicamente, permitindo filtrar e agregar milhões de registros por ciclo de clock da CPU.
      </p>

      <h3>2. Garantia de Segurança de Memória com Rust</h3>
      <p>
        A linguagem Rust garante que a gestão da memória do compilador JIT não sofra de vazamentos (memory leaks) ou acessos inválidos (use-after-free).
      </p>
    `
  },
  {
    id: 'design-system-ux',
    title: 'Design Systems Corporativos de Baixa Latência e Alta Acessibilidade',
    category: 'Design & UX',
    readTime: '5 min de leitura',
    date: '05 de Junho, 2026',
    author: {
      name: 'Lucas Ferreira',
      role: 'Head of Design & UX',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    summary: 'Construindo interfaces enterprise fluidas a 60fps com rigor visual, suporte a temas claros/escuros e acessibilidade WCAG AAA.',
    content: `
      <p class="article-lead">
        Design no contexto corporativo não é apenas estética — é produtividade, redução de fadiga cognitiva e velocidade de execução para operadores de sistemas de missão crítica.
      </p>

      <h3>1. Tipografia e Escalas Matemáticas</h3>
      <p>
        Utilizamos proporções harmônicas para garantir legibilidade perfeita em qualquer resolução de tela, aliadas a contraste de cores estritamente validado em WCAG AA e AAA.
      </p>

      <h3>2. Micro-interações e Feedback Tátil</h3>
      <p>
        Transições de sub-16ms dão a sensação de resposta instantânea, eliminando a incerteza do usuário durante operações complexas.
      </p>
    `
  }
];

let activeModal = null;

export function openArticleModal(articleId) {
  const article = ARTICLES.find(a => a.id === articleId || a.id.toLowerCase() === String(articleId).toLowerCase());
  
  if (!article) {
    showToast('Artigo não encontrado.', 'error');
    return;
  }

  // Create modal markup
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'article-modal-overlay';
  modalOverlay.setAttribute('role', 'dialog');
  modalOverlay.setAttribute('aria-modal', 'true');

  modalOverlay.innerHTML = `
    <div class="article-modal-container card">
      <button class="article-modal-close" aria-label="Fechar artigo">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <div class="article-modal-header">
        <div class="article-modal-meta">
          <span class="section-badge" style="margin: 0;">${article.category}</span>
          <span class="article-modal-date">• ${article.date}</span>
          <span class="article-modal-time">• ${article.readTime}</span>
        </div>

        <h1 class="article-modal-title">${article.title}</h1>

        <div class="article-modal-author">
          <div class="author-avatar-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <div class="author-name">${article.author.name}</div>
            <div class="author-role">${article.author.role}</div>
          </div>
        </div>
      </div>

      <div class="article-modal-body">
        ${article.content}
      </div>

      <div class="article-modal-footer">
        <div class="article-modal-share">
          <span>Compartilhar este artigo:</span>
          <button class="share-btn share-copy" title="Copiar link do artigo">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copiar Link
          </button>
          <button class="share-btn share-email" title="Enviar por E-mail">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            E-mail
          </button>
        </div>
        <button class="btn btn-outline btn-sm article-modal-close-btn">Fechar Leitura</button>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);
  document.body.style.overflow = 'hidden';
  activeModal = modalOverlay;

  // Add event listeners for closing
  const closeBtn = modalOverlay.querySelector('.article-modal-close');
  const closeFooterBtn = modalOverlay.querySelector('.article-modal-close-btn');

  const closeModal = () => {
    modalOverlay.classList.add('closing');
    setTimeout(() => {
      if (document.body.contains(modalOverlay)) {
        document.body.removeChild(modalOverlay);
      }
      document.body.style.overflow = '';
      activeModal = null;
    }, 250);
  };

  closeBtn.addEventListener('click', closeModal);
  closeFooterBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  document.addEventListener('keydown', handleKeyDown);

  // Copy link share functionality
  const copyBtn = modalOverlay.querySelector('.share-copy');
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('Link do artigo copiado para a área de transferência!', 'success');
    }).catch(() => {
      showToast('Link pronto: ' + window.location.href, 'info');
    });
  });

  // Email share functionality
  const emailShareBtn = modalOverlay.querySelector('.share-email');
  emailShareBtn.addEventListener('click', () => {
    const shareSubject = `[Artigo Konda Tech] ${article.title}`;
    const shareBody = `Confira este artigo no site da Konda Tech:\n\n${article.title}\n\n${article.summary}\n\nLeia em: ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(shareSubject)}&body=${encodeURIComponent(shareBody)}`;
    showToast('Abrindo aplicativo de e-mail...', 'success');
  });
}

export function initBlogReader() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-article-id], .card-blog .card-link, .read-article-btn');
    if (trigger) {
      e.preventDefault();
      
      let articleId = trigger.getAttribute('data-article-id');
      if (!articleId) {
        const card = trigger.closest('[data-article-id]') || trigger.closest('.card-blog');
        if (card) {
          articleId = card.getAttribute('data-article-id');
        }
      }

      if (articleId) {
        openArticleModal(articleId);
      } else {
        // Fallback to first article if unspecified
        openArticleModal('atlas-latency');
      }
    }
  });
}
