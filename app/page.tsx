import Image from 'next/image';
import Link from 'next/link';
import {categories,faqs,prices} from '@/lib/content';

const categoryPhotos=[
  {src:'/images/superhero-catwoman.jpg',alt:'Карикатура за супергерой'},
  {src:'/images/birthday-motorcycle.jpg',alt:'Карикатура за рожден ден'},
  {src:'/images/couple-chefs.jpg',alt:'Карикатура за двойка'},
  {src:'/images/idea-tanker.jpg',alt:'Персонална карикатура по професия'},
  {src:'/images/superhero-family.jpg',alt:'Семейна карикатура'},
  {src:'/images/birthday-tavern.jpg',alt:'Карикатура за пенсиониране'},
  {src:'/images/idea-teacher.jpg',alt:'Карикатура за учител'},
  {src:'/images/birthday-sales.jpg',alt:'Карикатура за колега'},
];

const popularWorks=[
  {src:'/images/idea-travel.jpg',title:'Пътешественик',text:'Лични интереси и любими места'},
  {src:'/images/birthday-racing.jpg',title:'Рожден ден',text:'Празник на висока скорост'},
  {src:'/images/couple-yacht.jpg',title:'За двойка',text:'Двама души в една обща история'},
  {src:'/images/superhero-family.jpg',title:'Супергерои',text:'Цялото семейство със суперсили'},
];

