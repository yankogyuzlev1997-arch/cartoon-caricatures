import type {Size} from '@/lib/pricing';

export type CartProject={
  id:string;
  occasion:string;
  size:Size;
  people:number;
  description:string;
  inscription:string;
  fileNames:string[];
  createdAt:string;
};

const CART_KEY='cartoon-caricatures-cart-v1';

export function readCart():CartProject[]{
  if(typeof window==='undefined')return[];
  try{
    const value=JSON.parse(window.localStorage.getItem(CART_KEY)??'[]');
    return Array.isArray(value)?value:[];
  }catch{return[]}
}

export function writeCart(items:CartProject[]){
  window.localStorage.setItem(CART_KEY,JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cartoon-cart-change',{detail:items.length}));
}

export function addCartProject(project:Omit<CartProject,'id'|'createdAt'>){
  const item:CartProject={...project,id:crypto.randomUUID(),createdAt:new Date().toISOString()};
  writeCart([...readCart(),item]);
  return item;
}
