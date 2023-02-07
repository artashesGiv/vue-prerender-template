import Index from '@/pages/Index/Index.vue';
import { content } from '@/app/providers/content';
var redirect = function (to) {
    var lang = to.params.lang;
    // console.log(`params: lang=${lang}`) // , currentLang=${currentLang}
    // console.log(
    //     `route path from:'${to.path}' redirect to:/${
    //         lang /* ?? currentLang*/ ?? 'ru'
    //     }`
    // )
    return "/".concat(lang /* ?? currentLang*/ !== null && lang /* ?? currentLang*/ !== void 0 ? lang /* ?? currentLang*/ : 'ru');
};
var mainPathLanguages = Object.keys(content).join('|');
var routes = [
    {
        path: "/:lang(".concat(mainPathLanguages, ")"),
        name: 'main',
        component: Index,
    },
    {
        path: '*',
        redirect: redirect,
    },
];
export default routes;
