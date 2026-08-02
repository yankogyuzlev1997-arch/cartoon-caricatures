import Image from 'next/image';
import Link from 'next/link';

const works=[
  ['/images/superhero-catwoman.jpg','Супергерой'],['/images/superhero-batman.jpg','Супергерой'],
  ['/images/idea-barcelona.jpg','Футбол'],['/images/football-child.jpg','Футбол'],
  ['/images/birthday-racing.jpg','Рожден ден'],['/images/birthday-accountant.jpg','Юбилей'],
  ['/images/couple-chefs.jpg','Двойка'],['/images/couple-flowers.jpg','Двойка'],
  ['/images/idea-travel.jpg','Пътуване'],['/images/idea-beach-woman.jpg','Пътуване'],
  ['/images/idea-farm.jpg','Професия'],['/images/idea-harvester.jpg','Професия'],
  ['/images/idea-teacher.jpg','Учител'],['/images/professional-photographer.jpg','Фотограф'],
  ['/images/idea-chef.jpg','Готвач'],['/images/idea-business.jpg','Бизнес'],
] as const;

export default function Page(){return <><section className="page-hero"><p className="kicker">Подбрани лични истории</p><h1>Портфолио</h1><p>Супергерои · Рождени дни · Двойки · Футбол · Професии · Пътувания</p></section><section className="section"><div className="container portfolio-grid">{works.map(([src,tag],index)=><figure key={src} className={index%5===0?'portfolio-tall':''}><Image src={src} alt={`Пример за персонална карикатура – ${tag}`} fill sizes="(max-width:700px) 100vw,33vw"/><figcaption><small>{tag}</small>Персонална карикатура по снимка</figcaption></figure>)}</div><div className="section-action"><Link className="button" href="/porachai">Поръчай своята карикатура →</Link></div></section></>}
