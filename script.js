const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const toast = document.getElementById('toast');
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showToast(`${link.dataset.demo} is a portfolio concept. Replace this with your live project URL.`);
  });
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const note = document.getElementById('formNote');

  if (!name || !email || !message) return;

  // Demo behaviour: replace this with Formspree, EmailJS, a Flask endpoint,
  // or your own backend when you are ready to receive enquiries.
  note.textContent = `Thanks, ${name}. The form is working in demo mode.`;
  event.target.reset();
  showToast('Enquiry captured — connect a backend to receive it by email.');
});
