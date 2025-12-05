// Año en footer
const yearSpan = document.getElementById('y');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const form  = document.getElementById('contactForm');
const toast = document.getElementById('toast');

// Si no estamos en la página de contacto, salimos
if (form && toast) {

  // Utilidades
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  };

  const setError = (el, msg) => {
    const small = el.parentElement.querySelector('.error');
    if (small) small.textContent = msg;
  };

  const clearError = (el) => {
    const small = el.parentElement.querySelector('.error');
    if (small) small.textContent = '';
  };

  // Validación simple
  const validate = () => {
    let ok = true;
    const name    = form.elements['name'];
    const email   = form.elements['email'];
    const message = form.elements['message'];

    if (!name.value.trim()) {
      setError(name, 'Escribe tu nombre');
      ok = false;
    } else {
      clearError(name);
    }

    const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!er.test(email.value.trim())) {
      setError(email, 'Correo no válido');
      ok = false;
    } else {
      clearError(email);
    }

    if (!message.value.trim()) {
      setError(message, 'Cuéntame algo sobre tu proyecto');
      ok = false;
    } else {
      clearError(message);
    }

    return ok;
  };

  // Envío a Formspree: solo bloqueamos si hay errores
  form.addEventListener('submit', (e) => {
    if (!validate()) {
      e.preventDefault(); // no se envía a Formspree
      return;
    }

    // ✅ Si es válido, NO hacemos preventDefault → el navegador POSTEA a Formspree
    showToast('Enviando mensaje…');
    // Formspree mostrará la página de "Thanks" o la que hayas configurado
  });

  // WhatsApp
  const btnWhats = document.getElementById('btnWhats');
  if (btnWhats) {
    btnWhats.addEventListener('click', () => {
      const name = form.elements['name'].value.trim();
      const msg  = form.elements['message'].value.trim();

      const text = encodeURIComponent(
        `Hola Francisco, soy ${name || '—'}. ${msg || 'Te escribo desde tu portfolio.'}`
      );

      // Sustituye por tu número real en formato internacional sin '+'
      window.open(`https://wa.me/34XXXXXXXXX?text=${text}`, '_blank');
    });
  }
}
