import { Layout } from 'antd';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Router from 'next/router';

import { WHITE_LOGO } from '@/assets/img';
import style from './style.module.css';
import useScrollPosition from '@/hooks/useScrollPosition';

const { Header } = Layout;
const HeaderComponent = (props) => {
    const position = useScrollPosition();

    return (
        <>
            <Header className={style.header + ' ' + (position > 80 ? style.fixed : '')}>
                <div className={style.header_inner}>
                    <Image
                        onClick={() => Router.push('/')}
                        className={style.logo}
                        src={WHITE_LOGO.src}
                        width={102}
                        height={30}
                        alt="creditvn_logo"
                    />
                </div>
            </Header>
        </>
    );
};

export default HeaderComponent;
