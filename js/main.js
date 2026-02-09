// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // CAROUSEL FUNCTIONALITY
  // ============================================
  const carousel = document.querySelector('[data-carousel]');
  
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('[data-prev]');
    const nextBtn = carousel.querySelector('[data-next]');
    const images = track.querySelectorAll('img');
    
    let currentIndex = 0;
    const totalImages = images.length;
    
    // Function to update carousel position
    function updateCarousel() {
      const offset = -currentIndex * 100;
      track.style.transform = `translateX(${offset}%)`;
    }
    
    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
      });
    }
    
    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
      });
    }
    
    // Auto-play carousel every 10 seconds
    setInterval(function() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    }, 10000);
  }

  // ============================================
  // MEMBER DIALOG FUNCTIONALITY
  // ============================================
  
  // Get DOM elements
  const dialog = document.getElementById('memberDialog');
  const dialogOverlay = document.getElementById('dialogOverlay');
  const dialogClose = document.getElementById('dialogClose');
  const dialogImage = document.getElementById('dialogImage');
  const dialogName = document.getElementById('dialogName');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogDescription = document.getElementById('dialogDescription');
  const dialogMajor = document.getElementById('dialogMajor');
  const dialogYear = document.getElementById('dialogYear');
  const dialogHometown = document.getElementById('dialogHometown');

  // Only run member dialog code if dialog exists on page
  if (dialog) {
    // Get all member circles
    const memberCircles = document.querySelectorAll('.member-circle');

    // Function to open dialog
    function openDialog(memberElement) {
      // Read data from the clicked element's data attributes
      const name = memberElement.getAttribute('data-name');
      const title = memberElement.getAttribute('data-title');
      const major = memberElement.getAttribute('data-major');
      const year = memberElement.getAttribute('data-year');
      const hometown = memberElement.getAttribute('data-hometown');
      const description = memberElement.getAttribute('data-description');
      const image = memberElement.getAttribute('data-image');
      
      // Populate dialog with member data
      if (dialogImage) {
        dialogImage.src = image;
        dialogImage.alt = name;
      }
      if (dialogName) dialogName.textContent = name;
      if (dialogTitle) dialogTitle.textContent = title;
      if (dialogDescription) dialogDescription.textContent = description;
      if (dialogMajor) dialogMajor.textContent = major;
      if (dialogYear) dialogYear.textContent = year;
      if (dialogHometown) dialogHometown.textContent = hometown;
      
      // Show dialog
      dialog.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close dialog
    function closeDialog() {
      dialog.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }

    // Add click event to all member circles
    memberCircles.forEach(circle => {
      circle.addEventListener('click', (e) => {
        e.preventDefault();
        openDialog(circle);
      });
    });

    // Close dialog when clicking close button
    if (dialogClose) {
      dialogClose.addEventListener('click', closeDialog);
    }

    // Close dialog when clicking overlay
    if (dialogOverlay) {
      dialogOverlay.addEventListener('click', closeDialog);
    }

    // Close dialog with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dialog.classList.contains('active')) {
        closeDialog();
      }
    });

    // Prevent closing when clicking inside dialog content
    const dialogContent = document.getElementById('dialogContent');
    if (dialogContent) {
      dialogContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }
  
}); // End DOMContentLoaded