export default function Home(){return <>
  <section className="hero home-hero"><div className="container hero-grid"><div className="hero-copy"><p className="kicker">Персонална карикатура по ваша снимка</p><h1>Подарък, който разказва <em>истинска история</em></h1><p>Създаваме уникална сцена според човека, повода, професията и любимите му занимания.</p><ul className="hero-benefits"><li>Персонална идея и композиция</li><li>Преглед преди финализиране</li><li>Размери A4, A3 и A2</li></ul><div className="actions"><Link className="button" href="/porachai">Поръчай карикатура <span>→</span></Link><Link className="button ghost" href="/portfolio">Разгледай идеи</Link></div><small>Изпратете снимките. Ние ще превърнем историята в подарък.</small></div><div className="hero-art customer-banner"><Image src="/images/customer-banner.jpg" alt="Клиент с готова персонална карикатура" fill priority sizes="100vw"/><div className="art-note"><b>Създадено специално за вас</b><span>От снимка до незабравима емоция</span></div></div></div></section>

  <section className="trust"><div className="container trust-row"><span>✦ Персонална концепция</span><span>✓ Преглед и корекции</span><span>♙ Защитени лични снимки</span><span>♡ Създадено в България</span></div></section>

  <section className="section inspiration"><div className="container"><Heading over="Вдъхновение за всеки човек" title="Изберете повод или идея"/><div className="inspiration-grid">{categories.slice(0,8).map((c,i)=><Link href={`/karikaturi/${c.slug}`} className="inspiration-card" key={c.slug}><div className="inspiration-photo"><Image src={categoryPhotos[i].src} alt={categoryPhotos[i].alt} fill sizes="(max-width:700px) 50vw,25vw"/></div><div><span>0{i+1}</span><h3>{c.name}</h3><p>{c.short}</p><b>Разгледай идеите →</b></div></Link>)}</div><div className="section-action"><Link className="button ghost" href="/karikaturi">Вижте всички категории →</Link></div></div></section>

  <section className="section pale"><div className="container"><Heading over="Подбрано от нашето портфолио" title="Популярни идеи"/><div className="popular-grid">{popularWorks.map((work,i)=><Link className={`popular-work popular-${i}`} href="/portfolio" key={work.src}><Image src={work.src} alt={work.title} fill sizes="(max-width:700px) 100vw,25vw"/><div><p>{work.text}</p><h3>{work.title}</h3><span>Виж проекта →</span></div></Link>)}</div></div></section>

  <section className="section process-section"><div className="container"><Heading over="От снимка до готов подарък" title="Лесно в пет стъпки"/><div className="steps">{['Изберете размер и брой лица','Качете ясни снимки','Опишете човека и идеята','Прегледайте проекта','Получете карикатурата'].map((s,i)=><div key={s}><b>{String(i+1).padStart(2,'0')}</b><span>{s}</span></div>)}</div><div className="section-action"><Link className="button" href="/kak-raboti">Как работи поръчката →</Link></div></div></section>

  <section className="section pale pricing-section"><div className="container"><Heading over="Специални цени в момента" title="Изберете своя формат"/><p className="center-note">Включено е едно лице. Всяко следващо лице е +10 €.</p><div className="price-grid">{prices.map((p,i)=><div className={`price-card ${i===0?'featured':''}`} key={p.size}>{i===0&&<span className="badge">Най-добра стартова цена</span>}<p>Формат</p><h3>{p.size}</h3><span className="price-dimensions">{p.cm}</span><del className="old-price">{money(p.oldEur)} €</del><strong>{money(p.eur)} €</strong><small>за едно лице</small><ul><li>Дигитален файл с висока резолюция</li><li>Персонална композиция</li><li>Преглед преди финализиране</li></ul><Link className="button" href={`/porachai?size=${p.size}`}>Избери {p.size}</Link></div>)}</div></div></section>

  <section className="value-offer"><div className="container value-offer-shell"><div className="value-offer-copy"><p className="kicker">Пълният подаръчен пакет</p><h2>Не получавате просто рисунка.<br/><em>Получавате готова изненада.</em></h2><p>Всичко необходимо за личен и запомнящ се подарък е включено още от 65,72 € — без доплащане за концепция или преглед.</p><div className="value-price"><span>Промо цена за A4</span><strong>65,72 €</strong><small>за едно лице · стара цена 99,90 €</small></div><Link className="button light" href="/porachai">Искам своята карикатура →</Link><p className="value-reassurance">Първо виждате проекта. Финализираме го след вашето одобрение.</p></div><div className="value-stack"><article><span>01</span><div><h3>Творческа консултация</h3><p>Помагаме да превърнете интересите, професията и характера в оригинална сцена.</p></div><b>Включено</b></article><article><span>02</span><div><h3>Изцяло лична композиция</h3><p>Лица, облекло, фон и важни детайли се подбират специално за получателя.</p></div><b>Включено</b></article><article><span>03</span><div><h3>Преглед преди финала</h3><p>Получавате дигитален преглед и един кръг разумни корекции.</p></div><b>Включено</b></article><article><span>04</span><div><h3>Два готови файла</h3><p>Висока резолюция за печат и удобна версия за споделяне онлайн.</p></div><b>Включено</b></article><article><span>05</span><div><h3>3 на цената на 2</h3><p>Поръчайте три карикатури от един и същ размер и платете само две.</p></div><b>Автоматично</b></article></div></div></section>

  <section className="section offer"><div className="container offer-grid"><div><p className="kicker">Само за един и същ размер</p><h2>Поръчайте 3.<br/>Платете <em>2.</em></h2><p>Изберете три A4, три A3 или три A2. Третата карикатура от същия размер е безплатна и отстъпката се изчислява автоматично в количката.</p><Link className="button" href="/porachai">Започнете поръчка</Link></div><div className="discounts"><div><b>A4</b><span>3 броя · 30 × 20 см</span><strong>плащате 2</strong></div><div><b>A3</b><span>3 броя · 40 × 30 см</span><strong>плащате 2</strong></div><div><b>A2</b><span>3 броя · 70 × 50 см</span><strong>плащате 2</strong></div></div></div></section>

  <section className="section story-section"><div className="container story-grid"><div className="story-image"><Image src="/images/idea-business.jpg" alt="Персонална карикатура Cartoon Caricatures" fill sizes="(max-width:900px) 100vw,45vw"/></div><div><p className="kicker">Cartoon Caricatures</p><h2>Вашата идея. Нашият творчески почерк.</h2><p>Не избирате готов шаблон. Всяка карикатура започва с човека, неговия характер и малките детайли, които близките му ще разпознаят веднага.</p><div className="story-points"><span><b>01</b> Лична концепция</span><span><b>02</b> Внимание към детайла</span><span><b>03</b> Създадено за подарък</span></div><Link className="button ghost" href="/za-nas">Научете повече за нас →</Link></div></div></section>

  <section className="section pale"><div className="container"><Heading over="Спокойна и сигурна поръчка" title="Защо да изберете Cartoon Caricatures"/><div className="reasons-grid"><article><span>✎</span><h3>Вашата история</h3><p>Композицията се създава според снимките, интересите и повода.</p></article><article><span>◉</span><h3>Преглед предварително</h3><p>Виждате дигитален преглед и давате обратна връзка преди финала.</p></article><article><span>◇</span><h3>Ясна цена</h3><p>Цената се пресмята прозрачно според размера и броя лица.</p></article><article><span>✓</span><h3>Лична грижа</h3><p>Помагаме с концепцията, ако все още не знаете каква сцена да изберете.</p></article></div></div></section>

  <section className="section"><div className="container faq-wrap"><Heading over="Всичко важно преди поръчка" title="Често задавани въпроси"/><div>{faqs.slice(0,5).map((f,i)=><details key={f.q} open={i===0}><summary>{f.q}<span>+</span></summary><p>{f.a}</p></details>)}</div><div className="section-action"><Link className="button ghost" href="/faq">Всички въпроси →</Link></div></div></section>

  <section className="final-cta"><div className="container"><p>Готови ли сте да зарадвате някого?</p><h2>Една снимка може да се превърне в <em>незабравим подарък.</em></h2><div className="actions final-actions"><Link className="button light" href="/porachai">Създай карикатура →</Link><Link className="button ghost-light" href="/konsultatsiya">Помогнете ми с идеята</Link></div></div></section>
  </>}

function Heading({over,title}:{over:string,title:string}){return <div className="heading"><p>{over}</p><h2>{title}</h2></div>}
function money(value:number){return value.toFixed(2).replace('.',',')}
