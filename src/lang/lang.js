import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zh from './zh'
import en from './en'
import kr from './kr'
import jp from './jp'
import hk from './hk'
import spa from './spa'
import de from './de'
import ind from './ind'
import th from './th'
import mls from './mls'
import vn from './vn'

let locale = window.localStorage.getItem('locale') || '';
if(locale == ''){
  locale = 'en';
  window.localStorage.setItem('locale',locale);
  window.localStorage.setItem('lang',locale);
}
export default new VueI18n({
  locale:locale,
  messages:{
    zh:zh,
    en:en,
    kr:kr,
    jp:jp,
    hk:hk,
    de:de,
    ind:ind,
    th:th,
    mls:mls,
    vn:vn,
  }
})
