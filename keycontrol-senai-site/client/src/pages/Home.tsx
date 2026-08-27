/**
 * Design reminder — Blueprint Cívico-Industrial:
 * dossiê técnico assimétrico, etiquetas de inventário, nós de rastreabilidade e contraste institucional.
 */
import { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "wouter";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  Code2,
  Copy,
  Database,
  FileSpreadsheet,
  KeyRound,
  Layers3,
  Lock,
  Menu,
  MessageCircle,
  Moon,
  Network,
  QrCode,
  Server,
  Settings,
  Shield,
  Sun,
  TestTube,
  Upload,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

const HERO_IMAGE = "/manus-storage/keycontrol-hero-master_bebfa39c.png";
const BRAND_SYMBOL = "/manus-storage/keycontrol-symbol_c729c3e4.png";
const BLUEPRINT_TEXTURE = "/manus-storage/keycontrol-blueprint-texture_15cc351b.png";
const SENAI_LOGO = "/manus-storage/logo-senai-oficial_06e5b55f.png";

type Feature = {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Calendar,
    label: "CONTROLE 01",
    title: "Reservas sem sobreposição",
    description:
      "Conflitos de sala e professor são identificados antes da confirmação, mantendo a agenda coerente.",
  },
  {
    icon: QrCode,
    label: "CONTROLE 02",
    title: "Retirada com QR Code",
    description:
      "A chave ganha uma identidade única, leitura por câmera e registro de cada movimentação.",
  },
  {
    icon: ClipboardCheck,
    label: "CONTROLE 03",
    title: "Devolução documentada",
    description:
      "Assinatura, foto, estado da sala, responsável e horário passam a fazer parte do histórico.",
  },
  {
    icon: FileSpreadsheet,
    label: "INTELIGÊNCIA 01",
    title: "Importação de planilhas",
    description:
      "O sistema reconhece o modelo diário do SENAI e o formato tabular simples em arquivos XLSX.",
  },
  {
    icon: BarChart3,
    label: "INTELIGÊNCIA 02",
    title: "Indicadores e relatórios",
    description:
      "Dashboard, filtros e exportações em Excel, CSV e PDF transformam operação em evidência.",
  },
  {
    icon: Bell,
    label: "COMUNICAÇÃO 01",
    title: "Alertas em tempo real",
    description:
      "Reservas, atrasos e mudanças de estado chegam ao painel por notificações instantâneas.",
  },
  {
    icon: MessageCircle,
    label: "COMUNICAÇÃO 02",
    title: "WhatsApp integrado",
    description:
      "A Evolution API conecta mensagens, chat, bot, QR Code e termo de responsabilidade em PDF.",
  },
  {
    icon: Cloud,
    label: "INFRAESTRUTURA 01",
    title: "Storage, backup e agenda",
    description:
      "S3/MinIO, pg_dump agendado, Google Calendar e Microsoft 365 ampliam a continuidade operacional.",
  },
];

const flowSteps = [
  { number: "01", title: "Reservar", text: "Ambiente, professor, turma e período entram no mesmo registro." },
  { number: "02", title: "Validar", text: "A agenda verifica conflito de sala e de responsável." },
  { number: "03", title: "Retirar", text: "QR Code, assinatura e evidências formalizam a entrega." },
  { number: "04", title: "Acompanhar", text: "Notificações e estados mantêm a recepção informada." },
  { number: "05", title: "Devolver", text: "A chave retorna disponível e o histórico é concluído." },
];

const requirements = {
  funcionais: [
    ["RF01", "Autenticação por e-mail e senha"],
    ["RF02", "Segundo fator por TOTP"],
    ["RF06", "Gestão completa de reservas"],
    ["RF07", "Detecção automática de conflitos"],
    ["RF09", "Registro de retirada e devolução"],
    ["RF14", "Importação de arquivos XLSX"],
  ],
  qualidade: [
    ["RNF01", "Segurança e autorização por perfil"],
    ["RNF03", "Interface responsiva"],
    ["RNF05", "Integridade transacional"],
    ["RNF06", "Rastreabilidade das operações"],
    ["RNF07", "Backup e recuperação"],
    ["RNF10", "Proteção de dados e segredos"],
  ],
  regras: [
    ["RN01", "Sem duas reservas ativas para a mesma sala"],
    ["RN02", "Sem dupla agenda para o mesmo professor"],
    ["RN05", "Toda movimentação exige reserva e usuário"],
    ["RN08", "Data, horário e responsável são obrigatórios"],
    ["RN10", "Reserva sem chave não inicia retirada"],
    ["RN14", "Retirada e devolução são transacionais"],
  ],
} as const;

