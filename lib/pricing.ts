export const BASE_PRICE_CENTS={A4:6572,A3:11572,A2:20572} as const;
export type Size=keyof typeof BASE_PRICE_CENTS;
export function projectPriceCents(size:Size,people:number){if(!Number.isInteger(people)||people<1||people>6)throw new Error('Броят лица трябва да е между 1 и 6.');return BASE_PRICE_CENTS[size]+(people-1)*1000}
export function discountPercent(count:number){return Math.floor(count/3)*100/Math.max(count,1)}
export function calculateOrder(projects:{size:Size;people:number}[]){
  const prices=projects.map(p=>({...p,price:projectPriceCents(p.size,p.people)}));
  const subtotalCents=prices.reduce((sum,p)=>sum+p.price,0);
  const discountCents=(Object.keys(BASE_PRICE_CENTS) as Size[]).reduce((total,size)=>{
    const sameSize=prices.filter(p=>p.size===size).map(p=>p.price).sort((a,b)=>a-b);
    return total+sameSize.slice(0,Math.floor(sameSize.length/3)).reduce((sum,price)=>sum+price,0);
  },0);
  const percent=subtotalCents?Math.round(discountCents/subtotalCents*100):0;
  return{subtotalCents,discountPercent:percent,discountCents,totalCents:subtotalCents-discountCents,savedCents:discountCents}
}
export const euro=(cents:number)=>new Intl.NumberFormat('bg-BG',{style:'currency',currency:'EUR'}).format(cents/100);
// Compatibility helper for any legacy catalog preview routes kept outside the main experience.
export function calculateBundle(items:{unitPriceCents:number;quantity:number}[]){const subtotalCents=items.reduce((s,i)=>s+i.unitPriceCents*i.quantity,0);const quantity=items.reduce((s,i)=>s+i.quantity,0);const percent=discountPercent(quantity);const discountCents=Math.round(subtotalCents*percent/100);return{subtotalCents,regularCents:subtotalCents,quantity,percent,discountPercent:percent,discountCents,totalCents:subtotalCents-discountCents,savingsCents:discountCents}}
