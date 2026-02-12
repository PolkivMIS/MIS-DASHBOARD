let currentEditLink = null;

// Function to load a page into the iframe and highlight the selected button
function loadPage(url, button, showSubtabs = false, editLink = null) {
  const iframe = document.getElementById('viewer');
  const placeholder = document.getElementById('iframePlaceholder');
  const subtabs = document.getElementById('subtabs');
  const editBtn = document.getElementById('editFormBtn');

  // Load the iframe content
  if (iframe) iframe.src = url;

  // Show/hide placeholder depending on whether a URL is provided
  if (placeholder) {
    if (url && url.trim() !== "") {
      placeholder.style.display = "none";
    } else {
      placeholder.style.display = "flex";
    }
  }

  // If the clicked element is a main sidebar button (.cta)
  if (button && button.classList.contains('cta')) {
    // Remove active class from all main buttons
    document.querySelectorAll('.cta').forEach(btn => btn.classList.remove('active'));
    // Add active class to the clicked button
    button.classList.add('active');
    // Save the selected URL
    localStorage.setItem('lastSelectedUrl', url);

    // Toggle subtabs only for the special Forms button
    if (subtabs) {
      subtabs.style.display = showSubtabs ? 'flex' : 'none';
    }
    if (editBtn) {
      editBtn.style.display = editLink ? 'block' : 'none';
    }
  } else {
    // If a subtab is clicked, keep subtabs visible
    if (subtabs) subtabs.style.display = 'flex';
    if (editBtn) editBtn.style.display = editLink ? 'block' : 'none';
    // Save URL
    localStorage.setItem('lastSelectedUrl', url);
  }

  // Save current edit link for overlay button
  currentEditLink = editLink;
}

// On page load, start clean: no tab or subtab preselected
window.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('lastSelectedUrl');

  const iframe = document.getElementById('viewer');
  const placeholder = document.getElementById('iframePlaceholder');
  const subtabs = document.getElementById('subtabs');
  const editBtn = document.getElementById('editFormBtn');

  if (iframe) iframe.src = ""; // keep iframe blank
  if (placeholder) placeholder.style.display = "flex"; // show placeholder
  if (subtabs) subtabs.style.display = 'none';
  if (editBtn) editBtn.style.display = 'none';

  // Ensure no sidebar button starts active
  document.querySelectorAll('.cta').forEach(btn => btn.classList.remove('active'));
});

// Function to open the current script/editor link in a new tab
function openEditForm() {
  if (currentEditLink) {
    window.open(currentEditLink, '_blank');
  }
}
