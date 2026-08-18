const SITE_CONFIG = {
  phone: '+48579344577',
  whatsapp: 'https://wa.me/48579344577?text=' + encodeURIComponent('Dzień dobry, chciałbym zarezerwować stolik w Hà Nội Quán.'),
  social: { facebook: '', instagram: '', messenger: '' }
};

const menuImages = [
  { src: '1000018876.JPEG', alt: 'Menu dań azjatyckich Hà Nội Quán' },
  { src: '1000018866.JPG', alt: 'Menu sushi Hà Nội Quán' }
];
const galleryImages = [
  ['image_1786957935929.jpg','Danie z mięsem, warzywami i ryżem'],
  ['image_1786957935932.jpg','Danie z kurczakiem, brokułami i ryżem'],
  ['image_1786957935937.jpg','Mięso podane na gorącym półmisku'],
  ['image_1786957935938.jpg','Grillowane mięso z makaronem'],
  ['image_1786957935942.jpg','Makaron udon z wołowiną'],
  ['image_1786957935946.jpg','Miska z wołowiną, ryżem i sałatką'],
  ['image_1786957935948.jpg','Grillowany kurczak z ryżem i sałatką']
].map(([src, alt]) => ({ src, alt }));

document.documentElement.classList.add('js-ready');

document.querySelectorAll('#whatsappReservation,#whatsappOrder,#whatsappFooter,#floatingWhatsapp,#mobileWhatsapp').forEach(link => {
  link.href = SITE_CONFIG.whatsapp;
  link.target = '_blank';
  link.rel = 'noopener';
});
document.querySelectorAll('.social-link').forEach(link => {
  const url = SITE_CONFIG.social[link.dataset.network];
  if (url) { link.hidden = false; link.href = url; link.target = '_blank'; link.rel = 'noopener'; }
  else { link.hidden = true; }
});

const header = document.querySelector('#siteHeader');
const headerObserver = new IntersectionObserver(([entry]) => header.classList.toggle('scrolled', entry.intersectionRatio < .95), { threshold: [.95] });
headerObserver.observe(document.querySelector('#start'));

const toggle = document.querySelector('#menuToggle');
const nav = document.querySelector('#mainNav');
function closeMenu() { toggle.classList.remove('active'); nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); }
toggle.addEventListener('click', () => { const open = !nav.classList.contains('open'); toggle.classList.toggle('active',open); nav.classList.toggle('open',open); toggle.setAttribute('aria-expanded',String(open)); document.body.classList.toggle('menu-open',open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

function updateOpeningStatus() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Warsaw',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(now);
  const value = type => parts.find(p => p.type === type)?.value;
  const day = value('weekday');
  const minutes = Number(value('hour')) * 60 + Number(value('minute'));
  const late = ['Thu','Fri','Sat'].includes(day);
  const close = late ? 22 * 60 : 21 * 60;
  const open = minutes >= 9 * 60 && minutes < close;
  const status = open ? 'Otwarte teraz' : 'Zamknięte';
  const hours = late ? '09:00 - 22:00' : '09:00 - 21:00';
  document.querySelector('#hoursStatus').textContent = status;
  document.querySelector('#hoursStatus').classList.add(open ? 'open' : 'closed');
  document.querySelector('#heroStatus').textContent = status;
  document.querySelector('#todayHours').textContent = `Dziś: ${hours}`;
}
updateOpeningStatus();

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,index) => { if(reduceMotion) el.classList.add('visible'); else { el.style.transitionDelay = `${Math.min(index % 4,3) * 70}ms`; revealObserver.observe(el); } });

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const counter = document.querySelector('#lightboxCounter');
let activeSet = galleryImages, activeIndex = 0, lastTrigger = null;
function renderLightbox(){ const item=activeSet[activeIndex]; lightboxImage.src=item.src; lightboxImage.alt=item.alt; counter.textContent=`${activeIndex+1} / ${activeSet.length}`; }
function openLightbox(type,index,trigger){ activeSet=type==='menu'?menuImages:galleryImages; activeIndex=index; lastTrigger=trigger; renderLightbox(); lightbox.hidden=false; document.body.classList.add('lightbox-open'); document.querySelector('.lightbox-close').focus(); }
function closeLightbox(){ lightbox.hidden=true; document.body.classList.remove('lightbox-open'); lightboxImage.src=''; lastTrigger?.focus(); }
function step(direction){ activeIndex=(activeIndex+direction+activeSet.length)%activeSet.length; renderLightbox(); }
document.querySelectorAll('[data-lightbox]').forEach(btn => btn.addEventListener('click',()=>openLightbox(btn.dataset.lightbox,Number(btn.dataset.index),btn)));
document.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click',()=>step(-1));
document.querySelector('.lightbox-next').addEventListener('click',()=>step(1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(lightbox.hidden)return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1);});

