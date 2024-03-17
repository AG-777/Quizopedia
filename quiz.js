document.addEventListener('DOMContentLoaded', function () {
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
  
    difficultyButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const difficulty = button.getAttribute('data-difficulty');
        alert(`You selected ${difficulty} difficulty!`);
      });
    });
  });
  