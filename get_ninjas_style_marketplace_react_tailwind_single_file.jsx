import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  CheckCircle2,
  MessageCircle,
  ShoppingCart,
  X,
  MapPin,
  Send,
  CreditCard,
  QrCode,
  Languages,
  ChevronRight,
  Home,
  Hammer,
  Wrench,
  PaintbrushVertical,
  Sparkles,
  Drill,
  Fan,
  ShieldCheck,
  Layers,
  CalendarDays,
  Settings,
  Wallet,
  Plus,
  Building2,
  Inbox
} from "lucide-react";

/**************************************
 * GetNinjas-Style Marketplace (Single File)
 * - React + Tailwind + framer-motion + lucide-react
 * - No backend: in-memory data w/ optional localStorage
 * - Includes: Planner with CPM/Gantt, Orders, Chat, Checkout, Reviews, i18n
 **************************************/

// ------------ i18n --------------
const i18n = {
  "pt-BR": {
    appTitle: "Market de Serviços",
    buscar: "Buscar",
    pedidos: "Pedidos",
    mensagens: "Mensagens",
    profissional: "Sou Profissional",
    filtroRaio: "Raio (km)",
    precoMax: "Preço máx.",
    verificados: "Somente verificados",
    categorias: "Categorias",
    briefing: "Briefing",
    criarPedido: "Criar pedido",
    descricao: "Descrição",
    endereco: "Endereço",
    quando: "Quando",
    hoje: "Hoje",
    amanha: "Amanhã",
    estaSemana: "Esta semana",
    dataEspecifica: "Data específica",
    orcamentoMax: "Orçamento máx.",
    profissionais: "Profissionais",
    planejarReforma: "Planejar reforma com IA",
    plannerTitulo: "Planner de Reforma (IA simulada)",
    modo: "Modo",
    jaSei: "Já sei o que preciso",
    precisoAjuda: "Preciso de ajuda",
    metragem: "Metragem (m²)",
    dataInicio: "Data de início",
    ambientes: "Ambientes",
    intervencoes: "Intervenções",
    restricoes: "Restrições",
    criarPlano: "Criar plano",
    atualizarPlano: "Atualizar plano",
    solicitarTodos: "Solicitar todos os orçamentos ao mesmo tempo",
    solicitarSelecionados: "Gerar pedidos das tarefas selecionadas",
    planoGerado: "Plano e Gantt gerados",
    caminhoCritico: "Caminho crítico",
    paralelo: "Paralelo",
    inicioPrev: "Início previsto",
    fimPrev: "Término previsto",
    propostas: "Propostas",
    contratar: "Contratar",
    chat: "Chat",
    concluirAvaliar: "Concluir e avaliar",
    avaliacao: "Avaliação",
    salvar: "Salvar",
    cancelar: "Cancelar",
    checkout: "Checkout",
    cartao: "Cartão",
    nomeCartao: "Nome no cartão",
    numeroCartao: "Número do cartão",
    validade: "Validade (MM/AA)",
    cvv: "CVV",
    ou: "ou",
    pix: "Pagar com Pix",
    copiaColaPix: "Copia e cola Pix",
    pagamentoConfirmado: "Pagamento confirmado! Pedido contratado.",
    propostaRecebida: "Nova proposta recebida",
    reviewSalva: "Avaliação salva!",
    enviar: "Enviar",
    oportunidades: "Oportunidades",
    meuCadastro: "Meu cadastro",
    categoria: "Categoria",
    faixaPreco: "Faixa de preço",
    disponibilidade: "Disponibilidade",
    enviarProposta: "Enviar proposta",
    mensagensRecentes: "Mensagens recentes",
    mapa: "Mapa (preview)",
    selecioneCategoria: "Selecione uma categoria",
    addressPlaceholder: "Rua Exemplo, 123 - São Paulo",
    descPlaceholder: "Descreva seu serviço...",
  },
  "en-US": {
    appTitle: "Service Marketplace",
    buscar: "Search",
    pedidos: "Orders",
    mensagens: "Messages",
    profissional: "I'm a Pro",
    filtroRaio: "Radius (km)",
    precoMax: "Max price",
    verificados: "Verified only",
    categorias: "Categories",
    briefing: "Briefing",
    criarPedido: "Create request",
    descricao: "Description",
    endereco: "Address",
    quando: "When",
    hoje: "Today",
    amanha: "Tomorrow",
    estaSemana: "This week",
    dataEspecifica: "Specific date",
    orcamentoMax: "Max budget",
    profissionais: "Providers",
    planejarReforma: "Plan renovation with AI",
    plannerTitulo: "Renovation Planner (simulated AI)",
    modo: "Mode",
    jaSei: "I know what I need",
    precisoAjuda: "I need help",
    metragem: "Area (sqm)",
    dataInicio: "Start date",
    ambientes: "Rooms",
    intervencoes: "Interventions",
    restricoes: "Constraints",
    criarPlano: "Create plan",
    atualizarPlano: "Update plan",
    solicitarTodos: "Request all quotes at once",
    solicitarSelecionados: "Create requests from selected tasks",
    planoGerado: "Plan & Gantt generated",
    caminhoCritico: "Critical path",
    paralelo: "Parallel",
    inicioPrev: "Estimated start",
    fimPrev: "Estimated finish",
    propostas: "Proposals",
    contratar: "Hire",
    chat: "Chat",
    concluirAvaliar: "Complete & review",
    avaliacao: "Review",
    salvar: "Save",
    cancelar: "Cancel",
    checkout: "Checkout",
    cartao: "Card",
    nomeCartao: "Name on card",
    numeroCartao: "Card number",
    validade: "Expiry (MM/YY)",
    cvv: "CVV",
    ou: "or",
    pix: "Pay with Pix",
    copiaColaPix: "Pix copy-and-paste",
    pagamentoConfirmado: "Payment confirmed! Order hired.",
    propostaRecebida: "New proposal received",
    reviewSalva: "Review saved!",
    enviar: "Send",
    oportunidades: "Opportunities",
    meuCadastro: "My profile",
    categoria: "Category",
    faixaPreco: "Price range",
    disponibilidade: "Availability",
    enviarProposta: "Send proposal",
    mensagensRecentes: "Recent messages",
    mapa: "Map (preview)",
    selecioneCategoria: "Select a category",
    addressPlaceholder: "123 Example St, São Paulo",
    descPlaceholder: "Describe your job...",
  }
};

