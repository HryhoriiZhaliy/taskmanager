document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.success === true) {
      localStorage.setItem('adminLoggedIn', 'true');
      window.location.href = 'admin.html';
    } else {
      alert('❌ Incorrect username or password!');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('⚠️ Server connection error.');
  }
});