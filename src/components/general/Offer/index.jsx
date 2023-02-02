import { Button, Card, Progress } from 'antd';

import style from './style.module.css';
import * as SLUGID from '@/configs/slugId';

const Offer = ({ offer, buttonProps, handleButtonClick }) => {
    return (
        <Card className={style.loan_item} bodyStyle={{ padding: 0 }}>
            <div className={style.loan_item_top}>
                <img
                    alt="Logo"
                    src={offer.img.src}
                    style={{
                        display: 'block',
                        height: '100%',
                        maxHeight: '32px',
                    }}
                />
                <div style={{ padding: '8px 0 8px 8px' }}>
                    <Button
                        type="primary"
                        className={style.button}
                        onClick={() => handleButtonClick(offer)}
                        {...buttonProps}
                        id={SLUGID.LOAN_SIGN_UP + offer.offer_id}
                    >
                        Đăng ký
                    </Button>
                </div>
            </div>
            <div className={style.loan_item_bottom} style={{ padding: '8px 16px' }}>
                <p style={{ marginBottom: '0', lineHeight: 1 }}>Cơ hội được giải ngân {offer.percent}%</p>
                <Progress style={{ lineHeight: 1 }} percent={offer.percent} showInfo={false} />
            </div>
        </Card>
    );
};

export default Offer;
