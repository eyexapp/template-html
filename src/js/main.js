/**
 * Application entry point.
 * Registers all Web Components and initializes global state.
 */

// Register Web Components
import './components/app-header.js';
import './components/app-footer.js';
import './components/theme-toggle.js';

// Libraries (available for page-specific scripts)
export { createStore } from './lib/state.js';
export { createI18n } from './lib/i18n.js';
export { $, $$, on, createElement } from './lib/dom.js';
