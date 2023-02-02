import { Layout } from 'antd';

import FooterComponent from '@/ldps/components/Footer';
import HeaderComponent from '@/ldps/components/Header';
import SEO from '@/layouts/components/Seo';

const { Content } = Layout;

const MobileLayout = (props) => {
    return (
        <>
            <SEO title={props.title} />
            <Layout>
                <HeaderComponent />
                <Content>{props.children}</Content>
                <FooterComponent />
            </Layout>
        </>
    );
};

export default MobileLayout;
