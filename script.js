document.getElementById('preorder-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const imageId = document.querySelector('input[name="image"]:checked').value;
  
    console.log(`Preorder submitted: ${email}, ${imageId}`);
    alert('Preorder successful!');
  });
  
  document.querySelectorAll('input[name="image"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      document.querySelectorAll('img').forEach((img) => {
        img.classList.remove('selected');
      });
      event.target.nextElementSibling.querySelector('img').classList.add('selected');
    });
  });
  