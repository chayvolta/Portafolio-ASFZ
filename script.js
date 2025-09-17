// Espera a que todo el contenido de la página se cargue
document.addEventListener('DOMContentLoaded', function() {

    // 1. ANIMACIÓN DE ENTRADA PARA EL HERO
    const timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    });

    timeline
    .add({
        targets: '.anim-titulo',
        translateY: [-50, 0],
        opacity: [0, 1],
    })
    .add({
        targets: '.anim-subtitulo',
        translateY: [-50, 0],
        opacity: [0, 1],
    }, '-=600')
    .add({
        targets: '.anim-boton',
        translateY: [-50, 0],
        opacity: [0, 1],
    }, '-=700');

    // 2. ANIMACIÓN DE SCROLL PARA LAS TARJETAS DE PROYECTOS
    
    // Seleccionamos todas las tarjetas
    const projectCards = document.querySelectorAll('.proyecto-card');

    // Si no hay tarjetas en la página, no hacemos nada
    if (projectCards.length > 0) {
        
        // El 'Intersection Observer' es una forma moderna de detectar
        // cuándo un elemento entra en la pantalla.
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Si la tarjeta está en la pantalla...
                if (entry.isIntersecting) {
                    // ...lanzamos la animación.
                    anime({
                        targets: '.proyecto-card',
                        translateY: [30, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(150), // Crea el efecto escalonado
                        easing: 'easeOutExpo',
                        duration: 800,
                    });
                    
                    // Dejamos de observar una vez que la animación se ha disparado
                    observer.disconnect();
                }
            });
        }, {
            // threshold: 0.1 significa que la animación se dispara
            // cuando el 10% de la sección de proyectos es visible.
            threshold: 0.1
        });

        // Le decimos al observador que vigile la primera tarjeta de proyecto.
        observer.observe(projectCards[0]);
    }
});
