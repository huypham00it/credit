import { Button, Typography, Grid } from 'antd';

import data from '@/configs/diem_tin_dung';
import style from './style.module.css';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Section3 = () => {
    const screen = useBreakpoint();
    return (
        <section className={style.section}>
            <div className="container">
                <Title className={style.heading}>{data.section_03.heading}</Title>
                <Paragraph className={style.paragraph}>{data.section_03.paragraph}</Paragraph>
                <Button
                    type="primary"
                    className={style.button}
                    href={screen.xl ? '#diem-tin-dung' : '#form-diem-tin-dung'}
                >
                    {data.button}
                </Button>
            </div>
        </section>
    );
};

export default Section3;
