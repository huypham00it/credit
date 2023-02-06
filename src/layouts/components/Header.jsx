import React from 'react';
import { Layout, Button, Col, Row } from 'antd';
import { useRouter } from 'next/router';

import menus from '@/configs/navigation';
import menuStyle from '@/assets/Menu.module.css';
import Logo from '@/components/general/Logo';

const { Header } = Layout;

const DesktopNavigation = ({ handleOpenSlider }) => {
    const router = useRouter();

    return (
        <Layout>
            <Header
                style={{
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingLeft: '128px',
                    paddingRight: '128px',
                    boxShadow: '0 2px 8px #f0f1f2',
                    position: 'sticky',
                    top: 0,
                }}
            >
                <Logo height={64} width={109.26} />
                <Row style={{ width: '390px' }}>
                    {menus.map((menu, index) => (
                        <Col span={8} key={index}>
                            <Button
                                type="link"
                                className={`${menuStyle.menu_button} ${
                                    router.pathname == menu.key && menuStyle.menu_active
                                }`}
                                icon={menu.icon}
                                onClick={() => {
                                    if (menu.key === 'slider') {
                                        handleOpenSlider();
                                    } else {
                                        router.push(menu.key);
                                    }
                                }}
                            >
                                {menu.label}
                            </Button>
                        </Col>
                    ))}
                </Row>
            </Header>
        </Layout>
    );
};

export default DesktopNavigation;
