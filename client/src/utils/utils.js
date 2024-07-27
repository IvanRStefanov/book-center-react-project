import {body} from './variables';

export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export function removeUserData() {
    sessionStorage.removeItem('userData');
}

export function showBodyScroll(prop) {
    body.style.overflow = prop == false ? 'hidden' : '';
}

export function formatDate(dateString) {
    const date = new Date(dateString);

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);

    return formattedDate;
};

export const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;