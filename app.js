// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Global variables
let currentPage = 'home';
let map;
let currentLayers = {};
let charts = {};

function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeProfileAnimations();
    initializeBlog();
    initializePortfolio();
    initializeContactForm();
    initializeScrollAnimations();
    
    // Show home page by default
    showPage('home');
}

// ============ PAGE NAVIGATION ============
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            const href = link.getAttribute('href');
            
            if (page) {
                showPage(page);
                updateActiveNavLink(link);
            } else if (href && href.startsWith('#') && currentPage === 'home') {
                // Handle anchor links within home page
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    updateActiveNavLink(link);
                }
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Handle buttons with data-page attributes throughout the site
    document.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-page')) {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            showPage(page);
            
            // Update nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === page) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Update active nav link on scroll for home page
    if (currentPage === 'home') {
        window.addEventListener('scroll', () => {
            updateActiveNavLinkOnScroll();
        });
    }
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Initialize page-specific functionality
        if (pageId === 'geoportal') {
            setTimeout(() => initializeGeoportal(), 100);
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Animate page entrance
        setTimeout(() => animatePageEntrance(targetPage), 50);
        
        console.log(`Switched to page: ${pageId}`);
    } else {
        console.error(`Page not found: ${pageId}-page`);
    }
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavLinkOnScroll() {
    if (currentPage !== 'home') return;
    
    const sections = document.querySelectorAll('#home-page section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function animatePageEntrance(page) {
    const elements = page.querySelectorAll('.page-hero, .section-title, .blog-card, .project-case-study, .portfolio-item');
    
    if (elements.length > 0) {
        anime({
            targets: elements,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            easing: 'easeOutExpo',
            delay: anime.stagger(100)
        });
    }
}

// ============ PROFILE ANIMATIONS ============
function initializeProfileAnimations() {
    createOrbitalParticles();
    animateFloatingIcons();
    addProfileHoverEffects();
}

function createOrbitalParticles() {
    const particlesContainer = document.querySelector('.orbital-particles');
    if (!particlesContainer) return;
    
    const particleCount = 10;
    const centerX = 150; // Half of container width
    const centerY = 150; // Half of container height
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random orbit radius
        const radius = 80 + Math.random() * 60;
        const angle = (360 / particleCount) * i;
        
        // Position particle
        const x = centerX + Math.cos(angle * Math.PI / 180) * radius;
        const y = centerY + Math.sin(angle * Math.PI / 180) * radius;
        
        particle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: ${Math.random() * 4 + 3}px;
            height: ${Math.random() * 4 + 3}px;
            opacity: ${Math.random() * 0.6 + 0.4};
        `;
        
        particlesContainer.appendChild(particle);
        
        // Animate orbital motion
        anime({
            targets: particle,
            rotateZ: 360,
            duration: 15000 + Math.random() * 10000,
            easing: 'linear',
            loop: true,
            transformOrigin: `${centerX - x}px ${centerY - y}px`
        });
        
        // Add pulsing effect
        anime({
            targets: particle,
            scale: [1, 1.5, 1],
            opacity: [particle.style.opacity, 0.2, particle.style.opacity],
            duration: 2000 + Math.random() * 1000,
            easing: 'easeInOutSine',
            loop: true,
            delay: Math.random() * 2000
        });
    }
}

function animateFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icons i');
    
    icons.forEach((icon, index) => {
        // Floating animation
        anime({
            targets: icon,
            translateY: [0, -15, 0],
            duration: 3000 + Math.random() * 2000,
            easing: 'easeInOutSine',
            loop: true,
            delay: index * 500
        });
        
        // Rotation animation
        anime({
            targets: icon,
            rotateZ: [0, 10, 0, -10, 0],
            duration: 4000 + Math.random() * 2000,
            easing: 'easeInOutSine',
            loop: true,
            delay: index * 300
        });
        
        // Opacity pulsing
        anime({
            targets: icon,
            opacity: [0.8, 0.4, 0.8],
            duration: 2500 + Math.random() * 1000,
            easing: 'easeInOutSine',
            loop: true,
            delay: index * 200
        });
    });
}

function addProfileHoverEffects() {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;
    
    profileContainer.addEventListener('mouseenter', () => {
        // Intensify animations on hover
        anime({
            targets: '.ring-outer',
            scale: 1.1,
            duration: 400,
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '.ring-middle',
            scale: 1.05,
            duration: 400,
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '.particle',
            scale: [1, 2],
            duration: 300,
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '.floating-icons i',
            scale: 1.2,
            duration: 300,
            easing: 'easeOutBack'
        });
    });
    
    profileContainer.addEventListener('mouseleave', () => {
        // Return to normal state
        anime({
            targets: '.ring-outer, .ring-middle',
            scale: 1,
            duration: 400,
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '.particle',
            scale: 1,
            duration: 300,
            easing: 'easeOutExpo'
        });
        
        anime({
            targets: '.floating-icons i',
            scale: 1,
            duration: 300,
            easing: 'easeOutBack'
        });
    });
}

// ============ GENERAL ANIMATIONS ============
function initializeAnimations() {
    // Hero section animations
    animateHeroSection();
    
    // Initialize intersection observer for scroll animations
    initializeScrollObserver();
}

function animateHeroSection() {
    // Only animate if we're on the home page
    if (currentPage !== 'home') return;
    
    // Animate hero elements with staggered timing
    const heroTimeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 800
    });

    heroTimeline
        .add({
            targets: '.hero-title',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000
        })
        .add({
            targets: '.hero-subtitle',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 200
        }, '-=600')
        .add({
            targets: '.hero-description',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 100
        }, '-=400')
        .add({
            targets: '.hero-buttons',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800
        }, '-=200')
        .add({
            targets: '.hero-visual',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 1000
        }, '-=800');
}

function initializeScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.classList.contains('skill-category')) {
                    animateSkillBars(target);
                } else if (target.classList.contains('service-card')) {
                    animateServiceCard(target);
                } else if (target.classList.contains('portfolio-item')) {
                    animatePortfolioItem(target);
                }
                
                // Generic scroll animation
                if (target.classList.contains('animate-on-scroll')) {
                    anime({
                        targets: target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                    target.classList.add('animated');
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.skill-category, .service-card, .portfolio-item, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    anime({
        targets: skillCategory,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        easing: 'easeOutExpo',
        complete: () => {
            // Animate skill bars after container animation
            skillBars.forEach((bar, index) => {
                const width = bar.getAttribute('data-width');
                anime({
                    targets: bar,
                    width: [`0%`, `${width}%`],
                    duration: 1000,
                    delay: index * 100,
                    easing: 'easeOutExpo'
                });
            });
        }
    });
}

function animateServiceCard(card) {
    anime({
        targets: card,
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 800,
        easing: 'easeOutExpo'
    });
}

function animatePortfolioItem(item) {
    anime({
        targets: item,
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.95, 1],
        duration: 600,
        easing: 'easeOutExpo'
    });
}

// ============ BLOG FUNCTIONALITY ============
function initializeBlog() {
    initializeBlogFilters();
    initializeBlogSearch();
    initializeBlogModals();
}

function initializeBlogFilters() {
    const filterBtns = document.querySelectorAll('.blog-filters .filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter blog cards
            filterBlogCards(blogCards, category);
        });
    });
}

function filterBlogCards(cards, category) {
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = category === 'all' || cardCategory === category;
        
        if (shouldShow) {
            anime({
                targets: card,
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 400,
                easing: 'easeOutExpo',
                begin: () => {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                }
            });
        } else {
            anime({
                targets: card,
                opacity: [1, 0],
                scale: [1, 0.9],
                duration: 400,
                easing: 'easeOutExpo',
                complete: () => {
                    card.classList.add('hidden');
                }
            });
        }
    });
}

function initializeBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            const shouldShow = title.includes(searchTerm) || content.includes(searchTerm);
            
            if (shouldShow) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
            }
        });
    });
}

function initializeBlogModals() {
    const readMoreBtns = document.querySelectorAll('.blog-read-more');
    const modal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (!modal || !modalTitle || !modalContent) return;
    
    // Blog post content
    const blogPosts = {
        1: {
            title: 'Tendencias en Visualización de Datos Geoespaciales 2025',
            content: `
                <p>La visualización de datos geoespaciales está experimentando una revolución tecnológica sin precedentes. En 2025, estamos viendo emerger nuevas tecnologías que están transformando la manera en que interactuamos con la información geográfica.</p>
                
                <h3>Realidad Aumentada en GIS</h3>
                <p>La integración de AR en aplicaciones GIS permite a los usuarios visualizar datos espaciales superpuestos en el mundo real, creando experiencias inmersivas para la planificación urbana y la gestión de recursos naturales.</p>
                
                <h3>Dashboards Interactivos 3D</h3>
                <p>Los nuevos frameworks permiten crear visualizaciones tridimensionales interactivas que facilitan la comprensión de patrones espaciales complejos, especialmente útiles en análisis de fenómenos atmosféricos y oceanográficos.</p>
                
                <h3>IA Generativa para Cartografía</h3>
                <p>Los algoritmos de inteligencia artificial ahora pueden generar mapas automáticamente, optimizando la presentación visual según el contexto y la audiencia objetivo.</p>
            `
        },
        2: {
            title: 'Mejores Prácticas de UX/UI en Aplicaciones GIS',
            content: `
                <p>El diseño de interfaces para aplicaciones GIS presenta desafíos únicos que requieren un enfoque especializado en experiencia de usuario.</p>
                
                <h3>Principios de Diseño Centrado en el Usuario</h3>
                <p>Las aplicaciones GIS deben ser intuitivas para usuarios con diferentes niveles de expertise técnico. Esto requiere una jerarquía visual clara y flujos de trabajo optimizados.</p>
                
                <h3>Gestión de Información Compleja</h3>
                <p>El manejo de múltiples capas de datos requiere interfaces que permitan la exploración gradual de información, evitando la sobrecarga cognitiva del usuario.</p>
                
                <h3>Responsive Design para Dispositivos Móviles</h3>
                <p>Las aplicaciones GIS modernas deben funcionar seamlessly en todos los dispositivos, adaptando controles y visualizaciones para pantallas táctiles.</p>
            `
        },
        3: {
            title: 'Integración de IA en Análisis Espacial',
            content: `
                <p>La inteligencia artificial está revolucionando el análisis espacial, automatizando procesos complejos y descubriendo patrones que antes eran imperceptibles.</p>
                
                <h3>Machine Learning para Detección de Patrones</h3>
                <p>Los algoritmos de ML pueden identificar patrones espaciales complejos en grandes datasets, facilitando la detección de cambios ambientales y tendencias urbanas.</p>
                
                <h3>Procesamiento de Imágenes Satelitales</h3>
                <p>Las redes neuronales convolucionales han transformado el análisis de imágenes satelitales, permitiendo clasificación automatizada de uso de suelo y detección de cambios.</p>
                
                <h3>Predicción Espaciotemporal</h3>
                <p>Los modelos de IA pueden predecir eventos futuros basados en patrones históricos espaciales, crucial para la gestión de riesgos y la planificación urbana.</p>
            `
        },
        4: {
            title: 'Desarrollo de Geoportales con Tecnologías Modernas',
            content: `
                <p>El desarrollo de geoportales ha evolucionado significativamente con las nuevas tecnologías web, ofreciendo mejor rendimiento y experiencia de usuario.</p>
                
                <h3>Arquitectura basada en Microservicios</h3>
                <p>Los geoportales modernos utilizan arquitecturas de microservicios que permiten escalabilidad y mantenimiento más eficiente de los sistemas de información geográfica.</p>
                
                <h3>APIs RESTful para Datos Geoespaciales</h3>
                <p>La implementación de APIs bien estructuradas facilita la integración con múltiples fuentes de datos y permite el desarrollo de aplicaciones cliente diversas.</p>
                
                <h3>Optimización de Rendimiento</h3>
                <p>Técnicas como lazy loading, caching inteligente y optimización de consultas espaciales son esenciales para geoportales con grandes volúmenes de datos.</p>
            `
        },
        5: {
            title: 'Python para Análisis Geoespacial Avanzado',
            content: `
                <p>Python se ha consolidado como el lenguaje principal para análisis geoespacial, ofreciendo un ecosistema robusto de bibliotecas especializadas.</p>
                
                <h3>GeoPandas para Análisis Vectorial</h3>
                <p>GeoPandas extiende pandas con capacidades espaciales, facilitando el análisis de datos geográficos vectoriales con sintaxis familiar para científicos de datos.</p>
                
                <h3>Rasterio para Datos Raster</h3>
                <p>Rasterio proporciona herramientas eficientes para el procesamiento de datos raster, incluyendo imágenes satelitales y modelos de elevación digital.</p>
                
                <h3>Integración con Jupyter Notebooks</h3>
                <p>Los notebooks de Jupyter ofrecen un entorno ideal para análisis geoespacial exploratorio, combinando código, visualizaciones y documentación.</p>
            `
        }
    };
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const postId = btn.getAttribute('data-post');
            const post = blogPosts[postId];
            
            if (post) {
                modalTitle.textContent = post.title;
                modalContent.innerHTML = post.content;
                modal.classList.remove('hidden');
                
                // Animate modal entrance
                anime({
                    targets: '.modal-content',
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            }
        });
    });
    
    // Close modal
    [modalClose, modalOverlay].forEach(element => {
        if (element) {
            element.addEventListener('click', () => {
                anime({
                    targets: '.modal-content',
                    opacity: [1, 0],
                    scale: [1, 0.8],
                    duration: 200,
                    easing: 'easeOutExpo',
                    complete: () => {
                        modal.classList.add('hidden');
                    }
                });
            });
        }
    });
}

// ============ PORTFOLIO ============
function initializePortfolio() {
    const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');
    const portfolioItems = document.querySelectorAll('.project-case-study');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter portfolio items
            filterPortfolioItems(portfolioItems, filter);
        });
    });
}

function filterPortfolioItems(items, filter) {
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            anime({
                targets: item,
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 400,
                easing: 'easeOutExpo',
                begin: () => {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                }
            });
        } else {
            anime({
                targets: item,
                opacity: [1, 0],
                scale: [1, 0.9],
                duration: 400,
                easing: 'easeOutExpo',
                complete: () => {
                    item.classList.add('hidden');
                }
            });
        }
    });
}

// ============ GEOPORTAL ============
function initializeGeoportal() {
    if (map) return; // Already initialized
    
    setTimeout(() => {
        initializeMap();
        initializeLayerControls();
        initializeCharts();
        setupMapControls();
    }, 100);
}

function initializeMap() {
    const mapContainer = document.getElementById('geoportal-map');
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }

    // Initialize Leaflet map
    map = L.map('geoportal-map').setView([19.4326, -99.1332], 10);

    // Add default basemap
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Store basemap layers
    const baseMaps = {
        'osm': osmLayer,
        'satellite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri'
        }),
        'terrain': L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenTopoMap contributors'
        })
    };

    // Add sample data layers
    addSampleDataLayers();

    // Store basemaps for switching
    window.baseMaps = baseMaps;
    
    console.log('Map initialized successfully');
}

function addSampleDataLayers() {
    // Add sample population density layer (mock data)
    const populationLayer = L.layerGroup();
    
    // Add some sample markers for demonstration
    const samplePoints = [
        [19.4326, -99.1332, 'Centro', 'alta'],
        [19.3910, -99.1570, 'Roma Norte', 'media'],
        [19.4140, -99.1700, 'Condesa', 'alta'],
        [19.3500, -99.1800, 'San Ángel', 'baja'],
        [19.4800, -99.1200, 'Polanco', 'muy alta']
    ];

    samplePoints.forEach(point => {
        const [lat, lng, name, density] = point;
        const color = getDensityColor(density);
        
        const marker = L.circleMarker([lat, lng], {
            radius: getDensitySize(density),
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7
        });
        
        marker.bindPopup(`
            <div class="popup-content">
                <h4>${name}</h4>
                <p>Densidad: ${density}</p>
                <p>Población estimada: ${Math.floor(Math.random() * 50000 + 10000)}</p>
            </div>
        `);
        
        populationLayer.addLayer(marker);
    });

    // Add infrastructure layer
    const infrastructureLayer = L.layerGroup();
    
    // Add sample infrastructure lines
    const roadCoords = [
        [[19.4326, -99.1332], [19.4140, -99.1700]],
        [[19.3910, -99.1570], [19.4800, -99.1200]],
        [[19.3500, -99.1800], [19.4326, -99.1332]]
    ];

    roadCoords.forEach(coords => {
        const road = L.polyline(coords, {
            color: '#ff6b6b',
            weight: 4,
            opacity: 0.8
        });
        infrastructureLayer.addLayer(road);
    });

    // Environmental layer (sample points)
    const environmentalLayer = L.layerGroup();
    
    const environmentalPoints = [
        [19.4200, -99.1400, 'Estación Centro', 'Buena'],
        [19.3800, -99.1600, 'Estación Sur', 'Regular'],
        [19.4600, -99.1100, 'Estación Norte', 'Buena']
    ];

    environmentalPoints.forEach(point => {
        const [lat, lng, name, quality] = point;
        const color = quality === 'Buena' ? '#4CAF50' : quality === 'Regular' ? '#FF9800' : '#f44336';
        
        const marker = L.circleMarker([lat, lng], {
            radius: 8,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        marker.bindPopup(`
            <div class="popup-content">
                <h4>${name}</h4>
                <p>Calidad del aire: ${quality}</p>
                <p>PM2.5: ${Math.floor(Math.random() * 50 + 10)} µg/m³</p>
            </div>
        `);
        
        environmentalLayer.addLayer(marker);
    });

    // Store layers
    currentLayers = {
        population: populationLayer,
        infrastructure: infrastructureLayer,
        environmental: environmentalLayer
    };

    // Add default visible layer
    map.addLayer(populationLayer);
}

function getDensityColor(density) {
    const colors = {
        'baja': '#fee5d9',
        'media': '#fcbba1',
        'alta': '#fc9272',
        'muy alta': '#de2d26'
    };
    return colors[density] || '#fee5d9';
}

function getDensitySize(density) {
    const sizes = {
        'baja': 8,
        'media': 12,
        'alta': 16,
        'muy alta': 20
    };
    return sizes[density] || 8;
}

function initializeLayerControls() {
    const layerToggles = document.querySelectorAll('.layer-toggle');
    const opacitySliders = document.querySelectorAll('.opacity-slider');

    layerToggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const layerId = e.target.getAttribute('data-layer');
            const layer = currentLayers[layerId];
            
            if (layer && map) {
                if (e.target.checked) {
                    map.addLayer(layer);
                    animateLayerToggle(e.target.closest('.layer-item'), true);
                } else {
                    map.removeLayer(layer);
                    animateLayerToggle(e.target.closest('.layer-item'), false);
                }
            }
        });
    });

    opacitySliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const layerId = e.target.getAttribute('data-layer');
            const opacity = e.target.value / 100;
            const layer = currentLayers[layerId];
            
            if (layer && map && map.hasLayer(layer)) {
                layer.eachLayer(sublayer => {
                    if (sublayer.setStyle) {
                        sublayer.setStyle({ fillOpacity: opacity, opacity: opacity });
                    }
                });
            }
        });
    });
}

function animateLayerToggle(layerItem, isVisible) {
    if (!layerItem) return;
    
    anime({
        targets: layerItem,
        backgroundColor: isVisible ? 
            ['rgba(194, 226, 83, 0.1)', 'rgba(194, 226, 83, 0.2)'] : 
            ['rgba(194, 226, 83, 0.2)', 'rgba(194, 226, 83, 0.1)'],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

function setupMapControls() {
    // Fullscreen button
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // Basemap selector
    const basemapSelect = document.getElementById('basemap-select');
    if (basemapSelect) {
        basemapSelect.addEventListener('change', (e) => {
            const selectedBasemap = e.target.value;
            switchBasemap(selectedBasemap);
        });
    }
}

function toggleFullscreen() {
    const mapContainer = document.querySelector('.map-container');
    const isFullscreen = mapContainer.classList.contains('fullscreen');
    
    if (!isFullscreen) {
        mapContainer.classList.add('fullscreen');
        mapContainer.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 9999 !important;
        `;
    } else {
        mapContainer.classList.remove('fullscreen');
        mapContainer.style.cssText = '';
    }
    
    // Resize map after transition
    setTimeout(() => {
        if (map) map.invalidateSize();
    }, 300);
}

