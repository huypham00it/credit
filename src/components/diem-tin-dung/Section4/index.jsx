import { Typography, Row, Card, Col, Button } from 'antd';

import data from '@/configs/diem_tin_dung';
import style from './style.module.css';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

const Section4 = () => {
    return (
        <section className={style.section} id="method">
            <div className="container">
                <Title level={2} className={style.heading}>
                    {data.section_04.heading}
                </Title>
                <Row align="center" gutter={[24, 24]} className={style.cards}>
                    {data.section_04.items.map((item, index) => (
                        <CardItem key={index} item={item} />
                    ))}
                </Row>
            </div>
        </section>
    );
};

const CardItem = ({ item }) => {
    const [isFlip, setIsFlip] = useState(false);

    return (
        <>
            <Col className={[style.card_wrap, isFlip ? style.card_flip : ''].join(' ')} span={24} md={12} xl={8}>
                <Card className={style.card}>
                    <div className={style.card_front}>
                        <div>
                            <span className={style.card_front__icon}>{item.icon}</span>
                        </div>
                        <Title level={3} className={style.card_front__heading}>
                            {item.heading}
                        </Title>
                        <Paragraph className={style.card_front__desc}>{item.desc}</Paragraph>
                        <Button className={style.card_front__button} type="text" onClick={() => setIsFlip(true)}>
                            {data.section_04.detail}
                        </Button>
                    </div>
                    <div className={style.card_back} onClick={() => setIsFlip(false)}>
                        <Title level={3} className={style.card_back__heading}>
                            {item.heading}
                        </Title>
                        <Paragraph className={style.card_back__desc}>{item.content}</Paragraph>
                    </div>
                </Card>
            </Col>
        </>
    );
};

export default Section4;
