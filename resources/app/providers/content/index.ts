import en from './json/en.json'
import ru from './json/ru.json'
import staticContent from './json/staticContent.json'

const content = {
    ru,
    en,
}

export const languages = [
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
]

export { content, staticContent }

export type Content = typeof content.ru
export type StaticContent = typeof staticContent
