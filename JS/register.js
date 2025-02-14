document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate inputs
    if (!name || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Disable the submit button to prevent multiple requests
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    // Perform the fetch request for registration
    fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        submitButton.disabled = false; // Re-enable the submit button

        if (data.success) {
            alert(data.message); // Show success message
            window.location.href = 'login.php'; // Redirect to login page
        } else {
            alert(data.message); // Show error message
        }
    })
    .catch(error => {
        submitButton.disabled = false; // Re-enable the submit button on error
        console.error('Error:', error); // Log error to console
        alert('An error occurred. Please try again.'); // Show generic error message
    });
});
