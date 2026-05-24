const root = document.documentElement;
try{ const saved = localStorage.getItem('theme'); if(saved) root.setAttribute('data-theme', saved); }catch(e){}
document.getElementById('themeBtn').addEventListener('click', ()=>{
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try{ localStorage.setItem('theme', next); }catch(e){}
});

const links = document.getElementById('links');
document.getElementById('burger').addEventListener('click', ()=> links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> links.classList.remove('open')));

// Smooth-scroll for every in-page anchor (works even inside embedded previews)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id === '#'){ e.preventDefault(); return; }   // CV button: link not added yet
    const target = document.querySelector(id);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

const header = document.getElementById('header');
window.addEventListener('scroll', ()=> header.classList.toggle('scrolled', window.scrollY > 30));

const roles = ["Data Scientist","Python Developer","Web Developer","Lifelong Learner"];
const typed = document.querySelector('.typed');
let ri=0, ci=0, deleting=false;
(function type(){
  const word = roles[ri];
  typed.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if(!deleting && ci === word.length+1){ deleting=true; setTimeout(type, 1400); return; }
  if(deleting && ci === 0){ deleting=false; ri=(ri+1)%roles.length; }
  setTimeout(type, deleting ? 45 : 95);
})();

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      e.target.querySelectorAll && e.target.querySelectorAll('.bar i').forEach(b=> b.style.width = b.dataset.w + '%');
      io.unobserve(e.target);
    }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

const navLinks = [...links.querySelectorAll('a')];
const sections = navLinks.map(a=> document.querySelector(a.getAttribute('href')));
window.addEventListener('scroll', ()=>{
  const y = window.scrollY + 120;
  sections.forEach((s,i)=>{
    if(s && s.offsetTop <= y && s.offsetTop + s.offsetHeight > y){
      navLinks.forEach(l=> l.classList.remove('active'));
      navLinks[i].classList.add('active');
    }
  });
});

document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  document.getElementById('formNote').textContent = '✅ Thanks! This is a demo — connect it to Formspree to receive messages for real.';
  e.target.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();