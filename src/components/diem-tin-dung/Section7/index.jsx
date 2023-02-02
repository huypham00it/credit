import { Button, Card, Col, Form, Row, Space, Typography } from 'antd';

import dataConfig from '@/configs/diem_tin_dung';
import { BaseInput, LocationInput, NameInput, NumberInput, SelectInput, TextInput } from '@/components/form';
import style from './style.module.css';
import { CreditCardFilled, LeftOutlined } from '@ant-design/icons';
import GaugeScoring from '@/components/general/GaugeScoring';
import bg from '@/assets/img/diem-tin-dung/sub_bg.png';

const { Title, Paragraph } = Typography;
const data = dataConfig.section_07;

const Section7 = () => {
    return (
        <section
            className={style.section}
            style={{
                backgroundImage: 'url(' + bg.src + ')',
            }}
        >
            <div className="container">
                <Row gutter={32}>
                    <Col span={24} xl={14}>
                        <Title className={style.heading}>{data.heading}</Title>
                    </Col>
                    <Col span={24} xl={10}>
                        <Title className={style.desc} level={5}>
                            {data.desc}
                        </Title>
                    </Col>
                </Row>
                <Row gutter={[24, 20]}>
                    {data.items.map((item, index) => (
                        <Col span={24} md={12} xl={8} key={index}>
                            <Card className={style.card}>
                                <div>
                                    <span className={style.card_icon}>{item.icon}</span>
                                </div>
                                <Title className={style.card_title} level={4}>
                                    {item.heading}
                                </Title>
                                <Paragraph className={style.card_paragraph}>{item.paragraph}</Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};

export default Section7;
