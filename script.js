function showTab(tabId, buttonElement) {
  const contents = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-button');

  contents.forEach(c => c.classList.remove('active'));
  buttons.forEach(b => b.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.classList.add('active');
  }
  if (buttonElement) {
    buttonElement.classList.add('active');
  }
}

function setupRoadmap(navId) {
  const nav = document.getElementById(navId);
  if (!nav) return;

  const container = nav.closest('.content-wrapper')?.querySelector('.roadmap-content');
  if (!container) return;

  const sections = container.querySelectorAll('section');
  const defaultImage = container.querySelector('.default-image');
  const defaultSectionId = nav.querySelector('li.active')?.getAttribute('data-target');

  // Initial display
  sections.forEach(section => {
    if (section.id === defaultSectionId) {
      section.classList.add('active');
      section.style.display = 'block';
    } else {
      section.classList.remove('active');
      section.style.display = 'none';
    }
  });

  if (defaultImage) {
    defaultImage.style.display = defaultSectionId ? 'none' : 'block';
  }

  const items = nav.querySelectorAll('li');

  if (items.length > 0) {
    // List-based nav
    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const targetId = item.getAttribute('data-target');

        sections.forEach(section => {
          section.classList.remove('active');
          section.style.display = 'none';
        });

        if (defaultImage) defaultImage.style.display = 'none';

        const targetElem = container.querySelector(`#${targetId}`);
        if (targetElem) {
          targetElem.classList.add('active');
          targetElem.style.display = 'block';
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  } else if (nav.tagName === 'SELECT') {
    // Dropdown nav
    nav.addEventListener('change', () => {
      const selectedValue = nav.value;

      sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
      });

      if (!selectedValue) {
        if (defaultImage) defaultImage.style.display = 'block';
      } else {
        if (defaultImage) defaultImage.style.display = 'none';

        const targetElem = container.querySelector(`#${selectedValue}`);
        if (targetElem) {
          targetElem.classList.add('active');
          targetElem.style.display = 'block';
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  // Optional scroll sync (if needed)
  container.addEventListener('scroll', () => {
    let currentActive = null;
    const scrollPosition = container.scrollTop + 30;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPosition && section.style.display !== 'none') {
        currentActive = section.id;
      }
    });

    if (currentActive && items.length > 0) {
      items.forEach(i =>
        i.classList.toggle('active', i.getAttribute('data-target') === currentActive)
      );
      sections.forEach(section =>
        section.classList.toggle('active', section.id === currentActive)
      );
    }
  });
}

// Toggle dropdown visibility
function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Show Home section content beside dropdown
function showHomeSection(sectionId) {
  const container = document.getElementById('home-content');
  const sections = container.querySelectorAll('section');
  const defaultImage = container.querySelector('.default-image');

  // Hide all sections and default image
  sections.forEach(s => s.style.display = 'none');
  if (defaultImage) defaultImage.style.display = 'none';

  document.getElementById('home-dropdown').style.display = 'none';

  const target = document.getElementById(sectionId);
  if (target) {
    target.style.display = 'block';
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    if (defaultImage) defaultImage.style.display = 'block';
  }
}

// Contact form submit handler
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

// Initialize setup on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  ['home-roadmap-select', 'services-roadmap', 'projects-roadmap', 'partners-roadmap'].forEach(setupRoadmap);

  const defaultTab = document.querySelector('.tab-button.active');
  if (defaultTab) {
    const tabId = defaultTab.getAttribute('data-tab') || defaultTab.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
    if (tabId) showTab(tabId, defaultTab);
  }
});
