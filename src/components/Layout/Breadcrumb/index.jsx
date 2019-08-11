import style from './bc.scss'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import Link from 'umi/link';

const DynamicUserBreadcrumb = ({ match, location }) => (
  <span>{location.query.id ? '用户信息修改' : '新增用户'}</span>
);
//  可拓展性而言，面包屑和权限管理全局对象，需要后端返回， 当国际化的情况下语言前缀要加上。
const routes = [
  { path: '/zh_CN/userManagement', breadcrumb: '商户管理' },
  { path: '/zh_CN/userManagement/Detail', breadcrumb: DynamicUserBreadcrumb },
  { path: '/zh_CN/system/operationLog', breadcrumb: '操作日志' },
  { path: '/zh_CN/system/message', breadcrumb: '系统消息' },
  { path: '/zh_CN/system/uploadImg', breadcrumb: '图片上传' },
  { path: '/zh_CN/system/config', breadcrumb: 'ipc信息' },
];
const excludePaths = ['/', '/zh_CN', '/zh_CN/system'];
const Breadcrumbs = ({ breadcrumbs }) => (
  <div className={style.Breadcrumb}>
    {breadcrumbs.map((bc, index) => (
      <span key={bc.match.url}>
        <Link
          to={{
            pathname: bc.match.url,
            state: bc.match.params ? bc.match.params : {},
            query: bc.location.query ? bc.location.query : {},
          }}
        >
          {bc.breadcrumb}
        </Link>
        {index < breadcrumbs.length - 1 && <i>&nbsp;/&nbsp;</i>}
      </span>
    ))}
  </div>
);

export default withBreadcrumbs(routes, {excludePaths})(Breadcrumbs);
