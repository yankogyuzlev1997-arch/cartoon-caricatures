'use client';
import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import type {CartProject} from '@/lib/cart';
import {readCart,writeCart} from '@/lib/cart';
import {calculateOrder,euro,projectPriceCents} from '@/lib/pricing';

export default function Page(){
  const[items,setItems]=useState<CartProject[]>([]);
  const[loaded,setLoaded]=useState(false);
  useEffect(()=>{const timer=window.setTimeout(()=>{setItems(readCart());setLoaded(true)},0);return()=>window.clearTimeout(timer)},[]);
  const totals=useMemo(()=>calculateOrder(items.map(item=>({size:item.size,people:item.people}))),[items]);
  const sizeCounts=useMemo(()=>items.reduce<Record<string,number>>((counts,item)=>({...counts,[item.size]:(counts[item.size]||0)+1}),{}),[items]);
  const update=(next:CartProject[])=>{setItems(next);writeCart(next)};
  const remove=(id:string)=>update(items.filter(item=>item.id!==id));
  const duplicate=(item:CartProject)=>update([...items,{...item,id:crypto.randomUUID(),createdAt:new Date().toISOString()}]);
  const activeSize=Object.entries(sizeCounts).sort((a,b)=>b[1]-a[1])[0];
  const remainder=activeSize?activeSize[1]%3:0;
  const progress=totals.discountCents>0?'Офертата 3 на цената на 2 е активна за карикатури от един и същ размер.':!activeSize?'Добавете първата си карикатура.':`Добавете още ${3-remainder} ${activeSize[0]} ${3-remainder===1?'карикатура':'карикатури'}, за да получите третата безплатно.`;

  return <><section className="page-hero"><p className="kicker">Вашите отделни проекти</p><h1>Количка</h1><p>{items.length} {items.length===1?'карикатура':'карикатури'}</p></section><section className="section cart-section"><div className="container">{loaded&&items.length===0?<div className="panel empty-cart"><h2>Количката ви е празна</h2><p>Конфигурирайте първата си персонална карикатура. След това можете да добавите, дублирате или премахнете отделни проекти.</p><Link className="button" href="/porachai">Добави карикатура →</Link></div>:<div className="cart-layout"><div className="cart-projects">{items.map((item,index)=><article className="cart-project" key={item.id}><div className="cart-project-number">{String(index+1).padStart(2,'0')}</div><div className="cart-project-main"><p className="kicker">Персонален проект</p><h2>{item.occasion}</h2><div className="cart-meta"><span><b>Размер</b>{item.size}</span><span><b>Лица</b>{item.people}</span><span><b>Снимки</b>{item.fileNames.length}</span></div>{item.description&&<p className="cart-description">{item.description}</p>}{item.inscription&&<p className="cart-description"><b>Надпис:</b> {item.inscription}</p>}<div className="cart-project-actions"><button type="button" onClick={()=>duplicate(item)}>Дублирай</button><button type="button" onClick={()=>remove(item.id)}>Премахни</button></div></div><strong className="cart-project-price">{euro(projectPriceCents(item.size,item.people))}</strong></article>)}<Link className="button ghost add-another" href="/porachai">+ Добави друга карикатура</Link></div><aside className="cart-total"><p className="kicker">Оферта 3 на цената на 2</p><h2>Вашата поръчка</h2><div className="summary-row"><span>Междинна сума</span><b>{euro(totals.subtotalCents)}</b></div><div className="summary-row"><span>Безплатна карикатура</span><b>−{euro(totals.discountCents)}</b></div>{totals.savedCents>0&&<div className="cart-saving">Спестявате {euro(totals.savedCents)}</div>}<div className="cart-grand-total"><span>Общо</span><strong>{euro(totals.totalCents)}</strong></div><Link className="button" href="/checkout">Към завършване →</Link><small>Промоцията важи за всяка група от 3 карикатури с един и същ размер.</small></aside></div>}<div className="notice cart-progress">{progress}</div></div></section></>;
}
