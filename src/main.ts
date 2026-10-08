import './style.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import L from 'leaflet';

gsap.registerPlugin(ScrollTrigger);

// 1. Smooth Scrolling Setup (Lenis)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// 2. GSAP Animations
// Hero Parallax
gsap.to('.hero-bg', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});

// Reveal Text
const revealElements = document.querySelectorAll('.gsap-reveal');
revealElements.forEach((el) => {
  gsap.to(el, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
});

// Scale Images
const scaleElements = document.querySelectorAll('.gsap-scale');
scaleElements.forEach((el) => {
  gsap.to(el, {
    scale: 1,
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });

  // Parallax effect on image inside container
  const img = el.querySelector('img');
  if (img) {
    gsap.to(img, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
});

// 3. Map Integration (Leaflet)
interface Stop {
  id: number;
  title: string;
  lat: number;
  lng: number;
  desc: string;
  img: string;
}

const stops: Stop[] = [
  {
    id: 1,
    title: 'Государственный Эрмитаж',
    lat: 59.9398,
    lng: 30.3146,
    desc: 'Один из крупнейших и самых значительных художественных и культурно-исторических музеев мира.',
    img: 'https://images.unsplash.com/photo-1572889653857-e630129cd443?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 2,
    title: 'Петропавловская крепость',
    lat: 59.9502,
    lng: 30.3166,
    desc: 'Историческое ядро города, место основания Санкт-Петербурга.',
    img: 'https://images.unsplash.com/photo-1548834925-e48f8a27ae6f?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 3,
    title: 'Исаакиевский собор',
    lat: 59.9341,
    lng: 30.3060,
    desc: 'Крупнейший православный храм Санкт-Петербурга. Памятник позднего классицизма.',
    img: 'https://images.unsplash.com/photo-1614088941018-b7ebba144d67?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 4,
    title: 'Спас на Крови',
    lat: 59.9400,
    lng: 30.3289,
    desc: 'Храм-памятник, сооруженный на месте, где в 1881 году был смертельно ранен император Александр II.',
    img: 'https://images.unsplash.com/photo-1589886361494-06c8b4172f3e?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 5,
    title: 'Казанский собор',
    lat: 59.9343,
    lng: 30.3246,
    desc: 'Один из крупнейших храмов Санкт-Петербурга. Построен на Невском проспекте для хранения чтимого списка чудотворной иконы Божией Матери Казанской.',
    img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 6,
    title: 'Мариинский театр',
    lat: 59.9256,
    lng: 30.2960,
    desc: 'Один из ведущих музыкальных театров России и мира.',
    img: 'https://images.unsplash.com/photo-1572889653857-e630129cd443?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 7,
    title: 'Медный всадник',
    lat: 59.9364,
    lng: 30.3022,
    desc: 'Памятник Петру I на Сенатской площади, ставший одним из символов города.',
    img: 'https://images.unsplash.com/photo-1548834925-e48f8a27ae6f?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 8,
    title: 'Кунсткамера',
    lat: 59.9415,
    lng: 30.3045,
    desc: 'Первый музей в России, учреждённый императором Петром I.',
    img: 'https://images.unsplash.com/photo-1614088941018-b7ebba144d67?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 9,
    title: 'Летний сад',
    lat: 59.9449,
    lng: 30.3355,
    desc: 'Парковый ансамбль, памятник садово-паркового искусства первой трети XVIII века.',
    img: 'https://images.unsplash.com/photo-1589886361494-06c8b4172f3e?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 10,
    title: 'Крейсер Аврора',
    lat: 59.9554,
    lng: 30.3378,
    desc: 'Крейсер 1-го ранга Балтийского флота, известный своей ролью в Октябрьской революции 1917 года.',
    img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=500',
  }
];

const mapContainer = document.getElementById('map');

if (mapContainer) {
  // Initialize Map
  const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false, // Prevent wheel zoom to not interfere with lenis
  }).setView([59.9386, 30.3141], 12);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  const markers: L.Marker[] = [];
  const routeCardsContainer = document.getElementById('route-cards-container');

  stops.forEach((stop, index) => {
    // Add Marker
    const marker = L.marker([stop.lat, stop.lng]).addTo(map);
    marker.bindPopup(`<b>${stop.title}</b>`);
    markers.push(marker);

    // Add Card
    if (routeCardsContainer) {
      const card = document.createElement('div');
      card.className = 'route-card';
      card.innerHTML = `
        <img src="${stop.img}" alt="${stop.title}">
        <h3>${index + 1}. ${stop.title}</h3>
        <p>${stop.desc}</p>
      `;

      card.addEventListener('click', () => {
        // Highlight active card
        document.querySelectorAll('.route-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Fly to marker
        map.flyTo([stop.lat, stop.lng], 15, {
          duration: 1.5,
          easeLinearity: 0.25
        });
        marker.openPopup();
      });

      routeCardsContainer.appendChild(card);
    }
  });

  // GSAP Pinning for Map Section
  ScrollTrigger.create({
    trigger: '.map-section',
    start: 'top top',
    end: 'bottom bottom',
    pin: '.map-container-wrapper',
    onEnter: () => map.invalidateSize(),
  });
}
