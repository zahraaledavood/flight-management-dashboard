# Flight Management Dashboard

A comprehensive dashboard application for managing and monitoring flights, built primarily with TypeScript and modern web technologies.

## Features

- Real-time flight status monitoring
- Flight search and filtering
- Airline, airport, and crew management
- Interactive data visualizations and analytics
- User authentication and role-based access control
- Responsive UI for desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 16.x or later)
- npm (comes with Node.js) or yarn

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/zahraaledavood/flight-management-dashboard.git
   cd flight-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and update any necessary variables (API endpoints, tokens, etc):

   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app should now be running at http://localhost:3000

## Scripts

- `dev` — Run development server
- `build` — Build for production
- `start` — Start the production build
- `lint` — Run linter

## Folder Structure

```
src/
  components/
  pages/
  utils/
  services/
  assets/
public/
```

## Contributing

Contributions are welcome! Please open issues and submit pull requests for any enhancements or bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -am 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a new Pull Request

