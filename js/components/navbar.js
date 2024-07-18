// custom-navbar.js
class CustomNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"/>
            <link href="css/bootstrap.min.css" rel="stylesheet"/>
            <style>
                :host {
                    display: block;
                }
                .navbar-light .navbar-nav .nav-link {
                    font-family: "Nunito", sans-serif;
                    position: relative;
                    margin-right: 25px;
                    padding: 35px 0;
                    color: #000000 !important;
                    font-size: 18px;
                    font-weight: 600;
                    outline: none;
                    transition: 0.5s;
                }
                .navbar-light .navbar-nav .nav-link:hover,
                .navbar-light .navbar-nav .nav-link.active {
                    color: var(--primary) !important;
                }
                .navbar-light .navbar-brand img {
                    max-height: 60px;
                    transition: 0.5s;
                }
            </style>
            <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                <a href="#" class="navbar-brand p-0">
                    <img src="img/Logo.png" alt="YOGYASAMBAT Logo" class="logo">
                    <img src="img/Logo_Yogya.png" alt="YOGYASAMBAT Logo" class="logo">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto py-0">
                        <a href="index.html" class="nav-item nav-link active">BERANDA</a>
                        <a href="trending.html" class="nav-item nav-link">TRENDING</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">LAYANAN</a>
                            <div class="dropdown-menu m-0">
                                <a href="ajukan.html" class="dropdown-item">Ajukan Pengaduan</a>
                                <a href="status.html" class="dropdown-item">Status Pengaduan</a>
                                <a href="faq.html" class="dropdown-item">FAQ</a>
                            </div>
                        </div>
                        <a href="tentang.html" class="nav-item nav-link">TENTANG KAMI</a>
                        <a href="login.html" class="nav-item nav-link">MASUK</a>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);
