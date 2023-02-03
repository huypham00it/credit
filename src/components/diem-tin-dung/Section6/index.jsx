import { Button, Card, Col, Form, Row, Space, Typography } from 'antd';

import dataConfig from '@/configs/diem_tin_dung';
import { BaseInput, LocationInput, NameInput, NumberInput, SelectInput, TextInput } from '@/components/form';
import style from './style.module.css';
import { CreditCardFilled, LeftOutlined } from '@ant-design/icons';
import GaugeScoring from '@/components/general/GaugeScoring';

const { Title, Paragraph } = Typography;
const data = dataConfig.section_06;

const Section6 = () => {
    return (
        <section className={style.section} id="rank">
            <div className="container">
                <Row gutter={136}>
                    <Col span={24} xl={9}>
                        <Title className={style.heading} level={2}>
                            {data.heading}
                        </Title>
                        <Title level={5} className={style.desc}>
                            {data.desc}
                        </Title>
                    </Col>
                    <Col span={24} xl={15}>
                        <Row gutter={[24, 24]} align="middle">
                            <Col span={24} xl={12}>
                                <Row gutter={[24, 24]}>
                                    <Col span={24} md={12} xl={24}>
                                        <CardComp data={data.items[0]} />
                                    </Col>
                                    <Col span={24} md={12} xl={24}>
                                        <CardComp data={data.items[1]} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24} xl={12}>
                                <Row gutter={[24, 24]}>
                                    <Col span={24} md={12} xl={24}>
                                        <CardComp data={data.items[2]} />
                                    </Col>
                                    <Col span={24} md={12} xl={24}>
                                        <CardComp data={data.items[3]} />
                                    </Col>
                                    <Col span={24} md={12} xl={24}>
                                        <CardComp data={data.items[4]} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Title level={5} className={style.paragraph}>
                        {data.paragraph}
                    </Title>
                </Row>
            </div>
        </section>
    );
};

const CardComp = ({ data }) => {
    return (
        <Card className={style.card}>
            <span>{data.icon}</span>
            <div>
                <Title className={style.card_title} level={4}>
                    {data.heading}
                </Title>
                <Title className={style.card_paragraph} level={5}>
                    {data.desc}
                </Title>
            </div>
        </Card>
    );
};

export default Section6;
