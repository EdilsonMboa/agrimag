export type Language = 'pt' | 'en';

type MagazineCopy = {
  edition: string;
  date: string;
  title: string;
  excerpt: string;
};

type ServiceCopy = {
  category: string;
  title: string;
  description: string;
  bullets: string[];
};

export const translations = {
  pt: {
    languageLabel: 'EN',
    languageAria: 'Mudar para inglês',
    nav: { about: 'Sobre', magazines: 'Revistas', services: 'Serviços', impact: 'Impacto', subscription: 'Subscrição', contacts: 'Contactos', quote: 'Solicitar Cotação' },
    sidebar: { menu: 'Menu mobile', close: 'Fechar menu', explore: 'Explorar', home: 'Início', about: 'Sobre a AgriMag', magazines: 'Edições da revista', services: 'Serviços corporativos', impact: 'Impacto e portfólio', subscription: 'Subscrição', contacts: 'Contactos', talk: 'Fale connosco' },
    hero: { eyebrow: 'Feita em Moçambique, para quem faz', titleA: 'Media que informa.', titleB: 'Serviços que fazem avançar.', description: 'A AgriMag combina autoridade editorial e execução no terreno: somos revista e plataforma de agronegócios, mas também parceira em consultoria, gestão de projectos e eventos que transformam informação em acção.', explore: 'Explorar as revistas', talk: 'Falar com a equipa', mediaPillar: 'Media & Revista', mediaPillarText: 'Conteúdo, contexto e visibilidade para o agronegócio.', servicesPillar: 'Consultoria & Gestão', servicesPillarText: 'Decisões, projectos e eventos com execução local.', magazineLabel: 'Revista de agronegócios', since: 'Desde 2015', moving: 'Informação que move', community: 'A nossa comunidade', field: 'Campo & mercado', specialized: 'Revista especializada', valueChains: 'Cadeias de valor', purpose: 'Negócios com propósito', scroll: 'Deslize para explorar' },
    about: { eyebrow: 'Sobre a AgriMag', titleA: 'O sector cresce quando a informação', titleB: 'chega mais longe.', card1Title: 'Uma voz para o agro', card1Text: 'Damos palco às pessoas, empresas e ideias que estão a transformar a agricultura moçambicana.', card2Title: 'Contexto para decidir', card2Text: 'Ligamos as tendências globais ao ritmo local, tornando oportunidades mais claras e accionáveis.' },
    magazines: { eyebrow: 'Arquivo editorial', titleA: 'Ideias que se lêem.', titleB: 'Mudanças que se plantam.', description: 'Edições para quem quer entender o agronegócio moçambicano com mais contexto, proximidade e visão de futuro.', next: 'Receber a próxima edição', editionType: 'Edição impressa', download: 'Baixar Revista (PDF)', downloaded: 'Descarregado', archiveHint: 'Consulte o arquivo completo através da nossa equipa.', pages: 'páginas' },
    services: { eyebrow: 'Serviços para organizações', titleA: 'Mais do que contar o sector.', titleB: 'Fazê-lo avançar.', description: 'Combinamos conhecimento do terreno, comunicação estratégica e uma rede de parceiros para transformar desafios agrícolas em próximos passos claros.', executiveSummary: 'Resumo executivo', quote: 'Solicitar Cotação', partners: 'Rede de parceiros locais', context: 'Conhecimento com contexto', impact: 'Impacto que permanece' },
    portfolio: { eyebrow: 'Impacto no terreno', titleA: 'Ideias que saem', titleB: 'da página para a prática.', description: 'Um portfólio visual para tornar concreto o tipo de fóruns, missões e iniciativas que a AgriMag ajuda a pensar, organizar e executar.', representative: 'Imagem representativa — substituir pelo registo oficial', event: 'Evento', learnMore: 'Falar sobre um projecto' },
    subscription: { eyebrow: 'Fique por dentro', title: 'A próxima história começa na sua caixa de entrada.', description: 'Receba novas edições, oportunidades e conversas importantes do agronegócio moçambicano — sem ruído, só o que interessa.', emailLabel: 'O seu email', placeholder: 'O seu melhor email', subscribe: 'Subscrever', error: 'Introduza um email válido para continuar.', success: 'Está feito — a próxima edição vai chegar até si.', idle: 'Sem spam. Pode sair quando quiser.', talk: 'Prefere falar connosco?' },
    footer: { description: 'A primeira revista e plataforma de agronegócios de Moçambique. Conteúdo, conexões e consultoria para fazer o sector avançar.', location: 'Maputo, Moçambique', contact: 'Fale connosco', director: 'Director Geral', social: 'Siga a conversa', socialText: 'Acompanhe a AgriMag nas redes e descubra quem está a construir o próximo capítulo.', copyright: 'Cultivar ideias. Colher impacto.', future: 'O futuro cresce aqui.', admin: 'Área do administrador' },
    quote: { closeForm: 'Fechar formulário', close: 'Fechar', eyebrow: 'Vamos conversar', title: 'Dê o próximo passo com a AgriMag.', description: 'Conte-nos um pouco sobre o seu desafio{service}. Criamos uma proposta à medida.', servicePrefix: ' em', name: 'Nome', namePlaceholder: 'O seu nome', organization: 'Organização', organizationPlaceholder: 'Nome da organização', email: 'Email', emailPlaceholder: 'nome@empresa.co.mz', help: 'Como podemos ajudar?', helpPlaceholder: 'Descreva brevemente o seu projecto...', send: 'Enviar pedido', received: 'Pedido recebido.', receivedText: 'Obrigado pelo contacto. A equipa AgriMag vai responder-lhe em breve através dos dados enviados.', call: 'Ou ligue' },
    library: { closeLibrary: 'Fechar biblioteca de revistas', close: 'Fechar', eyebrow: 'Arquivo AgriMag', title: 'Todas as Edições Anteriores', description: 'Explore o nosso acervo completo e descarregue as versões digitais em PDF.', download: 'Baixar Revista (PDF)', page: 'Página', of: 'de', previous: 'Anterior', next: 'Seguinte' },
  },
  en: {
    languageLabel: 'PT',
    languageAria: 'Switch to Portuguese',
    nav: { about: 'About', magazines: 'Magazines', services: 'Services', impact: 'Impact', subscription: 'Newsletter', contacts: 'Contact', quote: 'Request a Quote' },
    sidebar: { menu: 'Mobile menu', close: 'Close menu', explore: 'Explore', home: 'Home', about: 'About AgriMag', magazines: 'Magazine editions', services: 'Corporate services', impact: 'Impact & portfolio', subscription: 'Newsletter', contacts: 'Contact', talk: 'Talk to us' },
    hero: { eyebrow: 'Made in Mozambique, for those who make it happen', titleA: 'Media that informs.', titleB: 'Services that move things forward.', description: 'AgriMag combines editorial authority with field execution: we are an agribusiness magazine and platform, as well as a partner for consulting, project management and events that turn information into action.', explore: 'Explore the magazines', talk: 'Talk to our team', mediaPillar: 'Media & Magazine', mediaPillarText: 'Content, context and visibility for agribusiness.', servicesPillar: 'Consulting & Management', servicesPillarText: 'Decisions, projects and events with local execution.', magazineLabel: 'Agribusiness magazine', since: 'Since 2015', moving: 'Information that moves', community: 'Our community', field: 'Field & market', specialized: 'Specialist magazine', valueChains: 'Value chains', purpose: 'Purpose-driven business', scroll: 'Scroll to explore' },
    about: { eyebrow: 'About AgriMag', titleA: 'The sector grows when information', titleB: 'travels further.', card1Title: 'A voice for agriculture', card1Text: 'We give a platform to the people, companies and ideas transforming Mozambique’s agriculture.', card2Title: 'Context to make decisions', card2Text: 'We connect global trends to the local pace, making opportunities clearer and actionable.' },
    magazines: { eyebrow: 'Editorial archive', titleA: 'Ideas worth reading.', titleB: 'Change worth planting.', description: 'Editions for anyone who wants to understand Mozambican agribusiness with more context, proximity and a view of the future.', next: 'Receive the next edition', editionType: 'Print edition', download: 'Download Magazine (PDF)', downloaded: 'Downloaded', archiveHint: 'Explore the complete archive with our team.', pages: 'pages' },
    services: { eyebrow: 'Services for organisations', titleA: 'More than telling the story.', titleB: 'Moving it forward.', description: 'We combine field knowledge, strategic communication and a local partner network to turn agricultural challenges into clear next steps.', executiveSummary: 'Executive summary', quote: 'Request a Quote', partners: 'Local partner network', context: 'Context-led knowledge', impact: 'Impact that lasts' },
    portfolio: { eyebrow: 'Impact in the field', titleA: 'Ideas that move', titleB: 'from page to practice.', description: 'A visual portfolio that makes tangible the kind of forums, missions and initiatives AgriMag helps shape, organise and deliver.', representative: 'Representative image — replace with the official record', event: 'Event', learnMore: 'Talk about a project' },
    subscription: { eyebrow: 'Stay in the loop', title: 'The next story starts in your inbox.', description: 'Receive new editions, opportunities and important conversations from Mozambican agribusiness — no noise, only what matters.', emailLabel: 'Your email', placeholder: 'Your best email', subscribe: 'Subscribe', error: 'Enter a valid email to continue.', success: 'You’re all set — the next edition is coming your way.', idle: 'No spam. Unsubscribe whenever you want.', talk: 'Prefer to talk to us?' },
    footer: { description: 'Mozambique’s first agribusiness magazine and platform. Content, connections and consulting to move the sector forward.', location: 'Maputo, Mozambique', contact: 'Talk to us', director: 'Managing Director', social: 'Join the conversation', socialText: 'Follow AgriMag online and discover who is building the next chapter.', copyright: 'Cultivate ideas. Harvest impact.', future: 'The future grows here.', admin: 'Administrator area' },
    quote: { closeForm: 'Close form', close: 'Close', eyebrow: 'Let’s talk', title: 'Take the next step with AgriMag.', description: 'Tell us a little about your challenge{service}. We’ll create a tailored proposal.', servicePrefix: ' in', name: 'Name', namePlaceholder: 'Your name', organization: 'Organisation', organizationPlaceholder: 'Organisation name', email: 'Email', emailPlaceholder: 'name@company.co.mz', help: 'How can we help?', helpPlaceholder: 'Briefly describe your project...', send: 'Send request', received: 'Request received.', receivedText: 'Thank you for reaching out. The AgriMag team will get back to you using the details provided.', call: 'Or call' },
    library: { closeLibrary: 'Close magazine library', close: 'Close', eyebrow: 'AgriMag archive', title: 'All Previous Editions', description: 'Explore our complete archive and download digital PDF versions.', download: 'Download Magazine (PDF)', page: 'Page', of: 'of', previous: 'Previous', next: 'Next' },
  },
} as const;

