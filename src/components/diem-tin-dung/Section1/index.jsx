import { CheckCircleTwoTone } from '@ant-design/icons';
import { Button, Col, Image, Row, Typography, Grid } from 'antd';

import style from './style.module.css';
import data from '@/configs/diem_tin_dung';
import hero from '@/assets/img/diem-tin-dung/hero.png';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Section1 = () => {
    const screen = useBreakpoint();
    return (
        <section
            className={style.section}
            style={{
                backgroundImage: 'url(' + hero.src + ')',
            }}
        >
            <div className={[style.custom_container, 'container'].join(' ')}>
                <Row gutter={[60, 16]}>
                    <Col span={24} xl={13}>
                        <Title className={style.heading}>{data.section_01.heading}</Title>
                        <div className={style.text}>
                            <Paragraph className={style.paragraph}>{data.section_01.paragraph}</Paragraph>

                            <div className={style.items_group}>
                                {data.section_01.items.map((item, index) => (
                                    <div className={style.items_wrap} key={index}>
                                        <CheckCircleTwoTone twoToneColor="#CEC8FD" /> <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button
                            className={style.button}
                            size="large"
                            href={screen.xl ? '#diem-tin-dung' : '#form-diem-tin-dung'}
                        >
                            {data.button}
                        </Button>
                    </Col>
                    <Col span={24} xl={11}>
                        <Image style={{ aspectRatio: 1 }} src={data.IMG_01.src} preview={false} />
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default Section1;
