const SITE_CONFIG = {
  phone: '+48579344577',
  whatsapp: 'https://wa.me/48579344577?text=' + encodeURIComponent('Dzień dobry, chciałbym zarezerwować stolik w Hà Nội Quán.'),
  social: { facebook: '', instagram: '', messenger: '' }
};

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
function closeMenu() { toggle.classList.remove('active'); nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Otwórz menu'); document.body.classList.remove('menu-open'); }
toggle.addEventListener('click', () => { const open = !nav.classList.contains('open'); toggle.classList.toggle('active',open); nav.classList.toggle('open',open); toggle.setAttribute('aria-expanded',String(open)); toggle.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu'); document.body.classList.toggle('menu-open',open); });
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
  document.querySelector('#hoursStatus').classList.toggle('open',open);
  document.querySelector('#hoursStatus').classList.toggle('closed',!open);
  document.querySelector('#heroStatus').textContent = status;
  document.querySelector('#todayHours').textContent = `Dziś: ${hours}`;
}
updateOpeningStatus();
setInterval(updateOpeningStatus,60000);

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }),{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,index) => { if(reduceMotion) el.classList.add('visible'); else { el.style.transitionDelay = `${Math.min(index % 4,3) * 70}ms`; revealObserver.observe(el); } });

const ORDER_MENU = [
  {id:'zupa-mala',name:'Zupa',category:'Zupy',price:10,image:'assets/dishes/bun.jpg',images:['assets/menu/zupa-mala.jpg','assets/menu/zupa-mala-2.jpg'],description:'Mała zupa - wybierz kraba, kurczaka albo miso.',variantLabel:'Wybierz zupę',variants:[['Z krabem',10],['Z kurczakiem',10],['Miso',12]]},
  {id:'frytki',name:'Frytki i dodatki',category:'Przystawki',price:9,image:'image_1786957935929.jpg',description:'Frytki, biały lub żółty ryż, kluski albo smażony makaron.',variantLabel:'Wybierz dodatek',variants:[['Frytki',9],['Biały ryż',9],['Kluski',9],['Żółty ryż',9],['Smażony makaron',9]]},
  {id:'dimsum',name:'Dimsum',category:'Przystawki',price:20,image:'image_1786957935932.jpg',description:'Pierożki dimsum - 5 szt.'},
  {id:'sajgonki',name:'Sajgonki',category:'Przystawki',price:22,image:'assets/dishes/sajgonki.jpg',description:'Chrupiące sajgonki - 3 szt.; farsz mięsny albo wegetariański.',variantLabel:'Wybierz farsz',variants:[['Farsz mięsny',22],['Wegetariańskie',22]]},
  {id:'springrolls',name:'Spring rolls wegetariańskie',category:'Przystawki',price:20,image:'assets/dishes/spring-rolls.jpg',description:'Papier ryżowy, świeże warzywa i sałata.'},
  {id:'springrolls-krewetki',name:'Spring rolls z krewetkami',category:'Przystawki',price:22,image:'assets/dishes/spring-rolls.jpg',description:'Papier ryżowy, krewetki, świeże warzywa i sałata.'},
  {id:'krewetki-panierowane',name:'Krewetki w chrupiącej panierce',category:'Przystawki',price:29,image:'image_1786957935933.jpg',description:'Krewetki w chrupiącej panierce i świeża sałata.'},
  {id:'ser-smazony',name:'Smażony ser z frytkami',category:'Przystawki',price:29,image:'image_1786957935935.jpg',description:'Smażony ser, frytki i surówka.'},
  {id:'kurczak-panierowany',name:'Chrupiąca panierowana pierś z kurczaka',category:'Dania główne',price:29,image:'image_1786957935937.jpg',description:'Pierś z kurczaka w chrupiącej panierce, frytki i surówka.'},
  {id:'kungbao',name:'Kung Bao',category:'Dania główne',price:30,image:'assets/dishes/kung-bao.jpg',description:'Warzywa, orzeszki ziemne i sos Kung Bao. Na zdjęciu: wołowina.',variantLabel:'Wybierz główny składnik',defaultVariant:1,variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'wieprzowina-karmel',name:'Wieprzowina duszona w karmelu',category:'Dania główne',price:39,image:'image_1786957935938.jpg',description:'Delikatna wieprzowina w aromatycznym sosie karmelowym.'},
  {id:'sos-tajski',name:'Danie w sosie tajskim',category:'Dania główne',price:30,image:'image_1786957935939.jpg',description:'Warzywa i aromatyczny sos tajski.',variantLabel:'Wybierz główny składnik',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'curry',name:'Curry',category:'Dania główne',price:30,image:'image_1786957935941.jpg',description:'Warzywa i kremowy sos curry.',variantLabel:'Wybierz główny składnik',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'slodko-kwasny',name:'Sos słodko-kwaśny',category:'Dania główne',price:30,image:'image_1786957935932.jpg',description:'Warzywa i sos słodko-kwaśny.',variantLabel:'Wybierz główny składnik',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'losos',name:'Łosoś',category:'Dania główne',price:49,image:'image_1786957935942.jpg',description:'Filet z łososia z wybranym sosem.',variantLabel:'Wybierz sos',variants:[['Sos teriyaki',49],['Masło i sos pomarańczowy',49],['Sos pieprzowy',49]]},
  {id:'bone',name:'Bò Né',category:'Dania główne',price:45,image:'image_1786957935937.jpg',description:'Wołowina, jajko sadzone i warzywa; podawane z ryżem.'},
  {id:'udko-salatka',name:'Udko z kurczaka smażone z sałatką mieszaną',category:'Dania główne',price:39,image:'image_1786957935945.jpg',description:'Smażone udko z kurczaka ze świeżą sałatką mieszaną.'},
  {id:'udko-smazone',name:'Udko z kurczaka smażone',category:'Dania główne',price:39,image:'image_1786957935937.jpg',description:'Smażone udko z kurczaka, warzywa i wybrany sos. Na zdjęciu: sos pekiński.',variantLabel:'Wybierz sos',variants:[['Sos pekiński',39],['Sos tajski ostry',39],['Sos curry',39],['Sos słodko-kwaśny',39]]},
  {id:'kaczka',name:'Smażona kaczka',category:'Dania główne',price:45,image:'assets/dishes/smazona-kaczka.jpg',description:'Smażona kaczka, warzywa i wybrany sos. Na zdjęciu: sos pekiński.',variantLabel:'Wybierz sos',variants:[['Sos pekiński',45],['Sos tajski',45],['Sos curry',45],['Sos słodko-kwaśny',45]]},
  {id:'kaczka-salatka',name:'Smażona kaczka z sałatką mieszaną',category:'Dania główne',price:45,image:'assets/dishes/smazona-kaczka.jpg',description:'Chrupiąca kaczka ze świeżą sałatką mieszaną.'},
  {id:'ryz',name:'Smażony ryż',category:'Ryż i makarony',price:30,image:'assets/dishes/smazony-ryz.jpg',description:'Ryż smażony z jajkiem i warzywami.',variantLabel:'Wybierz główny składnik',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'makaron',name:'Smażony makaron',category:'Ryż i makarony',price:30,image:'assets/dishes/smazony-makaron.jpg',description:'Makaron smażony z warzywami.',variantLabel:'Wybierz główny składnik',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'makaron-ryzowy',name:'Smażony makaron ryżowy',category:'Ryż i makarony',price:30,image:'image_1786957935948.jpg',description:'Makaron ryżowy smażony z warzywami.',variantLabel:'Wybierz główny składnik',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'padthai',name:'Pad Thai',category:'Ryż i makarony',price:30,image:'assets/dishes/pad-thai.jpg',description:'Makaron ryżowy, warzywa i orzeszki ziemne.',variantLabel:'Wybierz główny składnik',variants:[['Kurczak',35],['Wołowina',39],['Krewetki',39],['Tofu',30]]},
  {id:'udon',name:'Udon',category:'Ryż i makarony',price:35,image:'assets/dishes/udon.jpg',description:'Gruby makaron udon smażony z warzywami.',variantLabel:'Wybierz główny składnik',variants:[['Kurczak',39],['Wołowina',45],['Krewetki',45],['Tofu',35]]},
  {id:'pho',name:'Zupa Phở',category:'Zupy',price:35,image:'assets/dishes/pho.jpg',description:'Aromatyczny bulion, makaron ryżowy, zioła i warzywa.',variantLabel:'Wybierz główny składnik',variants:[['Kurczak',39],['Wołowina',42],['Krewetki',42],['Tofu',35]]},
  {id:'bun',name:'Zupa Bún',category:'Zupy',price:35,image:'assets/dishes/bun.jpg',description:'Lekki bulion, makaron ryżowy, zioła i warzywa.',variantLabel:'Wybierz główny składnik',variants:[['Kurczak',39],['Wołowina',42],['Krewetki',42],['Tofu',35]]},
  {id:'pho-kurczak-sos',name:'Phở z kurczakiem na sucho',category:'Zupy',price:42,image:'assets/dishes/pho.jpg',description:'Makaron phở z kurczakiem i aromatycznym sosem.'},
  {id:'bunbo',name:'Bún bò Nam Bộ',category:'Dania główne',price:42,image:'assets/dishes/bun-bo-nam-bo.jpg',description:'Wołowina, makaron ryżowy, zioła, warzywa i orzeszki.'},
  {id:'bunnemran',name:'Bún nem rán',category:'Dania główne',price:39,image:'assets/dishes/sajgonki.jpg',description:'Makaron bún, sajgonki, świeże warzywa i zioła.',variantLabel:'Wybierz farsz sajgonek',variants:[['Farsz mięsny',39],['Wegetariańskie',39]]},
  {id:'buncha',name:'Bún chả',category:'Dania główne',price:39,image:'assets/dishes/bun-cha.jpg',description:'Grillowana wieprzowina, makaron ryżowy, zioła i sos.'},
  {id:'krab-tamaryndowy',name:'Krab w sosie tamaryndowym',category:'Dania główne',price:45,image:'image_1786957935946.jpg',description:'Krab w intensywnym, słodko-kwaśnym sosie tamaryndowym.'},
  {id:'s1',name:'Nigiri łosoś',category:'Sushi',price:20,image:'assets/sushi/nigiri-salmon.jpg',description:'Nigiri z łososiem - 2 szt.'},
  {id:'s2',name:'Nigiri tuńczyk',category:'Sushi',price:22,image:'assets/sushi/tuna.jpg',description:'Nigiri z tuńczykiem - 2 szt.'},
  {id:'s3',name:'Nigiri krewetka',category:'Sushi',price:24,image:'assets/sushi/shrimp.jpg',description:'Nigiri z krewetką - 2 szt.'},
  {id:'s4',name:'Nigiri węgorz',category:'Sushi',price:25,image:'assets/sushi/eel.jpg',description:'Nigiri z węgorzem - 2 szt.'},
  {id:'s5',name:'Nigiri paluszki krabowe',category:'Sushi',price:17,image:'assets/menu/s5.png',description:'Nigiri z paluszkami krabowymi - 2 szt.'},
  {id:'s6',name:'Nigiri tofu',category:'Sushi',price:17,image:'assets/menu/s6.png',description:'Nigiri z tofu - 2 szt.'},
  {id:'s7',name:'Hosomaki łosoś',category:'Sushi',price:22,image:'assets/sushi/hosomaki-salmon.jpg',description:'Klasyczne hosomaki z łososiem - 8 szt.'},
  {id:'s8',name:'Hosomaki tuńczyk',category:'Sushi',price:25,image:'assets/sushi/tuna.jpg',description:'Klasyczne hosomaki z tuńczykiem - 8 szt.'},
  {id:'s9',name:'Hosomaki paluszki krabowe',category:'Sushi',price:18,image:'assets/sushi/uramaki.jpg',description:'Hosomaki z paluszkami krabowymi - 8 szt.'},
  {id:'s10',name:'Hosomaki tofu',category:'Sushi',price:18,image:'assets/sushi/hosomaki-salmon.jpg',description:'Wegetariańskie hosomaki z tofu - 8 szt.'},
  {id:'s11',name:'Hosomaki awokado',category:'Sushi',price:18,image:'assets/sushi/uramaki.jpg',description:'Wegetariańskie hosomaki z awokado - 8 szt.'},
  {id:'s12',name:'Hosomaki ogórek',category:'Sushi',price:18,image:'assets/sushi/maki-set-24.jpg',description:'Wegetariańskie hosomaki z ogórkiem - 8 szt.'},
  {id:'s13',name:'Futomaki świeży łosoś',category:'Sushi',price:32,image:'assets/sushi/futomaki-salmon.jpg',description:'Futomaki ze świeżym łososiem - 8 szt.'},
  {id:'s14',name:'Futomaki tuńczyk',category:'Sushi',price:35,image:'assets/sushi/tuna.jpg',description:'Futomaki z tuńczykiem - 8 szt.'},
  {id:'s15',name:'Futomaki smażone krewetki',category:'Sushi',price:35,image:'assets/sushi/shrimp.jpg',description:'Futomaki ze smażonymi krewetkami - 8 szt.'},
  {id:'s16',name:'Futomaki krab miękki',category:'Sushi',price:39,image:'assets/sushi/shrimp.jpg',description:'Miękki krab, ryż i nori - 8 szt.'},
  {id:'s17',name:'Futomaki pierś z kurczaka',category:'Sushi',price:32,image:'assets/sushi/futomaki-salmon.jpg',description:'Pierś z kurczaka, warzywa, ryż i nori - 8 szt.'},
  {id:'s18',name:'Futomaki smażony łosoś',category:'Sushi',price:30,image:'assets/sushi/futomaki-salmon.jpg',description:'Smażony łosoś, warzywa, ryż i nori - 8 szt.'},
  {id:'s19',name:'Futomaki paluszki krabowe MIX',category:'Sushi',price:30,image:'assets/sushi/uramaki.jpg',description:'Paluszki krabowe, warzywa, ryż i nori - 8 szt.'},
  {id:'s20',name:'Futomaki tofu',category:'Sushi',price:25,image:'assets/sushi/uramaki.jpg',description:'Wegetariańskie futomaki z tofu - 8 szt.'},
  {id:'s21',name:'Uramaki łosoś',category:'Sushi',price:29,image:'assets/sushi/uramaki.jpg',description:'Uramaki z łososiem - 8 szt.'},
  {id:'s22',name:'Uramaki tuńczyk',category:'Sushi',price:35,image:'assets/sushi/tuna.jpg',description:'Uramaki z tuńczykiem - 8 szt.'},
  {id:'s23',name:'Uramaki smażone krewetki',category:'Sushi',price:35,image:'assets/sushi/shrimp.jpg',description:'Uramaki ze smażonymi krewetkami - 8 szt.'},
  {id:'s24',name:'Uramaki paluszki krabowe MIX',category:'Sushi',price:25,image:'assets/sushi/uramaki.jpg',description:'Uramaki z paluszkami krabowymi - 8 szt.'},
  {id:'s25',name:'Uramaki tofu',category:'Sushi',price:25,image:'assets/sushi/uramaki.jpg',description:'Wegetariańskie uramaki z tofu - 8 szt.'},
  {id:'s26',name:'Philadelphia łosoś i awokado',category:'Sushi',price:39,image:'assets/sushi/uramaki.jpg',description:'Philadelphia Roll z łososiem i awokado - 6 szt.'},
  {id:'s27',name:'Philadelphia węgorz i awokado',category:'Sushi',price:39,image:'assets/sushi/eel.jpg',description:'Philadelphia Roll z węgorzem i awokado - 6 szt.'},
  {id:'s28',name:'Philadelphia tuńczyk i awokado',category:'Sushi',price:45,image:'assets/sushi/tuna.jpg',description:'Philadelphia Roll z tuńczykiem i awokado - 6 szt.'},
  {id:'s29',name:'Philadelphia łosoś i tobiko',category:'Sushi',price:39,image:'assets/sushi/uramaki.jpg',description:'Philadelphia Roll z łososiem i tobiko - 6 szt.'},
  {id:'s30',name:'Łosoś, tobiko i ogórek',category:'Sushi',price:39,image:'assets/sushi/uramaki.jpg',description:'Rolka z łososiem, tobiko i ogórkiem.'},
  {id:'s31',name:'Sashimi łosoś',category:'Sushi',price:59,image:'assets/sushi/nigiri-salmon.jpg',description:'Sashimi ze świeżego łososia - 6 szt.'},
  {id:'s32',name:'Sałatka z surowego łososia',category:'Sushi',price:45,image:'assets/sushi/nigiri-salmon.jpg',description:'Sałatka z surowym łososiem i awokado.'},
  {id:'s33',name:'Sałatka ze smażonym łososiem',category:'Sushi',price:45,image:'assets/sushi/futomaki-salmon.jpg',description:'Sałatka ze smażonym łososiem i awokado.'},
  {id:'s34',name:'Sushi Set - Zestaw Maki',category:'Sushi Set',price:49,image:'assets/sushi/maki-set-24.jpg',description:'Hosomaki z łososiem, tuńczykiem i awokado - 24 szt.'},
  {id:'s35',name:'Zestaw Maki',category:'Sushi Set',price:45,image:'assets/sushi/maki-set-24.jpg',description:'Hosomaki ogórek, awokado i paluszki krabowe - 24 szt.'},
  {id:'s36',name:'Sake Set',category:'Sushi Set',price:120,image:'assets/sushi/maki-set-24.jpg',description:'Uramaki łosoś, futomaki tuńczyk, hosomaki łosoś i tuńczyk oraz nigiri łosoś - 34 szt.'},
  {id:'s37',name:'Salamon Set',category:'Sushi Set',price:149,image:'assets/sushi/uramaki.jpg',description:'Futomaki łosoś i miękki krab, uramaki łosoś, hosomaki tuńczyk oraz nigiri węgorz - 34 szt.'},
  {id:'s38',name:'Set',category:'Sushi Set',price:79,image:'assets/sushi/maki-set-24.jpg',description:'Uramaki z łososiem i tuńczykiem oraz nigiri z łososiem i tuńczykiem - 20 szt.'},
  {id:'s39',name:'Family Set',category:'Sushi Set',price:169,image:'assets/sushi/maki-set-24.jpg',description:'Futomaki łosoś i smażone krewetki, uramaki łosoś i tuńczyk, hosomaki awokado i ogórek - 48 szt.'},
  {id:'s40',name:'Kyoto Set',category:'Sushi Set',price:259,image:'assets/sushi/maki-set-24.jpg',description:'Futomaki, Tobiko Roll, uramaki, hosomaki i nigiri - 70 szt.'}
];
ORDER_MENU.slice(0,32).forEach((item,index) => {
  item.menuNumber = String(index + 1);
  item.image = `assets/asian/${String(index+1).padStart(2,'0')}.jpg`;
});
ORDER_MENU.slice(32).forEach(item => {
  item.menuNumber = item.id.toUpperCase();
});