function useLocale() {
  const [locale, setLocale] = useState("pt-BR");
  const t = (key) => i18n[locale]?.[key] ?? key;
  const nf = useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency: locale === "pt-BR" ? "BRL" : "USD" }), [locale]);
  const df = useMemo(() => new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "2-digit" }), [locale]);
  return { locale, setLocale, t, nf, df };
}

// ---------- Utilities ----------
const uid = () => Math.random().toString(36).slice(2, 10);
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

// ---------- Simulated Data ----------
const CATEGORIES = [
  { key: "Eletricista", icon: <BoltIcon /> },
  { key: "Encanador", icon: <Wrench className="w-4 h-4" /> },
  { key: "Marceneiro", icon: <Hammer className="w-4 h-4" /> },
  { key: "Pintor", icon: <PaintbrushVertical className="w-4 h-4" /> },
  { key: "Limpeza", icon: <Sparkles className="w-4 h-4" /> },
  { key: "Ar-Condicionado", icon: <Fan className="w-4 h-4" /> },
  { key: "Dedetização", icon: <ShieldCheck className="w-4 h-4" /> },
  { key: "Informática", icon: <Layers className="w-4 h-4" /> },
];

function BoltIcon(props) {
  return <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
}

const SAMPLE_PROVIDERS = [
  { id: uid(), name: "Ana Souza", category: "Pintor", rating: 4.6, reviews: 38, distanceKm: 3.1, priceRange: [180, 450], verified: true },
  { id: uid(), name: "Bruno Lima", category: "Eletricista", rating: 4.8, reviews: 54, distanceKm: 2.4, priceRange: [200, 600], verified: true },
  { id: uid(), name: "Carlos Pereira", category: "Encanador", rating: 4.5, reviews: 22, distanceKm: 5.7, priceRange: [150, 500], verified: false },
  { id: uid(), name: "Diana Móveis", category: "Marceneiro", rating: 4.7, reviews: 41, distanceKm: 7.8, priceRange: [500, 3000], verified: true },
  { id: uid(), name: "Equipe Brilho", category: "Limpeza", rating: 4.3, reviews: 19, distanceKm: 1.2, priceRange: [120, 350], verified: false },
  { id: uid(), name: "FrioTech", category: "Ar-Condicionado", rating: 4.6, reviews: 29, distanceKm: 4.0, priceRange: [250, 1200], verified: true },
  { id: uid(), name: "ControleMax", category: "Dedetização", rating: 4.4, reviews: 17, distanceKm: 6.4, priceRange: [180, 800], verified: true },
  { id: uid(), name: "ByteHelp", category: "Informática", rating: 4.2, reviews: 12, distanceKm: 2.0, priceRange: [100, 500], verified: false },
];

