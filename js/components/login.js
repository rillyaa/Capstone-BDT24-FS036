// login-form.js
class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link href="https://fonts.googleapis.com/css2?family=Alkatra:wght@400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
            <style>
                body {
                    background-image: url('../img/bg.png'); /* Ganti dengan path gambar Anda */
                    background-size: cover;
                    background-position: center;    
                    background-repeat: no-repeat;
                    background-attachment: fixed;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: 'Poppins', sans-serif;
                }

                .navbar {
                    position: absolute;
                    top: 20px;
                    left: 50px;
                    width: 100%;
                    background-color: transparent;
                    z-index: 10; 
                }

                .navbar .logo {
                    height: 40px; 
                    margin-right: 10px; 
                }

                .login-container {
                    background-color: #f5f5f5;
                    padding: 40px;
                    border-radius: 30px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    max-width: 400px;
                    width: 100%;
                }

                .login-container h2 {
                    font-size: 16px;
                    color: #888;
                    margin-bottom: 10px;
                }

                .login-container h1 {
                    font-size: 26px;
                    color: #000;
                    margin-bottom: 30px;
                }

                .login-container label {
                    display: block;
                    text-align: left;
                    margin-bottom: 8px;
                    font-weight: bold;
                }

                .login-container input,
                .login-container button {
                    width: 100%;
                    box-sizing: border-box;
                }

                .login-container input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 20px;
                    border: 1px solid #ccc;
                    border-radius: 7px;
                }

                .login-container button {
                    width: 100%;
                    padding: 10px;
                    background-color: #4DA8B5;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                }

                .login-container button:hover {
                    background-color: #2f7883;
                }

                .login-container p {
                    text-align: center;
                    font-size: smaller;
                    margin-top: 20px;
                }

                .login-container a {
                    color: #4DA8B5;
                    text-decoration: none;
                }

                .login-container a:hover {
                    text-decoration: underline;
                }
            </style>
            <nav class="navbar navbar-light">
                <a href="index.html" class="navbar-brand p-0">
                    <img src="img/Logo.png" alt="YOGYASAMBAT Logo" class="logo">
                    <img src="img/Logo_Yogya.png" alt="YOGYASAMBAT Logo" class="logo">
                </a>
            </nav>
            <div class="login-container">
                <h2>Masukkan Akun</h2>
                <h1>Lanjutkan Perjalananmu</h1>
                <form>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>

                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>

                    <button type="submit">Sign In</button>

                    <p>Belum memiliki akun? <a href="register.html"><b>Sign Up</b></a></p>
                </form>
            </div>
        `;
    }
}

customElements.define('login-form', LoginForm);
