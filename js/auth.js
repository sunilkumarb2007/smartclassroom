/* ==========================================================================
   TPGIT Vidyut - Authentication Module
   Handles user authentication, sessions, and security
   ========================================================================== */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.token = null;
        this.isAuthenticated = false;
        this.userRole = null;
        this.sessionTimeout = null;
        
        this.init();
    }
    
    init() {
        // Load saved session
        this.loadSession();
        
        // Set up session timeout
        this.setupSessionTimeout();
        
        // Set up auth event listeners
        this.setupEventListeners();
        
        // Check authentication status
        this.checkAuthStatus();
    }
    
    loadSession() {
        try {
            const savedUser = localStorage.getItem('tpgit_user');
            const savedToken = localStorage.getItem('tpgit_token');
            const savedRole = localStorage.getItem('tpgit_role');
            
            if (savedUser && savedToken) {
                this.currentUser = JSON.parse(savedUser);
                this.token = savedToken;
                this.userRole = savedRole;
                this.isAuthenticated = true;
                
                console.log('Session loaded for:', this.currentUser.email);
            }
        } catch (error) {
            console.error('Error loading session:', error);
            this.clearSession();
        }
    }
    
    saveSession(user, token, role) {
        try {
            localStorage.setItem('tpgit_user', JSON.stringify(user));
            localStorage.setItem('tpgit_token', token);
            localStorage.setItem('tpgit_role', role);
            
            this.currentUser = user;
            this.token = token;
            this.userRole = role;
            this.isAuthenticated = true;
            
            console.log('Session saved for:', user.email);
        } catch (error) {
            console.error('Error saving session:', error);
        }
    }
    
    clearSession() {
        localStorage.removeItem('tpgit_user');
        localStorage.removeItem('tpgit_token');
        localStorage.removeItem('tpgit_role');
        
        this.currentUser = null;
        this.token = null;
        this.userRole = null;
        this.isAuthenticated = false;
        
        console.log('Session cleared');
    }
    
    async login(email, password, role = 'student') {
        try {
            // Show loading state
            this.showLoading();
            
            // Validate TPGIT email
            if (!email.endsWith('@tpgit.ac.in')) {
                throw new Error('Please use your TPGIT email address');
            }
            
            // Validate password
            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }
            
            // Simulate API call (replace with actual API in production)
            await this.simulateAPICall(email, password, role);
            
            // Create user object
            const user = {
                id: this.generateUserId(email),
                email: email,
                name: this.extractNameFromEmail(email),
                role: role,
                department: this.getDepartmentFromEmail(email),
                lastLogin: new Date().toISOString(),
                preferences: this.getDefaultPreferences()
            };
            
            // Generate token (in production, this comes from backend)
            const token = this.generateToken(user);
            
            // Save session
            this.saveSession(user, token, role);
            
            // Reset session timeout
            this.resetSessionTimeout();
            
            // Hide loading state
            this.hideLoading();
            
            // Show success message
            this.showNotification(`Welcome back, ${user.name}!`, 'success');
            
            // Redirect based on role
            this.redirectAfterLogin(role);
            
            return { success: true, user };
            
        } catch (error) {
            // Hide loading state
            this.hideLoading();
            
            // Show error message
            this.showNotification(error.message, 'error');
            
            return { success: false, error: error.message };
        }
    }
    
    async register(userData) {
        try {
            // Show loading state
            this.showLoading();
            
            // Validate registration data
            this.validateRegistrationData(userData);
            
            // Simulate API call
            await this.simulateRegistrationCall(userData);
            
            // Create user object
            const user = {
                id: this.generateUserId(userData.email),
                email: userData.email,
                name: `${userData.firstName} ${userData.lastName}`,
                role: userData.role,
                department: userData.department || null,
                createdAt: new Date().toISOString(),
                preferences: this.getDefaultPreferences()
            };
            
            // Generate token
            const token = this.generateToken(user);
            
            // Save session
            this.saveSession(user, token, userData.role);
            
            // Reset session timeout
            this.resetSessionTimeout();
            
            // Hide loading state
            this.hideLoading();
            
            // Show success message
            this.showNotification('Account created successfully!', 'success');
            
            // Redirect
            this.redirectAfterLogin(userData.role);
            
            return { success: true, user };
            
        } catch (error) {
            this.hideLoading();
            this.showNotification(error.message, 'error');
            return { success: false, error: error.message };
        }
    }
    
    logout() {
        // Clear session
        this.clearSession();
        
        // Clear session timeout
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }
        
        // Show logout message
        this.showNotification('Logged out successfully', 'info');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
    
    async forgotPassword(email) {
        try {
            // Validate email
            if (!email.endsWith('@tpgit.ac.in')) {
                throw new Error('Please use your TPGIT email address');
            }
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            this.showNotification('Password reset instructions sent to your email', 'success');
            
            return { success: true };
            
        } catch (error) {
            this.showNotification(error.message, 'error');
            return { success: false, error: error.message };
        }
    }
    
    checkAuthStatus() {
        if (!this.isAuthenticated) {
            // Redirect to login if not on login/register page
            const currentPage = window.location.pathname.split('/').pop();
            const authPages = ['login.html', 'register.html', 'index.html'];
            
            if (!authPages.includes(currentPage) && !currentPage.includes('index')) {
                window.location.href = 'login.html';
            }
        } else {
            // Update UI for authenticated user
            this.updateAuthUI();
        }
    }
    
    updateAuthUI() {
        if (this.isAuthenticated && this.currentUser) {
            // Update user info in header
            const userInfoElements = document.querySelectorAll('.user-info, .user-name, .user-role');
            
            userInfoElements.forEach(element => {
                if (element.classList.contains('user-name')) {
                    element.textContent = this.currentUser.name;
                } else if (element.classList.contains('user-role')) {
                    element.textContent = `${this.currentUser.role.charAt(0).toUpperCase() + this.currentUser.role.slice(1)} • ${this.currentUser.department || 'TPGIT'}`;
                }
            });
            
            // Show/hide elements based on role
            this.updateRoleBasedUI();
        }
    }
    
    updateRoleBasedUI() {
        const role = this.userRole;
        
        // Hide/show admin-only elements
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = role === 'admin' ? 'block' : 'none';
        });
        
        // Hide/show faculty-only elements
        const facultyElements = document.querySelectorAll('.faculty-only');
        facultyElements.forEach(el => {
            el.style.display = (role === 'faculty' || role === 'admin') ? 'block' : 'none';
        });
        
        // Hide/show student-only elements
        const studentElements = document.querySelectorAll('.student-only');
        studentElements.forEach(el => {
            el.style.display = role === 'student' ? 'block' : 'none';
        });
    }
    
    setupSessionTimeout() {
        // Set session timeout to 60 minutes
        const timeoutDuration = 60 * 60 * 1000; // 60 minutes in milliseconds
        
        this.resetSessionTimeout();
        
        // Reset timeout on user activity
        document.addEventListener('mousemove', () => this.resetSessionTimeout());
        document.addEventListener('keydown', () => this.resetSessionTimeout());
        document.addEventListener('click', () => this.resetSessionTimeout());
    }
    
    resetSessionTimeout() {
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }
        
        if (this.isAuthenticated) {
            this.sessionTimeout = setTimeout(() => {
                this.showNotification('Your session has expired. Please log in again.', 'warning');
                this.logout();
            }, 60 * 60 * 1000); // 60 minutes
        }
    }
    
    setupEventListeners() {
        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const role = document.querySelector('.role-option.active')?.dataset.role || 'student';
                
                await this.login(email, password, role);
            });
        }
        
        // Register form submission
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const userData = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('regEmail').value,
                    password: document.getElementById('regPassword').value,
                    role: document.getElementById('regRole').value,
                    department: document.getElementById('regDepartment')?.value || null
                };
                
                await this.register(userData);
            });
        }
        
        // Forgot password form
        const forgotForm = document.getElementById('forgotForm');
        if (forgotForm) {
            forgotForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = document.getElementById('resetEmail').value;
                await this.forgotPassword(email);
            });
        }
        
        // Logout buttons
        document.querySelectorAll('.logout-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        });
    }
    
    // Helper Methods
    showLoading() {
        const submitBtn = document.querySelector('#submitBtn, .login-btn[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }
    }
    
    hideLoading() {
        const submitBtn = document.querySelector('#submitBtn, .login-btn[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }
    
    showNotification(message, type = 'info') {
        if (typeof TPGIT !== 'undefined' && TPGIT.showNotification) {
            TPGIT.showNotification(message, type);
        } else {
            alert(message);
        }
    }
    
    simulateAPICall(email, password, role) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate authentication logic
                const validUsers = {
                    'student@tpgit.ac.in': 'password123',
                    'faculty@tpgit.ac.in': 'password123',
                    'admin@tpgit.ac.in': 'password123'
                };
                
                if (validUsers[email] && validUsers[email] === password) {
                    resolve();
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 1500);
        });
    }
    
    simulateRegistrationCall(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate registration validation
                if (!userData.email.endsWith('@tpgit.ac.in')) {
                    reject(new Error('Please use your TPGIT email address'));
                } else if (userData.password.length < 8) {
                    reject(new Error('Password must be at least 8 characters long'));
                } else if (!userData.firstName || !userData.lastName) {
                    reject(new Error('Please enter your full name'));
                } else {
                    resolve();
                }
            }, 1500);
        });
    }
    
    validateRegistrationData(userData) {
        if (!userData.email.endsWith('@tpgit.ac.in')) {
            throw new Error('Please use your TPGIT email address');
        }
        
        if (userData.password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        
        if (!userData.firstName || !userData.lastName) {
            throw new Error('Please enter your full name');
        }
        
        if (!userData.role) {
            throw new Error('Please select a role');
        }
        
        if ((userData.role === 'faculty' || userData.role === 'admin') && !userData.department) {
            throw new Error('Please select your department');
        }
    }
    
    generateUserId(email) {
        return 'user_' + btoa(email).slice(0, 10);
    }
    
    extractNameFromEmail(email) {
        const username = email.split('@')[0];
        const nameParts = username.split('.');
        return nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    }
    
    getDepartmentFromEmail(email) {
        // In a real app, this would come from backend
        const departments = {
            'cse': 'Computer Science & Engineering',
            'ece': 'Electronics & Communication',
            'eee': 'Electrical & Electronics',
            'mech': 'Mechanical Engineering',
            'civil': 'Civil Engineering'
        };
        
        // Extract department from email or assign randomly for demo
        const deptKeys = Object.keys(departments);
        const randomDept = deptKeys[Math.floor(Math.random() * deptKeys.length)];
        return departments[randomDept];
    }
    
    getDefaultPreferences() {
        return {
            theme: 'dark',
            notifications: true,
            emailNotifications: true,
            defaultView: 'weekly',
            timeFormat: '12h'
        };
    }
    
    generateToken(user) {
        // In production, this would be generated by the backend
        const tokenData = {
            userId: user.id,
            email: user.email,
            role: user.role,
            timestamp: Date.now()
        };
        
        return btoa(JSON.stringify(tokenData));
    }
    
    redirectAfterLogin(role) {
        setTimeout(() => {
            switch(role) {
                case 'admin':
                    window.location.href = 'dashboard.html';
                    break;
                case 'faculty':
                    window.location.href = 'schedule.html';
                    break;
                case 'student':
                default:
                    window.location.href = 'schedule.html';
                    break;
            }
        }, 1000);
    }
}

// Initialize Auth Manager
const auth = new AuthManager();

// Export to global scope
window.Auth = auth;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    auth.checkAuthStatus();
});