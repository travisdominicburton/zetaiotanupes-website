// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
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
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateCarousel();
    });
    
    // Optional: Auto-play carousel every 5 seconds
    // Uncomment the lines below if you want automatic sliding
    setInterval(function() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    }, 10000);
  }
});