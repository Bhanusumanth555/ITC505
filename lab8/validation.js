document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      let firstName = document.getElementById('firstName').value.trim();
      let lastName = document.getElementById('lastName').value.trim();
      let email = document.getElementById('email').value.trim();
      let password = document.getElementById('password').value.trim();
      let confirmPassword = document.getElementById('confirmPassword').value.trim();
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const xssPattern = /<[^>]*script|on\w+\s*=|javascript:/i;
  
      // Validation
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('All fields must be filled out.');
        return;
      }
  
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
  
      if (xssPattern.test(firstName) || xssPattern.test(lastName) || xssPattern.test(email)) {
        alert('Input contains forbidden characters.');
        return;
      }
  
      // All good — show success message
      document.getElementById('successMessage').style.display = 'block';
      form.reset();
    });
  });
  