type RequirementTab = keyof typeof requirements;

const profiles = [
  { role: "Administrador", code: "ADM", access: "Gestão integral", detail: "Dashboard, usuários, reservas, agenda, importação e configurações." },
  { role: "Recepção", code: "REC", access: "Operação assistida", detail: "Salas, chaves, chat e relatórios; tela própria de movimentação está no roadmap." },
  { role: "Professor", code: "PRO", access: "Consulta", detail: "Salas, chaves e relatórios no escopo atual do MVP." },
  { role: "Colaborador", code: "COL", access: "Consulta", detail: "Navegação equivalente ao perfil Professor." },
];

const roadmap = [
  { status: "P0", title: "Consistência transacional", text: "Validar estados e concorrência antes de retirar ou devolver uma chave." },
  { status: "P0", title: "Fluxo da Recepção", text: "Criar uma interface própria para movimentações, alinhada às permissões já existentes na API." },
  { status: "P0", title: "Cobertura automatizada", text: "Adicionar testes de autenticação, permissões, reservas e movimentações." },
  { status: "P1", title: "Maturidade de entrega", text: "Versionar migrations, documentar a API e registrar evidências de homologação." },
];

const coreCommand = "docker compose up --build db backend frontend";
const fullCommand = "docker compose up --build";

function SectionTag({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="section-tag">
      <span>{number}</span>
      <p>{children}</p>
    </div>
  );
}

function AppMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-lockup" aria-label="KeyControl SENAI">
      <span className={compact ? "brand-mark-frame compact" : "brand-mark-frame"}>
        <img src={BRAND_SYMBOL} alt="Símbolo geométrico do KeyControl" className="brand-mark" />
        <i aria-hidden="true" />
      </span>
      <div className="brand-name">
        <strong>Key</strong><b aria-hidden="true" /><span>Control</span>
      </div>
    </div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [requirementTab, setRequirementTab] = useState<RequirementTab>("funcionais");
  const [installMode, setInstallMode] = useState<"core" | "full">("core");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const handleCopy = async () => {
    const command = installMode === "core" ? coreCommand : fullCommand;
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a href="#inicio" onClick={closeMenu} className="header-brand">
            <AppMark compact />
            <span className="institution-divider" aria-hidden="true" />
            <span className="senai-signature senai-signature-header">
              <small>PROJETO</small>
              <img src={SENAI_LOGO} alt="SENAI" />
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#problema">O problema</a>
            <a href="#fluxo">Fluxo</a>
            <a href="#recursos">Recursos</a>
            <a href="#arquitetura">Arquitetura</a>
            <a href="#instalacao">Instalação</a>
          </nav>

          <Link className="header-cta" href="/demonstracao">
            Ver demonstração <ArrowRight size={16} />
          </Link>

          <button
            type="button"
            className="theme-toggle"
            aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            title={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            aria-pressed={theme === "dark"}
            onClick={toggleTheme}
          >
            <span className="theme-toggle-track" aria-hidden="true">
              <i>{theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}</i>
            </span>
            <span className="theme-toggle-label">{theme === "dark" ? "Escuro" : "Claro"}</span>
            <kbd className="theme-toggle-key" aria-label="Atalho Shift mais D">⇧D</kbd>
          </button>

          <button
            type="button"
            className="menu-trigger"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Navegação móvel">
            <a href="#problema" onClick={closeMenu}>O problema</a>
            <a href="#fluxo" onClick={closeMenu}>Fluxo operacional</a>
            <a href="#recursos" onClick={closeMenu}>Recursos</a>
            <a href="#arquitetura" onClick={closeMenu}>Arquitetura</a>
            <a href="#instalacao" onClick={closeMenu}>Instalação</a>
            <a href="#documentacao" onClick={closeMenu}>Documentação</a>
            <Link href="/demonstracao" onClick={closeMenu}>Demonstração interativa</Link>
            <button type="button" className="mobile-theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              {theme === "dark" ? "Usar modo claro" : "Usar modo escuro"}
            </button>
          </nav>
        )}
      </header>

      <aside className="scroll-rail" aria-hidden="true">
        <span className="scroll-rail-label">PROGRESSO</span>
        <div className="scroll-rail-track"><i style={{ height: `${progress}%` }} /></div>
      </aside>

      <main>
        <section id="inicio" className="hero-section">
          <img src={HERO_IMAGE} alt="Chave metálica sobre uma planta técnica com pontos de rastreabilidade" className="hero-image" />
          <div className="hero-veil" />
          <div className="hero-blueprint" aria-hidden="true" />

          <div className="container hero-content">
            <div className="hero-copy reveal">
              <div className="hero-kicker"><span /> MVP FUNCIONAL · VERSÃO 1.0</div>
              <h1>Cada chave deixa um <em>rastro.</em></h1>
              <p>
                O KeyControl conecta reservas, ambientes e responsáveis em um fluxo único — da agenda à devolução, com histórico, alertas e evidências.
              </p>
              <div className="hero-actions">
                <a href="#fluxo" className="button-primary">Explorar o fluxo <ArrowRight size={18} /></a>
                <a href="#instalacao" className="button-secondary">Como executar <Code2 size={18} /></a>
              </div>
              <div className="hero-institution">
                <span className="senai-logo-plate"><img src={SENAI_LOGO} alt="SENAI" /></span>
                <div>
                  <strong>PROJETO ACADÊMICO SENAI</strong>
                  <p>Tecnologia aplicada à gestão de ambientes educacionais.</p>
                </div>
              </div>
            </div>

            <div className="hero-spec reveal" aria-label="Resumo técnico">
              <div className="hero-spec-head">
                <span>KC / VISÃO GERAL</span>
                <i>ONLINE</i>
              </div>
              <div className="hero-spec-grid">
                <div><strong>04</strong><span>perfis de acesso</span></div>
                <div><strong>22</strong><span>requisitos funcionais</span></div>
                <div><strong>10</strong><span>requisitos de qualidade</span></div>
                <div><strong>14</strong><span>regras de negócio</span></div>
              </div>
              <div className="hero-spec-foot">
                <Shield size={17} /> JWT · TOTP · AUDITORIA · BACKUP
              </div>
            </div>
          </div>
        </section>

        <section id="problema" data-index="01" className="section section-problem">
          <div className="container">
            <div className="section-heading reveal">
              <SectionTag number="01">DEFINIÇÃO DO PROBLEMA</SectionTag>
              <h2>Do caderno de retirada<br />à operação rastreável.</h2>
              <p>
                Registros manuais e planilhas isoladas fragmentam a informação. O KeyControl cria uma fonte única para saber quem retirou, quando devolveu, qual ambiente utilizou e onde há conflito.
              </p>
            </div>

            <div className="problem-comparison reveal">
              <article className="comparison-panel comparison-before">
                <div className="comparison-label"><AlertTriangle size={17} /> PROCESSO FRAGMENTADO</div>
                <h3>Sem contexto, cada consulta vira uma investigação.</h3>
                <ul>
                  <li><X size={16} /> Responsáveis difíceis de identificar</li>
                  <li><X size={16} /> Reservas sobrepostas em fontes diferentes</li>
                  <li><X size={16} /> Histórico disperso e pouco auditável</li>
                  <li><X size={16} /> Atrasos dependentes de conferência manual</li>
                </ul>
              </article>

              <div className="comparison-bridge" aria-hidden="true"><ArrowRight size={24} /></div>

              <article className="comparison-panel comparison-after">
                <div className="comparison-label"><CheckCircle2 size={17} /> FLUXO KEYCONTROL</div>
                <h3>Uma linha do tempo para cada chave e reserva.</h3>
                <ul>
                  <li><Check size={16} /> Cadastro e status centralizados</li>
                  <li><Check size={16} /> Conflitos verificados antes da reserva</li>
                  <li><Check size={16} /> Movimentações com data e responsável</li>
                  <li><Check size={16} /> Alertas e relatórios em tempo real</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="fluxo" data-index="02" className="section section-flow">
          <div className="container">
            <div className="section-heading section-heading-light reveal">
              <SectionTag number="02">FLUXO OPERACIONAL</SectionTag>
              <h2>Uma chave. Cinco pontos<br />de controle.</h2>
              <p>O processo principal foi desenhado para reduzir incerteza sem adicionar burocracia.</p>
            </div>

            <div className="workflow-plate reveal" aria-label="Mapa operacional da reserva à devolução">
              <div className="workflow-register">
                <span>MAPA OPERACIONAL / KC-05</span>
                <div><i /> FLUXO VALIDADO</div>
              </div>
              <div className="workflow-track">
                <WorkflowNode icon={<Calendar />} code="R-01" title="RESERVA" detail="Sala + horário" />
                <span className="workflow-link"><i /></span>
                <WorkflowNode icon={<Shield />} code="V-02" title="VALIDAÇÃO" detail="Sem conflito" />
                <span className="workflow-link"><i /></span>
                <WorkflowNode icon={<KeyRound />} code="K-03" title="RETIRADA" detail="QR + assinatura" active />
                <span className="workflow-link"><i /></span>
                <WorkflowNode icon={<Bell />} code="A-04" title="ACOMPANHAR" detail="Estado + alerta" />
                <span className="workflow-link"><i /></span>
                <WorkflowNode icon={<CheckCircle2 />} code="D-05" title="DEVOLUÇÃO" detail="Histórico fechado" />
              </div>
              <div className="workflow-ledger">
                <span>CHAVE KC-0142</span>
                <span>RESPONSÁVEL VINCULADO</span>
                <span>TRILHA DE CUSTÓDIA ATIVA</span>
              </div>
            </div>

            <div className="flow-steps reveal">
              {flowSteps.map((step) => (
                <article key={step.number} className="flow-step">
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="recursos" data-index="03" className="section section-features">
          <img src={BLUEPRINT_TEXTURE} alt="" className="blueprint-texture" aria-hidden="true" />
          <div className="container feature-content">
            <div className="section-heading reveal">
              <SectionTag number="03">MÓDULOS DO PRODUTO</SectionTag>
              <h2>Controle que conversa<br />com a rotina real.</h2>
              <p>
                O MVP cobre o núcleo operacional e integra inteligência, comunicação e continuidade em uma única arquitetura.
              </p>
            </div>

            <div className="feature-grid">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} data-record={`KC-F${String(index + 1).padStart(2, "0")}`} className="feature-card reveal" style={{ transitionDelay: `${(index % 4) * 50}ms` }}>
                    <div className="feature-card-top">
                      <span>{feature.label}</span>
                      <Icon size={22} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <div className="feature-card-node" aria-hidden="true" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="arquitetura" data-index="04" className="section section-architecture">
          <div className="container architecture-grid">
            <div className="architecture-copy reveal">
              <SectionTag number="04">ARQUITETURA TÉCNICA</SectionTag>
              <h2>Camadas separadas.<br />Contexto conectado.</h2>
              <p>
                O frontend React consome uma API REST em Express. O backend concentra regras, persistência e integrações, enquanto o PostgreSQL mantém o registro transacional.
              </p>

              <div className="architecture-stack">
                <div><span>01</span><MonitorBlock icon={<Layers3 />} title="Frontend" text="React 18 · Material UI · FullCalendar · Recharts" /></div>
                <div><span>02</span><MonitorBlock icon={<Server />} title="Backend" text="Node.js 20 · Express · Socket.IO · JWT" /></div>
                <div><span>03</span><MonitorBlock icon={<Database />} title="Dados" text="PostgreSQL 16 · uploads locais ou S3/MinIO" /></div>
                <div><span>04</span><MonitorBlock icon={<Network />} title="Integrações" text="WhatsApp · SMTP · Google · Microsoft 365" /></div>
              </div>
            </div>

            <div className="system-evidence reveal" aria-label="Diagrama das camadas do sistema">
              <div className="evidence-head">
                <span>KC / EVIDÊNCIA DE SISTEMA</span>
                <div><i /> ARQUITETURA OPERACIONAL</div>
              </div>
              <div className="evidence-body">
                <div className="evidence-user">
                  <Users size={22} />
                  <strong>USUÁRIOS</strong>
                  <span>ADM · REC · PRO · COL</span>
                </div>
                <span className="evidence-connector vertical"><i /></span>
                <div className="evidence-layer layer-front">
                  <div><Layers3 size={20} /><span>FRONTEND</span></div>
                  <strong>React 18</strong>
                  <p>Rotas protegidas · agenda · dashboard · relatórios</p>
                </div>
                <span className="evidence-connector vertical"><i /></span>
                <div className="evidence-layer layer-api">
                  <div><Server size={20} /><span>API REST</span></div>
                  <strong>Node + Express</strong>
                  <p>Regras · JWT · Socket.IO · jobs · integrações</p>
                </div>
                <span className="evidence-connector split"><i /><i /><i /></span>
                <div className="evidence-destinations">
                  <div><Database size={20} /><strong>PostgreSQL</strong><span>DADOS</span></div>
                  <div><Cloud size={20} /><strong>S3 / MinIO</strong><span>ARQUIVOS</span></div>
                  <div><Network size={20} /><strong>Serviços</strong><span>EXTERNOS</span></div>
                </div>
              </div>
              <div className="evidence-status">
                <span><i /> API CONECTADA</span>
                <span><i /> BANCO ÍNTEGRO</span>
                <span><Lock size={12} /> ACESSO POR PERFIL</span>
              </div>
            </div>
          </div>
        </section>

        <section id="perfis" data-index="05" className="section section-access">
          <div className="container">
            <div className="section-heading reveal">
              <SectionTag number="05">ACESSO E REQUISITOS</SectionTag>
              <h2>Cada perfil enxerga<br />o que precisa operar.</h2>
            </div>

            <div className="access-layout">
              <div className="profiles-table reveal">
                <div className="profiles-head">
                  <span>PERFIL</span><span>NÍVEL</span><span>ESCOPO ATUAL</span>
                </div>
                {profiles.map((profile) => (
                  <div className="profile-row" key={profile.code}>
                    <div className="profile-name"><b>{profile.code}</b><strong>{profile.role}</strong></div>
                    <span className="access-badge">{profile.access}</span>
                    <p>{profile.detail}</p>
                  </div>
                ))}
              </div>

              <div className="requirements-panel reveal">
                <div className="requirements-tabs" role="tablist" aria-label="Categorias de requisitos">
                  <button type="button" role="tab" aria-selected={requirementTab === "funcionais"} onClick={() => setRequirementTab("funcionais")}>Funcionais</button>
                  <button type="button" role="tab" aria-selected={requirementTab === "qualidade"} onClick={() => setRequirementTab("qualidade")}>Qualidade</button>
                  <button type="button" role="tab" aria-selected={requirementTab === "regras"} onClick={() => setRequirementTab("regras")}>Regras</button>
                </div>
                <div className="requirements-list" role="tabpanel">
                  {requirements[requirementTab].map(([code, label]) => (
                    <div key={code}>
                      <span>{code}</span>
                      <p>{label}</p>
                      <CheckCircle2 size={18} />
                    </div>
                  ))}
                </div>
                <div className="requirements-foot">
                  <BookOpen size={17} /> Documento completo: 22 RF · 10 RNF · 14 RN
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="instalacao" data-index="06" className="section section-install">
          <div className="container install-layout">
            <div className="install-copy reveal">
              <SectionTag number="06">EXECUÇÃO LOCAL</SectionTag>
              <h2>Do repositório ao<br />ambiente em um comando.</h2>
              <p>
                O Docker Compose separa o núcleo do sistema do ambiente completo com Evolution API. Para bancos existentes, três migrações documentadas mantêm o schema atualizado.
              </p>
              <div className="install-prereqs">
                <span><Boxes size={17} /> Docker Compose</span>
                <span><Server size={17} /> Node.js 20</span>
                <span><Database size={17} /> PostgreSQL 16</span>
              </div>
            </div>

            <div className="terminal-card reveal">
              <div className="terminal-head">
                <div><i /><i /><i /></div>
                <span>keycontrol / setup</span>
                <code>bash</code>
              </div>
              <div className="install-tabs" role="tablist" aria-label="Modo de instalação">
                <button type="button" aria-selected={installMode === "core"} onClick={() => { setInstallMode("core"); setCopied(false); }}>Núcleo</button>
                <button type="button" aria-selected={installMode === "full"} onClick={() => { setInstallMode("full"); setCopied(false); }}>Ambiente completo</button>
              </div>
              <div className="terminal-body">
                <span className="terminal-comment"># {installMode === "core" ? "PostgreSQL + API + frontend" : "Núcleo + Evolution API + Redis"}</span>
                <div className="terminal-command">
                  <code><b>$</b> {installMode === "core" ? coreCommand : fullCommand}</code>
                  <button type="button" onClick={handleCopy} aria-label="Copiar comando">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                <span className="terminal-comment"># dados iniciais</span>
                <code><b>$</b> docker compose exec backend npm run seed</code>
              </div>
              <div className="terminal-foot">
                <span><i /> FRONTEND :3000</span>
                <span><i /> API :4000</span>
                <span><i /> DB :5432</span>
              </div>
            </div>
          </div>
        </section>

        <section id="roadmap" data-index="07" className="section section-roadmap">
          <div className="container">
            <div className="section-heading reveal">
              <SectionTag number="07">VALIDAÇÃO E ROADMAP</SectionTag>
              <h2>Funcional agora.<br />Confiável por evolução.</h2>
              <p>
                O projeto assume suas limitações: a próxima etapa é transformar cobertura funcional em segurança operacional comprovada.
              </p>
            </div>

            <div className="roadmap-grid reveal">
              {roadmap.map((item, index) => (
                <article key={item.title} data-record={`ROAD-${String(index + 1).padStart(2, "0")}`} className="roadmap-card">
                  <div className="roadmap-meta"><span>{item.status}</span><b>0{index + 1}</b></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ChevronRight size={20} />
                </article>
              ))}
            </div>

            <div className="validation-strip reveal">
              <TestTube size={22} />
              <div>
                <strong>15 cenários manuais documentados</strong>
                <p>Login, conflito, movimentação, importação, relatórios, backup, integrações e responsividade.</p>
              </div>
              <span>PRÓXIMO: AUTOMAÇÃO</span>
            </div>
          </div>
        </section>

        <section id="documentacao" data-index="08" className="section section-documentation">
          <div className="container documentation-card reveal">
            <div>
              <span className="technical-label">DOCUMENTAÇÃO / README</span>
              <h2>Um sistema completo começa por um processo bem explicado.</h2>
              <p>
                Problema, escopo, requisitos, regras, modelagem, instalação, segurança, testes e roadmap — tudo organizado para avaliação e continuidade do projeto.
              </p>
            </div>
            <div className="documentation-links">
              <a href="#arquitetura"><Layers3 size={20} /> Revisar arquitetura <ArrowRight size={17} /></a>
              <a href="#perfis"><Users size={20} /> Consultar requisitos <ArrowRight size={17} /></a>
              <a href="#instalacao"><Upload size={20} /> Executar localmente <ArrowRight size={17} /></a>
              <a href="#roadmap"><Settings size={20} /> Ver próximos passos <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brands">
              <AppMark />
              <span className="institution-divider" aria-hidden="true" />
              <span className="senai-logo-plate footer-senai"><img src={SENAI_LOGO} alt="SENAI" /></span>
            </div>
            <p>Rastreabilidade para chaves, ambientes e reservas acadêmicas.</p>
          </div>
          <div className="footer-meta">
            <span>PROJETO ACADÊMICO</span>
            <span>REACT · NODE · POSTGRESQL</span>
            <span>MVP EM VALIDAÇÃO</span>
          </div>
          <p className="footer-note">Conteúdo estruturado a partir da documentação técnica do KeyControl SENAI.</p>
        </div>
      </footer>
    </div>
  );
}

function MonitorBlock({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="monitor-block">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function WorkflowNode({ icon, code, title, detail, active = false }: { icon: ReactNode; code: string; title: string; detail: string; active?: boolean }) {
  return (
    <div className={active ? "workflow-node active" : "workflow-node"}>
      <span>{code}</span>
      <div>{icon}</div>
      <strong>{title}</strong>
      <p>{detail}</p>
    </div>
  );
}
