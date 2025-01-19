# PayTasker

Welcome to the Micro-Task and Earning Platform! This platform allows users to complete small tasks and earn money. The platform accommodates three distinct roles: Worker, Buyer, and Admin. Each role comes with its specific set of functionalities to manage tasks, coins, and system operations.

## Live Site URL

- [Live Site URL](https://as12-ea931.web.app)

## Admin Credentials

**Admin Username:** <admin@example.com>
**Admin Password:** 1234qQ

## Features of the Website

1. **User Roles**: Three distinct roles: Worker, Buyer, Admin, each with specific functionalities.
2. **User Authentication**: Secure login with email/password or Google Sign-In. After successful login, the user is redirected to their dashboard.
3. **Task Management**:
   - Workers can view tasks, submit work, and track earnings.
   - Buyers can create tasks, approve/reject submissions, and manage their coins.
   - Admins can manage users, tasks, and monitor platform activity.
4. **Coins System**: Workers earn coins for completed tasks, and Buyers pay for tasks. Coins can be purchased and withdrawn.
5. **Stripe Payment Integration**: For purchasing coins with Stripe-based payments.
6. **Responsive Design**: The platform is responsive across all devices (mobile, tablet, desktop) with an interactive dashboard layout.
7. **Task Submission & Review**: Workers can submit completed tasks for approval, and Buyers review and approve/reject submissions.
8. **Task Creation**: Buyers can create new tasks with various parameters such as title, description, number of workers required, and reward amount.
9. **Withdrawal System**: Workers can withdraw earnings once they accumulate at least 200 coins, equivalent to $10.
10. **Admin Dashboard**: Admins have full control to manage users, tasks, and approve/reject withdrawal requests.

## Technologies Used

- **Frontend**:
  - React.js (for UI development)
  - Tailwind CSS (for responsive design)
  - React Router (for navigation)
  - Swiper.js (for carousels and sliders)
  - React form hook (for validation)
  - Firebase (for authentication)
  - Moment (for date and time formatting)
  - SweetAlert (for pop-up notifications)
  - Motion (for animation)
  
- **Backend**:
  - Node.js (for server-side logic)
  - Express.js (for building RESTful APIs)
  - MongoDB (for database storage)
  - JWT (for secure authentication)

- **Authentication**:
  - Firebase Authentication (for user authentication via email/password and Google)

- **Payment Integration**:
  - Stripe API (for purchasing coins)

- **Notification System**:
  - Real-time notifications for submission status updates and withdrawal approvals.
