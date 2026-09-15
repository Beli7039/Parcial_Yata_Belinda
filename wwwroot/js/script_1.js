function showSection(sectionId, element) {
    // 1. Ocultar todas las secciones añadiendo la clase d-none de Bootstrap
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('d-none');
    });

    // 2. Mostrar únicamente la sección solicitada quitando d-none
    const targetSection = document.getElementById('sec-' + sectionId);
    if (targetSection) {
        targetSection.classList.remove('d-none');
    }

    // 3. Cambiar la clase "active" en la barra de navegación (opcional pero recomendado)
    if (element) {
        const links = document.querySelectorAll('.navbar-nav .nav-link');
        links.forEach(link => link.classList.remove('active'));
        element.classList.add('active');
    }
}