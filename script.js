// Booking System
class BookingSystem {
    constructor() {
        this.bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.isAdmin = false;
        this.initializeElements();
        this.setupEventListeners();
        this.applyTheme();
        this.setupDatePicker();
        this.generateTimeSlots();
    }

    initializeElements() {
        // Form elements
        this.appointmentForm = document.getElementById('appointmentForm');
        this.serviceSelect = document.getElementById('service');
        this.dateInput = document.getElementById('date');
        this.timeSelect = document.getElementById('time');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.phoneInput = document.getElementById('phone');
        this.notesInput = document.getElementById('notes');

        // Admin elements
        this.adminModal = document.getElementById('adminModal');
        this.adminLoginForm = document.getElementById('adminLoginForm');
        this.adminUsername = document.getElementById('adminUsername');
        this.adminPassword = document.getElementById('adminPassword');
        this.adminDashboard = document.getElementById('adminDashboard');
        this.bookingForm = document.getElementById('bookingForm');
        this.bookingConfirmation = document.getElementById('bookingConfirmation');
        this.confirmationDetails = document.querySelector('.confirmation-details');

        // Filter elements
        this.searchBookings = document.getElementById('searchBookings');
        this.filterDate = document.getElementById('filterDate');
        this.filterStatus = document.getElementById('filterStatus');

        // Theme and control buttons
        this.themeToggle = document.getElementById('toggleTheme');
        this.adminLoginBtn = document.getElementById('adminLogin');
        this.newBookingBtn = document.getElementById('newBooking');
        this.logoutAdminBtn = document.getElementById('logoutAdmin');

        // Bookings list container
        this.bookingsList = document.querySelector('.bookings-list');
    }

    setupEventListeners() {
        // Form submission
        this.appointmentForm.addEventListener('submit', (e) => this.handleBookingSubmit(e));
        this.adminLoginForm.addEventListener('submit', (e) => this.handleAdminLogin(e));

        // Button clicks
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.adminLoginBtn.addEventListener('click', () => this.showAdminModal());
        this.newBookingBtn.addEventListener('click', () => this.showBookingForm());
        this.logoutAdminBtn.addEventListener('click', () => this.handleLogout());

        // Filter changes
        this.searchBookings.addEventListener('input', () => this.renderAdminBookings());
        this.filterDate.addEventListener('change', () => this.renderAdminBookings());
        this.filterStatus.addEventListener('change', () => this.renderAdminBookings());

        // Date change
        this.dateInput.addEventListener('change', () => this.generateTimeSlots());
    }

    setupDatePicker() {
        const today = new Date();
        const minDate = today.toISOString().split('T')[0];
        this.dateInput.min = minDate;
    }

