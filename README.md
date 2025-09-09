# Leo9 Studio Clone - React Website

A modern, responsive recreation of the Leo9 Studio website featuring a stunning navbar, hero section, and additional content sections. Built with React, vanilla CSS, and Framer Motion for smooth animations.

## 🚀 Features

- **Responsive Navbar** with sticky behavior and smooth hover effects
- **Animated Hero Section** with gradient backgrounds and floating orbs
- **Services Section** showcasing three main service categories
- **Case Studies Portfolio** with interactive filtering
- **Mobile-First Design** with hamburger menu for mobile devices
- **Framer Motion Animations** for smooth transitions and interactions
- **Modern UI/UX** with gradient designs and glassmorphism effects

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Framer Motion** - Animation library
- **Vanilla CSS** - Styling with modern CSS features
- **Inter Font** - Typography
- **Responsive Design** - Mobile-first approach

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd leo9-studio-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.js
│   │   └── Navbar.css
│   ├── Hero/
│   │   ├── Hero.js
│   │   └── Hero.css
│   ├── Services/
│   │   ├── Services.js
│   │   └── Services.css
│   └── CaseStudies/
│       ├── CaseStudies.js
│       └── CaseStudies.css
├── App.js
├── App.css
├── index.js
└── index.css
```

## 🎨 Key Components

### Navbar
- Sticky navigation with backdrop blur effect
- Smooth hover animations on menu items
- Mobile hamburger menu with slide animations
- Responsive design for all screen sizes

### Hero Section
- Large animated title with gradient text
- Floating gradient orbs with CSS animations
- Statistics section with impressive numbers
- Dual CTA buttons with hover effects

### Services Section
- Three service cards: Marketing, Technology, Strategy
- Hover effects with card elevation
- Service items with checkmark icons
- Gradient accents and modern styling

### Case Studies
- Interactive filter tabs for different categories
- Grid layout with responsive cards
- Image overlays with "View Case Study" buttons
- Results metrics for each project

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Deploy with default settings

### Manual Build

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Serve the build folder**
   ```bash
   npx serve -s build
   ```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Performance Features

- **Optimized Images** with proper sizing and lazy loading
- **Smooth Animations** with Framer Motion
- **CSS Grid & Flexbox** for efficient layouts
- **Modern CSS** with custom properties and gradients

## 🔧 Customization

### Colors
The project uses CSS custom properties for easy theme customization:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #6366f1, #8b5cf6);
  --secondary-gradient: linear-gradient(135deg, #ec4899, #f97316);
  --accent-gradient: linear-gradient(135deg, #10b981, #06b6d4);
}
```

### Animations
Framer Motion variants can be customized in each component file for different animation styles.

## 📄 License

This project is for educational purposes. The original Leo9 Studio design belongs to Leo9 Studio.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using React and Framer Motion**
