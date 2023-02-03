import { Layout } from 'antd';
import Image from 'next/image';
import React, { useState, useRef, useContext } from 'react';
import Router from 'next/router';
import { AlignRightOutlined } from '@ant-design/icons';

import { WHITE_LOGO } from '@/assets/img';
import style from './style.module.css';
import useScrollPosition from '@/hooks/useScrollPosition';
import useClickOutside from '@/hooks/useClickOutside';

const { Header } = Layout;
const HeaderComponent = (props) => {
    const position = useScrollPosition();
    const headerRef = useRef(null);
    const mobileNavRef = useRef(null);
    const humburgerRef = useRef(null);

    const [menuActive, setMenuActive] = useState(false);
    const [active, setActive] = useState('');

    const handleTransferLink = (href) => {
        if (href.startsWith('#')) {
            setActive(href);
            const headerHeight = headerRef.current.clientHeight;

            document.body.scrollTop = document.querySelector(href).offsetTop - headerHeight;
        } else {
            window.location.href = href;
        }
    };

    useClickOutside(mobileNavRef, (target) => {
        if (!humburgerRef.current.contains(target)) {
            setMenuActive(false);
        }
    });

    return (
        <>
            <Header ref={headerRef} className={style.header + ' ' + (position > 80 ? style.fixed : '')}>
                <div className={style.header_inner}>
                    <Image
                        onClick={() => Router.push('/')}
                        className={style.logo}
                        src={WHITE_LOGO.src}
                        width={102}
                        height={30}
                        alt="creditvn_logo"
                    />

                    <div>
                        <AlignRightOutlined
                            ref={humburgerRef}
                            className={style.humburger}
                            onClick={() => setMenuActive(!menuActive)}
                        />
                    </div>
                </div>
                <div ref={mobileNavRef} className={style.mobile_nav + ' ' + (menuActive ? style.active : '')}>
                    {props.menu &&
                        props.menu.map((item, index) => (
                            <div
                                className={active == item.href ? style.link_active : ''}
                                key={index}
                                onClick={() => handleTransferLink(item.href)}
                            >
                                {item.label}
                            </div>
                        ))}
                </div>
            </Header>
        </>
    );
};

export default HeaderComponent;
