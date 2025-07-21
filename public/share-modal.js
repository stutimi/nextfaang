// Share modal functionality
window.addEventListener('load', function() {
  // Only try to add event listeners if elements exist
  const shareButton = document.getElementById('share-button');
  if (shareButton) {
    shareButton.addEventListener('click', function() {
      console.log('Share button clicked');
    });
  }
});