// Real restaurant photos matched against the numbered dishes on both menu cards.
const realDishPhotoIds = [
  'zupa-mala','frytki','dimsum','sajgonki','springrolls','springrolls-krewetki',
  'krewetki-panierowane','ser-smazony','kurczak-panierowany','kungbao','wieprzowina-karmel','sos-tajski',
  'slodko-kwasny','curry','losos','bone','udko-salatka','udko-smazone','kaczka','kaczka-salatka',
  'ryz','makaron','makaron-ryzowy','padthai','udon','pho','bun','pho-kurczak-sos','bunbo','bunnemran','buncha','krab-tamaryndowy',
  's1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13','s14','s15','s16','s17','s18',
  's19','s20','s21','s22','s23','s24','s25','s26','s27','s28','s29','s30','s31','s32',
  's33','s34','s35','s36','s37','s38','s39','s40'
];
realDishPhotoIds.forEach(id => {
  const item = ORDER_MENU.find(dish => dish.id === id);
  if (item) item.image = `assets/menu/${id}.jpg`;
});
// Numbering follows the printed menu, independently of the photo filename list.
const printedAsianDishIds = [
  'zupa-mala','frytki','dimsum','sajgonki','springrolls','springrolls-krewetki',
  'krewetki-panierowane','ser-smazony','kurczak-panierowany','kungbao','wieprzowina-karmel','sos-tajski',
  'curry','slodko-kwasny','losos','bone','udko-salatka','udko-smazone','kaczka','kaczka-salatka',
  'ryz','makaron','makaron-ryzowy','padthai','udon','pho','bun','bunbo','pho-kurczak-sos',
  'bunnemran','buncha','krab-tamaryndowy'
];
printedAsianDishIds.forEach((id,index) => {
  ORDER_MENU.find(dish => dish.id === id).menuNumber = String(index + 1);
});
const menuSortNumber = item => item.menuNumber.startsWith('S') ? 32 + Number(item.menuNumber.slice(1)) : Number(item.menuNumber);
ORDER_MENU.sort((a,b) => menuSortNumber(a) - menuSortNumber(b));
// Asian dish 18 (Udko z kurczaka smażone) stays at 39 zł; sushi S18 is 30 zł.
// Frame the photographed serving, rather than shrinking portrait photos into side bars.
// Taller compositions preserve separate rice/noodle plates and sauce bowls.
const dishPhotoFrames = {
  'zupa-mala': {position:'50% 74%'},
  frytki: {position:'50% 77%'},
  dimsum: {ratio:1,position:'50% 78%'},
  sajgonki: {position:'50% 65%'},
  springrolls: {position:'50% 65%'},
  'springrolls-krewetki': {ratio:1,position:'50% 62%'},
  'krewetki-panierowane': {position:'50% 78%'},
  kungbao: {ratio:4/3,position:'50% 50%'},
  'wieprzowina-karmel': {ratio:1,position:'50% 62%'},
  'sos-tajski': {ratio:1,position:'50% 63%'},
  curry: {ratio:1,position:'50% 47%'},
  'slodko-kwasny': {ratio:1,position:'50% 61%'},
  losos: {ratio:1,position:'50% 51%'},
  bone: {ratio:4/5,position:'50% 57%'},
  'udko-salatka': {position:'50% 65%'},
  'udko-smazone': {ratio:4/5,position:'50% 50%'},
  kaczka: {ratio:4/5,position:'50% 56%'},
  'kaczka-salatka': {position:'50% 64%'},
  makaron: {position:'50% 77%'},
  'makaron-ryzowy': {position:'50% 78%'},
  padthai: {position:'50% 78%'},
  udon: {ratio:1,position:'50% 50%'},
  pho: {ratio:1,position:'50% 45%'},
  bun: {ratio:1,position:'50% 42%'},
  bunbo: {ratio:4/5,position:'50% 44%'},
  'pho-kurczak-sos': {position:'50% 57%'},
  bunnemran: {ratio:4/5,position:'50% 52%'},
  buncha: {ratio:4/5,position:'50% 47%'},
  'krab-tamaryndowy': {ratio:1,position:'50% 48%'}
};
const dishPhotoRatio = item => dishPhotoFrames[item.id]?.ratio ?? 4/3;
// One optimized wine-red production photograph per menu item.
ORDER_MENU.forEach(item => {
  item.image = `assets/menu-burgundy/${item.id}.webp`;
  if (item.images) item.images = [item.image];
});
const money = value => new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN'}).format(value);
let cart = {};
try { cart = JSON.parse(localStorage.getItem('hnq-cart') || '{}'); } catch { /* Start fresh if saved cart data is invalid. */ }
if (!cart || typeof cart !== 'object' || Array.isArray(cart)) cart = {};
const resolveCartItem = key => {
  const [id,variantIndex] = key.split('::');
  const base = ORDER_MENU.find(item => item.id === id);
  if (!base) return null;
  const variant = base.variants?.[Number(variantIndex || 0)];
  return variant ? {...base,name:`${base.name} - ${variant[0]}`,price:variant[1]} : base;
};
cart = Object.fromEntries(Object.entries(cart).filter(([key,qty]) => resolveCartItem(key) && Number(qty) > 0));
let activeCategory = 'Wszystkie';
let menuSearchQuery = '';
const selectedVariants = new Map();
const orderGrid = document.querySelector('#orderGrid');
const categoryTabs = document.querySelector('#categoryTabs');
const menuSearchForm = document.querySelector('#menuSearchForm');
const menuSearchInput = document.querySelector('#menuSearch');
const clearMenuSearch = document.querySelector('#clearMenuSearch');
const clearMenuSearchEmpty = document.querySelector('#clearMenuSearchEmpty');
const menuEmptyState = document.querySelector('#menuEmptyState');
const cartDrawer = document.querySelector('#cartDrawer');
const cartBackdrop = document.querySelector('#cartBackdrop');
const cartItems = document.querySelector('#cartItems');
const checkoutForm = document.querySelector('#checkoutForm');

