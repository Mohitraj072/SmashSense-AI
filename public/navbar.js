/**
 * SmashSense.AI Reusable Navigation Bar Loader
 * Fetches /navbar.html and injects it into #navbar-container or document.body
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/navbar.html');
    if (!res.ok) {
      console.warn('Failed to load /navbar.html:', res.statusText);
      return;
    }

    const htmlContent = await res.text();

    let targetContainer = document.getElementById('navbar-container');
    if (!targetContainer) {
      targetContainer = document.createElement('div');
      targetContainer.id = 'navbar-container';
      document.body.insertBefore(targetContainer, document.body.firstChild);
    }

    targetContainer.innerHTML = htmlContent;

    // Re-execute scripts contained inside navbar.html
    const scripts = targetContainer.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });

  } catch (err) {
    console.error('Error initializing navbar:', err);
  }
});
