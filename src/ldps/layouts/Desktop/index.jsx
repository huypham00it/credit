import { BackTop, Layout } from 'antd';

import FooterComponent from '@/ldps/components/Footer';
import HeaderComponent from '@/ldps/components/Header';
import style from './style.module.css';
import SEO from '@/layouts/components/Seo';

const { Content } = Layout;

const DesktopLayout = (props) => {
    return (
        <>
            <SEO title={props.title} />
            <Layout id={props.id} className={[style.layout, props.customClass].join(' ')}>
                <HeaderComponent menu={props.headerMenu} />
                <Content className={style.content}>{props.children}</Content>
                <FooterComponent />
            </Layout>
        </>
    );
};

export default DesktopLayout;
