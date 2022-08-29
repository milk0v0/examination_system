import { http } from '@/util'

/**
 * 发送短信验证码
 * @param {Object} params
 * @param {string} params.phone 电话号码
 */
export async function sendValidCode(params) {
  return await http.post('/exam/sendValidCode', params);
}

/**
 * 登录
 * @param {Object} params
 * @param {string} params.phone 电话号码 13381178835
 * @param {string} params.validCode 验证码（测试时填写 111111）
 */
export async function login(params) {
  return await http.post('/exam/login', params);
}

/**
 * 查询考试信息，登录后选择考试的页面
 * @param {Object} params
 * @param {string} params.userId 用户ID
 */
 export async function getExamInfo(params) {
  return await http.post('/exam/api/examUserExam/getExamInfo', params);
}

/**
 * 点击开始考试后调用此按钮，获取试题列表和考试时间
 * @param {Object} params
 * @param {string} params.userId 用户ID
 */
 export async function startExam(params) {
  return await http.post('/exam/api/examUserExam/startExam', params);
}

/**
 * 获取用户信息
 * @param {Object} params
 * @param {string} params.userId  用户ID
 */
 export async function userInfo(params) {
  return await http.post('/exam/api/examUser/userInfo', params);
}