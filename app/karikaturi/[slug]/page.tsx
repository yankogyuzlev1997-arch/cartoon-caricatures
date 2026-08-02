import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {categories} from '@/lib/content';

type CollectionImage={src:string;alt:string;caption:string;tag:string};

const superheroImages:CollectionImage[]=[
  {src:'/images/superhero-catwoman.jpg',alt:'Персонална карикатура като жена супергерой',caption:'Героиня на нощния град',tag:'Супергерой'},
  {src:'/images/superhero-batman.jpg',alt:'Персонална карикатура като син супергерой',caption:'Герой под знака на прилепа',tag:'Супергерой'},
];
const footballImages:CollectionImage[]=[
  {src:'/images/idea-barcelona.jpg',alt:'Футболна карикатура с купа на стадион Барселона',caption:'До Меси на Камп Ноу',tag:'Барселона'},
  {src:'/images/idea-football-team.jpg',alt:'Рожденденска футболна карикатура с трима играчи',caption:'Рожден ден на терена',tag:'Футболен отбор'},
  {src:'/images/idea-real-madrid.jpg',alt:'Персонална карикатура на фен на Реал Мадрид',caption:'За верния футболен фен',tag:'Реал Мадрид'},
  {src:'/images/football-child.jpg',alt:'Детска футболна карикатура на стадион Реал Мадрид',caption:'Малкият шампион',tag:'Детски футбол'},
  {src:'/images/idea-football-cup.jpg',alt:'Футболна карикатура с шампионска купа',caption:'Шампионски момент',tag:'Купа и отбор'},
];
const birthdayImages:CollectionImage[]=[
  {src:'/images/birthday-motorcycle.jpg',alt:'Карикатура за 50-и рожден ден с мотор, лаптоп и торта',caption:'50 години и страст към моторите',tag:'Юбилей'},
  {src:'/images/birthday-racing.jpg',alt:'Карикатура за рожден ден с пилот от Формула 1 и торта',caption:'Рожден ден на висока скорост',tag:'Хоби и спорт'},
  {src:'/images/birthday-accountant.jpg',alt:'Карикатура за 60-и рожден ден на главен счетоводител',caption:'Юбилей в офиса',tag:'Професия'},
  {src:'/images/birthday-tavern.jpg',alt:'Карикатура за 60-и рожден ден в традиционна механа',caption:'Честита годишнина',tag:'60 години'},
  {src:'/images/birthday-couple.jpg',alt:'Карикатура за 50-и юбилей на двойка край морето',caption:'Юбилей край морето',tag:'Двойка'},
  {src:'/images/birthday-celebration.jpg',alt:'Карикатура за рожден ден с автомобил и приятели',caption:'Празник с размах',tag:'Парти'},
  {src:'/images/birthday-sales.jpg',alt:'Карикатура за 50-и рожден ден в офис продажби',caption:'Празник с колегите',tag:'Колеги'},
];
const coupleImages:CollectionImage[]=[
  {src:'/images/couple-chefs.jpg',alt:'Карикатура на двойка готвачи',caption:'Двама влюбени готвачи',tag:'Професии'},
  {src:'/images/couple-europe.jpg',alt:'Романтична карикатура с европейски забележителности',caption:'Романтика из Европа',tag:'Пътуване'},
  {src:'/images/couple-yacht.jpg',alt:'Карикатура на елегантна двойка край яхта',caption:'Вечер край морето',tag:'Луксозна сцена'},
  {src:'/images/couple-beach.jpg',alt:'Карикатура на двойка на тропически плаж',caption:'Любов и приключения',tag:'Плаж'},
  {src:'/images/couple-legend.jpg',alt:'Тематична карикатура на двойка в легендарна битка',caption:'Двойка от легендите',tag:'Фентъзи'},
  {src:'/images/couple-flowers.jpg',alt:'Романтична карикатура на двойка сред цветя',caption:'Любов сред цветята',tag:'Романтична'},
];
const professionalImages:CollectionImage[]=[
  {src:'/images/idea-tanker.jpg',alt:'Карикатура на служител в петролна компания',caption:'Професията като лична история',tag:'Транспорт'},
  {src:'/images/idea-farm.jpg',alt:'Карикатура във ферма с автомобил и животни',caption:'Живот във фермата',tag:'Фермер'},
  {src:'/images/idea-harvester.jpg',alt:'Карикатура на земеделец с комбайн',caption:'Гордостта на земеделеца',tag:'Земеделие'},
  {src:'/images/idea-chef.jpg',alt:'Карикатура на майстор готвач',caption:'Майсторът в кухнята',tag:'Готвач'},
  {src:'/images/professional-cook-woman.jpg',alt:'Карикатура на жена готвач',caption:'Талант в кухнята',tag:'Кулинария'},
  {src:'/images/professional-photographer.jpg',alt:'Карикатура на фотограф и пътешественик',caption:'Светът през обектива',tag:'Фотограф'},
  {src:'/images/idea-teacher.jpg',alt:'Карикатура на учителка в класна стая',caption:'Любимият учител',tag:'Учител'},
  {src:'/images/idea-business.jpg',alt:'Бизнес карикатура с костюм',caption:'Бизнес и успех',tag:'Бизнес'},
];
const lifestyleImages:CollectionImage[]=[
  {src:'/images/idea-beach-woman.jpg',alt:'Карикатура на жена на тропически плаж',caption:'Мечтана почивка',tag:'Пътуване'},
  {src:'/images/idea-travel.jpg',alt:'Карикатура на пътешественик с фотоапарат',caption:'Пътешествия и фотография',tag:'Пътуване'},
  {src:'/images/idea-sports-car.jpg',alt:'Карикатура със спортен автомобил',caption:'Характер и високи скорости',tag:'Автомобили'},
  {src:'/images/idea-pool.jpg',alt:'Забавна карикатура край тропически басейн',caption:'Почивка без грижи',tag:'Хоби'},
];
const familyImages:CollectionImage[]=[
  {src:'/images/superhero-family.jpg',alt:'Семейна карикатура с трима супергерои',caption:'Семейство супергерои',tag:'Семейство'},
  ...birthdayImages.filter(image=>image.src==='/images/birthday-celebration.jpg'),
];
const teacherImages=professionalImages.filter(image=>image.tag==='Учител');
const colleagueImages=[...professionalImages.filter(image=>['Бизнес','Готвач','Кулинария'].includes(image.tag)),...birthdayImages.filter(image=>image.tag==='Колеги')];
const retirementImages=birthdayImages.filter(image=>['60 години','Професия'].includes(image.tag));
const ideaImages:CollectionImage[]=[...superheroImages,...footballImages,...birthdayImages,...coupleImages,...professionalImages,...lifestyleImages,...familyImages.filter(image=>image.src==='/images/superhero-family.jpg')];

