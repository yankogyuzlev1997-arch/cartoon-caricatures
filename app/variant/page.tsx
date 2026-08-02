import Image from 'next/image';
import Link from 'next/link';
import {ReactionVideo} from '@/components/reaction-video';
import {prices} from '@/lib/content';

const customerPhotos=[
  ['/customer-stories/customer-hulk.jpg','„Точно аз — само че като супергерой!“'],
  ['/customer-stories/customer-carwash.jpg','Подаръкът, който веднага заема специално място'],
  ['/customer-stories/customer-superheroes.jpg','Усмивка, която казва всичко'],
  ['/customer-stories/customer-car.jpg','Лична история, нарисувана в един кадър'],
] as const;

const gallery=[
  ['/images/superhero-catwoman.jpg','Супергерой'],
  ['/images/birthday-racing.jpg','Рожден ден'],
  ['/images/couple-yacht.jpg','За двойка'],
  ['/images/idea-barcelona.jpg','Футбол'],
  ['/images/professional-photographer.jpg','Професия'],
  ['/images/superhero-family.jpg','Семейство'],
] as const;

const money=(value:number)=>value.toFixed(2).replace('.',',');

export default function VariantPage(){return <div className="visual-variant emotional-variant">
  <section className="promo-banner-section"><Link href="/porachai" className="promo-banner-link" aria-label="Поръчайте три карикатури от един размер и платете две"><Image src="/images/promo-3-for-2.png" alt="Оферта 3 карикатури на цената на 2, валидна за един и същ размер" width={1456} height={1080} priority sizes="100vw"/></Link></section>

  <section className="emotion-promise"><div className="container emotion-promise-grid"><div><p className="variant-overline">Не продаваме просто карикатура</p><h1>Подаряваме онзи момент,<br/><em>в който всички се разсмиват.</em></h1></div><div><p>Вижда себе си, любимия човек, смешните детайли… и усмивката идва сама. Създаваме подарък, за който се говори дълго след празника.</p><div className="variant-actions"><Link className="variant-primary light" href="/porachai">Искам да подаря тази емоция →</Link><a href="#reaktsii">Вижте истинските реакции</a></div></div></div></section>

  <section className="reaction-section" id="reaktsii"><div className="container">
    <div className="emotion-heading"><p>Най-важната част от подаръка</p><h2>Първо тишина.<br/>После: „Това съм аз!“</h2><span>Тези реакции не могат да се опишат. Затова ви ги показваме.</span></div>
    <div className="reaction-grid">
      <ReactionVideo src="/customer-stories/reaction-1.mp4" poster="/customer-stories/customer-hulk.jpg" label="Моментът на изненадата"/>
      <ReactionVideo src="/customer-stories/reaction-2.mp4" poster="/customer-stories/customer-car.jpg" label="Подарък, който разсмива всички"/>
    </div>
  </div></section>

  <section className="customer-wall"><div className="container">
    <div className="emotion-heading compact"><p>Истински хора. Истински подаръци.</p><h2>Ето как изглежда щастието.</h2></div>
    <div className="customer-photo-grid">{customerPhotos.map(([src,caption],i)=><figure className={`customer-shot customer-shot-${i}`} key={src}><Image src={src} alt={caption} fill sizes="(max-width:700px) 100vw,25vw"/><figcaption>{caption}</figcaption></figure>)}</div>
    <blockquote>„Най-хубавото не беше само картината. Беше смехът, когато я отвори.“<span>— клиент на Cartoon Caricatures</span></blockquote>
  </div></section>

  <section className="variant-gallery"><div className="container"><div className="variant-heading"><div><p>Представете си неговата реакция</p><h2>Вашите хора.<br/>Техният свят.</h2></div><span className="heading-note">Кола, професия, суперсила, любимо място или вътрешна шега — събираме всичко в една лична сцена.</span></div><div className="variant-mosaic">{gallery.map(([src,tag],index)=><Link href="/portfolio" className={`variant-work vw-${index}`} key={src}><Image src={src} alt={`Карикатура – ${tag}`} fill sizes="(max-width:700px) 100vw,33vw"/><span>{tag}</span></Link>)}</div></div></section>

  <section className="variant-offer"><div className="container variant-offer-grid"><div><p className="variant-overline">Подарък с характер, не готов шаблон</p><h2>Разкажете ни за човека.<br/>Ние ще намерим смешната идея.</h2><p>Достатъчни са няколко снимки и малко информация. Ще вплетем неговите навици, мечти, професия и любимите шеги така, че близките да разпознаят всеки детайл.</p><Link className="variant-primary light" href="/porachai">Започни от 65,72 € →</Link></div><ol><li><span>01</span><div><b>Изпращате снимки и история</b><p>Не е нужно да имате готова концепция.</p></div></li><li><span>02</span><div><b>Ние измисляме личната сцена</b><p>Всеки детайл е свързан с получателя.</p></div></li><li><span>03</span><div><b>Виждате проекта предварително</b><p>Финализираме едва след вашето одобрение.</p></div></li><li><span>04</span><div><b>Вие подарявате усмивката</b><p>Това е моментът, който остава.</p></div></li></ol></div></section>

  <section className="variant-prices emotion-prices"><div className="container"><div className="emotion-heading compact"><p>Специални цени в момента</p><h2>Изберете колко голяма<br/>да бъде изненадата.</h2><span>Едно лице е включено. Всяко следващо лице е +10 €.</span></div><div className="variant-price-row">{prices.map((price,index)=><Link href={`/porachai?size=${price.size}`} key={price.size} className={index===0?'selected':''}><span className="sale-label">Промо цена</span><h3>{price.size}</h3><span className="price-dimensions">{price.cm}</span><del>{money(price.oldEur)} €</del><strong>{money(price.eur)} €</strong><small>за едно лице</small><b>Избери {price.size} →</b></Link>)}</div><p className="promo-note">При 3 карикатури от един и същ размер плащате само 2. Офертата се изчислява автоматично в количката.</p></div></section>

  <section className="variant-final emotion-final"><div className="container"><p>Следващата усмивка може да бъде за вашия човек.</p><h2>Нека създадем подаръка,<br/>който никой няма да забрави.</h2><div className="variant-actions"><Link className="variant-primary light" href="/porachai">Поръчай за 65,72 € →</Link><Link href="/konsultatsiya">Нямам идея — помогнете ми</Link></div></div></section>
</div>}
