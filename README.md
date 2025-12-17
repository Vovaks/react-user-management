# User Management Application

A React-based user management system with full CRUD operations. 


## Features

### Core Requirements ✅
- **User List Display** - Fetches and displays users from API
- **Search Functionality** - Real-time search by user name
- **Custom Styling** - CSS/SCSS without UI frameworks
- **Responsive Design** - Mobile-friendly interface
- **Add User** - Form to create new users with validation
- **Edit User** - Modify existing user information
- **Delete User** - Remove users from the list
- **Confirmation Dialogs** - Prevent accidental deletions

## Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn start
```

The application will open at `http://localhost:3000`


## TODO / Roadmap

- [ ] Split UserModal into smaller, reusable components
- [ ] Add API error handling and loading states
- [ ] Implement environment variables (.env) for API configuration
- [ ] Add tooltips for better UX
- [ ] Implement keyboard shortcuts (Esc to close modals, Enter to submit, etc.)
- [ ] Expand SCSS variables for better theming
- [ ] Form validation improvements
- [ ] Pagination for large user lists
- [ ] Sort functionality (by name, email, etc.)
- [ ] Advanced filtering options
- [ ] Add comprehensive unit and integration tests