const collections:Record<string,CollectionImage[]>={
  supergeroi:superheroImages,
  'rozhden-den':birthdayImages,
  dvoika:coupleImages,
  'bez-ideya':ideaImages,
  futbolni:footballImages,
  profesionalni:professionalImages,
  uchiteli:teacherImages,
  kolegi:colleagueImages,
  pensionirane:retirementImages,
  semeini:familyImages,
  'drug-povod':lifestyleImages,
};

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const{slug}=await params;
  const category=categories.find(item=>item.slug===slug);
  if(!category)notFound();
  const images=collections[slug]??[];
  const featured=images.length>0;
  const isIdea=slug==='bez-ideya';
  const heading=isIdea?'Всички идеи на едно място':slug==='supergeroi'?'Изберете своята суперсила':`Вдъхновение за ${category.name.toLowerCase()}`;
  const ctaHref=isIdea?'/konsultatsiya':`/porachai?occasion=${slug}`;
  return <>
    {featured?<section className={`collection-cover ${slug}-cover`}><Image src={images[0].src} alt={images[0].alt} fill priority sizes="100vw"/><div className="collection-shade"/><div className="container collection-cover-copy"><p className="kicker">Персонална колекция</p><h1>{category.name}</h1><p>{category.short}</p><Link className="button" href={ctaHref}>{isIdea?'Помогнете ми с идеята':'Поръчай карикатура'} →</Link></div></section>:<section className="page-hero"><p className="kicker">Персонална колекция</p><h1>{category.name}</h1><p>{category.short}</p></section>}
    <section className="content collection-intro"><p className="kicker">Характер, интереси и лична история</p><h2>Вашата история, нарисувана специално</h2><p>Избираме композиция, облекло, фон и лични детайли според снимките и описанието ви. Ще получите преглед преди финализирането.</p>{!featured&&<Link className="button" href={ctaHref}>Поръчай от 69 € →</Link>}</section>
    {featured&&<section className="section pale"><div className="container"><div className="heading"><p>{images.length} примера в колекцията</p><h2>{heading}</h2></div><div className={`collection-gallery adaptive-gallery ${isIdea?'idea-gallery':''}`}>{images.map((image,index)=><figure className={index===0?'gallery-featured':''} key={`${image.src}-${index}`}><Image src={image.src} alt={image.alt} fill sizes={index===0?'(max-width:900px) 100vw, 50vw':'(max-width:900px) 50vw, 25vw'}/><figcaption><small>{image.tag}</small>{image.caption}</figcaption></figure>)}</div><div className="gallery-cta"><Link className="button" href={ctaHref}>{isIdea?'Помогнете ми да избера':'Поръчай карикатура от 69 €'} →</Link></div></div></section>}
  </>;
}
