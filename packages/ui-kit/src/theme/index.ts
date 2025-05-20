import './theme.css';

// Theme toggle utility
export const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
};

// Initialize theme based on local storage or system preference
export const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}; 