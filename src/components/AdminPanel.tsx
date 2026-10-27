import { ChangeEvent, DragEvent, FormEvent, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, FileUp, FolderOpen, LayoutDashboard, LogOut, MoreHorizontal, Plus, Search, UploadCloud, X } from 'lucide-react';
import { magazines } from '../data/magazines';
import { useLanguage } from '../i18n/LanguageContext';

type PublicationStatus = 'published' | 'draft';

type AdminMagazine = {
  id: string;
  edition: string;
  title: string;
  date: string;
  pages: number;
  price: string;
  status: PublicationStatus;
  fileName: string;
};

type AdminPanelProps = {
  onBack: () => void;
};

const initialMagazines: AdminMagazine[] = magazines.slice(0, 3).map((magazine) => ({
  id: `existing-${magazine.id}`,
  edition: magazine.edition,
  title: magazine.title,
  date: magazine.date,
  pages: magazine.pages,
  price: magazine.price,
  status: 'published',
  fileName: `agrimag-${magazine.id}.pdf`,
}));

export function AdminPanel({ onBack }: AdminPanelProps) {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const text = isEnglish ? {
    back: 'Back to website', signOut: 'Demo mode', eyebrow: 'Administration workspace', title: 'Magazine library', subtitle: 'Upload, organise and prepare new editions for publication.', demo: 'MOCK PANEL · NO API CONNECTED', uploadTitle: 'Upload a new edition', uploadSubtitle: 'PDF files only · Maximum size 20 MB', drop: 'Drag your PDF here or browse files', browse: 'Browse files', selected: 'Selected file', edition: 'Edition', editionPlaceholder: 'Edition No. 9', titleLabel: 'Magazine title', titlePlaceholder: 'Enter the main title', date: 'Publication date', datePlaceholder: 'September / October 2018', pages: 'Pages', price: 'Price', cancel: 'Cancel', publish: 'Save as draft', saved: 'Edition saved in demo mode', required: 'Fill in the edition, title and select a PDF.', invalid: 'Select a PDF file up to 20 MB.', overview: 'Overview', total: 'Total editions', published: 'Published', drafts: 'Drafts', recent: 'Recent editions', search: 'Search editions', statusPublished: 'Published', statusDraft: 'Draft', noResults: 'No editions found.', view: 'Preview'
  } : {
    back: 'Voltar ao website', signOut: 'Modo demonstração', eyebrow: 'Área de administração', title: 'Biblioteca de revistas', subtitle: 'Faça upload, organize e prepare novas edições para publicação.', demo: 'PAINEL MOCK · SEM API LIGADA', uploadTitle: 'Carregar nova edição', uploadSubtitle: 'Apenas ficheiros PDF · Tamanho máximo 20 MB', drop: 'Arraste o PDF para aqui ou procure nos ficheiros', browse: 'Procurar ficheiros', selected: 'Ficheiro seleccionado', edition: 'Edição', editionPlaceholder: 'Edição N.º 9', titleLabel: 'Título da revista', titlePlaceholder: 'Introduza o título principal', date: 'Data de publicação', datePlaceholder: 'Setembro / Outubro 2018', pages: 'Páginas', price: 'Preço', cancel: 'Cancelar', publish: 'Guardar como rascunho', saved: 'Edição guardada no modo demonstração', required: 'Preencha a edição, o título e seleccione um PDF.', invalid: 'Seleccione um ficheiro PDF até 20 MB.', overview: 'Visão geral', total: 'Total de edições', published: 'Publicadas', drafts: 'Rascunhos', recent: 'Edições recentes', search: 'Pesquisar edições', statusPublished: 'Publicada', statusDraft: 'Rascunho', noResults: 'Nenhuma edição encontrada.', view: 'Pré-visualizar'
  };

  const [items, setItems] = useState<AdminMagazine[]>(initialMagazines);
  const [file, setFile] = useState<File | null>(null);
  const [edition, setEdition] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [pages, setPages] = useState('');
  const [price, setPrice] = useState('150,00 MT');
  const [fileError, setFileError] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [query, setQuery] = useState('');

  const publishedCount = items.filter((item) => item.status === 'published').length;
  const draftCount = items.filter((item) => item.status === 'draft').length;
  const filteredItems = useMemo(() => items.filter((item) => `${item.edition} ${item.title}`.toLowerCase().includes(query.toLowerCase())), [items, query]);

  const acceptFile = (nextFile: File | undefined) => {
    if (!nextFile) return;
    const isPdf = nextFile.type === 'application/pdf' || nextFile.name.toLowerCase().endsWith('.pdf');
    if (!isPdf || nextFile.size > 20 * 1024 * 1024) {
      setFile(null);
      setFileError(text.invalid);
      return;
    }
    setFileError('');
    setFormMessage('');
    setFile(nextFile);
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => acceptFile(event.target.files?.[0]);
  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    acceptFile(event.dataTransfer.files?.[0]);
  };

  const resetForm = () => {
    setFile(null);
    setEdition('');
    setTitle('');
    setDate('');
    setPages('');
    setPrice('150,00 MT');
    setFileError('');
    setFormMessage('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !edition.trim() || !title.trim()) {
      setFormMessage(text.required);
      return;
    }
    const newItem: AdminMagazine = {
      id: `mock-${Date.now()}`,
      edition: edition.trim(),
      title: title.trim(),
      date: date.trim() || 'A definir',
      pages: Number(pages) || 0,
      price: price.trim() || '150,00 MT',
      status: 'draft',
      fileName: file.name,
    };
    setItems((current) => [newItem, ...current]);
    setFormMessage(text.saved);
    setFile(null);
    setEdition('');
    setTitle('');
    setDate('');
    setPages('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-agriDark">
      <header className="border-b border-white/10 bg-agriDark text-white">
        <div className="container-shell flex min-h-[76px] items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-agriGreen"><LayoutDashboard className="h-5 w-5" /></div>
            <div><p className="font-display text-lg font-extrabold tracking-[-0.04em]">Agri<span className="text-agriGreen">Mag</span> Admin</p><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">{text.demo}</p></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-white/70 sm:inline-flex"><span className="h-2 w-2 rounded-full bg-amber-400" /> {text.signOut}</span>
            <button onClick={onBack} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs font-bold transition hover:border-agriGreen hover:bg-agriGreen"><ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">{text.back}</span></button>
          </div>
        </div>
      </header>

      <main className="container-shell py-8 sm:py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="eyebrow">{text.eyebrow}</p><h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.06em] sm:text-5xl">{text.title}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">{text.subtitle}</p></div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-bold text-amber-800">{text.demo}</div>
        </div>

        <section className="grid gap-4 sm:grid-cols-3">
          {[{ label: text.total, value: items.length, icon: FolderOpen }, { label: text.published, value: publishedCount, icon: CheckCircle2 }, { label: text.drafts, value: draftCount, icon: FileUp }].map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p><Icon className="h-5 w-5 text-agriGreen" /></div><p className="mt-4 font-display text-3xl font-extrabold tracking-[-0.06em]">{value}</p></div>)}
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-2xl font-extrabold tracking-[-0.05em]">{text.uploadTitle}</h2><p className="mt-1 text-xs text-slate-500">{text.uploadSubtitle}</p></div><div className="grid h-10 w-10 place-items-center rounded-xl bg-agriMint text-agriGreen"><Plus className="h-5 w-5" /></div></div>
            <label onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} className={`mt-6 flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 text-center transition ${isDragging ? 'border-agriGreen bg-agriMint/50' : 'border-slate-200 bg-slate-50 hover:border-agriGreen hover:bg-agriMint/30'}`}>
              <input type="file" accept="application/pdf,.pdf" onChange={handleFileInput} className="sr-only" />
              <UploadCloud className="h-8 w-8 text-agriGreen" />
              <span className="mt-3 text-sm font-bold text-agriDark">{file ? file.name : text.drop}</span>
              <span className="mt-1 text-xs text-slate-400">{file ? `${text.selected} · ${(file.size / 1024 / 1024).toFixed(2)} MB` : text.browse}</span>
            </label>
            {fileError && <p className="mt-2 text-xs font-semibold text-red-600">{fileError}</p>}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold">{text.edition}<input required value={edition} onChange={(event) => setEdition(event.target.value)} placeholder={text.editionPlaceholder} className="focus-ring mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none" /></label>
              <label className="text-xs font-bold">{text.date}<input value={date} onChange={(event) => setDate(event.target.value)} placeholder={text.datePlaceholder} className="focus-ring mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none" /></label>
              <label className="text-xs font-bold sm:col-span-2">{text.titleLabel}<input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder={text.titlePlaceholder} className="focus-ring mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none" /></label>
              <label className="text-xs font-bold">{text.pages}<input type="number" min="0" value={pages} onChange={(event) => setPages(event.target.value)} className="focus-ring mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none" /></label>
              <label className="text-xs font-bold">{text.price}<input value={price} onChange={(event) => setPrice(event.target.value)} className="focus-ring mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none" /></label>
            </div>
            {formMessage && <p className={`mt-4 rounded-xl px-3 py-2.5 text-xs font-semibold ${formMessage === text.saved ? 'bg-agriMint text-agriDark' : 'bg-red-50 text-red-700'}`}>{formMessage}</p>}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={resetForm} className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">{text.cancel}</button><button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-agriGreen px-4 py-3 text-sm font-bold text-white transition hover:bg-[#08aa50]"><FileUp className="h-4 w-4" /> {text.publish}</button></div>
          </form>

          <section className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="eyebrow">{text.overview}</p><h2 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.05em]">{text.recent}</h2></div><label className="relative block sm:w-56"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} className="focus-ring h-10 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-xs outline-none" /></label></div>
            <div className="mt-6 space-y-3">
              {filteredItems.map((item) => <article key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-center gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-agriDark text-agriGreen"><FileUp className="h-5 w-5" /></div><div className="min-w-0"><p className="truncate text-sm font-bold text-agriDark">{item.title}</p><p className="mt-1 text-xs text-slate-500">{item.edition} · {item.date} · {item.pages || '—'} {item.pages ? (isEnglish ? 'pages' : 'páginas') : ''}</p><p className="mt-1 truncate text-[11px] text-slate-400">{item.fileName}</p></div></div><div className="flex items-center justify-between gap-3 sm:justify-end"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${item.status === 'published' ? 'bg-agriMint text-agriDark' : 'bg-amber-100 text-amber-800'}`}>{item.status === 'published' ? text.statusPublished : text.statusDraft}</span><button type="button" title={text.view} className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-agriGreen hover:text-agriGreen"><MoreHorizontal className="h-4 w-4" /></button></div></article>)}
              {filteredItems.length === 0 && <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-400">{text.noResults}</div>}
            </div>
          </section>
        </section>
        <p className="mt-8 flex items-center gap-2 text-xs text-slate-400"><X className="h-3.5 w-3.5" /> {text.demo}. Os dados ficam apenas no estado desta sessão e serão substituídos pela API posteriormente.</p>
      </main>
    </div>
  );
}