const ORDER_MENU = [
  {id:'zupa-mala',name:'Zupa mała',category:'Zupy',price:10,image:'assets/dishes/bun.jpg',description:'Mała rozgrzewająca zupa.',variants:[['Z krabem',10],['Z kurczakiem',10],['Miso',12]]},
  {id:'frytki',name:'Frytki',category:'Przystawki',price:9,image:'image_1786957935929.jpg',description:'Klasyczne złote frytki.'},
  {id:'dimsum',name:'Dimsum',category:'Przystawki',price:20,image:'image_1786957935932.jpg',description:'Delikatne pierożki dimsum — 5 szt.'},
  {id:'sajgonki',name:'Sajgonki',category:'Przystawki',price:22,image:'assets/dishes/sajgonki.jpg',description:'Chrupiące sajgonki — 3 szt.',variants:[['Farsz mięsny',22],['Wegetariańskie',22]]},
  {id:'springrolls',name:'Spring rolls',category:'Przystawki',price:20,image:'assets/dishes/spring-rolls.jpg',description:'Świeże rolki z sałatą — 2 szt.',variants:[['Krewetki',22],['Wegetariańskie',20]]},
  {id:'krewetki-panierowane',name:'Krewetki w chrupiącej panierce',category:'Przystawki',price:29,image:'image_1786957935933.jpg',description:'Panierowane krewetki podawane ze świeżą sałatą.'},
  {id:'ser-smazony',name:'Smażony ser z frytkami',category:'Przystawki',price:29,image:'image_1786957935935.jpg',description:'Chrupiący ser podawany z frytkami i surówką.'},
  {id:'kurczak-panierowany',name:'Chrupiąca pierś z kurczaka',category:'Dania główne',price:29,image:'image_1786957935937.jpg',description:'Panierowana pierś z kurczaka z dodatkami.'},
  {id:'kungbao',name:'Kung Bao',category:'Dania główne',price:30,image:'assets/dishes/kung-bao.jpg',description:'Wyraziste danie z warzywami i orzeszkami.',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'wieprzowina-karmel',name:'Wieprzowina duszona w karmelu',category:'Dania główne',price:39,image:'image_1786957935938.jpg',description:'Delikatna wieprzowina w aromatycznym sosie karmelowym.'},
  {id:'sos-tajski',name:'Danie w sosie tajskim',category:'Dania główne',price:30,image:'image_1786957935939.jpg',description:'Warzywa w aromatycznym sosie tajskim.',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'curry',name:'Curry',category:'Dania główne',price:30,image:'image_1786957935941.jpg',description:'Kremowe curry z warzywami i wybranym dodatkiem.',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'slodko-kwasny',name:'Sos słodko-kwaśny',category:'Dania główne',price:30,image:'image_1786957935932.jpg',description:'Klasyczny sos słodko-kwaśny z warzywami.',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'losos',name:'Łosoś',category:'Dania główne',price:49,image:'image_1786957935942.jpg',description:'Filet z łososia przygotowany w wybranym stylu.',variants:[['Sos teriyaki',49],['Masło i sos pomarańczowy',49],['Sos pieprzowy',49]]},
  {id:'bone',name:'Bò Né',category:'Dania główne',price:45,image:'image_1786957935937.jpg',description:'Wołowina podawana na gorącym półmisku.'},
  {id:'udko-salatka',name:'Udko z kurczaka z sałatką',category:'Dania główne',price:39,image:'image_1786957935945.jpg',description:'Smażone udko z kurczaka ze świeżą sałatką mieszaną.'},
  {id:'udko-smazone',name:'Udko z kurczaka smażone',category:'Dania główne',price:38,image:'image_1786957935937.jpg',description:'Chrupiące udko z wybranym sosem.',variants:[['Sos pieprzowy',38],['Sos tajski ostry',38],['Sos curry',38],['Sos słodko-kwaśny',38]]},
  {id:'kaczka',name:'Smażona kaczka',category:'Dania główne',price:45,image:'assets/dishes/smazona-kaczka.jpg',description:'Chrupiąca kaczka podawana z wybranym sosem.',variants:[['Sos pieprzowy',45],['Sos tajski',45],['Sos curry',45],['Sos słodko-kwaśny',45]]},
  {id:'kaczka-salatka',name:'Smażona kaczka z sałatką',category:'Dania główne',price:45,image:'assets/dishes/smazona-kaczka.jpg',description:'Chrupiąca kaczka ze świeżą sałatką mieszaną.'},
  {id:'ryz',name:'Smażony ryż',category:'Ryż i makarony',price:30,image:'assets/dishes/smazony-ryz.jpg',description:'Ryż smażony z jajkiem i warzywami.',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'makaron',name:'Smażony makaron',category:'Ryż i makarony',price:30,image:'assets/dishes/smazony-makaron.jpg',description:'Klasyczny makaron smażony z warzywami.',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'makaron-ryzowy',name:'Smażony makaron ryżowy',category:'Ryż i makarony',price:30,image:'image_1786957935948.jpg',description:'Makaron ryżowy smażony z warzywami.',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'padthai',name:'Pad Thai',category:'Ryż i makarony',price:30,image:'assets/dishes/pad-thai.jpg',description:'Makaron ryżowy z warzywami i orzeszkami.',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'udon',name:'Udon',category:'Ryż i makarony',price:35,image:'assets/dishes/udon.jpg',description:'Gruby makaron udon smażony z warzywami.',variants:[['Kurczak',39],['Wołowina',45],['Krewetki',45],['Tofu',35]]},
  {id:'pho',name:'Zupa Phở',category:'Zupy',price:35,image:'assets/dishes/pho.jpg',description:'Aromatyczny bulion i makaron ryżowy.',variants:[['Kurczak',39],['Wołowina',42],['Krewetki',42],['Tofu',35]]},
  {id:'bun',name:'Zupa Bún',category:'Zupy',price:35,image:'assets/dishes/bun.jpg',description:'Lekka zupa z makaronem ryżowym.',variants:[['Kurczak',39],['Wołowina',42],['Krewetki',42],['Tofu',35]]},
  {id:'pho-kurczak-sos',name:'Phở z kurczakiem na sucho',category:'Zupy',price:42,image:'assets/dishes/pho.jpg',description:'Makaron phở z kurczakiem i aromatycznym sosem.'},
  {id:'bunbo',name:'Bún bò Nam Bộ',category:'Dania główne',price:42,image:'assets/dishes/bun-bo-nam-bo.jpg',description:'Wołowina, makaron ryżowy, zioła, warzywa i orzeszki.'},
  {id:'bunnemran',name:'Bún nem rán',category:'Dania główne',price:39,image:'assets/dishes/sajgonki.jpg',description:'Makaron bún z sajgonkami i świeżymi dodatkami.',variants:[['Farsz mięsny',39],['Wegetariańskie',39]]},
  {id:'buncha',name:'Bún chả',category:'Dania główne',price:39,image:'assets/dishes/bun-cha.jpg',description:'Grillowana wieprzowina, makaron ryżowy, zioła i sos.'},
  {id:'krab-tamaryndowy',name:'Krab w sosie tamaryndowym',category:'Dania główne',price:45,image:'image_1786957935946.jpg',description:'Krab w intensywnym, słodko-kwaśnym sosie tamaryndowym.'},
  {id:'s1',name:'Nigiri łosoś',category:'Sushi',price:20,image:'assets/sushi/nigiri-salmon.jpg',description:'Nigiri z łososiem — 2 szt.'},
  {id:'s2',name:'Nigiri tuńczyk',category:'Sushi',price:22,image:'assets/sushi/tuna.jpg',description:'Nigiri z tuńczykiem — 2 szt.'},
  {id:'s3',name:'Nigiri krewetka',category:'Sushi',price:24,image:'assets/sushi/shrimp.jpg',description:'Nigiri z krewetką — 2 szt.'},
  {id:'s4',name:'Nigiri węgorz',category:'Sushi',price:25,image:'assets/sushi/eel.jpg',description:'Nigiri z węgorzem — 2 szt.'},
  {id:'s5',name:'Nigiri paluszki krabowe',category:'Sushi',price:17,image:'assets/sushi/uramaki.jpg',description:'Nigiri z paluszkami krabowymi — 2 szt.'},
  {id:'s6',name:'Nigiri tofu',category:'Sushi',price:17,image:'assets/sushi/uramaki.jpg',description:'Nigiri z tofu — 2 szt.'},
  {id:'s7',name:'Hosomaki łosoś',category:'Sushi',price:22,image:'assets/sushi/hosomaki-salmon.jpg',description:'Klasyczne hosomaki z łososiem — 8 szt.'},
  {id:'s8',name:'Hosomaki tuńczyk',category:'Sushi',price:25,image:'assets/sushi/tuna.jpg',description:'Klasyczne hosomaki z tuńczykiem — 8 szt.'},
  {id:'s9',name:'Hosomaki paluszki krabowe',category:'Sushi',price:18,image:'assets/sushi/uramaki.jpg',description:'Hosomaki z paluszkami krabowymi — 8 szt.'},
  {id:'s10',name:'Hosomaki tofu',category:'Sushi',price:18,image:'assets/sushi/hosomaki-salmon.jpg',description:'Wegetariańskie hosomaki z tofu — 8 szt.'},
  {id:'s11',name:'Hosomaki awokado',category:'Sushi',price:18,image:'assets/sushi/uramaki.jpg',description:'Wegetariańskie hosomaki z awokado — 8 szt.'},
  {id:'s12',name:'Hosomaki ogórek',category:'Sushi',price:18,image:'assets/sushi/maki-set-24.jpg',description:'Wegetariańskie hosomaki z ogórkiem — 8 szt.'},
  {id:'s13',name:'Futomaki świeży łosoś',category:'Sushi',price:32,image:'assets/sushi/futomaki-salmon.jpg',description:'Futomaki ze świeżym łososiem — 8 szt.'},
  {id:'s14',name:'Futomaki tuńczyk',category:'Sushi',price:35,image:'assets/sushi/tuna.jpg',description:'Futomaki z tuńczykiem — 8 szt.'},
  {id:'s15',name:'Futomaki smażone krewetki',category:'Sushi',price:35,image:'assets/sushi/shrimp.jpg',description:'Futomaki ze smażonymi krewetkami — 8 szt.'},
  {id:'s16',name:'Futomaki krab miękki',category:'Sushi',price:39,image:'assets/sushi/shrimp.jpg',description:'Futomaki z miękkim krabem — 8 szt.'},
  {id:'s17',name:'Futomaki pierś z kurczaka',category:'Sushi',price:32,image:'assets/sushi/futomaki-salmon.jpg',description:'Futomaki z piersią kurczaka — 8 szt.'},
  {id:'s18',name:'Futomaki smażony łosoś',category:'Sushi',price:30,image:'assets/sushi/futomaki-salmon.jpg',description:'Futomaki ze smażonym łososiem — 8 szt.'},
  {id:'s19',name:'Futomaki paluszki krabowe MIX',category:'Sushi',price:30,image:'assets/sushi/uramaki.jpg',description:'Futomaki z paluszkami krabowymi — 8 szt.'},
  {id:'s20',name:'Futomaki tofu',category:'Sushi',price:25,image:'assets/sushi/uramaki.jpg',description:'Wegetariańskie futomaki z tofu — 8 szt.'},
  {id:'s21',name:'Uramaki łosoś',category:'Sushi',price:29,image:'assets/sushi/uramaki.jpg',description:'Uramaki z łososiem — 8 szt.'},
  {id:'s22',name:'Uramaki tuńczyk',category:'Sushi',price:35,image:'assets/sushi/tuna.jpg',description:'Uramaki z tuńczykiem — 8 szt.'},
  {id:'s23',name:'Uramaki smażone krewetki',category:'Sushi',price:35,image:'assets/sushi/shrimp.jpg',description:'Uramaki ze smażonymi krewetkami — 8 szt.'},
  {id:'s24',name:'Uramaki paluszki krabowe MIX',category:'Sushi',price:25,image:'assets/sushi/uramaki.jpg',description:'Uramaki z paluszkami krabowymi — 8 szt.'},
  {id:'s25',name:'Uramaki tofu',category:'Sushi',price:25,image:'assets/sushi/uramaki.jpg',description:'Wegetariańskie uramaki z tofu — 8 szt.'},
  {id:'s26',name:'Philadelphia łosoś i awokado',category:'Sushi',price:39,image:'assets/sushi/uramaki.jpg',description:'Philadelphia Roll z łososiem i awokado — 6 szt.'},
  {id:'s27',name:'Philadelphia węgorz i awokado',category:'Sushi',price:39,image:'assets/sushi/eel.jpg',description:'Philadelphia Roll z węgorzem i awokado — 6 szt.'},
  {id:'s28',name:'Philadelphia tuńczyk i awokado',category:'Sushi',price:45,image:'assets/sushi/tuna.jpg',description:'Philadelphia Roll z tuńczykiem i awokado — 6 szt.'},
  {id:'s29',name:'Philadelphia łosoś i tobiko',category:'Sushi',price:39,image:'assets/sushi/uramaki.jpg',description:'Philadelphia Roll z łososiem i tobiko — 6 szt.'},
  {id:'s30',name:'Łosoś, tobiko i ogórek',category:'Sushi',price:39,image:'assets/sushi/uramaki.jpg',description:'Rolka z łososiem, tobiko i ogórkiem.'},
  {id:'s31',name:'Sashimi łosoś',category:'Sushi',price:59,image:'assets/sushi/nigiri-salmon.jpg',description:'Sashimi ze świeżego łososia — 6 szt.'},
  {id:'s32',name:'Sałatka z surowego łososia',category:'Sushi',price:45,image:'assets/sushi/nigiri-salmon.jpg',description:'Sałatka z surowym łososiem i awokado.'},
  {id:'s33',name:'Sałatka ze smażonym łososiem',category:'Sushi',price:45,image:'assets/sushi/futomaki-salmon.jpg',description:'Sałatka ze smażonym łososiem i awokado.'},
  {id:'s34',name:'Sushi Set Maki',category:'Zestawy sushi',price:49,image:'assets/sushi/maki-set-24.jpg',description:'Hosomaki łosoś, tuńczyk i awokado — 24 szt.'},
  {id:'s35',name:'Zestaw Maki',category:'Zestawy sushi',price:45,image:'assets/sushi/maki-set-24.jpg',description:'Hosomaki ogórek, awokado i paluszki krabowe — 24 szt.'},
  {id:'s36',name:'Sake Set',category:'Zestawy sushi',price:120,image:'assets/sushi/maki-set-24.jpg',description:'Uramaki, futomaki, hosomaki i nigiri z łososiem — 34 szt.'},
  {id:'s37',name:'Salamon Set',category:'Zestawy sushi',price:149,image:'assets/sushi/uramaki.jpg',description:'Bogaty zestaw futomaki, uramaki, hosomaki i nigiri — 34 szt.'},
  {id:'s38',name:'Set 20 szt.',category:'Zestawy sushi',price:79,image:'assets/sushi/maki-set-24.jpg',description:'Uramaki z łososiem i tuńczykiem oraz nigiri — 20 szt.'},
  {id:'s39',name:'Family Set',category:'Zestawy sushi',price:169,image:'assets/sushi/maki-set-24.jpg',description:'Futomaki, uramaki i hosomaki dla rodziny — 48 szt.'},
  {id:'s40',name:'Kyoto Set',category:'Zestawy sushi',price:259,image:'assets/sushi/maki-set-24.jpg',description:'Największy zestaw futomaki, uramaki, hosomaki i nigiri — 70 szt.'}
];
ORDER_MENU.slice(0,31).forEach((item,index) => {
  item.image = `assets/asian/${String(index+1).padStart(2,'0')}.jpg`;
});
const money = value => new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN'}).format(value);
let cart = JSON.parse(localStorage.getItem('hnq-cart') || '{}');
const resolveCartItem = key => {
  const [id,variantIndex] = key.split('::');
  const base = ORDER_MENU.find(item => item.id === id);
  if (!base) return null;
  const variant = base.variants?.[Number(variantIndex || 0)];
  return variant ? {...base,name:`${base.name} — ${variant[0]}`,price:variant[1]} : base;
};
cart = Object.fromEntries(Object.entries(cart).filter(([key,qty]) => resolveCartItem(key) && Number(qty) > 0));
let activeCategory = 'Wszystkie';
const orderGrid = document.querySelector('#orderGrid');
const categoryTabs = document.querySelector('#categoryTabs');
const cartDrawer = document.querySelector('#cartDrawer');
const cartBackdrop = document.querySelector('#cartBackdrop');
const cartItems = document.querySelector('#cartItems');
const checkoutForm = document.querySelector('#checkoutForm');

