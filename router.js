import {homePage} from "./pages/homePage.js";
import {searchPage} from "./pages/searchPage.js";

const app = document.getElementById('app');

export function router() {
    const hash = window.location.hash || '#/home';
    const [_, route] = hash.split('/');

    switch (route) {
        case 'home':
            homePage(app);
            break;
        case 'search':
            searchPage(app);
            break;
        default:
            app.innerHTML = `<h2>Page not found</h2>`;
            break;
    }
}