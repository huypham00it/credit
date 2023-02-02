import { Col, Divider, Layout, Row, Typography } from 'antd';
import Image from 'next/image';

import { WHITE_LOGO } from '@/assets/img';
import style from './style.module.css';

const { Footer } = Layout;
const { Title } = Typography;

const FooterComponent = () => {
    return (
        <Footer className={style.footer}>
            <div className={style.footer_inner}>
                <Row gutter={[12, 12]} className={style.footer_top}>
                    <Col span={24} md={12} xl={6}>
                        <Image width={102} height={30} src={WHITE_LOGO.src} />
                        <Title className={style.footer_slogan} level={5}>
                            Hỗ trợ người dùng tìm ra và lựa chọn được sản phẩm tài chính phù hợp
                        </Title>
                    </Col>
                    <Col span={24} md={12} xl={6}></Col>
                    <Col span={24} md={12} xl={6}></Col>
                    <Col span={24} md={12} xl={6}>
                        <a href="mailto:creditvn@gmail.com">creditvn@gmail.com</a>
                        <Title className={style.footer_address} level={4}>
                            70 Nguyễn Phi Khanh,
                            <br /> Tân Định, Quận 1, TP. HCM
                        </Title>
                    </Col>
                </Row>
                <Row className={style.footer_bottom}>Copyright © {new Date().getFullYear()} Credit.vn</Row>
            </div>
        </Footer>
    );
};

export default FooterComponent;
