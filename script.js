/* General Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Lato', sans-serif;
    color: #111;
    background-color: #fff;
    line-height: 1.6;
}

a {
    text-decoration: none;
    color: inherit;
    transition: 0.3s;
}

ul {
    list-style: none;
}

/* Typography */
h1, h2, h3, h4 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    text-transform: uppercase;
}

/* Header */
header {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    text-align: center;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    font-size: 12px;
    color: #666;
    margin-bottom: 15px;
}

.logo-container {
    padding: 20px 0;
}

.logo {
    font-size: 3.5rem;
    letter-spacing: 5px;
    margin: 0;
}

.navbar {
    border-top: 1px solid #111;
    border-bottom: 1px solid #111;
    padding: 15px 0;
    margin: 0 5%;
}

.nav-menu {
    display: flex;
    justify-content: center;
    gap: 40px;
}

.nav-menu a {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.nav-menu a:hover {
    color: #777;
}

/* Hero Section */
.hero {
    height: 80vh;
    background: url('https://source.unsplash.com/1600x900/?fashion,editorial') no-repeat center center/cover;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #fff;
}

.hero::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.3);
}

.hero-content {
    position: relative;
    z-index: 1;
    max-width: 600px;
}

.hero-content .category {
    background: #fff;
    color: #000;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
}

.hero-content h2 {
    font-size: 3rem;
    margin: 20px 0;
    letter-spacing: 2px;
}

.btn {
    display: inline-block;
    padding: 10px 30px;
    border: 2px solid #fff;
    color: #fff;
    font-weight: bold;
    margin-top: 20px;
}

.btn:hover {
    background: #fff;
    color: #000;
}

/* Content Container */
.container {
    max-width: 1200px;
    margin: 60px auto;
    padding: 0 20px;
}

.section-title {
    text-align: center;
    margin-bottom: 40px;
}

.section-title h3 {
    font-size: 1.5rem;
    letter-spacing: 3px;
    margin-bottom: 10px;
}

.line {
    width: 50px;
    height: 2px;
    background: #000;
    margin: 0 auto;
}

/* Articles Grid */
.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.card {
    cursor: pointer;
}

.card-img {
    height: 400px;
    background-size: cover;
    background-position: center;
    margin-bottom: 15px;
}

.card-text {
    text-align: center;
}

.tag {
    font-size: 10px;
    font-weight: bold;
    color: #888;
    letter-spacing: 1px;
}

.card-text h4 {
    font-size: 1.5rem;
    margin: 10px 0;
}

.card-text p {
    font-size: 0.9rem;
    color: #555;
}

/* Newsletter */
.newsletter {
    background: #f4f4f4;
    text-align: center;
    padding: 60px 20px;
    margin-top: 50px;
}

.newsletter input {
    padding: 10px;
    width: 300px;
    border: 1px solid #ccc;
    margin-right: 10px;
}

.newsletter button {
    padding: 10px 20px;
    background: #000;
    color: #fff;
    border: none;
    cursor: pointer;
    font-weight: bold;
}

/* Footer */
footer {
    background: #111;
    color: #fff;
    padding: 40px 0;
    text-align: center;
}

.footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    letter-spacing: 2px;
    margin-bottom: 20px;
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
}

.footer-links a:hover {
    text-decoration: underline;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .logo {
        font-size: 2.5rem;
    }
    
    .nav-menu {
        flex-direction: column;
        display: none; /* Hidden by default on mobile */
    }

    .nav-menu.active {
        display: flex;
    }

    .menu-toggle {
        display: block;
        cursor: pointer;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
}
