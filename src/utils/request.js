import fetch from 'isomorphic-fetch'
import { message } from 'antd'
import _ from 'lodash'

const TOKEN_KEY = 'token'

/**
 * 常规GET请求
 * @param url
 * @param [opts]
 * @return {Promise}
 */
export function get (url, opts) {
  return request(url, opts)
}

/**
 * 常规POST请求
 * @param url
 * @param body
 * @param [opts]
 * @return {Promise}
 */
export function post (url, body, opts) {
  return request(url, _.merge({
    method: 'POST',
    body: JSON.stringify(body)
  }, opts))
}

/**
 * 常规PUT请求
 * @param url
 * @param body
 * @param [opts]
 * @return {Promise}
 */
export function put (url, body, opts) {
  return request(url, _.merge({
    method: 'PUT',
    body: JSON.stringify(body)
  }, opts))
}

/**
 * 常规DELETE请求
 * @param url
 * @param body
 * @param [opts]
 * @return {Promise}
 */
export function del (url, body, opts) {
  return request(url, _.merge({
    method: 'DELETE',
    body: JSON.stringify(body)
  }, opts))
}

/**
 * 底层请求封装
 * @param url
 * @param body
 * @param [opts]
 * @return {Promise}
 */
export async function request (url, opts) {
  // 配置加工
  opts = _.merge({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': window.localStorage.getItem(TOKEN_KEY)
    },
    cache: 'no-cache',
    credentials: 'include'
  }, opts)
  const onError = _.result(opts, 'onError', null)
  delete opts.onError

  // 定义异常处理器
  const errorHandler = async (errmsg) => {
    if (onError !== null) {
      if (_.isFunction(onError)) {
        onError(errmsg)
      }
    } else {
      errmsg = errmsg || 'Network error'
      message.error(errmsg)
    }
  }

  // 执行请求
  const res = await fetch(url, opts)
  let data = null
  if (res.status >= 200 && res.status < 300) {
    const json = await res.json()
    if (json.errcode || json.errmsg) {
      if (json.errstack) {
        console.error(json.errstack)
      }
      await errorHandler(json.errmsg)
    } else {
      data = _.result(json, 'data', json)
    }
  } else {
    await errorHandler()
  }
  return data
}