// ---------- Toasts ----------
const ToastCtx = React.createContext({ add: (msg, type) => {} });
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = (text, type = "info") => {
    const id = uid();
    setToasts((t) => [...t, { id, text, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };
  return (
    <ToastCtx.Provider value={{ add }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className={`px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${t.type === "success" ? "bg-emerald-600 text-white" : t.type === "error" ? "bg-rose-600 text-white" : "bg-slate-800 text-white"}`}>
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
function useToast() { return React.useContext(ToastCtx); }

// ---------- Storage Hook ----------
function useLocalState(key, initial) {
  const [state, setState] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : initial; } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }, [key, state]);
  return [state, setState];
}

// ---------- App ----------
export default function App() {
  const { locale, setLocale, t, nf, df } = useLocale();
  const toast = useToast();
  const [tab, setTab] = useState("search");
  const [providers, setProviders] = useLocalState("providers", SAMPLE_PROVIDERS);
  const [orders, setOrders] = useLocalState("orders", []);
  const [chats, setChats] = useLocalState("chats", {}); // { convId: [{from:"me"|"pro", text, ts}] }
  const [proProfile, setProProfile] = useLocalState("proProfile", { id: uid(), name: "", category: "", priceRange: [100,500], availability: "manhã" });

  const [filters, setFilters] = useState({ radius: 10, maxPrice: 2000, verifiedOnly: false, category: "" });

  // --- Briefing & Planner modals ---
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);

  // --- Checkout & Chat & Review modals state ---
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [checkoutInfo, setCheckoutInfo] = useState(null); // { orderId, proposalId }
  const [chatInfo, setChatInfo] = useState(null); // { orderId, providerId }
  const [reviewInfo, setReviewInfo] = useState(null); // { orderId }

  const filteredProviders = useMemo(() => providers.filter(p => {
    const inCat = !filters.category || p.category === filters.category;
    const inRadius = p.distanceKm <= filters.radius;
    const inPrice = p.priceRange[0] <= filters.maxPrice;
    const ver = !filters.verifiedOnly || p.verified;
    return inCat && inRadius && inPrice && ver;
  }), [providers, filters]);

  function createOrder(input) {
    const id = uid();
    const order = {
      id,
      category: input.category,
      description: input.description,
      address: input.address,
      when: input.when,
      whenDate: input.whenDate ?? null,
      budgetMax: input.budgetMax,
      createdAt: Date.now(),
      status: "Aberto",
      proposals: [],
      chosenProposalId: null,
      hiredAt: null,
      evaluation: null,
    };
    setOrders((os) => [order, ...os]);
    // Simulate proposals 2-4 with timeouts
    const candidates = providers.filter(p => p.category === order.category);
    const count = clamp(Math.floor(Math.random()*3)+2, 2, 4);
    for (let i=0;i<count;i++) {
      const pro = candidates[Math.floor(Math.random()*candidates.length)];
      setTimeout(() => {
        const proposal = {
          id: uid(), providerId: pro?.id, value: randBetween(pro?.priceRange?.[0]||100, pro?.priceRange?.[1]||800), prazoDias: Math.floor(Math.random()*5)+1, message: "Posso iniciar em breve.", status: "Enviada"
        };
        setOrders((curr) => curr.map(o => o.id===id ? { ...o, status: "Propostas", proposals: [...o.proposals, proposal] } : o));
        toast.add(`${t("propostaRecebida")}: ${pro?.name}`, "success");
      }, 800 + i*600);
    }
  }

  function openCheckout(orderId, proposalId) {
    setCheckoutInfo({ orderId, proposalId });
  }

  function confirmPayment(payment) {
    if (!checkoutInfo) return;
    const { orderId, proposalId } = checkoutInfo;
    setOrders(os => os.map(o => o.id===orderId ? { ...o, status: "Contratado", chosenProposalId: proposalId, hiredAt: Date.now() } : o));
    setCheckoutInfo(null);
    toast.add(t("pagamentoConfirmado"), "success");
  }

  function openChat(orderId, providerId) {
    setChatInfo({ orderId, providerId });
  }

  function sendChat(convId, text, providerName) {
    const msg = { from: "me", text, ts: Date.now() };
    setChats((c) => ({ ...c, [convId]: [...(c[convId]||[]), msg] }));
    // auto reply
    setTimeout(() => {
      const reply = { from: "pro", text: `Olá! ${providerName} aqui. Posso te atender amanhã.`, ts: Date.now() };
      setChats((c) => ({ ...c, [convId]: [...(c[convId]||[]), reply] }));
    }, 1000);
  }

  function saveReview(orderId, rating, comment) {
    setOrders(os => os.map(o => o.id===orderId ? { ...o, status: "Concluído", evaluation: { rating, comment, ts: Date.now() } } : o));
    // update provider rating
    const order = orders.find(o => o.id === orderId);
    const chosen = order?.proposals.find(p => p.id === order?.chosenProposalId);
    const providerId = chosen?.providerId;
    if (providerId) {
      setProviders(ps => ps.map(p => {
        if (p.id !== providerId) return p;
        const newReviews = (p.reviews||0) + 1;
        const newRating = ((p.rating||0)*(p.reviews||0) + rating) / newReviews;
        return { ...p, reviews: newReviews, rating: Number(newRating.toFixed(2)) };
      }));
    }
    setReviewInfo(null);
    toast.add(t("reviewSalva"), "success");
  }

  const convList = useMemo(() => {
    // Build conversations list from chats state
    return Object.entries(chats).map(([convId, msgs]) => ({ convId, last: msgs[msgs.length-1] })).sort((a,b)=> (b.last?.ts||0)-(a.last?.ts||0));
  }, [chats]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header t={t} locale={locale} setLocale={setLocale} />

      <main className="max-w-6xl mx-auto p-4 space-y-4">
        <Tabs tab={tab} setTab={setTab} t={t} />

        {tab === "search" && (
          <section className="space-y-4">
            <SearchBar filters={filters} setFilters={setFilters} t={t} />
            <CategoryGrid filters={filters} setFilters={setFilters} t={t} />

            <div className="grid md:grid-cols-3 gap-4">
              <PlannerCard t={t} onOpen={() => setPlannerOpen(true)} />
              <BriefingCard t={t} onOpen={() => setBriefingOpen(true)} />
              <MapPreview t={t} />
            </div>

            <h3 className="text-sm uppercase tracking-wider text-slate-500">{t("profissionais")}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProviders.map((p) => (
                <ProviderCard key={p.id} provider={p} nf={nf} t={t} onBriefing={()=>{ setFilters(f=>({...f, category:p.category})); setBriefingOpen(true); }} />
              ))}
            </div>
          </section>
        )}

        {tab === "orders" && (
          <OrdersList t={t} df={df} nf={nf} orders={orders} providers={providers}
            onChat={openChat} onHire={openCheckout} onFinish={(orderId)=> setReviewInfo({ orderId })} />
        )}

        {tab === "messages" && (
          <MessagesPage t={t} convList={convList} orders={orders} providers={providers} openChat={openChat} />
        )}

        {tab === "pro" && (
          <ProArea t={t} proProfile={proProfile} setProProfile={setProProfile} orders={orders} providers={providers} setOrders={setOrders} />
        )}
      </main>

      <AnimatePresence>
        {briefingOpen && (
          <BriefingModal t={t} onClose={()=>setBriefingOpen(false)} onCreate={createOrder} />
        )}
        {plannerOpen && (
          <PlannerModal t={t} nf={nf} df={df} onClose={()=>setPlannerOpen(false)} onCreateOrders={(ordersByCat)=>{
            // ordersByCat: array of { category, description }
            ordersByCat.forEach(({category, description})=>{
              createOrder({ category, description, address: "", when: t("estaSemana"), budgetMax: 0 });
            });
            setTab("orders");
          }} />
        )}
        {checkoutInfo && (
          <CheckoutModal t={t} df={df} nf={nf} checkoutInfo={checkoutInfo} orders={orders} providers={providers} onClose={()=>setCheckoutInfo(null)} onConfirm={confirmPayment} />
        )}
        {chatInfo && (
          <ChatModal t={t} chatInfo={chatInfo} orders={orders} providers={providers} chats={chats} setChats={setChats} onClose={()=>setChatInfo(null)} onSend={sendChat} />
        )}
        {reviewInfo && (
          <ReviewModal t={t} orderId={reviewInfo.orderId} onClose={()=>setReviewInfo(null)} onSave={saveReview} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- UI Components ----------
function Header({ t, locale, setLocale }) {
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto p-4 flex items-center gap-3">
        <Home className="w-5 h-5 text-indigo-600" />
        <span className="font-semibold">{t("appTitle")}</span>
        <div className="ml-auto flex items-center gap-2">
          <Languages className="w-4 h-4 text-slate-500" />
          <select className="px-2 py-1 bg-white border rounded-md text-sm" value={locale} onChange={(e)=>setLocale(e.target.value)}>
            <option value="pt-BR">PT-BR</option>
            <option value="en-US">EN</option>
          </select>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Inbox className="w-4 h-4"/>
            <span>login@demo</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Tabs({ tab, setTab, t }) {
  const tabs = [
    { key: "search", label: t("buscar"), icon: <Search className="w-4 h-4" /> },
    { key: "orders", label: t("pedidos"), icon: <ShoppingCart className="w-4 h-4" /> },
    { key: "messages", label: t("mensagens"), icon: <MessageCircle className="w-4 h-4" /> },
    { key: "pro", label: t("profissional"), icon: <Building2 className="w-4 h-4" /> },
  ];
  return (
    <div className="flex gap-2">
      {tabs.map((tItem) => (
        <button key={tItem.key} onClick={()=>setTab(tItem.key)}
          className={`px-3 py-2 rounded-xl border flex items-center gap-2 ${tab===tItem.key?"bg-indigo-600 text-white border-indigo-600":"bg-white hover:bg-slate-50"}`}>
          {tItem.icon}
          <span className="text-sm">{tItem.label}</span>
        </button>
      ))}
    </div>
  );
}

function SearchBar({ filters, setFilters, t }) {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex-1 relative">
        <input className="w-full px-4 py-3 pl-10 rounded-xl border bg-white" placeholder={`${t("buscar")}...`} />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-600">{t("filtroRaio")}</label>
        <input type="number" className="w-20 px-2 py-2 rounded-lg border bg-white" value={filters.radius} onChange={(e)=>setFilters(f=>({...f, radius: Number(e.target.value)}))} />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-600">{t("precoMax")}</label>
        <input type="number" className="w-28 px-2 py-2 rounded-lg border bg-white" value={filters.maxPrice} onChange={(e)=>setFilters(f=>({...f, maxPrice: Number(e.target.value)}))} />
      </div>
      <label className="flex items-center gap-2 text-sm bg-white px-3 py-2 rounded-xl border">
        <input type="checkbox" checked={filters.verifiedOnly} onChange={(e)=>setFilters(f=>({...f, verifiedOnly: e.target.checked}))} />
        {t("verificados")}
      </label>
    </div>
  );
}

function CategoryGrid({ filters, setFilters, t }) {
  return (
    <div>
      <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-2">{t("categorias")}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
        {CATEGORIES.map((c) => (
          <button key={c.key} onClick={()=>setFilters(f=>({...f, category: f.category===c.key?"":c.key}))}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border bg-white hover:shadow ${filters.category===c.key?"border-indigo-600 ring-2 ring-indigo-200":""}`}>
            {c.icon}
            <span className="text-sm">{c.key}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProviderCard({ provider, nf, t, onBriefing }) {
  return (
    <div className="bg-white rounded-2xl border p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
          {provider.name.slice(0,1)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{provider.name}</h4>
            {provider.verified && <CheckCircle2 className="w-4 h-4 text-emerald-600"/>}
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="text-sm text-slate-700">{provider.rating} · {provider.reviews}</span>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{provider.distanceKm} km</div>
        </div>
      </div>
      <div className="text-sm text-slate-600">{provider.category} · {nf.format(provider.priceRange[0])}–{nf.format(provider.priceRange[1])}</div>
      <div className="flex gap-2">
        <button className="px-3 py-2 rounded-xl border text-sm" onClick={onBriefing}>{t("criarPedido")}</button>
        <button className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm" onClick={onBriefing}>{t("briefing")}</button>
      </div>
    </div>
  );
}

function PlannerCard({ t, onOpen }) {
  return (
    <div className="bg-white rounded-2xl border p-4">
      <div className="flex items-center gap-2 font-semibold mb-1"><Settings className="w-4 h-4" />{t("planejarReforma")}</div>
      <p className="text-sm text-slate-600">IA simula escopo, dependências e Gantt com caminho crítico.</p>
      <button onClick={onOpen} className="mt-3 px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm">{t("planejarReforma")}</button>
    </div>
  );
}

function BriefingCard({ t, onOpen }) {
  return (
    <div className="bg-white rounded-2xl border p-4">
      <div className="flex items-center gap-2 font-semibold mb-1"><CalendarDays className="w-4 h-4" />{t("briefing")}</div>
      <p className="text-sm text-slate-600">Monte um pedido rápido com orçamento e prazo.</p>
      <button onClick={onOpen} className="mt-3 px-3 py-2 rounded-xl border text-sm">{t("criarPedido")}</button>
    </div>
  );
}

function MapPreview({ t }) {
  return (
    <div className="bg-white rounded-2xl border p-4">
      <div className="flex items-center gap-2 font-semibold mb-1"><MapPin className="w-4 h-4" />{t("mapa")}</div>
      <div className="h-24 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 text-sm">{t("mapa")}</div>
    </div>
  );
}

function OrdersList({ t, df, nf, orders, providers, onChat, onHire, onFinish }) {
  const proById = useMemo(()=> Object.fromEntries(providers.map(p=>[p.id,p])), [providers]);
  return (
    <div className="space-y-3">
      {orders.length===0 && <div className="text-sm text-slate-600">Nenhum pedido ainda.</div>}
      {orders.map((o) => (
        <div key={o.id} className="bg-white rounded-2xl border p-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-xs uppercase text-slate-500">{df.format(o.createdAt)}</div>
            <div className="text-sm font-medium">{o.category}</div>
            <span className={`text-xs px-2 py-1 rounded-full ${o.status==="Contratado"?"bg-emerald-100 text-emerald-700":o.status==="Concluído"?"bg-slate-100":"bg-indigo-100 text-indigo-700"}`}>{o.status}</span>
          </div>
          <p className="text-sm text-slate-700 mt-1">{o.description}</p>
          <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {o.proposals.map((p) => (
              <div key={p.id} className={`border rounded-xl p-3 ${o.chosenProposalId===p.id?"border-emerald-500":""}`}>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{proById[p.providerId]?.name || "Pro"}</div>
                  <div className="text-sm">{nf.format(p.value)}</div>
                </div>
                <div className="text-xs text-slate-600">{p.prazoDias} dia(s) · {p.message}</div>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg border text-xs" onClick={()=>onChat(o.id, p.providerId)}>{t("chat")}</button>
                  {o.status!=="Contratado" && o.status!=="Concluído" && (
                    <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs" onClick={()=>onHire(o.id, p.id)}>{t("contratar")}</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {o.status === "Contratado" && (
            <div className="mt-3">
              <button className="px-3 py-2 rounded-xl border text-sm" onClick={()=>onFinish(o.id)}>{t("concluirAvaliar")}</button>
            </div>
          )}
          {o.status === "Concluído" && o.evaluation && (
            <div className="mt-3 text-sm text-slate-700">{t("avaliacao")}: {"⭐".repeat(o.evaluation.rating)} – {o.evaluation.comment}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function MessagesPage({ t, convList, orders, providers, openChat }) {
  const orderById = useMemo(()=>Object.fromEntries(orders.map(o=>[o.id,o])), [orders]);
  const providerById = useMemo(()=>Object.fromEntries(providers.map(p=>[p.id,p])), [providers]);
  return (
    <div className="space-y-2">
      <h3 className="text-sm uppercase tracking-wider text-slate-500">{t("mensagensRecentes")}</h3>
      {convList.length===0 && <div className="text-sm text-slate-600">–</div>}
      {convList.map(c => {
        const [orderId, providerId] = c.convId.split(":");
        const order = orderById[orderId];
        const pro = providerById[providerId];
        return (
          <button key={c.convId} onClick={()=>openChat(orderId, providerId)} className="w-full bg-white border rounded-2xl p-3 text-left hover:shadow flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">{pro?.name?.slice(0,1)}</div>
            <div className="flex-1">
              <div className="font-medium text-sm">{pro?.name} · {order?.category}</div>
              <div className="text-xs text-slate-600 line-clamp-1">{c.last?.text}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400"/>
          </button>
        );
      })}
    </div>
  );
}

function ProArea({ t, proProfile, setProProfile, orders, providers, setOrders }) {
  const [quoteValue, setQuoteValue] = useState(250);
  const [quoteMsg, setQuoteMsg] = useState("Posso começar amanhã.");
  const opportunities = orders.filter(o => o.category === proProfile.category && (o.status === "Aberto" || o.status === "Propostas"));
  const myId = proProfile.id;

  function sendProposal(orderId) {
    const proposal = { id: uid(), providerId: myId, value: Number(quoteValue), prazoDias: 2, message: quoteMsg, status: "Enviada" };
    setOrders(os => os.map(o => o.id===orderId ? { ...o, status: "Propostas", proposals: [...o.proposals, proposal] } : o));
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl border p-4 space-y-3">
        <div className="font-semibold">{t("meuCadastro")}</div>
        <div className="grid sm:grid-cols-2 gap-2">
          <input className="px-3 py-2 rounded-xl border" placeholder="Nome" value={proProfile.name} onChange={(e)=>setProProfile(p=>({...p, name: e.target.value}))} />
          <select className="px-3 py-2 rounded-xl border" value={proProfile.category} onChange={(e)=>setProProfile(p=>({...p, category: e.target.value}))}>
            <option value="">{t("selecioneCategoria")}</option>
            {CATEGORIES.map(c=> <option key={c.key} value={c.key}>{c.key}</option>)}
          </select>
          <input className="px-3 py-2 rounded-xl border" placeholder={`${t("faixaPreco")} (min)`} type="number" value={proProfile.priceRange[0]} onChange={(e)=>setProProfile(p=>({...p, priceRange:[Number(e.target.value), p.priceRange[1]]}))} />
          <input className="px-3 py-2 rounded-xl border" placeholder={`${t("faixaPreco")} (max)`} type="number" value={proProfile.priceRange[1]} onChange={(e)=>setProProfile(p=>({...p, priceRange:[p.priceRange[0], Number(e.target.value)]}))} />
          <input className="px-3 py-2 rounded-xl border" placeholder={t("disponibilidade")} value={proProfile.availability} onChange={(e)=>setProProfile(p=>({...p, availability: e.target.value}))} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-4 space-y-3">
        <div className="font-semibold">{t("oportunidades")}</div>
        <div className="flex items-center gap-2">
          <input type="number" className="px-3 py-2 rounded-xl border w-32" value={quoteValue} onChange={(e)=>setQuoteValue(e.target.value)} />
          <input className="px-3 py-2 rounded-xl border flex-1" value={quoteMsg} onChange={(e)=>setQuoteMsg(e.target.value)} />
        </div>
        {opportunities.length===0 && <div className="text-sm text-slate-600">–</div>}
        <div className="space-y-2">
          {opportunities.map(o => (
            <div key={o.id} className="border rounded-xl p-3">
              <div className="text-sm font-medium">{o.category}</div>
              <div className="text-xs text-slate-600">{o.description}</div>
              <button className="mt-2 px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm" onClick={()=>sendProposal(o.id)}>{t("enviarProposta")}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Modals ----------
function Modal({ children, onClose }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <motion.div className="relative bg-white rounded-2xl border w-full max-w-3xl p-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}>
        <button className="absolute top-3 right-3 p-1 rounded-lg hover:bg-slate-100" onClick={onClose}><X className="w-4 h-4"/></button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function BriefingModal({ t, onClose, onCreate }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [when, setWhen] = useState("Hoje");
  const [whenDate, setWhenDate] = useState("");
  const [budgetMax, setBudgetMax] = useState(500);

  function submit() {
    onCreate({ category, description, address, when, whenDate: when === "Data específica" ? new Date(whenDate).getTime() : null, budgetMax });
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div className="space-y-3">
        <div className="font-semibold flex items-center gap-2"><CalendarDays className="w-4 h-4" />{t("briefing")}</div>
        <div className="grid sm:grid-cols-2 gap-2">
          <select className="px-3 py-2 rounded-xl border" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">{t("selecioneCategoria")}</option>
            {CATEGORIES.map(c=> <option key={c.key} value={c.key}>{c.key}</option>)}
          </select>
          <input className="px-3 py-2 rounded-xl border" placeholder={t("orcamentoMax")} type="number" value={budgetMax} onChange={(e)=>setBudgetMax(Number(e.target.value))} />
          <input className="px-3 py-2 rounded-xl border sm:col-span-2" placeholder={t("endereco")} value={address} onChange={(e)=>setAddress(e.target.value)} />
          <textarea className="px-3 py-2 rounded-xl border sm:col-span-2" rows={3} placeholder={t("descPlaceholder")} value={description} onChange={(e)=>setDescription(e.target.value)} />
          <div className="flex items-center gap-2 sm:col-span-2">
            <label className="text-sm text-slate-600">{t("quando")}:</label>
            <select className="px-3 py-2 rounded-xl border" value={when} onChange={(e)=>setWhen(e.target.value)}>
              <option>{t("hoje")}</option>
              <option>{t("amanha")}</option>
              <option>{t("estaSemana")}</option>
              <option>Data específica</option>
            </select>
            {when === "Data específica" && (
              <input type="date" className="px-3 py-2 rounded-xl border" value={whenDate} onChange={(e)=>setWhenDate(e.target.value)} />
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-2 rounded-xl border" onClick={onClose}>{t("cancelar")}</button>
          <button disabled={!category} className="px-3 py-2 rounded-xl bg-indigo-600 text-white disabled:opacity-50" onClick={submit}>{t("criarPedido")}</button>
        </div>
      </div>
    </Modal>
  );
}

// ---------- Planner with CPM & Gantt ----------
const BASE_TASKS = [
  { id: "vistoria", name: "Vistoria do projeto", category: "Informática", baseDur: 1, dependsOn: [] },
  { id: "protecao", name: "Proteção", category: "Limpeza", baseDur: 1, dependsOn: ["vistoria"] },
  { id: "demolicao", name: "Demolição", category: "Dedetização", baseDur: 1, dependsOn: ["protecao"] },
  { id: "hidraulica", name: "Hidráulica", category: "Encanador", baseDur: 2, dependsOn: ["demolicao"] },
  { id: "eletrica", name: "Elétrica", category: "Eletricista", baseDur: 2, dependsOn: ["demolicao"] },
  { id: "gesso", name: "Gesso", category: "Informática", baseDur: 2, dependsOn: ["hidraulica","eletrica"] },
  { id: "piso", name: "Piso/Revest.", category: "Marceneiro", baseDur: 2, dependsOn: ["gesso"] },
  { id: "iluminacao", name: "Iluminação/Automação", category: "Eletricista", baseDur: 1, dependsOn: ["eletrica","gesso"] },
  { id: "ar", name: "Ar-condicionado", category: "Ar-Condicionado", baseDur: 1, dependsOn: ["gesso"] },
  { id: "marcenaria", name: "Marcenaria", category: "Marceneiro", baseDur: 3, dependsOn: ["piso"] },
  { id: "pintura", name: "Pintura", category: "Pintor", baseDur: 2, dependsOn: ["gesso","marcenaria"] },
  { id: "limpeza", name: "Limpeza final", category: "Limpeza", baseDur: 1, dependsOn: ["pintura"] },
];

function PlannerModal({ t, nf, df, onClose, onCreateOrders }) {
  const [mode, setMode] = useState("help"); // "know" | "help"
  const [sqm, setSqm] = useState(60);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0,10));
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState(() => new Set(BASE_TASKS.map(t=>t.id)));
  const [wizard, setWizard] = useState({ rooms: { cozinha:true, sala:true, quartos:true, banheiros:true }, interventions: { demolicao:true, hidraulica:true, eletrica:true, gesso:true, piso:true, pintura:true, marcenaria:true, iluminacao:true, ar:true }, constraints: { horario:"comercial" } });
  const [plan, setPlan] = useState(null); // { tasks:[...], duration, startTs, endTs }
  const [quoteAll, setQuoteAll] = useState(false);
  const [quoteByTask, setQuoteByTask] = useState({}); // id -> bool
  const [selectGroup, setSelectGroup] = useState({}); // id -> bool

  function applyWizard() {
    const picks = new Set(["vistoria","protecao"]);
    Object.entries(wizard.interventions).forEach(([k,v])=>{ if(v) picks.add(k); });
    picks.add("limpeza");
    setSelected(picks);
  }

  function buildPlan() {
    const startTs = new Date(startDate).getTime();
    // Build tasks list per selection
    const tasks = BASE_TASKS.filter(tk=>selected.has(tk.id)).map((tk, idx)=>{
      let dur = tk.baseDur;
      if (tk.id === "demolicao") dur = Math.max(1, Math.ceil(sqm/50));
      return { id: tk.id, name: tk.name, category: tk.category, durationDays: dur, dependsOn: tk.dependsOn.filter(d=>selected.has(d)), seq: idx };
    });

    const { ordered, es, ef, ls, lf, slack, duration } = cpm(tasks);
    const mapped = ordered.map((id)=>{
      const tk = tasks.find(t=>t.id===id);
      return { ...tk, ES: es[id], EF: ef[id], LS: ls[id], LF: lf[id], slack: slack[id], critical: slack[id]===0 };
    });
    const endTs = startTs + duration * 24*60*60*1000;
    setPlan({ tasks: mapped, duration, startTs, endTs });
  }

  function createOrdersFromSelection() {
    const chosenIds = Object.keys(selectGroup).filter(id=>selectGroup[id]);
    const chosenTasks = (plan?.tasks||[]).filter(t=> chosenIds.includes(t.id) || quoteAll || (quoteByTask[t.id] ?? false));
    if (chosenTasks.length === 0) return;
    // group by category
    const byCat = {};
    chosenTasks.forEach(tk => { if(!byCat[tk.category]) byCat[tk.category]=[]; byCat[tk.category].push(tk); });
    const requests = Object.entries(byCat).map(([category, items])=>({ category, description: `Endereço: ${address||"-"}. Itens: ` + items.map(i=>`${i.name} (${i.durationDays}d)`).join(", ") }));
    onCreateOrders(requests);
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div className="space-y-3">
        <div className="font-semibold flex items-center gap-2"><Settings className="w-4 h-4" />{t("plannerTitulo")}</div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm text-slate-600">{t("modo")}:</label>
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
            <button onClick={()=>setMode("know")} className={`px-3 py-1.5 rounded-lg text-sm ${mode==="know"?"bg-white shadow":""}`}>{t("jaSei")}</button>
            <button onClick={()=>setMode("help")} className={`px-3 py-1.5 rounded-lg text-sm ${mode==="help"?"bg-white shadow":""}`}>{t("precisoAjuda")}</button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-2">
          <label className="text-sm flex items-center gap-2 bg-white border rounded-xl px-3 py-2"><Layers className="w-4 h-4"/> {t("metragem")}
            <input type="number" className="ml-auto w-24 border rounded-lg px-2 py-1" value={sqm} onChange={(e)=>setSqm(Number(e.target.value))} />
          </label>
          <label className="text-sm flex items-center gap-2 bg-white border rounded-xl px-3 py-2"><CalendarDays className="w-4 h-4"/> {t("dataInicio")}
            <input type="date" className="ml-auto border rounded-lg px-2 py-1" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
          </label>
          <input className="sm:col-span-2 px-3 py-2 rounded-xl border" placeholder={t("endereco")} value={address} onChange={(e)=>setAddress(e.target.value)} />
        </div>

        {mode === "help" ? (
          <div className="grid md:grid-cols-3 gap-3">
            <fieldset className="bg-white border rounded-2xl p-3">
              <div className="font-medium text-sm mb-2">{t("ambientes")}</div>
              {Object.keys(wizard.rooms).map(k => (
                <label key={k} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={wizard.rooms[k]} onChange={(e)=>setWizard(w=>({ ...w, rooms:{...w.rooms,[k]:e.target.checked} }))} /> {capitalize(k)}</label>
              ))}
            </fieldset>
            <fieldset className="bg-white border rounded-2xl p-3">
              <div className="font-medium text-sm mb-2">{t("intervencoes")}</div>
              {Object.keys(wizard.interventions).map(k => (
                <label key={k} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={wizard.interventions[k]} onChange={(e)=>setWizard(w=>({ ...w, interventions:{...w.interventions,[k]:e.target.checked} }))} /> {capitalize(k)}</label>
              ))}
            </fieldset>
            <fieldset className="bg-white border rounded-2xl p-3">
              <div className="font-medium text-sm mb-2">{t("restricoes")}</div>
              <select className="px-3 py-2 rounded-xl border" value={wizard.constraints.horario} onChange={(e)=>setWizard(w=>({ ...w, constraints:{...w.constraints, horario:e.target.value} }))}>
                <option value="comercial">Comercial</option>
                <option value="flexivel">Flexível</option>
              </select>
              <button className="mt-3 px-3 py-2 rounded-xl border text-sm" onClick={applyWizard}>{t("atualizarPlano")}</button>
            </fieldset>
          </div>
        ) : (
          <div className="bg-white border rounded-2xl p-3">
            <div className="text-sm mb-2">Marque as etapas:</div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {BASE_TASKS.map(tk => (
                <label key={tk.id} className="flex items-center gap-2 text-sm bg-slate-50 rounded-xl p-2">
                  <input type="checkbox" checked={selected.has(tk.id)} onChange={(e)=>setSelected(s=>{ const n=new Set(s); e.target.checked?n.add(tk.id):n.delete(tk.id); return n; })} />
                  {tk.name}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <button className="px-3 py-2 rounded-xl border" onClick={buildPlan}>{t("criarPlano")}</button>
          <button className="px-3 py-2 rounded-xl bg-indigo-600 text-white" onClick={buildPlan}>{t("atualizarPlano")}</button>
        </div>

        {plan && (
          <div className="space-y-3">
            <div className="text-sm text-slate-600">{t("inicioPrev")}: {df.format(plan.startTs)} · {t("fimPrev")}: {df.format(plan.endTs)} ({plan.duration}d)</div>
            <Gantt plan={plan} />

            <div className="bg-white border rounded-2xl p-3 space-y-2">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!quoteAll} onChange={(e)=>setQuoteAll(e.target.checked)} /> {t("solicitarTodos")}</label>
              <div className="grid md:grid-cols-2 gap-2">
                {(plan.tasks).map(tk => (
                  <div key={tk.id} className="flex items-center justify-between border rounded-xl p-2 text-sm">
                    <div>
                      <div className="font-medium">{tk.name} {tk.critical && <span className="text-rose-600 text-xs">({t("caminhoCritico")})</span>}</div>
                      <div className="text-xs text-slate-600">{tk.durationDays}d · ES {tk.ES} · EF {tk.EF}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1"><input type="checkbox" checked={!!selectGroup[tk.id]} onChange={(e)=>setSelectGroup(s=>({ ...s, [tk.id]: e.target.checked }))}/> grupo</label>
                      <label className="flex items-center gap-1"><input type="checkbox" checked={!!(quoteByTask[tk.id])} onChange={(e)=>setQuoteByTask(s=>({ ...s, [tk.id]: e.target.checked }))}/> individual</label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button className="px-3 py-2 rounded-xl bg-indigo-600 text-white" onClick={createOrdersFromSelection}>{t("solicitarSelecionados")}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function Gantt({ plan }) {
  const dayWidth = 24; // px per day
  const totalWidth = (plan.duration+2) * dayWidth;
  return (
    <div className="bg-white border rounded-2xl p-3 overflow-x-auto">
      <div className="min-w-full" style={{ width: totalWidth }}>
        {/* Timeline */}
        <div className="relative border-b mb-2 h-6">
          {Array.from({ length: plan.duration+1 }).map((_,i)=> (
            <div key={i} className="absolute top-0 h-6 border-r text-[10px] text-slate-500" style={{ left: i*dayWidth, width: dayWidth }}>
              <div className="pl-1">{i}</div>
            </div>
          ))}
        </div>
        {/* Tasks */}
        <div className="space-y-2">
          {plan.tasks.map((t,i)=> (
            <div key={t.id} className="relative h-8 border rounded-lg bg-slate-50">
              <div className="absolute left-1 top-1 text-[11px] text-slate-600">{t.name}</div>
              <div className={`absolute h-6 rounded-md top-1.5 ${t.critical?"bg-rose-500":"bg-indigo-500"}`} title={`ES ${t.ES} · EF ${t.EF} · dur ${t.durationDays}d`} style={{ left: t.ES*dayWidth, width: t.durationDays*dayWidth }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckoutModal({ t, df, nf, checkoutInfo, orders, providers, onClose, onConfirm }) {
  const order = orders.find(o => o.id === checkoutInfo.orderId);
  const proposal = order?.proposals.find(p => p.id === checkoutInfo.proposalId);
  const pro = providers.find(p => p.id === proposal?.providerId);
  const [method, setMethod] = useState("card");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const pixStr = `00020126680014BR.GOV.BCB.PIX0114+5511999999995204000053039865406${(proposal?.value||0).toFixed(2)}5802BR5920${(pro?.name||"PRO").slice(0,20)}6009SAO PAULO62120510A${proposal?.id||"0000"}6304ABCD`;

  function confirm() {
    if (method === "pix" || (name && number.length>=16 && exp && cvv.length>=3)) onConfirm({ method });
  }

  return (
    <Modal onClose={onClose}>
      <div className="space-y-3">
        <div className="font-semibold flex items-center gap-2"><Wallet className="w-4 h-4" />{t("checkout")}</div>
        <div className="bg-slate-50 rounded-xl p-3 text-sm">
          <div className="font-medium">{order?.category} · {pro?.name}</div>
          <div>{order?.description}</div>
          <div className="text-slate-600 mt-1">{nf.format(proposal?.value||0)} · {proposal?.prazoDias} dia(s)</div>
        </div>
        <div className="flex items-center gap-2">
          <button className={`px-3 py-2 rounded-xl border text-sm ${method==="card"?"bg-indigo-600 text-white":""}`} onClick={()=>setMethod("card")}><CreditCard className="w-4 h-4 inline mr-1"/>{t("cartao")}</button>
          <span className="text-slate-400 text-sm">{t("ou")}</span>
          <button className={`px-3 py-2 rounded-xl border text-sm ${method==="pix"?"bg-indigo-600 text-white":""}`} onClick={()=>setMethod("pix")}><QrCode className="w-4 h-4 inline mr-1"/>{t("pix")}</button>
        </div>
        {method === "card" ? (
          <div className="grid sm:grid-cols-2 gap-2">
            <input className="px-3 py-2 rounded-xl border sm:col-span-2" placeholder={t("nomeCartao")} value={name} onChange={(e)=>setName(e.target.value)} />
            <input className="px-3 py-2 rounded-xl border" placeholder={t("numeroCartao")} value={number} onChange={(e)=>setNumber(maskCard(e.target.value))} />
            <input className="px-3 py-2 rounded-xl border" placeholder={t("validade")} value={exp} onChange={(e)=>setExp(maskExpiry(e.target.value))} />
            <input className="px-3 py-2 rounded-xl border" placeholder={t("cvv")} value={cvv} onChange={(e)=>setCvv(e.target.value.replace(/[^0-9]/g, '').slice(0,4))} />
          </div>
        ) : (
          <div className="bg-slate-50 rounded-xl p-3 font-mono text-xs break-all">{t("copiaColaPix")}:<br/>{pixStr}</div>
        )}
        <div className="flex justify-end gap-2">
          <button className="px-3 py-2 rounded-xl border" onClick={onClose}>{t("cancelar")}</button>
          <button className="px-3 py-2 rounded-xl bg-indigo-600 text-white" onClick={confirm}>{t("contratar")}</button>
        </div>
      </div>
    </Modal>
  );
}

function ChatModal({ t, chatInfo, orders, providers, chats, setChats, onClose, onSend }) {
  const order = orders.find(o => o.id === chatInfo.orderId);
  const proposal = order?.proposals.find(p => p.providerId === chatInfo.providerId);
  const pro = providers.find(p => p.id === chatInfo.providerId);
  const convId = `${order?.id}:${pro?.id}`;
  const list = chats[convId] || [];
  const [text, setText] = useState("");
  const ref = useRef();
  useEffect(()=>{ ref.current?.scrollIntoView({ behavior: "smooth" }); }, [list.length]);
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-[70vh]">
        <div className="font-semibold flex items-center gap-2 mb-2"><MessageCircle className="w-4 h-4" />{pro?.name} · {order?.category}</div>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {list.map((m,idx)=> (
            <div key={idx} className={`max-w-[80%] px-3 py-2 rounded-2xl ${m.from==='me'?"ml-auto bg-indigo-600 text-white":"bg-slate-100"}`}>{m.text}</div>
          ))}
          <div ref={ref} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <input className="flex-1 px-3 py-2 rounded-xl border" value={text} onChange={(e)=>setText(e.target.value)} />
          <button className="px-3 py-2 rounded-xl bg-indigo-600 text-white" onClick={()=>{ if(text.trim()){ onSend(convId, text.trim(), pro?.name||"Pro"); setText(""); } }}><Send className="w-4 h-4"/></button>
        </div>
      </div>
    </Modal>
  );
}

function ReviewModal({ t, orderId, onClose, onSave }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  return (
    <Modal onClose={onClose}>
      <div className="space-y-3">
        <div className="font-semibold">{t("avaliacao")}</div>
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map(n=> (
            <button key={n} onClick={()=>setRating(n)} className={`${n<=rating?"text-amber-500":"text-slate-300"}`}><Star className={`w-6 h-6 ${n<=rating?"fill-amber-400":""}`} /></button>
          ))}
        </div>
        <textarea className="w-full px-3 py-2 rounded-xl border" rows={3} value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Comentário" />
        <div className="flex justify-end gap-2">
          <button className="px-3 py-2 rounded-xl border" onClick={onClose}>{t("cancelar")}</button>
          <button className="px-3 py-2 rounded-xl bg-indigo-600 text-white" onClick={()=>onSave(orderId, rating, comment)}>{t("salvar")}</button>
        </div>
      </div>
    </Modal>
  );
}

// ---------- Helpers ----------
function randBetween(a,b){ const lo=Math.min(a,b), hi=Math.max(a,b); return Math.round(lo + Math.random()*(hi-lo)); }
function maskCard(v){ return v.replace(/[^0-9]/g,'').slice(0,16).replace(/(\d{4})(?=\d)/g,'$1 '); }
function maskExpiry(v){ return v.replace(/[^0-9]/g,'').slice(0,4).replace(/(\d{2})(\d{0,2})/,'$1/$2'); }
function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

// Critical Path Method (CPM)
function cpm(tasks){
  const ids = tasks.map(t=>t.id);
  const pred = Object.fromEntries(ids.map(id=>[id, tasks.find(t=>t.id===id).dependsOn||[]]));
  const succ = Object.fromEntries(ids.map(id=>[id, []]));
  tasks.forEach(t=>{ t.dependsOn.forEach(d=>{ if(succ[d]) succ[d].push(t.id); }); });
  // Kahn topological sort
  const indeg = Object.fromEntries(ids.map(id=>[id, pred[id].length]));
  const q = ids.filter(id=>indeg[id]===0);
  const ordered=[];
  while(q.length){
    const u = q.shift(); ordered.push(u);
    for(const v of succ[u]){ indeg[v]--; if(indeg[v]===0) q.push(v); }
  }
  if(ordered.length!==ids.length){ throw new Error("Graph has cycles or disconnected nodes"); }

  const dur = Object.fromEntries(tasks.map(t=>[t.id, t.durationDays]));
  const es = Object.fromEntries(ids.map(id=>[id,0]));
  const ef = {};
  for(const u of ordered){ es[u] = Math.max(0, ...(pred[u].map(p=>ef[p]||0))); ef[u] = es[u] + dur[u]; }
  const projectDuration = Math.max(...Object.values(ef));
  const lf = Object.fromEntries(ids.map(id=>[id, projectDuration]));
  const ls = {};
  for(const u of [...ordered].reverse()){
    lf[u] = succ[u].length? Math.min(...succ[u].map(v=>ls[v])) : projectDuration;
    ls[u] = lf[u] - dur[u];
  }
  const slack = Object.fromEntries(ids.map(id=>[id, ls[id]-es[id]]));
  return { ordered, es, ef, ls, lf, slack, duration: projectDuration };
}

/*******************************
 * App Shell Wrapper
 *******************************/
function AppShell() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}

export { AppShell as Component };
