document.getElementById('preorder-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const imageId = document.querySelector('input[name="image"]:checked').value;

  try {
    const response = await fetch('/api/preorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, imageId }),
    });
    const result = await response.json();
    if (response.ok) {
      alert(result.message);
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error processing your preorder.');
  }
});

document.querySelectorAll('input[name="image"]').forEach((input) => {
  input.addEventListener('change', (event) => {
    document.querySelectorAll('img').forEach((img) => {
      img.classList.remove('selected');
    });
    event.target.nextElementSibling.querySelector('img').classList.add('selected');
  });
});
