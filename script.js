document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DE LA BARRA DE NAVEGACIÓN MÓVIL (HAMBURGER) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cierra el menú cuando se hace clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Se asume que al hacer clic en un enlace se quiere cerrar el menú
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // --- 2. LÓGICA DEL ACORDEÓN (FAQ) ---
    const accordionTitles = document.querySelectorAll('.accordion-title');

    accordionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const content = title.nextElementSibling;

            // Cierra todos los demás
            accordionTitles.forEach(otherTitle => {
                if (otherTitle !== title && otherTitle.classList.contains('active')) {
                    otherTitle.classList.remove('active');
                    otherTitle.nextElementSibling.style.maxHeight = null;
                    otherTitle.nextElementSibling.style.padding = '0 25px';
                }
            });

            // Abre o cierra el actual
            title.classList.toggle('active');
            if (content.style.maxHeight) {
                // Cierra
                content.style.maxHeight = null;
                content.style.padding = '0 25px';
            } else {
                // Abre
                // Se usa scrollHeight para obtener la altura real del contenido, incluyendo padding
                content.style.maxHeight = content.scrollHeight + 20 + 'px'; // +20 para el padding inferior
                content.style.padding = '0 25px 20px 25px';
            }
        });
    });


    // --- 3. LÓGICA DEL CARRUSEL DE TESTIMONIOS (Ajustado para Responsiveness) ---
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    // Si no hay elementos, detener la ejecución del carrusel
    if (!track || cards.length === 0) return;

    let currentIndex = 0;

    const updateCarousel = () => {
        // Obtenemos el ancho del contenedor padre del track
        const containerWidth = track.parentElement.clientWidth;
        
        // Asumimos que queremos que cada paso sea el ancho del contenedor (una tarjeta visible a la vez)
        const offset = -currentIndex * containerWidth;
        track.style.transform = `translateX(${offset}px)`;
        
        // Ajustamos la visibilidad de los botones al llegar a los límites
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === cards.length - 1;
    };
    
    // Inicializa los botones
    updateCarousel();

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Asegura que el carrusel se actualice al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        updateCarousel();
        // Forzamos un reinicio de posición al redimensionar para evitar errores visuales
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        currentIndex = 0;
        setTimeout(() => {
             track.style.transition = 'transform 0.3s ease-in-out';
             updateCarousel();
        }, 50);
    });

    // 4. LÓGICA DE ANIMACIÓN AL HACER SCROLL (AOS Simple)
    // El código aquí es perfecto y no necesita cambios.
    const elementsToAnimate = document.querySelectorAll('.fade-up, .fade-in');

    const checkScroll = () => {
        const windowHeight = window.innerHeight;
        
        elementsToAnimate.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            // Si el elemento está 1/8 de la altura de la ventana visible
            if (elTop < windowHeight * 0.875) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkScroll);
    // Ejecutar al cargar para animar los elementos visibles al inicio
    checkScroll();
});