    generateTimeSlots() {
        const timeSelect = document.getElementById('time');
        timeSelect.innerHTML = '<option value="">Choose a time...</option>';

        const slots = [];
        const startTime = 9; // 9 AM
        const endTime = 17; // 5 PM
        const interval = 30; // 30 minutes

        for (let hour = startTime; hour < endTime; hour++) {
            for (let minutes = 0; minutes < 60; minutes += interval) {
                const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                slots.push(time);
            }
        }

        slots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            timeSelect.appendChild(option);
        });
    }

    handleBookingSubmit(e) {
        e.preventDefault();
        
        const booking = {
            id: Date.now(),
            service: this.serviceSelect.value,
            date: this.dateInput.value,
            time: this.timeSelect.value,
            name: this.nameInput.value,
            email: this.emailInput.value,
            phone: this.phoneInput.value,
            notes: this.notesInput.value,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        this.bookings.push(booking);
        this.saveBookings();
        this.showConfirmation(booking);
        this.appointmentForm.reset();
    }

    showConfirmation(booking) {
        this.bookingForm.classList.add('hidden');
        this.bookingConfirmation.classList.remove('hidden');
        
        this.confirmationDetails.innerHTML = `
            <h3>Booking Confirmation</h3>
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
            <p><strong>Status:</strong> <span class="booking-status status-pending">Pending</span></p>
        `;
    }

    showBookingForm() {
        this.bookingConfirmation.classList.add('hidden');
        this.bookingForm.classList.remove('hidden');
    }

    handleAdminLogin(e) {
        e.preventDefault();
        const username = this.adminUsername.value;
        const password = this.adminPassword.value;
        const errorElement = document.getElementById('adminLoginError');
        
        if (username === 'admin' && password === 'admin123') {
            this.isAdmin = true;
            this.hideAdminModal();
            this.showAdminDashboard();
            this.renderAdminBookings();
            return false;
        } else {
            errorElement.classList.add('show');
            this.adminPassword.value = '';
            return false;
        }
    }

    handleLogout() {
        this.isAdmin = false;
        this.hideAdminDashboard();
        this.showBookingForm();
    }

    showAdminModal() {
        this.adminModal.classList.remove('hidden');
        document.getElementById('adminLoginError').classList.remove('show');
        this.adminUsername.focus();
    }

    hideAdminModal() {
        this.adminModal.classList.add('hidden');
        this.adminLoginForm.reset();
        document.getElementById('adminLoginError').classList.remove('show');
    }

    showAdminDashboard() {
        this.bookingForm.classList.add('hidden');
        this.bookingConfirmation.classList.add('hidden');
        this.adminDashboard.classList.remove('hidden');
    }

    hideAdminDashboard() {
        this.adminDashboard.classList.add('hidden');
    }

    updateBookingStatus(bookingId, newStatus) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = newStatus;
            this.saveBookings();
            this.renderAdminBookings();
        }
    }

    filterAdminBookings() {
        let filteredBookings = [...this.bookings];
        const searchTerm = this.searchBookings.value.toLowerCase();
        const dateFilter = this.filterDate.value;
        const statusFilter = this.filterStatus.value;

        // Apply search filter
        if (searchTerm) {
            filteredBookings = filteredBookings.filter(booking =>
                booking.name.toLowerCase().includes(searchTerm) ||
                booking.email.toLowerCase().includes(searchTerm) ||
                booking.phone.includes(searchTerm)
            );
        }

        // Apply date filter
        if (dateFilter !== 'all') {
            const today = new Date();
            const bookingDate = new Date();
            
            filteredBookings = filteredBookings.filter(booking => {
                bookingDate.setTime(new Date(booking.date).getTime());
                
                switch (dateFilter) {
                    case 'today':
                        return bookingDate.toDateString() === today.toDateString();
                    case 'week':
                        const weekFromNow = new Date(today);
                        weekFromNow.setDate(today.getDate() + 7);
                        return bookingDate <= weekFromNow;
                    case 'month':
                        const monthFromNow = new Date(today);
                        monthFromNow.setMonth(today.getMonth() + 1);
                        return bookingDate <= monthFromNow;
                    default:
                        return true;
                }
            });
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filteredBookings = filteredBookings.filter(booking => booking.status === statusFilter);
        }

        return filteredBookings;
    }

    renderAdminBookings() {
        const filteredBookings = this.filterAdminBookings();
        this.bookingsList.innerHTML = '';

        filteredBookings.forEach(booking => {
            const bookingElement = document.createElement('div');
            bookingElement.className = 'booking-item';
            
            bookingElement.innerHTML = `
                <div>
                    <strong>${booking.name}</strong>
                    <p>${booking.service}</p>
                    <p>${new Date(booking.date).toLocaleDateString()} at ${booking.time}</p>
                </div>
                <div>
                    <p>${booking.email}</p>
                    <p>${booking.phone}</p>
                </div>
                <div>
                    <span class="booking-status status-${booking.status}">${booking.status}</span>
                </div>
                <div class="booking-actions">
                    <button onclick="bookingSystem.updateBookingStatus(${booking.id}, 'confirmed')" class="admin-btn">
                        Confirm
                    </button>
                    <button onclick="bookingSystem.updateBookingStatus(${booking.id}, 'cancelled')" class="cancel-btn">
                        Cancel
                    </button>
                </div>
            `;

            this.bookingsList.appendChild(bookingElement);
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
    }

    applyTheme() {
        document.body.setAttribute('data-theme', this.currentTheme);
        this.themeToggle.innerHTML = this.currentTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }

    saveBookings() {
        localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }
}

// Initialize the booking system
const bookingSystem = new BookingSystem();

// Global functions for button clicks
function closeAdminModal() {
    bookingSystem.hideAdminModal();
}

function handleAdminLogin(event) {
    return bookingSystem.handleAdminLogin(event);
}

function updateBookingStatus(bookingId, newStatus) {
    bookingSystem.updateBookingStatus(bookingId, newStatus);
}