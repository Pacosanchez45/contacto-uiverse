const yearSpan = document.getElementById('y');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const lang = document.documentElement.lang === 'en' ? 'en' : 'es';

const messages = {
  es: {
    name: 'Escribe tu nombre',
    email: 'Correo no válido',
    message: 'Cuéntame algo sobre tu proyecto',
    sending: 'Enviando mensaje...'
  },
  en: {
    name: 'Enter your name',
    email: 'Enter a valid email',
    message: 'Tell me something about your project',
    sending: 'Sending message...'
  }
};

if (form && toast) {
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

  const validate = () => {
    let ok = true;
    const name = form.elements.name;
    const email = form.elements.email;
    const message = form.elements.message;
    const t = messages[lang];

    if (!name.value.trim()) {
      setError(name, t.name);
      ok = false;
    } else {
      clearError(name);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      setError(email, t.email);
      ok = false;
    } else {
      clearError(email);
    }

    if (!message.value.trim()) {
      setError(message, t.message);
      ok = false;
    } else {
      clearError(message);
    }

    return ok;
  };

  form.addEventListener('submit', (event) => {
    if (!validate()) {
      event.preventDefault();
      return;
    }

    showToast(messages[lang].sending);
  });
}
