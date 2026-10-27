import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Activity, ArrowLeft, BarChart3, Check, CheckCircle2, ChevronDown, Cloud, Download, Edit3, FileImage, FileText, FileUp, FolderOpen, LayoutDashboard, Library, LineChart, MoreHorizontal, Plus, Search, Settings2, Trash2, UploadCloud, Users, X } from 'lucide-react';
import { magazines } from '../data/magazines';
import { useLanguage } from '../i18n/LanguageContext';

type PublicationStatus = 'published' | 'draft';
type DashboardTab = 'analytics' | 'publications';
type PublicationCategory = 'regular' | 'brochure' | 'ministerial' | 'guide';

type AdminMagazine = {
  id: string;
  edition: string;
  title: string;
  category: PublicationCategory;
  description: string;
  date: string;
  pages: number;
  price: string;
  status: PublicationStatus;
  freeAccess: boolean;
  fileName: string;
  thumbnailName: string;
};

type AdminPanelProps = { onBack: () => void };

type TrafficRange = 'daily' | 'weekly' | 'monthly';

const initialMagazines: AdminMagazine[] = magazines.slice(0, 3).map((magazine, index) => ({
  id: `existing-${magazine.id}`,
  edition: magazine.edition,
  title: magazine.title,
  category: 'regular',
  description: magazine.excerpt,
  date: magazine.date,
  pages: magazine.pages,
  price: magazine.price,
  status: 'published',
  freeAccess: index !== 1,
  fileName: `agrimag-${magazine.id}.pdf`,
  thumbnailName: `cover-${magazine.id}.jpg`,
}));

