import React from 'react';
import { Row, Col, Button, Grid } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import style from './style.module.css';
import Logo from '@/components/general/Logo';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const { useBreakpoint } = Grid;

const Footer = ({ data, navs, setCurrent }) => {
    const screen = useBreakpoint();
    const maxW768 = useMediaQuery('(max-width:768px)');

    return (
        <footer className={style.footer}>
            <div className={style.footer_inner}>
                <Row gutter={80}>
                    <Col md={8} xs={24}>
                        <div className={style.col_1}>
                            <Logo textColor="white" width={170.59} height={50} />

                            <h5>{data.description}</h5>

                            <h3>{data.working_time.heading}</h3>
                            <div className={style.working_time}>
                                <ClockCircleOutlined />
                                <p>{data.working_time.description}</p>
                            </div>
                        </div>
                    </Col>

                    <Col md={8} xs={24}>
                        <div className={style.col_2}>
                            <h3>{data.contact.heading}</h3>
                            <div className={style.contact_item}>
                                {data.contact.email.icon}
                                <a href={'mailto:' + data.contact.email.description}>
                                    {data.contact.email.description}
                                </a>
                            </div>
                            <div className={style.contact_item}>
                                {data.contact.address.icon}
                                <a href={data.contact.address.href} target="_blank" rel="noreferrer">
                                    {data.contact.address.description}
                                </a>
                            </div>
                        </div>
                    </Col>

                    <Col md={8} xs={24}>
                        <div className={style.col_3}>
                            <h3>Sitemap</h3>
                            <ul>
                                {navs.map((item, i) => (
                                    <li key={i} className={style.nav_link}>
                                        <Button
                                            type="text"
                                            href={item.href}
                                            onClick={(e) => {
                                                if (item.href.startsWith('#')) {
                                                    setCurrent && setCurrent(item.href);
                                                    e.preventDefault();
                                                    const offsetTop = document.querySelector(item.href)?.offsetTop;
                                                    document.body.scrollTo(0, offsetTop - (screen.md ? 83 : 73));
                                                }
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
            <div
                style={{
                    fontSize: maxW768 ? '12px' : '14px',
                    lineHeight: '22px',
                    fontWeight: 500,
                    textAlign: 'center',
                    padding: 8,
                    backgroundColor: '#000000',
                }}
            >
                {data.copyright}
            </div>
        </footer>
    );
};

export default Footer;
