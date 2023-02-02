import { Col, Image, Row, Typography, Grid } from 'antd';

import data from '@/configs/diem_tin_dung';
import style from './style.module.css';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Section2 = () => {
    const screen = useBreakpoint();
    return (
        <section className={style.section}>
            <div className="container">
                <Row gutter={42}>
                    <Col order={screen.xl ? 1 : 2} span={24} xl={10}>
                        <Image style={{ aspectRatio: 1 }} src={data.IMG_02.src} preview={false} />
                    </Col>
                    <Col order={screen.xl ? 2 : 1} span={24} xl={14}>
                        <Title className={style.heading}>{data.section_02.heading}</Title>
                        <Paragraph className={style.head_paragraph}>{data.section_02.paragraph}</Paragraph>
                        <Title className={style.sub_heading} level={2}>
                            {data.section_02.sub_heading}
                        </Title>

                        <div className={style.items_group}>
                            {data.section_02.items.map((item, index) => (
                                <div className={style.item} key={index}>
                                    <span className={style.item_icon}>{item.icon}</span>
                                    <span className={style.item_text}>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row className={style.footer}>
                    <Paragraph className={style.footer_content}>{data.section_02.foot_paragraph}</Paragraph>
                </Row>
            </div>
        </section>
    );
};

export default Section2;