const traffic = {
  daily: { values: [42, 58, 51, 74, 68, 86, 79], labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
  weekly: { values: [310, 420, 380, 510, 465, 620, 590], labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'] },
  monthly: { values: [1200, 1450, 1320, 1680, 1840, 2050, 2280, 2140, 2470, 2680, 2920, 3180], labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] },
};

const categoryLabels: Record<PublicationCategory, { pt: string; en: string }> = {
  regular: { pt: 'Edições Regulares', en: 'Regular Editions' },
  brochure: { pt: 'Brochuras Institucionais', en: 'Institutional Brochures' },
  ministerial: { pt: 'Relatórios Ministeriais', en: 'Ministerial Reports' },
  guide: { pt: 'Guias Temáticos', en: 'Thematic Guides' },
};

function StatCard({ label, value, trend, icon: Icon, accent = 'green' }: { label: string; value: string; trend: string; icon: typeof Users; accent?: 'green' | 'blue' | 'amber' | 'purple' }) {
  const accents = { green: 'bg-agriGreen/15 text-agriGreen', blue: 'bg-cyan-400/10 text-cyan-300', amber: 'bg-amber-400/10 text-amber-300', purple: 'bg-violet-400/10 text-violet-300' };
  return <article className="rounded-2xl border border-white/8 bg-[#0b2e34] p-5 shadow-xl shadow-black/10"><div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/42">{label}</p><p className="mt-3 font-display text-3xl font-extrabold tracking-[-0.06em] text-white">{value}</p></div><span className={`grid h-10 w-10 place-items-center rounded-xl ${accents[accent]}`}><Icon className="h-5 w-5" /></span></div><p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-agriGreen"><Activity className="h-3.5 w-3.5" /> {trend}</p></article>;
}

function TrafficChart({ range, isEnglish }: { range: TrafficRange; isEnglish: boolean }) {
  const chart = traffic[range];
  const max = Math.max(...chart.values);
  const points = chart.values.map((value, index) => `${(index / (chart.values.length - 1)) * 100},${96 - (value / max) * 76}`).join(' ');
  const area = `0,96 ${points} 100,96`;
  return <div className="rounded-2xl border border-white/8 bg-[#0b2e34] p-5 sm:p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/42">{isEnglish ? 'Traffic volume' : 'Volume de tráfego'}</p><p className="mt-1 font-display text-2xl font-extrabold tracking-[-0.05em] text-white">{range === 'daily' ? '2.184' : range === 'weekly' ? '14.820' : '68.430'} <span className="text-xs font-semibold text-white/35">{isEnglish ? 'visits' : 'visitas'}</span></p></div><LineChart className="h-5 w-5 text-agriGreen" /></div><div className="mt-6 h-56"><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[calc(100%-24px)] w-full overflow-visible"><defs><linearGradient id="trafficFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#079A48" stopOpacity=".35" /><stop offset="100%" stopColor="#079A48" stopOpacity="0" /></linearGradient></defs><path d={`M ${area}`} fill="url(#trafficFill)" /><polyline points={points} fill="none" stroke="#22c55e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />{chart.values.map((value, index) => <circle key={index} cx={(index / (chart.values.length - 1)) * 100} cy={96 - (value / max) * 76} r="1.5" fill="#b9f6cf" vectorEffect="non-scaling-stroke" />)}</svg><div className="flex justify-between text-[10px] font-semibold text-white/35">{chart.labels.map((label) => <span key={label}>{label}</span>)}</div></div></div>;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const text = isEnglish ? {
    back: 'Back to website', demo: 'MOCK MODE · API NOT CONNECTED', workspace: 'Administration workspace', title: 'AgriMag dashboard', subtitle: 'Monitor the website and manage the publication catalogue from one workspace.', analytics: 'Analytics', publications: 'Publications', overview: 'Website overview', totalVisits: 'Total visits', uniqueUsers: 'Unique users', bounce: 'Bounce rate', downloads: 'Magazine downloads', vsPeriod: 'vs. previous period', traffic: 'Traffic trends', daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', popular: 'Popular content', articles: 'Most read articles', editions: 'Most downloaded editions', upload: 'Upload publication', uploadSubtitle: 'Prepare a new magazine, brochure or institutional document.', titleLabel: 'Title', titlePlaceholder: 'Publication title', edition: 'Edition / number', editionPlaceholder: 'Edition No. 09', category: 'Category', description: 'Description', descriptionPlaceholder: 'Briefly describe this publication...', date: 'Publication date', access: 'Free access', accessHint: 'No cost for visitors', pdf: 'PDF file', cover: 'Cover image', selectPdf: 'Select PDF', selectCover: 'Select cover', storage: 'Cloud storage', storageHint: 'Firebase Storage integration ready for API phase', saveDraft: 'Save draft', update: 'Update publication', cancel: 'Cancel', required: 'Complete the required fields and select a PDF.', pdfInvalid: 'Select a PDF up to 20 MB.', coverInvalid: 'Select a JPG, PNG or WebP image up to 5 MB.', saved: 'Publication saved in mock mode.', updated: 'Publication updated in mock mode.', catalogue: 'Publication catalogue', search: 'Search publications', edit: 'Edit', delete: 'Delete', noResults: 'No publications found.', published: 'Published', draft: 'Draft', free: 'Free', paid: 'Paid', pages: 'pages', all: 'All', uploadProgress: 'Uploading to mock storage...', popularArticle1: 'How value chains can unlock Mozambique’s growth', popularArticle2: 'Women leading the next agricultural cycle', popularArticle3: 'Investment and technology in the field', storageBadge: 'Storage not connected'
  } : {
    back: 'Voltar ao website', demo: 'MODO MOCK · API NÃO LIGADA', workspace: 'Área de administração', title: 'Dashboard AgriMag', subtitle: 'Acompanhe o website e faça a gestão do catálogo de publicações num só espaço.', analytics: 'Analytics', publications: 'Publicações', overview: 'Visão geral do website', totalVisits: 'Total de visitas', uniqueUsers: 'Utilizadores únicos', bounce: 'Taxa de rejeição', downloads: 'Downloads de revistas', vsPeriod: 'vs. período anterior', traffic: 'Tendências de tráfego', daily: 'Diário', weekly: 'Semanal', monthly: 'Mensal', popular: 'Conteúdos populares', articles: 'Artigos mais lidos', editions: 'Edições mais descarregadas', upload: 'Carregar publicação', uploadSubtitle: 'Prepare uma nova revista, brochura ou documento institucional.', titleLabel: 'Título', titlePlaceholder: 'Título da publicação', edition: 'Edição / número', editionPlaceholder: 'Edição N.º 09', category: 'Categoria', description: 'Descrição', descriptionPlaceholder: 'Descreva brevemente esta publicação...', date: 'Data de publicação', access: 'Acesso livre', accessHint: 'Sem custos para visitantes', pdf: 'Ficheiro PDF', cover: 'Imagem de capa', selectPdf: 'Seleccionar PDF', selectCover: 'Seleccionar capa', storage: 'Armazenamento cloud', storageHint: 'Integração Firebase Storage preparada para a fase de API', saveDraft: 'Guardar rascunho', update: 'Actualizar publicação', cancel: 'Cancelar', required: 'Preencha os campos obrigatórios e seleccione um PDF.', pdfInvalid: 'Seleccione um PDF até 20 MB.', coverInvalid: 'Seleccione uma imagem JPG, PNG ou WebP até 5 MB.', saved: 'Publicação guardada no modo mock.', updated: 'Publicação actualizada no modo mock.', catalogue: 'Catálogo de publicações', search: 'Pesquisar publicações', edit: 'Editar', delete: 'Eliminar', noResults: 'Nenhuma publicação encontrada.', published: 'Publicada', draft: 'Rascunho', free: 'Livre', paid: 'Pago', pages: 'páginas', all: 'Todas', uploadProgress: 'A carregar para o armazenamento mock...', popularArticle1: 'Como as cadeias de valor podem acelerar o crescimento de Moçambique', popularArticle2: 'Mulheres que lideram o próximo ciclo agrícola', popularArticle3: 'Investimento e tecnologia no terreno', storageBadge: 'Armazenamento não ligado'
  };

  const [activeTab, setActiveTab] = useState<DashboardTab>('analytics');
  const [trafficRange, setTrafficRange] = useState<TrafficRange>('weekly');
  const [items, setItems] = useState<AdminMagazine[]>(initialMagazines);
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [edition, setEdition] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PublicationCategory>('regular');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [freeAccess, setFreeAccess] = useState(true);
  const [pages, setPages] = useState('');
  const [fileError, setFileError] = useState('');
  const [coverError, setCoverError] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const publishedCount = items.filter((item) => item.status === 'published').length;
  const draftCount = items.filter((item) => item.status === 'draft').length;
  const filteredItems = useMemo(() => items.filter((item) => `${item.edition} ${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase())), [items, query]);

  useEffect(() => {
    if (!uploading) return undefined;
    const timer = window.setInterval(() => setUploadProgress((current) => {
      if (current >= 100) { window.clearInterval(timer); return 100; }
      return Math.min(current + 12, 100);
    }), 120);
    return () => window.clearInterval(timer);
  }, [uploading]);

  useEffect(() => {
    if (uploading && uploadProgress >= 100) {
      const timer = window.setTimeout(() => setUploading(false), 300);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [uploading, uploadProgress]);

  const selectPdf = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0];
    if (!next) return;
    if (!(next.type === 'application/pdf' || next.name.toLowerCase().endsWith('.pdf')) || next.size > 20 * 1024 * 1024) { setFile(null); setFileError(text.pdfInvalid); return; }
    setFileError(''); setFormMessage(''); setFile(next);
  };

  const selectCover = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0];
    if (!next) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(next.type) || next.size > 5 * 1024 * 1024) { setThumbnail(null); setCoverError(text.coverInvalid); return; }
    setCoverError(''); setThumbnail(next);
  };

  const resetForm = () => { setEditingId(null); setFile(null); setThumbnail(null); setEdition(''); setTitle(''); setCategory('regular'); setDescription(''); setDate(''); setFreeAccess(true); setPages(''); setFileError(''); setCoverError(''); setFormMessage(''); setUploadProgress(0); };

  const editItem = (item: AdminMagazine) => { setEditingId(item.id); setEdition(item.edition); setTitle(item.title); setCategory(item.category); setDescription(item.description); setDate(item.date); setFreeAccess(item.freeAccess); setPages(String(item.pages || '')); setActiveTab('publications'); setFormMessage(''); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const deleteItem = (id: string) => { if (window.confirm(isEnglish ? 'Delete this publication from the mock catalogue?' : 'Eliminar esta publicação do catálogo mock?')) setItems((current) => current.filter((item) => item.id !== id)); };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ((!editingId && !file) || !edition.trim() || !title.trim() || !category || !description.trim()) { setFormMessage(text.required); return; }
    if (editingId) {
      setItems((current) => current.map((item) => item.id === editingId ? { ...item, edition: edition.trim(), title: title.trim(), category, description: description.trim(), date: date.trim() || 'A definir', freeAccess, pages: Number(pages) || 0, fileName: file?.name || item.fileName, thumbnailName: thumbnail?.name || item.thumbnailName } : item));
      setFormMessage(text.updated);
      resetForm();
      setFormMessage(text.updated);
      return;
    }
    setUploading(true); setUploadProgress(8);
    window.setTimeout(() => {
      setItems((current) => [{ id: `mock-${Date.now()}`, edition: edition.trim(), title: title.trim(), category, description: description.trim(), date: date.trim() || 'A definir', pages: Number(pages) || 0, price: '150,00 MT', status: 'draft', freeAccess, fileName: file?.name || 'publication.pdf', thumbnailName: thumbnail?.name || 'cover-not-provided.jpg' }, ...current]);
      setFormMessage(text.saved); resetForm(); setFormMessage(text.saved);
    }, 1500);
  };

  return <div className="min-h-screen bg-[#061f25] text-white">
    <header className="border-b border-white/8 bg-[#04191e]/95 backdrop-blur-xl"><div className="container-shell flex min-h-[76px] items-center justify-between gap-5"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-agriGreen shadow-lg shadow-agriGreen/20"><LayoutDashboard className="h-5 w-5" /></div><div><p className="font-display text-lg font-extrabold tracking-[-0.04em]">Agri<span className="text-agriGreen">Mag</span> Admin</p><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{text.demo}</p></div></div><div className="flex items-center gap-2"><span className="hidden rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-200 sm:inline-flex">{text.storageBadge}</span><button onClick={onBack} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-2 text-xs font-bold text-white/75 transition hover:border-agriGreen hover:bg-agriGreen hover:text-white"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">{text.back}</span></button></div></div></header>
    <div className="container-shell flex flex-col gap-8 py-8 lg:flex-row lg:py-10">
      <aside className="lg:w-56 lg:shrink-0"><div className="lg:sticky lg:top-8"><p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">{text.workspace}</p><nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-2">{([{ id: 'analytics', label: text.analytics, icon: BarChart3 }, { id: 'publications', label: text.publications, icon: Library }] as const).map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setActiveTab(id)} className={`focus-ring flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition lg:w-full ${activeTab === id ? 'bg-agriGreen text-white shadow-lg shadow-agriGreen/15' : 'text-white/52 hover:bg-white/6 hover:text-white'}`}><Icon className="h-4 w-4" /> {label}</button>)}</nav><div className="mt-8 hidden rounded-2xl border border-white/8 bg-[#0b2e34] p-4 lg:block"><Cloud className="h-5 w-5 text-agriGreen" /><p className="mt-3 text-xs font-bold text-white">{text.storage}</p><p className="mt-1 text-[11px] leading-5 text-white/40">{text.storageHint}</p></div></div></aside>
      <main className="min-w-0 flex-1">
        {activeTab === 'analytics' ? <section><div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-agriGreen">{text.overview}</p><h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.06em] sm:text-5xl">{text.title}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/48">{text.subtitle}</p></div><span className="inline-flex items-center gap-2 text-xs font-semibold text-white/40"><span className="h-2 w-2 rounded-full bg-agriGreen shadow-[0_0_12px_#079A48]" /> {isEnglish ? 'Live mock data' : 'Dados mock em tempo real'}</span></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label={text.totalVisits} value="68.430" trend={`+18,4% ${text.vsPeriod}`} icon={Users} /><StatCard label={text.uniqueUsers} value="42.891" trend={`+12,8% ${text.vsPeriod}`} icon={Activity} accent="blue" /><StatCard label={text.bounce} value="38,6%" trend={`-4,2% ${text.vsPeriod}`} icon={BarChart3} accent="amber" /><StatCard label={text.downloads} value="12.608" trend={`+26,1% ${text.vsPeriod}`} icon={Download} accent="purple" /></div><div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]"><div><div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-display text-xl font-extrabold tracking-[-0.04em]">{text.traffic}</h2><div className="flex rounded-lg border border-white/8 bg-[#0b2e34] p-1">{(['daily', 'weekly', 'monthly'] as TrafficRange[]).map((range) => <button key={range} onClick={() => setTrafficRange(range)} className={`rounded-md px-2.5 py-1.5 text-[10px] font-bold transition ${trafficRange === range ? 'bg-agriGreen text-white' : 'text-white/45 hover:text-white'}`}>{text[range]}</button>)}</div></div><TrafficChart range={trafficRange} isEnglish={isEnglish} /></div><div className="rounded-2xl border border-white/8 bg-[#0b2e34] p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="font-display text-xl font-extrabold tracking-[-0.04em]">{text.popular}</h2><MoreHorizontal className="h-5 w-5 text-white/35" /></div><div className="mt-6"><p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-agriGreen">{text.articles}</p>{[text.popularArticle1, text.popularArticle2, text.popularArticle3].map((article, index) => <div key={article} className="flex gap-3 border-b border-white/8 py-3 last:border-0"><span className="font-display text-lg font-extrabold text-agriGreen/60">0{index + 1}</span><div><p className="text-xs font-semibold leading-5 text-white/80">{article}</p><p className="mt-1 text-[10px] text-white/35">{[2480, 1920, 1640][index].toLocaleString()} {isEnglish ? 'reads' : 'leituras'}</p></div></div>)}</div><div className="mt-5"><p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-agriGreen">{text.editions}</p>{items.slice(0, 3).map((item, index) => <div key={item.id} className="flex items-center justify-between gap-3 py-2"><span className="truncate text-xs font-semibold text-white/70">{item.edition}</span><span className="text-[10px] font-bold text-white/35">{[840, 720, 580][index]} PDF</span></div>)}</div></div></div></section> : <section><div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-agriGreen">{text.publications}</p><h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.06em] sm:text-5xl">{text.upload}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/48">{text.uploadSubtitle}</p></div><button onClick={resetForm} className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-agriGreen px-4 py-3 text-sm font-bold transition hover:bg-[#08aa50]"><Plus className="h-4 w-4" /> {isEnglish ? 'New publication' : 'Nova publicação'}</button></div><div className="grid gap-6 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]"><form onSubmit={handleSubmit} className="rounded-2xl border border-white/8 bg-[#0b2e34] p-5 shadow-xl shadow-black/10 sm:p-6"><div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-xl font-extrabold tracking-[-0.04em]">{editingId ? text.update : text.upload}</h2><p className="mt-1 text-xs text-white/38">{text.storageHint}</p></div><Settings2 className="h-5 w-5 text-agriGreen" /></div><div className="mt-6 space-y-4"><label className="block text-xs font-bold text-white/75">{text.titleLabel}<input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder={text.titlePlaceholder} className="focus-ring mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-[#061f25] px-3 text-sm font-normal text-white outline-none placeholder:text-white/25" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-xs font-bold text-white/75">{text.edition}<input required value={edition} onChange={(event) => setEdition(event.target.value)} placeholder={text.editionPlaceholder} className="focus-ring mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-[#061f25] px-3 text-sm font-normal text-white outline-none placeholder:text-white/25" /></label><label className="block text-xs font-bold text-white/75">{text.category}<select value={category} onChange={(event) => setCategory(event.target.value as PublicationCategory)} className="focus-ring mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-[#061f25] px-3 text-sm font-normal text-white outline-none"><option value="regular">{categoryLabels.regular[language]}</option><option value="brochure">{categoryLabels.brochure[language]}</option><option value="ministerial">{categoryLabels.ministerial[language]}</option><option value="guide">{categoryLabels.guide[language]}</option></select></label></div><label className="block text-xs font-bold text-white/75">{text.description}<textarea required value={description} onChange={(event) => setDescription(event.target.value)} placeholder={text.descriptionPlaceholder} rows={4} className="focus-ring mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-[#061f25] px-3 py-3 text-sm font-normal text-white outline-none placeholder:text-white/25" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-xs font-bold text-white/75">{text.date}<input value={date} onChange={(event) => setDate(event.target.value)} className="focus-ring mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-[#061f25] px-3 text-sm font-normal text-white outline-none" /></label><label className="block text-xs font-bold text-white/75">{isEnglish ? 'Pages' : 'Páginas'}<input type="number" min="0" value={pages} onChange={(event) => setPages(event.target.value)} className="focus-ring mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-[#061f25] px-3 text-sm font-normal text-white outline-none" /></label></div><div className="grid gap-3 sm:grid-cols-2"><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#061f25] p-3"><input type="checkbox" checked={freeAccess} onChange={(event) => setFreeAccess(event.target.checked)} className="h-4 w-4 accent-[#079A48]" /><span><span className="block text-xs font-bold text-white">{text.access}</span><span className="block text-[10px] text-white/35">{text.accessHint}</span></span></label><div className="flex items-center gap-2 rounded-xl border border-agriGreen/20 bg-agriGreen/8 p-3 text-xs text-white/55"><Cloud className="h-4 w-4 shrink-0 text-agriGreen" /> {text.storage}</div></div><div className="grid gap-3 sm:grid-cols-2"><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-[#061f25] p-3 transition hover:border-agriGreen"><FileText className="h-5 w-5 text-agriGreen" /><span className="min-w-0"><span className="block truncate text-xs font-bold text-white">{file ? file.name : text.selectPdf}</span><span className="block text-[10px] text-white/35">{text.pdf} · 20 MB</span></span><input type="file" accept="application/pdf,.pdf" onChange={selectPdf} className="sr-only" /></label><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-[#061f25] p-3 transition hover:border-agriGreen"><FileImage className="h-5 w-5 text-agriGreen" /><span className="min-w-0"><span className="block truncate text-xs font-bold text-white">{thumbnail ? thumbnail.name : text.selectCover}</span><span className="block text-[10px] text-white/35">{text.cover} · 5 MB</span></span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectCover} className="sr-only" /></label></div>{fileError && <p className="rounded-lg bg-red-400/10 px-3 py-2 text-xs font-semibold text-red-300">{fileError}</p>}{coverError && <p className="rounded-lg bg-red-400/10 px-3 py-2 text-xs font-semibold text-red-300">{coverError}</p>}{uploading && <div className="rounded-xl border border-agriGreen/20 bg-agriGreen/8 p-3"><div className="flex justify-between text-[11px] font-bold text-white/65"><span>{text.uploadProgress}</span><span>{uploadProgress}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-agriGreen transition-all" style={{ width: `${uploadProgress}%` }} /></div></div>}{formMessage && <p className="rounded-lg bg-agriGreen/12 px-3 py-2 text-xs font-semibold text-agriGreen">{formMessage}</p>}<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={resetForm} className="focus-ring rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-white/55 transition hover:bg-white/5">{text.cancel}</button><button disabled={uploading} type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-agriGreen px-4 py-3 text-sm font-bold text-white transition hover:bg-[#08aa50] disabled:cursor-wait disabled:opacity-60"><UploadCloud className="h-4 w-4" /> {editingId ? text.update : text.saveDraft}</button></div></div></form><section className="min-w-0 rounded-2xl border border-white/8 bg-[#0b2e34] p-5 shadow-xl shadow-black/10 sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-agriGreen">{text.catalogue}</p><h2 className="mt-2 font-display text-xl font-extrabold tracking-[-0.04em]">{items.length} {isEnglish ? 'publications' : 'publicações'}</h2></div><label className="relative block sm:w-56"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} className="focus-ring h-10 w-full rounded-xl border border-white/10 bg-[#061f25] pl-9 pr-3 text-xs text-white outline-none placeholder:text-white/25" /></label></div><div className="mt-6 space-y-3">{filteredItems.map((item) => <article key={item.id} className="rounded-xl border border-white/8 bg-[#061f25] p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-agriGreen/15 text-agriGreen"><FileUp className="h-5 w-5" /></div><div className="min-w-0"><p className="truncate text-sm font-bold text-white">{item.title}</p><p className="mt-1 truncate text-xs text-white/42">{item.edition} · {categoryLabels[item.category][language]}</p></div></div><button type="button" className="text-white/30 hover:text-white"><MoreHorizontal className="h-4 w-4" /></button></div><p className="mt-3 line-clamp-2 text-xs leading-5 text-white/45">{item.description}</p><div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-3"><div className="flex items-center gap-2"><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${item.status === 'published' ? 'bg-agriGreen/15 text-agriGreen' : 'bg-amber-400/10 text-amber-300'}`}>{item.status === 'published' ? text.published : text.draft}</span><span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-bold text-white/42">{item.freeAccess ? text.free : text.paid}</span></div><div className="flex items-center gap-1"><button type="button" onClick={() => editItem(item)} title={text.edit} className="grid h-8 w-8 place-items-center rounded-lg text-white/40 transition hover:bg-white/8 hover:text-agriGreen"><Edit3 className="h-3.5 w-3.5" /></button><button type="button" onClick={() => deleteItem(item.id)} title={text.delete} className="grid h-8 w-8 place-items-center rounded-lg text-white/40 transition hover:bg-red-400/10 hover:text-red-300"><Trash2 className="h-3.5 w-3.5" /></button></div></div></article>)}{filteredItems.length === 0 && <div className="rounded-xl border border-dashed border-white/12 py-12 text-center text-sm text-white/35">{text.noResults}</div>}</div></section></div></section>}
        <p className="mt-8 flex items-center gap-2 text-xs text-white/28"><CheckCircle2 className="h-3.5 w-3.5 text-agriGreen" /> {text.demo}. {isEnglish ? 'This is the front-end contract for the future API and cloud storage integration.' : 'Este é o contrato visual para a futura integração com API e armazenamento cloud.'}</p>
      </main>
    </div>
  </div>;
}
