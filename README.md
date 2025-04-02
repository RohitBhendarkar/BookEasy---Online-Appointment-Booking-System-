# BookEasy - Online Appointment Booking System

A modern, user-friendly online appointment booking system built with HTML, CSS, and JavaScript. BookEasy allows customers to schedule appointments and administrators to manage bookings efficiently.

![BookEasy Screenshot](screenshot.png)

## Features

### Customer Interface
- Easy service selection
- Date and time slot booking
- Contact information collection
- Instant booking confirmation
- Responsive design for all devices
- Dark/Light theme toggle

### Admin Interface
- Secure login system
- Booking management dashboard
- Real-time status updates
- Search and filter capabilities
- Booking statistics

## Technologies Used
- HTML5
- CSS3 (with CSS Variables)
- JavaScript (ES6+)
- Local Storage for data persistence
- Font Awesome icons

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of web technologies

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/bookeasy.git
```

2. Navigate to the project directory:
```bash
cd bookeasy
```

3. Open `index.html` in your web browser or use a local server.

### Using a Local Server
You can use any of these methods to run a local server:

1. Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

2. Using Node.js:
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server
```

3. Using VS Code:
- Install the "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

## Usage

### For Customers
1. Select your desired service
2. Choose a preferred date
3. Pick an available time slot
4. Enter your contact information
5. Submit the booking
6. Receive instant confirmation

### For Administrators
1. Click the "Admin Login" button
2. Use the following credentials:
   - Username: `admin`
   - Password: `admin123`
3. Access the admin dashboard
4. Manage bookings, update statuses, and view statistics

## Project Structure
```
bookeasy/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── README.md          # Project documentation
└── screenshot.png     # Project screenshot
```

## Features in Detail

### Booking System
- Dynamic time slot generation
- Date validation
- Form validation
- Instant confirmation
- Booking reference number

### Admin Dashboard
- Real-time booking updates
- Search functionality
- Date filtering
- Status filtering
- Booking management
- Status updates

### Theme Support
- Light/Dark mode toggle
- Persistent theme preference
- Smooth theme transitions
- Responsive design

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements
- Server-side implementation
- Database integration
- Email notifications
- SMS alerts
- Payment integration
- Customer accounts
- Appointment history
- Rating system
- Multiple service providers
- Calendar integration

## Security Considerations
- Basic admin authentication
- Form validation
- Data sanitization
- Local storage encryption
- XSS prevention

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Font Awesome for icons
- Modern CSS techniques
- JavaScript ES6+ features

## Support
For support, please open an issue in the GitHub repository or contact the maintainers.

## Credits
Created by [Your Name]

---

Made with ❤️ for better appointment booking 