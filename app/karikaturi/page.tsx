import Image from 'next/image';
import Link from 'next/link';
import {categories} from '@/lib/content';

const categoryImages:Record<string,string>={
  supergeroi:'/images/superhero-catwoman.jpg',
  'rozhden-den':'/images/birthday-motorcycle.jpg',
  dvoika:'/images/couple-chefs.jpg',
  'bez-ideya':'/images/idea-tanker.jpg',
  semeini:'/images/superhero-family.jpg',
  pensionirane:'/images/birthday-tavern.jpg',
  uchiteli:'/images/idea-teacher.jpg',
  kolegi:'/images/birthday-sales.jpg',
  futbolni:'/images/idea-barcelona.jpg',
  profesionalni:'/images/professional-photographer.jpg',
  'drug-povod':'/images/idea-beach-woman.jpg',
};

export default function Page(){return <><section className="page-hero"><p className="kicker">Категории и подкатегории</p><h1>Карикатури за всеки човек и повод</h1><p>Изберете тема. Във всяка категория ще откриете подходящи примери от портфолиото.</p></section><section className="section"><div className="container category-grid all-categories">{categories.map((category,index)=><Link className={`category c${index%5}`} href={`/karikaturi/${category.slug}`} key={category.slug}><div className="category-visual has-photo"><Image src={categoryImages[category.slug]} alt={category.name} fill sizes="(max-width:700px) 100vw,25vw"/></div><span>{String(index+1).padStart(2,'0')}</span><h3>{category.name}</h3><p>{category.short}</p><b>Разгледай колекцията →</b></Link>)}</div></section></>}
