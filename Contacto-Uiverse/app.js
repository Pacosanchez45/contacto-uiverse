// Año en footer
document.getElementById('y').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

// Utilidades
const showToast = (msg) => {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
};
const setError = (el, msg) => { el.parentElement.querySelector('.error').textContent = msg; };
const clearError = (el) => { el.parentElement.querySelector('.error').textContent = ''; };

// Validación simple
const validate = () => {
  let ok = true;
  const name = form.elements['name'];
  const email = form.elements['email'];
  const message = form.elements['message'];

  if (!name.value.trim()) { setError(name, 'Escribe tu nombre'); ok = false; } else clearError(name);

  const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!er.test(email.value.trim())) { setError(email, 'Correo no válido'); ok = false; } else clearError(email);

  if (!message.value.trim()) { setError(message, 'Cuéntame algo sobre tu proyecto'); ok = false; } else clearError(message);

  return ok;
};

// Envío por mailto (sin backend)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate()) return;

  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const subject = form.elements['subject'].value.trim() || 'Nuevo contacto desde la web';
  const message = form.elements['message'].value.trim();

  const body = encodeURIComponent(
    `Hola Francisco,\n\nSoy ${name} (${email}).\n\n${message}\n\n— Enviado desde tu portfolio`
  );
  const mail = `mailto:tuemail@dominio.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  window.location.href = mail;
  showToast('Abriendo tu cliente de correo…');
});

// WhatsApp directo
document.getElementById('btnWhats').addEventListener('click', () => {
  const name = form.elements['name'].value.trim();
  const msg = form.elements['message'].value.trim();
  const text = encodeURIComponent(`Hola Francisco, soy ${name || '—'}. ${msg || 'Te escribo desde tu portfolio.'}`);
  // Sustituye 34XXXXXXXXX por tu número en formato internacional (sin +)
  window.open(`https://wa.me/34XXXXXXXXX?text=${text}`, '_blank');
});
