import en from './json/en.json';
import ru from './json/ru.json';
import staticContent from './json/staticContent.json';
var content = {
    ru: ru,
    en: en,
};
export var languages = [
    {
        id: 'ru',
        name: 'Русский',
        shortName: 'RU',
    },
    {
        id: 'en',
        name: 'English',
        shortName: 'EN',
    },
];
export { content, staticContent };
