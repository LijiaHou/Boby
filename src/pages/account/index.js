import { Button } from "antd";
import {useNavigate} from 'react-router-dom';
import Header from '@/components/header'
import './index.scss'

const Account = () => {
  const navigate = useNavigate()
  
  return (
  <div className="P-account">
    <h1>Account Page</h1>
    <div className="ipt-con">
      <Button type="primary" onClick={() => navigate('/home')}>返回登录</Button>
    </div>
  </div>
)
}

export default Account