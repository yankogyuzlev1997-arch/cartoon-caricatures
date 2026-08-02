export type Product = { id:string; slug:string; name:string; priceCents:number; eyebrow:string; description:string; laptop?:boolean };
export const products: Product[] = [
 {id:'pouch-s',slug:'neseser-s',name:'Несесер S',priceCents:2800,eyebrow:'За най-малките важни неща',description:'Компактен ръчно изработен несесер. Размерите ще бъдат добавени скоро.'},
 {id:'pouch-m',slug:'neseser-m',name:'Несесер M',priceCents:3400,eyebrow:'Ежедневният любимец',description:'Универсален формат за ежедневната ви селекция. Размерите ще бъдат добавени скоро.'},
 {id:'pouch-l',slug:'neseser-l',name:'Несесер L',priceCents:4200,eyebrow:'Повече място, същата лекота',description:'Просторен текстилен несесер. Размерите ще бъдат добавени скоро.'},
 {id:'laptop',slug:'kalaf-za-laptop',name:'Калъф за лаптоп',priceCents:3800,eyebrow:'Ушит специално за вашия модел',description:'Калъф по индивидуални мерки за сигурно и красиво носене.',laptop:true}
];
export const patterns = ['Ботаника 01','Геометрия 02','Цветна градина 03','Графичен ритъм 04','Нощен цвят 05'];
export const bundles = [
 ['VAYA Everyday Duo',['pouch-s','pouch-m']],['VAYA Essential Duo',['pouch-m','pouch-l']],['VAYA Work Duo',['pouch-m','laptop']],['VAYA Travel Trio',['pouch-s','pouch-m','pouch-l']],['VAYA Office Trio',['pouch-s','pouch-m','laptop']],['VAYA Complete Collection',['pouch-s','pouch-m','pouch-l','laptop']]
] as const;
export const money=(c:number)=>new Intl.NumberFormat('bg-BG',{style:'currency',currency:'EUR'}).format(c/100);
