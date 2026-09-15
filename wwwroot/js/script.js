document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Año dinámico en el footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar: sombra al hacer scroll ---------- */
  var siteNav = document.getElementById('siteNav');
  function handleNavScroll () {
    if (window.scrollY > 20) {
      siteNav.classList.add('is-scrolled');
    } else {
      siteNav.classList.remove('is-scrolled');
    }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  /* ---------- Menú móvil (hamburguesa) ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar el menú móvil al elegir una opción
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Resaltar el enlace activo según la sección visible ---------- */
  var sections = ['nosotros', 'servicios', 'contacto']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var navAnchors = Array.prototype.slice.call(navLinks.querySelectorAll('.nav-link'));

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ---------- Indicadores personalizados del carrusel ---------- */
  var carouselEl = document.getElementById('serviciosCarousel');
  var dotsWrap = document.getElementById('carouselDots');
  var slides = carouselEl.querySelectorAll('.carousel-item');

  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', function () {
      bootstrap.Carousel.getOrCreateInstance(carouselEl).to(i);
    });
    dotsWrap.appendChild(dot);
  });

  carouselEl.addEventListener('slide.bs.carousel', function (e) {
    var dots = dotsWrap.querySelectorAll('button');
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === e.to);
    });
  });

  /* ---------- Formulario de contacto ---------- */
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var successBox = document.getElementById('formSuccess');
  var errorBox = document.getElementById('formError');

  // IMPORTANTE: reemplaza este correo por el correo real de la empresa.
  // FormSubmit envía el contenido del formulario a esta dirección sin necesitar backend propio.
  var CONTACT_EMAIL = 'contacto@metalsac.pe';
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    successBox.classList.remove('is-visible');
    errorBox.classList.remove('is-visible');

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      var firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var data = {
      nombre: form.nombre.value.trim(),
      telefono: form.telefono.value.trim(),
      correo: form.correo.value.trim(),
      servicio: form.servicio.value,
      mensaje: form.mensaje.value.trim(),
      _subject: 'Nueva solicitud de cotización — METALSAC'
    };

    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Respuesta no válida del servidor');
        return res.json();
      })
      .then(function () {
        successBox.classList.add('is-visible');
        form.reset();
        form.classList.remove('was-validated');
      })
      .catch(function () {
        errorBox.classList.add('is-visible');
      })
      .finally(function () {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
      });
  });

  // Quita el estado de error de un campo en cuanto el usuario corrige
  form.querySelectorAll('.form-control, .form-select').forEach(function (field) {
    field.addEventListener('input', function () {
      if (field.checkValidity()) field.classList.remove('is-invalid');
    });
  });

});
