export const baseUrl = 'http://localhost:3030';

const body = document.querySelector('body');
export function showBodyScroll(prop) {
    body.style.overflow = prop == true ? '' : 'hidden';
}