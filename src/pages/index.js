import DynamicForm from '../components/DynamicForm'
import config from './config.json'
export default () => <DynamicForm config={config} values={{ companyName: '我的公司', wechat: '嘎嘎' }} />
