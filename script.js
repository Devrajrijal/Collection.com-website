 // Particle Animation
 function createParticles() {
    const container = document.body;
    for(let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            width: ${Math.random() * 20 + 10}px;
            height: ${Math.random() * 20 + 10}px;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 5 + 5}s infinite;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        container.appendChild(particle);
    }
}
createParticles();

// Vue.js Application
const { createApp } = Vue;

createApp({
data() {
return {
    showLogin: true,
    loginEmail: '',
    loginPassword: '',
    registerName: '',
    registerEmail: '',
    registerPassword: ''
}
},
methods: {
toggleForms() {
    this.showLogin = !this.showLogin;
},
handleLogin() {
    if(this.validateLogin()) {
        // Simulate API call
        setTimeout(() => {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', this.loginEmail);
            window.location.href = 'home.html';
        }, 500);
    }
},
handleRegister() {
    if(this.validateRegister()) {
        // Simulate API call
        setTimeout(() => {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', this.registerName);
            localStorage.setItem('userEmail', this.registerEmail);
            window.location.href = 'home.html';
        }, 500);
    }
},
validateLogin() {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    ['loginEmailInput', 'loginPasswordInput'].forEach(ref => this.clearError(ref));

    if (!this.loginEmail) {
        this.showError('loginEmailInput', 'Please enter email');
        isValid = false;
    } else if (!emailRegex.test(this.loginEmail)) {
        this.showError('loginEmailInput', 'Invalid email format');
        isValid = false;
    }

    if (!this.loginPassword) {
        this.showError('loginPasswordInput', 'Please enter password');
        isValid = false;
    }

    return isValid;
},
validateRegister() {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    ['registerNameInput', 'registerEmailInput', 'registerPasswordInput'].forEach(ref => this.clearError(ref));

    if (!this.registerName.trim()) {
        this.showError('registerNameInput', 'Please enter full name');
        isValid = false;
    }

    if (!this.registerEmail) {
        this.showError('registerEmailInput', 'Please enter email');
        isValid = false;
    } else if (!emailRegex.test(this.registerEmail)) {
        this.showError('registerEmailInput', 'Invalid email format');
        isValid = false;
    }

    if (!this.registerPassword) {
        this.showError('registerPasswordInput', 'Please enter password');
        isValid = false;
    } else if (!passwordRegex.test(this.registerPassword)) {
        this.showError('registerPasswordInput', 'Password must be at least 8 characters with one uppercase, one number, and one special character');
        isValid = false;
    }

    return isValid;
},
showError(refName, message) {
    const inputEl = this.$refs[refName];
    if (!inputEl) return;

    const formGroup = inputEl.closest('.form-group');
    if (!formGroup) return;

    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
    }
},
clearError(refName) {
    const inputEl = this.$refs[refName];
    if (!inputEl) return;

    const formGroup = inputEl.closest('.form-group');
    if (!formGroup) return;

    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.textContent = '';
    }
}
}
}).mount('#authApp');