export const magazineCopy: Record<Language, Record<number, MagazineCopy>> = {
  pt: {
    8: { edition: 'Edição N.º 8', date: 'Maio / Junho 2018', title: 'Mulheres que fazem crescer Moçambique', excerpt: 'Histórias de liderança, inovação e resiliência no campo e nas cadeias de valor.' },
    7: { edition: 'Edição N.º 7', date: 'Março / Abril 2018', title: 'Agricultura que alimenta o futuro', excerpt: 'Tecnologia, financiamento e boas práticas para uma produção mais competitiva.' },
    6: { edition: 'Edição N.º 6', date: 'Janeiro / Fevereiro 2018', title: 'Do produtor ao mercado', excerpt: 'Logística, comércio e parcerias que aproximam quem produz de quem transforma.' },
  },
  en: {
    8: { edition: 'Edition No. 8', date: 'May / June 2018', title: 'Women Growing Mozambique', excerpt: 'Stories of leadership, innovation and resilience across the field and value chains.' },
    7: { edition: 'Edition No. 7', date: 'March / April 2018', title: 'Agriculture Feeding the Future', excerpt: 'Technology, finance and good practices for more competitive production.' },
    6: { edition: 'Edition No. 6', date: 'January / February 2018', title: 'From Producer to Market', excerpt: 'Logistics, trade and partnerships bringing producers closer to transformation.' },
  },
};

