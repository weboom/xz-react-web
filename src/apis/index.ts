import { host } from '../config'
import http from '../utils/http'

export default {
  /**
   * @description 获取七牛云上传token
   */
  get7nToken () {
    return http.get(`${host}/upload/getToken`)
  },

  /**
   * @description 登录
   * @param param0
   */
  login (
    { mobile, password }: { mobile: string, password: string }
  ) {
    return http.post(`${host}/user/login`, { mobile, password })
  },

  /**
   * @description 获取用户信息
   */
  getUserInfo () {
    return http.get(`${host}/user/userInfo`)
  },

  /**
   * @description 获取指定用户的信息
   * @param param0 
   */
  getUserProfile ({ uid }: { uid : string }) {
    return http.get(`${host}/user/profile?uid=${uid}`)
  },

  // 更新用户信息
  updateUserInfo (params: any) {
    return http.post(`${host}/user/userInfo`, params)
  },

  // 获取当天签到状态
  getCheckinStatus () {
    return http.get(`${host}/checkin`)
  },

  // 签到
  checkin () {
    return http.post(`${host}/checkin`)
  },
  // 获取签到信息
  getCheckinList () {
    return http.get(`${host}/checkin/list`)
  },

  // 查询用户积分
  getPointList (params: any) {
    return http.get(`${host}/point/list`, {
      params
    })
  },

  // 获取收货地址
  getdeliveryAddressList () {
    return http.get(`${host}/deliveryAddress`)
  },

  // 获取需求列表
  getDemandList (params: any) {
    return http.get(`${host}/demand`, {
      params
    })
  },

  // 获取我的收藏
  getCollect ({ typeId = 1, objectId }: { typeId: any, objectId: any }) {
    return http.get(`${host}/collect?typeId=${typeId}&objectId=${objectId}`)
  },

  // 添加收藏
  addCollect ({ itemId, objectId, typeId = 1 }: any) {
    return http.post(`${host}/collect?typeId=${typeId}&objectId=${objectId}`, {
      itemId
    })
  },

  // 删除收藏
  removeCollect ({ recordId }: any) {
    return http.delete(`${host}/collect/${recordId}`)
  },

  // 收藏状态查询
  getCollectState ({ itemId, typeId = 1, objectId }: any) {
    return http.get(
      `${host}/collect/${itemId}?typeId=${typeId}&objectId=${objectId}`
    )
  },

  // 获取聊天信息
  getChatList () {
    return http.get(`${host}/chat`)
  },

  // 获取聊天信息
  getChatItem ({ partnerId }: any) {
    return http.get(`${host}/chat/${partnerId}`)
  },

  // 获取顺丰城市
  getSfCityList () {
    return http.get(`${host}/sfCity`)
  },

  // 添加收货地址
  addAddress ({
    address,
    mobile,
    street,
    username,
    city,
    province,
    district,
    zip
  }: any) {
    return http.post(`${host}/deliveryAddress`, {
      address,
      mobile,
      street,
      username,
      city,
      province,
      district,
      zip
    })
  },

  removeAddress ({ id }: any) {
    return http.delete(`${host}/deliveryAddress/${id}`)
  },

  register ({ mobile, password }: any) {
    return http.post(`${host}/user/register`, { mobile, password })
  },

  checkLogin () {
    return http.get(`${host}/user/checkLogin`)
  },

  // 评论 ---------------------------------------------------------------------------------
  // 获取评论
  getComment ({ itemId, typeId }: any) {
    return http.get(`${host}/comment?itemId=${itemId}&typeId=${typeId}`)
  },
  // 增加评论
  addComment ({ itemId, content, talkTo, typeId }: any) {
    return http.post(`${host}/comment?itemId=${itemId}`, {
      talkTo,
      typeId,
      content
    })
  },

  // 用户关注模块 -------------------------------------------------------------------------
  // 获取我的关注
  getFollowList () {
    return http.get(`${host}/follow`)
  },
  // 添加关注
  addFollow ({ followId }: any) {
    return http.post(`${host}/user/follow`, {
      followId
    })
  },
  // 取消关注
  removeFollow ({ followId }: any) {
    return http.delete(`${host}/user/follow/${followId}`)
  },

  // 需求模块 -----------------------------------------------------------------------------
  // 创建需求
  createDemand (params: any) {
    return http.post(`${host}/demand`, {
      ...params
    })
  },

  // 需求详情
  getDemandItem ({ itemId }: any) {
    return http.get(`${host}/demand/${itemId}`)
  },

  /**
   * @description: 报名
   * @param {Number} param0 项目ID
   */
  createEnroll ({
    projectId
  }: any) {
    return http.post(`${host}/enroll/?projectId=${projectId}`)
  },

  /**
   * @description: 报名列表
   * @param {Number} param0
   */
  getEnrollList ({
    projectId
  } : any) {
    return http.get(`${host}/enroll/?projectId=${projectId}`)
  },

  /**
   * @description: 报名状态
   * @param {Number} param0
   */
  getEnrollStatus ({
    projectId
  }: any) {
    return http.get(`${host}/enrollStatus?projectId=${projectId}`)
  },

  /**
   * @description 获取指定用户的报名项目
   */
  getUserEnrollList () {
    return http.get(`${host}/userEnrollList`)
  },

  /**
   * @description 获取当前用户所发布的需求
   */
  getUserCreateList (params: any) {
    return http.get(`${host}/demand/getUserCreateList`, {
      params
    })
  }
}
