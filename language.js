window.addEventListener('DOMContentLoaded', reloadContent);

async function reloadContent() {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
}

async function changeLanguage(lang) {
    setLanguagePreference(lang);
    
    let langData = await fetchLanguageData(lang);
    updateContent(langData);
}

async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}

async function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
}

function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = langData[key];
    });
}