function renderCategories(){
  categoryTabs.replaceChildren();
  ['Wszystkie',...new Set(ORDER_MENU.map(item=>item.category))].forEach(category=>{
    const button=document.createElement('button');
    button.type='button'; button.className='category-tab'+(category===activeCategory?' active':'');
    const categoryPhotos = {
      Wszystkie:'assets/menu-burgundy/kungbao.webp', Zupy:'assets/menu-burgundy/pho.webp',
      Przystawki:'assets/menu-burgundy/sajgonki.webp', 'Dania główne':'assets/menu-burgundy/kungbao.webp',
      'Ryż i makarony':'assets/menu-burgundy/padthai.webp', Sushi:'assets/menu-burgundy/s21.webp',
      'Sushi Set':'assets/menu-burgundy/s39.webp'
    };
    const count = ORDER_MENU.filter(item=>category==='Wszystkie'||item.category===category).length;
    button.dataset.category=category;
    button.innerHTML=`<span class="category-photo"><img src="${categoryPhotos[category]}" alt="" width="320" height="220" loading="lazy"></span><span class="category-copy"><span class="category-name">${category}</span><small>${count} pozycji</small></span>`;
    button.setAttribute('aria-pressed',String(category===activeCategory));
    button.addEventListener('click',()=>{
      activeCategory=category;
      categoryTabs.querySelectorAll('button').forEach(tab=>{
        const active=tab===button;tab.classList.toggle('active',active);tab.setAttribute('aria-pressed',String(active));
      });
      renderMenu();
      button.scrollIntoView({behavior:reduceMotion?'instant':'smooth',block:'nearest',inline:'nearest'});
    });
    categoryTabs.append(button);
  });
}
function renderMenu(){
  orderGrid.innerHTML='';
  const normalizedQuery=normalizeMenuSearch(menuSearchQuery);
  const dishes=ORDER_MENU.filter(item=>{
    const inCategory=activeCategory==='Wszystkie'||item.category===activeCategory;
    const searchText=[item.name,item.description,item.category,item.variantLabel,...(item.variants?.map(([name])=>name)??[])].filter(Boolean).join(' ');
    return inCategory&&(!normalizedQuery||normalizeMenuSearch(searchText).includes(normalizedQuery));
  });
  document.querySelector('#categoryTitle').textContent=normalizedQuery?`Wyniki dla „${menuSearchQuery.trim()}”`:activeCategory==='Wszystkie'?'Wszystkie dania':activeCategory;
  document.querySelector('#menuResultCount').textContent=menuResultLabel(dishes.length);
  document.querySelector('#sushiServingNote').hidden=!dishes.some(item=>item.category.startsWith('Sushi'));
  orderGrid.hidden=dishes.length===0;
  menuEmptyState.hidden=dishes.length!==0;
  dishes.forEach((item,index)=>{
    const article=document.createElement('article'); article.className='order-card menu-enter'; article.dataset.dishId=item.id; article.style.setProperty('--enter-delay',`${Math.min(index,7)*55}ms`);
    const variantLabel=item.variantLabel??'Wybierz wariant';
    const selectedVariant=selectedVariants.get(item.id)??item.defaultVariant??0;
    const variants=item.variants?`<label class="variant-picker"><span>${variantLabel}</span><select aria-label="${variantLabel}: ${item.name}">${item.variants.map(([name,price],variantIndex)=>`<option value="${variantIndex}" data-price="${price}" ${variantIndex===selectedVariant?'selected':''}>${name} · ${money(price)}</option>`).join('')}</select></label>`:'';
    const photos=item.images??[item.image];
    const sushi=item.category.startsWith('Sushi');
    const frame=dishPhotoFrames[item.id];
    const rowStart=index-index%2;
    const rowRatio=Math.min(...dishes.slice(rowStart,rowStart+2).map(dishPhotoRatio));
    article.style.setProperty('--photo-ratio',String(dishPhotoRatio(item)));
    article.style.setProperty('--row-photo-ratio',String(rowRatio));
    if(frame?.position) article.style.setProperty('--photo-position',frame.position);
    const photoMarkup=photos.length>1?`<div class="dish-image-pair">${photos.map((src,photoIndex)=>`<img src="${src}" alt="${item.name} - zdjęcie ${photoIndex+1}" loading="lazy" width="800" height="600">`).join('')}</div>`:`<img class="dish-photo" src="${item.image}" alt="${item.name}${item.id==='kungbao'?' z wołowiną':''}" loading="lazy" width="800" height="600">`;
    article.innerHTML=`<div class="dish-visual${sushi?' sushi-visual':''}">${photoMarkup}</div><div class="order-card-content"><div class="dish-title"><span class="dish-index">${item.menuNumber}</span><h3>${item.name}</h3></div><p class="dish-description">${item.description}</p>${variants}<div class="order-card-foot"><strong class="dish-price">${money(item.variants?.[selectedVariant]?.[1]??item.price)}</strong><button class="add-to-cart" type="button" data-add="${item.id}" aria-label="Dodaj ${item.name} do koszyka"><span>+</span> Dodaj</button></div></div>`;
    orderGrid.append(article);
  });
}
function normalizeMenuSearch(value){
  return value.toLocaleLowerCase('pl-PL').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ł','l').replaceAll('đ','d').trim();
}
function menuResultLabel(count){
  const lastTwo=count%100;
  const ending=count===1?'pozycja':lastTwo>=12&&lastTwo<=14?'pozycji':[2,3,4].includes(count%10)?'pozycje':'pozycji';
  return `${count} ${ending}`;
}
function resetMenuSearch(){
  menuSearchInput.value='';
  menuSearchQuery='';
  clearMenuSearch.hidden=true;
  renderMenu();
  menuSearchInput.focus();
}
menuSearchForm.addEventListener('submit',event=>event.preventDefault());
menuSearchInput.addEventListener('input',()=>{
  menuSearchQuery=menuSearchInput.value;
  if(menuSearchQuery.trim()&&activeCategory!=='Wszystkie'){
    activeCategory='Wszystkie';
    renderCategories();
  }
  clearMenuSearch.hidden=!menuSearchQuery.trim();
  renderMenu();
});
menuSearchInput.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&menuSearchInput.value){event.preventDefault();resetMenuSearch()}
});
clearMenuSearch.addEventListener('click',resetMenuSearch);
clearMenuSearchEmpty.addEventListener('click',resetMenuSearch);
function cartQuantity(){return Object.values(cart).reduce((sum,qty)=>sum+qty,0)}
function updateCart(){
  try { localStorage.setItem('hnq-cart',JSON.stringify(cart)); } catch { /* Ordering also works without browser storage. */ }
  const entries=Object.entries(cart).filter(([,qty])=>qty>0);
  const quantity=cartQuantity();
  document.querySelector('#cartCount').textContent=quantity;
  const floatingCart=document.querySelector('#floatingCart');
  document.querySelector('#floatingCartCount').textContent=quantity;
  floatingCart.hidden=quantity===0;
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
let cartLastTrigger=null;
function openCart(){cartLastTrigger=document.activeElement;closeMenu();cartBackdrop.hidden=false;cartDrawer.inert=false;cartDrawer.classList.add('open');cartDrawer.setAttribute('aria-hidden','false');document.body.classList.add('cart-open');document.querySelector('#cartClose').focus()}
function closeCart(){cartDrawer.classList.remove('open');cartDrawer.setAttribute('aria-hidden','true');cartDrawer.inert=true;cartBackdrop.hidden=true;document.body.classList.remove('cart-open');cartLastTrigger?.focus()}
function showCartToast(){const toast=document.querySelector('#cartToast');toast.hidden=false;toast.classList.remove('toast-pop');void toast.offsetWidth;toast.classList.add('toast-pop');clearTimeout(showCartToast.timer);showCartToast.timer=setTimeout(()=>toast.hidden=true,1700)}
function pulseCart(){['cartTrigger','floatingCart'].forEach(id=>{const el=document.querySelector('#'+id);el.classList.remove('cart-pulse');void el.offsetWidth;el.classList.add('cart-pulse')})}
orderGrid.addEventListener('change',event=>{if(!event.target.matches('.variant-picker select'))return;const card=event.target.closest('.order-card');selectedVariants.set(card.dataset.dishId,Number(event.target.value));card.querySelector('.dish-price').textContent=money(Number(event.target.selectedOptions[0].dataset.price))});
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
  const lines=entries.map(([id,qty],index)=>{const item=resolveCartItem(id);return `${index+1}. ${item.name} × ${qty} - ${money(item.price*qty)}`});
  const message=['Dzień dobry, chcę złożyć zamówienie w Hà Nội Quán.','','ZAMÓWIENIE:',...lines,'',`RAZEM: ${money(total)}`,'',`Sposób odbioru: ${data.get('fulfilment')}`,`Imię: ${data.get('customerName')}`,`Telefon: ${data.get('customerPhone')}`];
  if(data.get('address'))message.push(`Adres: ${data.get('address')}`); if(data.get('notes'))message.push(`Uwagi: ${data.get('notes')}`);
  message.push('','Proszę o potwierdzenie ceny i czasu realizacji.');
  window.open('https://wa.me/48579344577?text='+encodeURIComponent(message.join('\n')),'_blank','noopener');
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
    if(cartDrawer.classList.contains('open'))closeCart();
    if(nav.classList.contains('open')){closeMenu();toggle.focus()}
  }
  if(event.key!=='Tab')return;
  const dialog=cartDrawer.classList.contains('open')?cartDrawer:null;
  if(!dialog)return;
  const focusable=[...dialog.querySelectorAll('button,a[href],input,textarea,select')].filter(el=>!el.disabled&&el.getClientRects().length);
  const first=focusable[0],last=focusable.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
});
categoryTabs.innerHTML='';renderCategories();renderMenu();updateCart();
