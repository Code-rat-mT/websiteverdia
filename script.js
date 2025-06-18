function showTab(tabId, buttonElement) {
  const contents = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-button');

  // Hide all tab contents and deactivate all buttons
  contents.forEach(c => c.classList.remove('active'));
  buttons.forEach(b => b.classList.remove('active'));

  // Show the selected tab content and activate the clicked button
  document.getElementById(tabId).classList.add('active');
  buttonElement.classList.add('active');
}

function setupRoadmap(navId) {
  const nav = document.getElementById(navId);
  const items = nav?.querySelectorAll('li');
  if (!items || items.length === 0) return;

  const container = nav.closest('.content-wrapper')?.querySelector('.roadmap-content');
  if (!container) return;

  const sections = container.querySelectorAll('section');

  // Add click event for roadmap items
  items.forEach(item => {
    item.addEventListener('click', () => {
      // Activate clicked item
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const targetId = item.getAttribute('data-target');

      // Show corresponding section
      sections.forEach(section => {
        section.classList.toggle('active', section.id === targetId);
      });

      const targetElem = container.querySelector(`#${targetId}`);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Optional: highlight section while scrolling
  container.addEventListener('scroll', () => {
    let currentActive = null;
    const scrollPosition = container.scrollTop + 30;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPosition) {
        currentActive = section.id;
      }
    });

    if (currentActive) {
      items.forEach(i =>
        i.classList.toggle('active', i.getAttribute('data-target') === currentActive)
      );
      sections.forEach(section =>
        section.classList.toggle('active', section.id === currentActive)
      );
    }
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill all fields.');
    return false;
  }

  alert(`Thank you, ${name}! Your message has been sent.`);
  event.target.reset();
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  setupRoadmap('home-roadmap');
  setupRoadmap('services-roadmap');
  setupRoadmap('projects-roadmap');
  setupRoadmap('partners-roadmap'); // ✅ Added Partners roadmap here
});
