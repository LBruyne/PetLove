import React, {useContext} from 'react'
import {Image, Layout, Menu} from "antd";

import './index.scss'
import {LogoImage} from "../../../assets/images";
import PlugConnect from "@psychedelic/plug-connect/src/index";
import {canisterWhiteLists} from "../../config";
import {MailOutlined, UserOutlined} from "@ant-design/icons";
import appContext from "../../api/context";
import {getBackendActor, getTokenActor} from "../../api/getActor";
import {reducerOperation} from "../../api/constant";

const {Header} = Layout

const HeaderComp = () => {
    const context= useContext(appContext)
    return (
        <Header className='header'>
            <div className='logo'>
                <Image className='logo-img' src={LogoImage} preview={false}/>
                <div className='logo-name'>Pet Love</div>
            </div>
            <Menu mode='horizontal' className='menu' defaultSelectedKeys={['0']}>
                <Menu.Item key='0'><a href='/#/home'>Home</a></Menu.Item>
                <Menu.Item key='1'><a href='/#/market'>Market</a></Menu.Item>
                <Menu.Item key='2'><a href='/#/pet'>My Pet</a></Menu.Item>
                <Menu.Item key='3'><a href='/#/test'>Test</a></Menu.Item>
            </Menu>
            <div className='state'>
                { context.state.login ?
                    <>
                        <MailOutlined style={{fontSize: '24px', marginRight: '48px'}}/>
                        <Link to={{
                            pathname: `/user`,
                        }}>
                            <UserOutlined style={{fontSize: '24px'}}/>
                        </Link>
                    </> :
                    <>
                        <PlugConnect
                            whitelist={canisterWhiteLists}
                            onConnectCallback={async () => {
                                let backendActor = await getBackendActor()
                                let tokenActor = await getTokenActor()
                                let principal = await window.ic.plug.getPrincipal()
                                context.dispatch({'type':reducerOperation.login,backendActor,tokenActor,principal})
                            }}
                        />
                    </>
                }
            </div>
        </Header>
    )

}

export default HeaderComp