export const serviceCopy: Record<Language, Record<string, ServiceCopy>> = {
  pt: {
    'project-management': { category: 'Execução com impacto', title: 'Project Management', description: 'Transformamos uma intenção num plano executável. A AgriMag coordena equipas, parceiros, prazos e indicadores para que projectos agrícolas avancem com menos ruído e mais responsabilidade.', bullets: ['Planeamento e coordenação ponta a ponta', 'Gestão de equipas e parceiros locais', 'Monitorização de metas e indicadores'] },
    advisory: { category: 'Conhecimento aplicado', title: 'Advisory & Consultoria Agrícola', description: 'Ajudamos investidores e operadores a decidir melhor antes de comprometer recursos. Cruzamos dados, leitura do mercado e realidade local em recomendações práticas para soja, milho, algodão e outras cadeias.', bullets: ['Estudos de viabilidade e mercado', 'Modelos de produção e cadeia de valor', 'Recomendações accionáveis para crescer'] },
    events: { category: 'Conexões que abrem portas', title: 'Eventos & Seminários', description: 'Criamos encontros com propósito, da agenda à experiência no local. Desenhamos fóruns e seminários que aproximam empresas, investidores e decisores — da BVM à Dubai Chamber.', bullets: ['Conceito, curadoria e produção', 'Moderação e conteúdos editoriais', 'Activação de parceiros e convidados'] },
  },
  en: {
    'project-management': { category: 'Impactful execution', title: 'Project Management', description: 'We turn intent into an executable plan. AgriMag coordinates teams, partners, timelines and indicators so agricultural projects move forward with less noise and more accountability.', bullets: ['End-to-end planning and coordination', 'Local team and partner management', 'Goals and KPI monitoring'] },
    advisory: { category: 'Applied knowledge', title: 'Advisory & Agricultural Consulting', description: 'We help investors and operators make better decisions before committing resources. We combine data, market insight and local reality into practical recommendations for soy, maize, cotton and other value chains.', bullets: ['Feasibility and market studies', 'Production and value-chain models', 'Actionable recommendations to grow'] },
    events: { category: 'Connections that open doors', title: 'Events & Seminars', description: 'We create purposeful encounters, from the agenda to the on-site experience. We design forums and seminars that bring companies, investors and decision-makers together — from BVM to Dubai Chamber.', bullets: ['Concept, curation and production', 'Moderation and editorial content', 'Partner and guest activation'] },
  },
};

export type Translation = (typeof translations)[Language];
