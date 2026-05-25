# TéléSport - Olympic Games History Dashboard

Interactive web application to visualize historical performance data of countries in the Olympic Games.

## 📋 Prerequisites

- **Node.js** 22 LTS or higher
- **npm** (included with Node.js)

## 🛠️ Installation

Clone the repository:

```bash
git clone git@github.com:combastelclaire/DFSJS-D-finissez-et-d-veloppez-le-front-end-en-utilisant-du-code-React-maintenable.git
cd DFSJS-D-finissez-et-d-veloppez-le-front-end-en-utilisant-du-code-React-maintenable
```

Install dependencies:

```bash
npm install
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server (http://localhost:5173) |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Check code quality with ESLint |

## 🎯 Usage

Start the development server and open [http://localhost:5173](http://localhost:5173).

- Click on a country in the pie chart to navigate to its detail page
- Click **← Retour** to go back to the dashboard
- Any unknown URL redirects to the 404 page

## 📁 Project Structure

```
src/
├── components/
│   └── HeaderComponent.tsx   # Reusable title + indicators component
├── constants/
│   └── chartColors.ts        # Shared colors across charts
├── data/
│   └── olympics.json         # Static Olympic Games data
├── hooks/
│   └── useData.ts            # Data loading and exposure
├── models/
│   ├── Olympic.ts            # Olympic interface
│   └── Participation.ts      # Participation interface
├── pages/
│   ├── DashboardPage.tsx     # Main page with pie chart
│   ├── CountryDetailPage.tsx # Country detail page with line chart
│   └── NotFoundPage.tsx      # 404 error page
├── router.tsx                # Route configuration
├── App.tsx                   # Root component
└── main.tsx                  # React entry point
```

## 🔧 Tech Stack

- **React 19** — UI library, functional components and hooks
- **TypeScript** — static typing, interfaces for data models
- **Vite** — fast build tool with hot module replacement
- **Tailwind CSS 4** — utility-first CSS, responsive with `md:` and `xl:` breakpoints
- **React Router 6** — client-side routing (`/`, `/country/:id`, `/404`, `*`)
- **Chart.js + react-chartjs-2** — pie chart (dashboard) and line chart (country detail)

## 🚀 Features

- Interactive pie chart dashboard (click a country → navigate to detail page)
- Country detail page: participations, medals, athletes, evolution over 5 editions
- Back navigation to dashboard
- Error handling: 404 page for unknown URLs and non-existent countries
- Responsive design: mobile (≤ 767px), tablet (768–1199px), desktop (≥ 1200px)

## 📚 Documentation

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)
- [Chart.js](https://www.chartjs.org/docs/latest/)

## ⚠️ Limitations

- Data is static (local JSON file): no connection to a real API
- Direct navigation to `/country/:id` via URL displays the chart with a color computed by index rather than the one passed from the dashboard
