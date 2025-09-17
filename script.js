// Espera a que todo el contenido de la página se cargue antes de ejecutar las animaciones.
document.addEventListener('DOMContentLoaded', function() {

    // Creamos una "línea de tiempo" de animación con anime.js
    const timeline = anime.timeline({
        easing: 'easeOutExpo', // Tipo de suavizado para toda la animación
        duration: 1000 // Duración por defecto para cada paso
    });

    // Añadimos los pasos a nuestra línea de tiempo
    timeline
    .add({
        // 1. Animamos el título
        targets: '.anim-titulo', // Seleccionamos el elemento por su clase
        translateY: [-50, 0],   // Se mueve desde 50px arriba hacia su posición original (0)
        opacity: [0, 1],         // Aparece de transparente (0) a opaco (1)
    })
    .add({
        // 2. Animamos el subtítulo (comienza un poco después del título)
        targets: '.anim-subtitulo',
        translateY: [-50, 0],
        opacity: [0, 1],
    }, '-=600') // El '-=600' hace que esta animación empiece 600ms antes de que termine la anterior
    .add({
        // 3. Animamos el botón
        targets: '.anim-boton',
        translateY: [-50, 0],
        opacity: [0, 1],
    }, '-=700'); // Empieza 700ms antes de que termine la animación del subtítulo

});
