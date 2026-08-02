'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {readCart} from '@/lib/cart';

export default function CartLink(){
  const[count,setCount]=useState(0);
  useEffect(()=>{
    const update=()=>setCount(readCart().length);
    update();
    window.addEventListener('storage',update);
    window.addEventListener('cartoon-cart-change',update);
    return()=>{window.removeEventListener('storage',update);window.removeEventListener('cartoon-cart-change',update)};
  },[]);
  return <Link href="/kolichka" aria-label={`Количка с ${count} проекта`}>Количка <span>{count}</span></Link>;
}
