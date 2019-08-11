export default [
  {icon: 'user', style: {color: '#eaf0ff'}, title: '商户管理', path: '/userManagement'},
  {icon: 'setting',
    title: '系统管理',
    child: [
      {title: 'ipc信息', path: '/system/config',},
      {title: '操作日志', path: '/system/operationLog',},
      {title: '系统消息', path: '/system/message',},
      {title: '图片上传', path: '/system/uploadImg',}
    ]
  }

]