function renderCategories(){
  categoryTabs.replaceChildren();
  ['Wszystkie',...new Set(ORDER_MENU.map(item=>item.category))].forEach(category=>{
    const button=document.createElement('button');
    button.type='button'; button.className='category-tab'+(category===activeCategory?' active':'');
    button.textContent=category; button.setAttribute('role','tab'); button.setAttribute('aria-selected',String(category===activeCategory));
    button.addEventListener('click',()=>{activeCategory=category;renderCategories();renderMenu();});
    categoryTabs.append(button);
  });
}
function renderMenu(){
  orderGrid.innerHTML='';
  ORDER_MENU.filter(item=>activeCategory==='Wszystkie'||item.category===activeCategory).forEach((item,index)=>{
    const article=document.createElement('article'); article.className='order-card menu-enter'+(index===0?' order-card-featured':''); article.style.setProperty('--enter-delay',`${Math.min(index,7)*55}ms`);
    const variants=item.variants?`<label class="variant-picker"><span>Wybierz wariant</span><select aria-label="Wariant ${item.name}">${item.variants.map(([name,price],variantIndex)=>`<option value="${variantIndex}" data-price="${price}">${name} · ${money(price)}</option>`).join('')}</select></label>`:'';
    article.innerHTML=`<div class="dish-visual"><img src="${item.image}" alt="${item.name}" loading="lazy"><span class="dish-index">${String(index+1).padStart(2,'0')}</span></div><div class="order-card-content">${index===0?`<span class="featured-category">${item.category} · Hà Nội Quán</span>`:''}<h3>${item.name}</h3><p>${item.description}</p>${variants}<div class="order-card-foot"><strong class="dish-price">${money(item.variants?.[0]?.[1]??item.price)}</strong><button class="add-to-cart" type="button" data-add="${item.id}" aria-label="Dodaj ${item.name} do koszyka"><span>+</span> Dodaj</button></div></div>`;
    orderGrid.append(article);
  });
}
function cartQuantity(){return Object.values(cart).reduce((sum,qty)=>sum+qty,0)}
function updateCart(){
  localStorage.setItem('hnq-cart',JSON.stringify(cart));
  const entries=Object.entries(cart).filter(([,qty])=>qty>0);
  const quantity=cartQuantity();
  document.querySelector('#cartCount').textContent=quantity;
  document.querySelector('#floatingCartCount').textContent=quantity;
  cartItems.innerHTML='';
  entries.forEach(([id,qty])=>{
    const item=resolveCartItem(id); if(!item)return;
    const row=document.createElement('div'); row.className='cart-item';
    row.innerHTML=`<img src="${item.image}" alt=""><div><h3>${item.name}</h3><span class="cart-item-price">${money(item.price*qty)}</span><div class="qty-control"><button type="button" data-qty="${id}" data-change="-1" aria-label="Zmniejsz ilość">−</button><strong>${qty}</strong><button type="button" data-qty="${id}" data-change="1" aria-label="Zwiększ ilość">+</button></div></div><button class="remove-item" type="button" data-remove="${id}" aria-label="Usuń ${item.name}">×</button>`;
    cartItems.append(row);
  });
  const empty=entries.length===0;
  document.querySelector('#cartEmpty').hidden=!empty;
  checkoutForm.hidden=empty; document.querySelector('#cartFooter').hidden=empty;
  document.querySelector('#cartTotal').textContent=money(entries.reduce((sum,[id,qty])=>sum+resolveCartItem(id).price*qty,0));
  const desktopItems=document.querySelector('#desktopCartItems');
  const desktopEmpty=document.querySelector('#desktopCartEmpty');
  const desktopBottom=document.querySelector('#desktopCartBottom');
  const total=entries.reduce((sum,[id,qty])=>sum+resolveCartItem(id).price*qty,0);
  document.querySelector('#desktopCartCount').textContent=quantity;
  desktopItems.innerHTML='';
  entries.forEach(([id,qty])=>{const item=resolveCartItem(id);const line=document.createElement('div');line.className='desktop-line';line.innerHTML=`<img src="${item.image}" alt=""><div><strong>${item.name}</strong><br><span>${qty} × ${money(item.price)}</span></div><strong>${money(item.price*qty)}</strong>`;desktopItems.append(line)});
  desktopEmpty.hidden=!empty;desktopBottom.hidden=empty;
  document.querySelector('#desktopCartTotal').textContent=money(total);
}
function openCart(){cartBackdrop.hidden=false;cartDrawer.inert=false;cartDrawer.classList.add('open');cartDrawer.setAttribute('aria-hidden','false');document.body.classList.add('menu-open');setTimeout(()=>document.querySelector('#cartClose').focus(),50)}
function closeCart(){cartDrawer.classList.remove('open');cartDrawer.setAttribute('aria-hidden','true');cartDrawer.inert=true;cartBackdrop.hidden=true;document.body.classList.remove('menu-open')}
function showCartToast(){const toast=document.querySelector('#cartToast');toast.hidden=false;toast.classList.remove('toast-pop');void toast.offsetWidth;toast.classList.add('toast-pop');clearTimeout(showCartToast.timer);showCartToast.timer=setTimeout(()=>toast.hidden=true,1700)}
function pulseCart(){['cartTrigger','floatingCart'].forEach(id=>{const el=document.querySelector('#'+id);el.classList.remove('cart-pulse');void el.offsetWidth;el.classList.add('cart-pulse')})}
orderGrid.addEventListener('change',event=>{if(!event.target.matches('.variant-picker select'))return;const card=event.target.closest('.order-card');card.querySelector('.dish-price').textContent=money(Number(event.target.selectedOptions[0].dataset.price))});
orderGrid.addEventListener('click',event=>{const button=event.target.closest('[data-add]');if(!button)return;const select=button.closest('.order-card').querySelector('.variant-picker select');const key=select?`${button.dataset.add}::${select.value}`:button.dataset.add;cart[key]=(cart[key]||0)+1;button.classList.add('added');setTimeout(()=>button.classList.remove('added'),500);updateCart();pulseCart();showCartToast()});
cartItems.addEventListener('click',event=>{const qty=event.target.closest('[data-qty]');const remove=event.target.closest('[data-remove]');if(qty){cart[qty.dataset.qty]=(cart[qty.dataset.qty]||0)+Number(qty.dataset.change);if(cart[qty.dataset.qty]<=0)delete cart[qty.dataset.qty]}if(remove)delete cart[remove.dataset.remove];updateCart()});
['cartTrigger','floatingCart'].forEach(id=>document.querySelector('#'+id).addEventListener('click',openCart));
document.querySelector('#desktopCheckout').addEventListener('click',openCart);
document.querySelector('#cartClose').addEventListener('click',closeCart);cartBackdrop.addEventListener('click',closeCart);
document.querySelector('#browseMenu').addEventListener('click',()=>{closeCart();document.querySelector('#zamow').scrollIntoView({behavior:'smooth'})});
checkoutForm.querySelectorAll('[name="fulfilment"]').forEach(input=>input.addEventListener('change',()=>{const delivery=input.value==='Dostawa'&&input.checked;const field=checkoutForm.querySelector('.address-field');field.hidden=!delivery;field.querySelector('input').required=delivery}));
document.querySelector('#sendOrder').addEventListener('click',()=>{
  const error=document.querySelector('#checkoutError'); error.hidden=true;
  if(!checkoutForm.reportValidity()){error.textContent='Uzupełnij wymagane dane kontaktowe.';error.hidden=false;return}
  const data=new FormData(checkoutForm); const entries=Object.entries(cart).filter(([,qty])=>qty>0);
  const total=entries.reduce((sum,[id,qty])=>sum+resolveCartItem(id).price*qty,0);
  const lines=entries.map(([id,qty],index)=>{const item=resolveCartItem(id);return `${index+1}. ${item.name} × ${qty} — ${money(item.price*qty)}`});
  const message=['Dzień dobry, chcę złożyć zamówienie w Hà Nội Quán.','','ZAMÓWIENIE:',...lines,'',`RAZEM: ${money(total)}`,'',`Sposób odbioru: ${data.get('fulfilment')}`,`Imię: ${data.get('customerName')}`,`Telefon: ${data.get('customerPhone')}`];
  if(data.get('address'))message.push(`Adres: ${data.get('address')}`); if(data.get('notes'))message.push(`Uwagi: ${data.get('notes')}`);
  message.push('','Proszę o potwierdzenie ceny i czasu realizacji.');
  window.open('https://wa.me/48579344577?text='+encodeURIComponent(message.join('\n')),'_blank','noopener');
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&cartDrawer.classList.contains('open'))closeCart()});
categoryTabs.innerHTML='';renderCategories();renderMenu();updateCart();

const progressBar=document.querySelector('#scrollProgress');
const heroImage=document.querySelector('.hero img');
let motionFrame=0;
function updateMotion(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progressBar.style.transform=`scaleX(${max>0?scrollY/max:0})`;
  if(!reduceMotion&&scrollY<innerHeight)heroImage.style.transform=`translate3d(0,${Math.min(scrollY*.09,32)}px,0) scale(1.01)`;
  motionFrame=0;
}
addEventListener('scroll',()=>{if(!motionFrame)motionFrame=requestAnimationFrame(updateMotion)},{passive:true});
updateMotion();
