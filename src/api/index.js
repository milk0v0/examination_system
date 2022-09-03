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
 * 点击开始考试后调用此按钮，获取试题列表和考试时间-模拟考试
 * @param {Object} params
 * @param {string} params.userId 用户ID
 */
export async function startExamMoni(params) {
  return await http.post('/exam/api/examUserExam/startExamMoni', params);
}

/**
 * 获取用户信息
 * @param {Object} params
 * @param {string} params.userId 用户ID
 */
export async function userInfo(params) {
  return await http.post('/exam/api/examUser/userInfo', params);
}

/**
 * 下一题
 * @param {Object} params
 * @param {string} params.userId 用户ID
 * @param {string} params.questionId 试题ID
 * @param {string} params.answer 答案，值来自于选项序号indexNumber，单选格式：1，多选格式: 1+2+3+4
 */
export async function subAnswer(params) {
  return await http.post('/exam/api/examUserExam/subAnswer', params);
}

/**
 * 交卷
 * @param {Object} params
 * @param {string} params.userId 用户ID
 * @param {string} params.questionId 最后一题的试题ID
 * @param {string} params.answer 答案，值来自于选项序号indexNumber，单选格式：1，多选格式: 1+2+3+4
 */
export async function subPapers(params) {
  return await http.post('/exam/api/examUserExam/subPapers', params);
}

/**
 * 交卷
 * @param {Object} params
 * @param {string} params.userId 用户ID
 */
export async function getMoniHisList(params) {
  return await http.post('/exam/api/examUser/getMoniHisList', params);
}

/**
 * 清缓存
 */
export async function test(params) {
  return await http.post(`/exam/test?userId=${localStorage.getItem("userId")}`, params);
}