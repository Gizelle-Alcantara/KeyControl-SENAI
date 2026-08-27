/**
 * Design reminder — Blueprint Cívico-Industrial:
 * a demonstração é uma prancheta operacional; etapas numeradas, evidências e estados legíveis.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileDown,
  KeyRound,
  LoaderCircle,
  Moon,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import "./Demo.css";

const BRAND_SYMBOL = "/manus-storage/keycontrol-symbol_c729c3e4.png";
const SENAI_LOGO = "/manus-storage/logo-senai-oficial_06e5b55f.png";

type Stage = 1 | 2 | 3 | 4;
type Availability = "idle" | "checking" | "available";

const stages = [
  { number: 1 as Stage, label: "Solicitação", detail: "Ambiente e período" },
  { number: 2 as Stage, label: "Validação", detail: "Agenda e conflito" },
  { number: 3 as Stage, label: "Confirmação", detail: "Responsável e chave" },
  { number: 4 as Stage, label: "Rastreabilidade", detail: "Histórico do cenário" },
];

const rooms = ["Laboratório de Redes 02", "Oficina de Automação", "Sala Maker 01"];
const owners = ["Mariana Oliveira · Docente", "Rafael Lima · Colaborador", "Camila Souza · Docente"];
const dates = ["28 ago. 2026", "29 ago. 2026", "01 set. 2026"];
const times = ["13:30 — 15:10", "15:30 — 17:10", "19:00 — 20:40"];

function DemoBrand() {
  return (
    <div className="demo-brand" aria-label="KeyControl SENAI">
      <img src={BRAND_SYMBOL} alt="Símbolo do KeyControl" />
      <span><strong>Key</strong><b aria-hidden="true" />Control</span>
      <i aria-hidden="true" />
      <img className="demo-senai" src={SENAI_LOGO} alt="SENAI" />
    </div>
  );
}

export default function Demo() {
  const { theme, toggleTheme } = useTheme();
  const [stage, setStage] = useState<Stage>(1);
  const [availability, setAvailability] = useState<Availability>("idle");
  const [room, setRoom] = useState(rooms[0]);
  const [owner, setOwner] = useState(owners[0]);
  const [date, setDate] = useState(dates[0]);
  const [time, setTime] = useState(times[0]);
  const [isExporting, setIsExporting] = useState(false);

  const reservationCode = useMemo(() => {
    const reference = `${room}-${date}-${time}`;
    const value = Array.from(reference).reduce((total, character) => total + character.charCodeAt(0), 0);
    return `KC-${String(value % 10000).padStart(4, "0")}`;
  }, [date, room, time]);

  const verificationUrl = useMemo(() => {
    const url = new URL(`${window.location.origin}/demonstracao`);
    url.searchParams.set("verificar", reservationCode);
    url.searchParams.set("ambiente", room);
    url.searchParams.set("responsavel", owner);
    url.searchParams.set("data", date);
    url.searchParams.set("periodo", time);
    url.searchParams.set("demo", "1");
    return url.toString();
  }, [date, owner, reservationCode, room, time]);

  const checkAvailability = () => {
    setAvailability("checking");
    window.setTimeout(() => setAvailability("available"), 620);
  };

  const resetDemo = () => {
    setStage(1);
    setAvailability("idle");
    setRoom(rooms[0]);
    setOwner(owners[0]);
    setDate(dates[0]);
    setTime(times[0]);
  };

  const goNext = () => {
    if (stage === 2 && availability !== "available") return;
    setStage((current) => Math.min(4, current + 1) as Stage);
  };

  const downloadReceipt = async () => {
    if (isExporting) return;

    const exportStartedAt = Date.now();
    setIsExporting(true);

    try {
      await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
      const qrCode = await QRCode.toDataURL(verificationUrl, {
        errorCorrectionLevel: "M",
        margin: 1,
        width: 360,
        color: { dark: "#07182B", light: "#FFFFFF" },
      });

    const document = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const navy: [number, number, number] = [7, 24, 43];
    const signal: [number, number, number] = [255, 76, 61];
    const steel: [number, number, number] = [208, 216, 223];
    const ink: [number, number, number] = [24, 39, 55];
    const muted: [number, number, number] = [90, 105, 119];
    const pageWidth = document.internal.pageSize.getWidth();

    const rule = (y: number) => {
      document.setDrawColor(...steel);
      document.setLineWidth(0.25);
      document.line(18, y, pageWidth - 18, y);
    };
    const labelValue = (label: string, value: string, y: number) => {
      document.setTextColor(...muted);
      document.setFont("helvetica", "bold");
      document.setFontSize(7.5);
      document.text(label.toUpperCase(), 18, y);
      document.setTextColor(...ink);
      document.setFont("helvetica", "normal");
      document.setFontSize(11);
      const wrapped = document.splitTextToSize(value, pageWidth - 36);
      document.text(wrapped, 18, y + 6);
      return y + 10 + wrapped.length * 5;
    };

    document.setFillColor(...navy);
    document.rect(0, 0, pageWidth, 47, "F");
    document.setFillColor(...signal);
    document.rect(18, 14, 28, 1.3, "F");
    document.setTextColor(255, 255, 255);
    document.setFont("helvetica", "bold");
    document.setFontSize(20);
    document.text("KEYCONTROL", 18, 25);
    document.setFont("helvetica", "normal");
    document.setFontSize(8);
    document.text("PROJETO ACADÊMICO SENAI · COMPROVANTE DE RESERVA", 18, 32);
    document.setTextColor(228, 235, 240);
    document.setFontSize(7.5);
    document.text("CENÁRIO DEMONSTRATIVO — SEM VALIDADE OPERACIONAL", 18, 39);

    document.setTextColor(...ink);
    document.setFont("helvetica", "bold");
    document.setFontSize(18);
    document.text("Reserva confirmada", 18, 63);
    document.setTextColor(...muted);
    document.setFont("helvetica", "normal");
    document.setFontSize(9);
    document.text("Registro gerado a partir do fluxo interativo do KeyControl.", 18, 70);

    document.setFillColor(246, 248, 249);
    document.roundedRect(18, 80, pageWidth - 36, 28, 0, 0, "F");
    document.setTextColor(...muted);
    document.setFont("helvetica", "bold");
    document.setFontSize(7.5);
    document.text("CÓDIGO DA RESERVA", 24, 90);
    document.setTextColor(...navy);
    document.setFontSize(21);
    document.text(reservationCode, 24, 101);
    document.setTextColor(72, 136, 95);
    document.setFontSize(8);
    document.text("●  CONFIRMADA", pageWidth - 88, 99);
    document.addImage(qrCode, "PNG", pageWidth - 44, 84, 18, 18);
    document.setTextColor(...muted);
    document.setFontSize(5.8);
    document.text("CONSULTA DEMO", pageWidth - 45, 105);

    let y = 124;
    document.setTextColor(...signal);
    document.setFont("helvetica", "bold");
    document.setFontSize(8);
    document.text("DADOS DO CENÁRIO", 18, y);
    y += 8;
    rule(y);
    y = labelValue("Ambiente", room, y + 10);
    rule(y);
    y = labelValue("Responsável", owner, y + 10);
    rule(y);
    y = labelValue("Data e período", `${date} · ${time}`, y + 10);
    rule(y);
    y = labelValue("Chave sugerida", "KC-0142", y + 10);
    rule(y);

    y += 8;
    document.setFillColor(241, 246, 243);
    document.roundedRect(18, y, pageWidth - 36, 30, 0, 0, "F");
    document.setTextColor(37, 106, 61);
    document.setFont("helvetica", "bold");
    document.setFontSize(8);
    document.text("VALIDAÇÃO DO CENÁRIO", 24, y + 10);
    document.setTextColor(...ink);
    document.setFont("helvetica", "normal");
    document.setFontSize(9);
    document.text("Agenda verificada: nenhuma sobreposição identificada para sala, responsável e período.", 24, y + 19, { maxWidth: 115 });
    document.addImage(qrCode, "PNG", pageWidth - 47, y + 4, 22, 22);

    const signatureY = y + 43;
    document.setDrawColor(...steel);
    document.setLineWidth(0.25);
    document.line(18, signatureY, 93, signatureY);
    document.line(117, signatureY, pageWidth - 18, signatureY);
    document.setTextColor(...muted);
    document.setFont("helvetica", "normal");
    document.setFontSize(6.4);
    document.text(`ASSINATURA DO RESPONSÁVEL — ${owner.toUpperCase()}`, 18, signatureY + 5);
    document.text("RECEPÇÃO / CONFERÊNCIA", 117, signatureY + 5);

    document.setTextColor(...muted);
    document.setFontSize(6.5);
    document.text(`Gerado localmente em ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" }).format(new Date())} · Consulta demonstrativa — sem validade operacional.`, 18, 291, { maxWidth: pageWidth - 36 });
    document.setDrawColor(...signal);
    document.setLineWidth(0.8);
    document.line(18, 295, pageWidth - 18, 295);

    document.save(`comprovante-reserva-${reservationCode}.pdf`);
      toast.success("Comprovante em PDF gerado", { description: `Reserva ${reservationCode} pronta para download.` });
    } catch (error) {
      console.error("Falha ao gerar comprovante em PDF", error);
      toast.error("Não foi possível gerar o comprovante", { description: "Tente exportar novamente." });
    } finally {
      const elapsed = Date.now() - exportStartedAt;
      window.setTimeout(() => setIsExporting(false), Math.max(0, 500 - elapsed));
    }
  };

  return (
    <div className="demo-shell">
      <header className="demo-header">
        <div className="demo-container demo-header-inner">
          <Link href="/" className="demo-home-link"><ArrowLeft size={17} /> Voltar ao projeto</Link>
          <DemoBrand />
          <button
            type="button"
            className="demo-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            <span>{theme === "dark" ? "Escuro" : "Claro"}</span>
            <kbd>⇧D</kbd>
          </button>
        </div>
      </header>

      <main className="demo-main">
        <section className="demo-intro demo-container">
          <div>
            <span className="demo-eyebrow"><i /> DEMONSTRAÇÃO INTERATIVA / KC-RESERVA</span>
            <h1>Da solicitação ao <em>rastro</em> em quatro movimentos.</h1>
            <p>Este ambiente usa dados fictícios para ilustrar como o KeyControl estrutura uma reserva, verifica conflitos e gera evidências de operação.</p>
          </div>
          <aside className="demo-shortcut-note">
            <span>ATALHO GLOBAL</span>
            <strong><kbd>⇧</kbd><kbd>D</kbd></strong>
            <p>Alterne o tema sem sair do fluxo. O atalho é ignorado durante a edição de campos.</p>
          </aside>
        </section>

        <section className="demo-container demo-workspace" aria-label="Fluxo de demonstração de reserva">
          <aside className="demo-steps" aria-label="Etapas da demonstração">
            <div className="demo-steps-head"><span>PROCESSO</span><b>04 ETAPAS</b></div>
            {stages.map((item) => {
              const state = item.number === stage ? "active" : item.number < stage ? "complete" : "";
              return (
                <button key={item.number} type="button" onClick={() => item.number <= stage && setStage(item.number)} className={`demo-step ${state}`} disabled={item.number > stage}>
                  <span>{item.number < stage ? <Check size={15} /> : `0${item.number}`}</span>
                  <div><strong>{item.label}</strong><small>{item.detail}</small></div>
                  {item.number <= stage && <ChevronRight size={17} />}
                </button>
              );
            })}
            <div className="demo-steps-foot"><i /> CENÁRIO SEM PERSISTÊNCIA</div>
          </aside>

          <section className="demo-console">
            <div className="demo-console-bar">
              <span>KC / RESERVA GUIADA</span>
              <b><i /> AMBIENTE DE DEMONSTRAÇÃO</b>
            </div>

            {stage === 1 && (
              <div className="demo-panel" key="request">
                <PanelTitle index="01" icon={<CalendarDays />} title="Compor a solicitação" text="Escolha o ambiente, o responsável e o período. Estes dados existem somente neste cenário demonstrativo." />
                <div className="demo-form-grid">
                  <Field label="AMBIENTE" icon={<KeyRound size={16} />}><select value={room} onChange={(event) => setRoom(event.target.value)}>{rooms.map((item) => <option key={item}>{item}</option>)}</select></Field>
                  <Field label="RESPONSÁVEL" icon={<UserRound size={16} />}><select value={owner} onChange={(event) => setOwner(event.target.value)}>{owners.map((item) => <option key={item}>{item}</option>)}</select></Field>
                  <Field label="DATA" icon={<CalendarDays size={16} />}><select value={date} onChange={(event) => setDate(event.target.value)}>{dates.map((item) => <option key={item}>{item}</option>)}</select></Field>
                  <Field label="PERÍODO" icon={<Clock3 size={16} />}><select value={time} onChange={(event) => setTime(event.target.value)}>{times.map((item) => <option key={item}>{item}</option>)}</select></Field>
                </div>
                <ScenarioSummary room={room} owner={owner} date={date} time={time} />
              </div>
            )}

            {stage === 2 && (
              <div className="demo-panel" key="validation">
                <PanelTitle index="02" icon={<SearchCheck />} title="Validar agenda e disponibilidade" text="O cenário confere a coexistência de sala, responsável e período antes da criação da reserva." />
                <ScenarioSummary room={room} owner={owner} date={date} time={time} />
                <div className={`availability-card ${availability}`}>
                  <div className="availability-icon">{availability === "available" ? <CheckCircle2 /> : availability === "checking" ? <RefreshCw /> : <CircleAlert />}</div>
                  <div><strong>{availability === "available" ? "Agenda liberada para este cenário" : availability === "checking" ? "Conferindo regras de agenda…" : "Validação ainda não executada"}</strong><p>{availability === "available" ? "Nenhuma sobreposição foi identificada entre sala, responsável e período." : "Acione a verificação para simular a análise de conflito."}</p></div>
                  {availability !== "available" && <button type="button" onClick={checkAvailability} disabled={availability === "checking"}>{availability === "checking" ? "Verificando…" : "Verificar agenda"}</button>}
                </div>
                <div className="rule-list"><span><Check size={14} /> RN01 · sala sem sobreposição</span><span><Check size={14} /> RN02 · responsável sem dupla agenda</span><span><Check size={14} /> RN08 · dados obrigatórios</span></div>
              </div>
            )}

            {stage === 3 && (
              <div className="demo-panel" key="confirm">
                <PanelTitle index="03" icon={<ShieldCheck />} title="Confirmar e vincular responsabilidade" text="A reserva recebe um código de referência e consolida o responsável que responderá pela movimentação futura." />
                <div className="confirmation-grid">
                  <div className="reservation-code"><span>RESERVA SIMULADA</span><strong>{reservationCode}</strong><p>Estado inicial: <b>confirmada</b></p></div>
                  <ScenarioSummary room={room} owner={owner} date={date} time={time} compact />
                </div>
                <div className="key-link-card"><KeyRound size={22} /><div><strong>Chave sugerida: KC-0142</strong><p>A retirada será liberada no horário do período, mediante identificação e evidência.</p></div><span>VINCULADA</span></div>
                <ReceiptAction reservationCode={reservationCode} onExport={downloadReceipt} isExporting={isExporting} />
              </div>
            )}

            {stage === 4 && (
              <div className="demo-panel" key="trace">
                <PanelTitle index="04" icon={<CheckCircle2 />} title="Consultar a trilha de rastreabilidade" text="O cenário foi concluído. A linha do tempo abaixo explica quais evidências o processo reunirá ao longo da operação." />
                <div className="trace-code"><span>REGISTRO CRIADO</span><strong>{reservationCode}</strong><b><i /> CONFIRMADA</b></div>
                <div className="trace-timeline">
                  <TraceItem time="13:02" title="Solicitação registrada" text={`Ambiente ${room} reservado para ${date}.`} />
                  <TraceItem time="13:02" title="Regras de agenda verificadas" text="Sem conflito de ambiente ou responsável neste cenário." />
                  <TraceItem time="13:03" title="Responsável vinculado" text={owner} />
                  <TraceItem time="PRÓXIMO" title="Retirada aguardada" text="QR Code, assinatura e evidências complementarão o histórico." future />
                </div>
                <ReceiptAction reservationCode={reservationCode} onExport={downloadReceipt} isExporting={isExporting} />
              </div>
            )}

            <div className="demo-actions">
              <button type="button" className="demo-back" onClick={() => setStage((current) => Math.max(1, current - 1) as Stage)} disabled={stage === 1}>Voltar</button>
              <div><button type="button" className="demo-reset" onClick={resetDemo}><RefreshCw size={15} /> Reiniciar</button>{stage < 4 ? <button type="button" className="demo-next" onClick={goNext} disabled={stage === 2 && availability !== "available"}>{stage === 3 ? "Confirmar reserva" : "Continuar"}<ArrowRight size={17} /></button> : <Link href="/" className="demo-next">Voltar ao projeto <ArrowRight size={17} /></Link>}</div>
            </div>
          </section>
        </section>

        <section className="demo-container demo-evidence">
          <span>LEITURA DO CENÁRIO</span>
          <p>O objetivo é tornar a operação compreensível: <b>quem solicitou</b>, <b>qual ambiente</b>, <b>quando</b>, <b>quais regras foram avaliadas</b> e <b>o que ainda acontecerá</b>.</p>
        </section>
      </main>
    </div>
  );
}

function PanelTitle({ index, icon, title, text }: { index: string; icon: React.ReactNode; title: string; text: string }) {
  return <div className="panel-title"><span>{index}</span><div className="panel-title-icon">{icon}</div><div><h2>{title}</h2><p>{text}</p></div></div>;
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <label className="demo-field"><span>{icon}{label}</span>{children}</label>;
}

function ScenarioSummary({ room, owner, date, time, compact = false }: { room: string; owner: string; date: string; time: string; compact?: boolean }) {
  return <div className={compact ? "scenario-summary compact" : "scenario-summary"}><span>RESUMO DO CENÁRIO</span><div><p><b>Ambiente</b>{room}</p><p><b>Responsável</b>{owner}</p><p><b>Período</b>{date} · {time}</p></div></div>;
}

function TraceItem({ time, title, text, future = false }: { time: string; title: string; text: string; future?: boolean }) {
  return <div className={future ? "trace-item future" : "trace-item"}><span>{time}</span><i /><div><strong>{title}</strong><p>{text}</p></div></div>;
}

function ReceiptAction({ reservationCode, onExport, isExporting }: { reservationCode: string; onExport: () => Promise<void>; isExporting: boolean }) {
  return <div className="receipt-action"><div><span>COMPROVANTE DISPONÍVEL</span><strong>Reserva {reservationCode} confirmada</strong><p aria-live="polite">{isExporting ? "Gerando QR Code, campos de assinatura e arquivo…" : "Baixe o PDF com QR Code e campos de assinatura deste cenário demonstrativo."}</p></div><button type="button" onClick={onExport} disabled={isExporting} aria-busy={isExporting}>{isExporting ? <LoaderCircle className="pdf-spinner" size={17} /> : <FileDown size={17} />}{isExporting ? "Gerando PDF…" : "Exportar PDF"}</button></div>;
}
