document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Please fill in both email and password fields.');
        return;
    }

    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    fetch('login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        submitButton.disabled = false;
        if (data.success) {
            alert(data.message);
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        submitButton.disabled = false;
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