function switchBasemap(basemapType) {
    if (!map || !window.baseMaps) return;
    
    // Remove current basemap
    map.eachLayer(layer => {
        if (layer._url && layer._url.includes('tile')) {
            map.removeLayer(layer);
        }
    });
    
    // Add new basemap
    const newBasemap = window.baseMaps[basemapType];
    if (newBasemap) {
        map.addLayer(newBasemap);
    }
}

function initializeCharts() {
    // Population distribution chart
    const populationCtx = document.getElementById('populationChart');
    if (populationCtx) {
        charts.population = new Chart(populationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Urbana', 'Suburbana', 'Rural'],
                datasets: [{
                    data: [45, 35, 20],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#EFEFEF',
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }

    // Temporal trends chart
    const temporalCtx = document.getElementById('temporalChart');
    if (temporalCtx) {
        charts.temporal = new Chart(temporalCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Indicador A',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: '#c2e253',
                    backgroundColor: 'rgba(194, 226, 83, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#EFEFEF',
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(160, 160, 160, 0.2)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(160, 160, 160, 0.2)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    }
                }
            }
        });
    }
}

// ============ CONTACT FORM ============
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('¡Mensaje enviado correctamente! Te responderé pronto.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Animate form reset
        anime({
            targets: contactForm,
            scale: [0.98, 1],
            duration: 400,
            easing: 'easeOutQuad'
        });
    }, 1500);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-left: 4px solid ${type === 'success' ? '#c2e253' : '#ff6b6b'};
        color: var(--color-text);
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutExpo'
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 100],
            opacity: [1, 0],
            duration: 400,
            easing: 'easeOutExpo',
            complete: () => {
                notification.remove();
            }
        });
    }, 5000);
}

// ============ SCROLL ANIMATIONS ============
function initializeScrollAnimations() {
    // Add scroll-triggered animations to elements
    const animateElements = document.querySelectorAll('.section-title, .about-text, .contact-info');
    
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
}

// ============ UTILITY FUNCTIONS ============
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize handler
window.addEventListener('resize', debounce(() => {
    Object.values(charts).forEach(chart => {
        if (chart && chart.resize) {
            chart.resize();
        }
    });
    
    if (map) {
        map.invalidateSize();
    }
}, 250));