import { curry, flow, isString } from 'lodash'
import { i18n } from './config'
import umiRouter from 'umi/router'
import pathToRegexp from 'path-to-regexp'

export const { defaultLanguage } = i18n
export const languages = i18n.languages.map(item => item.key)

export const langFromPath = curry(
  /**
   * Query language from pathname.
   * @param   {array}     languages         指定当前可用的语言。
   * @param   {string}    defaultLanguage   指定默认语言
   * @param   {string}    pathname          要查询的路径名。
   * @return  {string}    返回查询语言。
   */
  (languages, defaultLanguage, pathname) => {
    for (const item of languages) {
      if (pathname.startsWith(`/${item}/`)) {
        return item
      }
    }
    return defaultLanguage
  }
)(languages)(defaultLanguage)

export function getLocale() {
  return langFromPath(window.location.pathname)
}
export const deLangPrefix = curry(
  /**
   * Remove the language prefix in pathname.
   * @param   {array}     languages  Specify which languages are currently available.
   * @param   {string}    pathname   Remove the language prefix in the pathname.
   * @return  {string}    删除语言前缀后返回路径名。
   */
  (languages, pathname) => {
    if (!pathname) {
      return
    }
    for (const item of languages) {
      if (pathname.startsWith(`/${item}/`)) {
        return pathname.replace(`/${item}/`, '/')
      }
    }

    return pathname
  }
)(languages)
export function setLocale(language) {
  if (getLocale() !== language) {
    umiRouter.push({
      pathname: `/${language}${deLangPrefix(window.location.pathname)}`,
      search: window.location.search,
    })
  }
}
export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(deLangPrefix(pathname))
}
//  给路由地址加上言语的前缀
export function addLangPrefix(pathname) {
  const prefix = langFromPath(window.location.pathname)
  return `/${prefix}${deLangPrefix(pathname)}`
}
const routerAddLangPrefix = params => {
  if (isString(params)) {
    params = addLangPrefix(params)
  } else {
    params.pathname = addLangPrefix(params.pathname)
  }
  return params
}
/**
 * 自动在push和replace中的路径名之前添加当前语言前缀
 */
const myRouter = { ...umiRouter }

myRouter.push = flow(
  routerAddLangPrefix,
  umiRouter.push
)

myRouter.replace = flow(
  routerAddLangPrefix,
  myRouter.replace
)

export const router = myRouter
