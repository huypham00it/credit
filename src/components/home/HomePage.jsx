/* eslint-disable @next/next/no-img-element */
import GaugeComponent from '@/components/home/Gauge';
import { Card, Button, Progress, Modal, Form } from 'antd';
import Image from 'next/image';

import * as SLUGID from '@/configs/slugId';
import StyleHome from '@/assets/Home.module.css';
import loans_list from '@/configs/loans_percent';
import { UserInfo } from '@/contexts/user';
import request from '@/utils/request';
import { useLoading } from '@/contexts/loading';
import Cookies from 'universal-cookie';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Bubble from './Bubble';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Grid } from 'antd';
import title from '@/configs/title';
import Head from 'next/head';
import { EmailInput } from '../form';
import Link from 'next/link';

const { useBreakpoint } = Grid;

export default function HomePage(props) {
    const { user } = UserInfo();
    let short_loans = [];
    let long_loans = [];

    loans_list.forEach((loan) => {
        let _loan = user.loans.find((element) => element.name == loan.name);
        if (_loan) loan.percent = _loan.value >= 0.3 ? Math.round(Number(_loan.value) * 100) : 30;
        if (loan.loan_type == 'short') short_loans.push(loan);
        else long_loans.push(loan);
    });

    short_loans = short_loans.sort(function (a, b) {
        return b.percent - a.percent;
    });
    long_loans = long_loans.sort(function (a, b) {
        return b.percent - a.percent;
    });

    return (
        <>
            <CreditScore score={user.credit_scoring ? user.credit_scoring : 'High'} large={props.large} />
            <div className={StyleHome.content_wrapper}>
                <h1
                    style={{ fontSize: '16px', fontWeight: 500, textAlign: 'center', marginTop: '16px' }}
                    className={StyleHome.content_heading}
                >
                    Khoản vay dành riêng cho bạn
                </h1>
                <h4 style={{ fontSize: '14px', fontWeight: 700 }} className={StyleHome.content_subheading}>
                    Vay ngắn hạn
                </h4>
                <div className={props.isComplete ? StyleHome.loans_wrap : ''}>
                    <LoansList loans={short_loans} />
                </div>

                <h4
                    style={{ fontSize: '14px', fontWeight: 700, marginTop: '16px' }}
                    className={StyleHome.content_subheading}
                >
                    Vay dài hạn
                </h4>
                <div className={props.isComplete ? StyleHome.loans_wrap : ''}>
                    <LoansList loans={long_loans} />
                </div>
            </div>
        </>
    );
}

const CreditScore = ({ score, large }) => {
    const [canvasHeight, setCanvasHeight] = useState(null);
    const [openBubble, setOpenBubble] = useState(true);
    const minW768 = useMediaQuery('(min-width:768px)');
    const screen = useBreakpoint();
    const router = useRouter();

    const score_lst = {
        Low: {
            title: 'Thấp',
            title_color: '#FD4363',
            color: ['#FD4363', '#F5F5F5', '#F5F5F5', '#F5F5F5'],
        },
        Medium: {
            title: 'Trung bình',
            title_color: '#978EEE',
            color: ['#FD4363', '#978EEE', '#F5F5F5', '#F5F5F5'],
        },
        High: {
            title: 'Cao',
            title_color: '#6A5EDC',
            color: ['#FD4363', '#978EEE', '#6A5EDC', '#F5F5F5'],
        },
        'Very High': {
            title: 'Rất cao',
            title_color: '#4B3FBA',
            color: ['#FD4363', '#978EEE', '#6A5EDC', '#4B3FBA'],
        },
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // const canvas = document.querySelector('canvas');
        // setCanvasHeight(canvas.clientHeight + canvas.clientHeight * 0.109);
        const ScoreWrap = document.querySelector('#credit-score');
        // const bubble = document.getElementById('bubble');
        // if (!screen.md && bubble !== null) {
        // 	bubble.style.top = ScoreWrap.clientHeight + 20 + 'px';
        // } else if (bubble !== null) {
        // 	bubble.style.left = (window.screen.width - 732) / 2 + 732 + 65 + 'px';
        // }
    });

    return (
        <>
            <div className={StyleHome.credit_score_wrap} style={{ position: 'relative' }} id="credit-score">
                <div
                    className={StyleHome.cut_circ}
                    style={{
                        background: 'conic-gradient(rgb(240, 240, 240) 78%, white 10%, white)',
                    }}
                >
                    <div className={StyleHome.credit_inner}>
                        <div className={StyleHome.credit_inner_content}>
                            <h2
                                style={{
                                    fontFamily: 'BeVietnamProBold',
                                    marginBottom: 0,
                                }}
                            >
                                Điểm tín dụng
                            </h2>
                            <h1
                                style={{
                                    fontFamily: 'Montserrat',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    color: score_lst[score].title_color,
                                }}
                            >
                                {score_lst[score].title}
                            </h1>
                        </div>
                    </div>
                </div>
                <div>
                    <GaugeComponent score={score_lst[score]} />
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <p
                        className={StyleHome.text_link}
                        onClick={() => {
                            router.push('/diem-tin-dung');
                        }}
                    >
                        Vì sao điểm tín dụng <span>{score_lst[score].title}</span>
                    </p>
                </div>

                {/* Survey Bubble Mobile */}

                {/* {openBubble && !minW768 &&
				<Bubble
					iconSize={{ width: 113, height: 103.53 }}
					textSize={{ width: 100, height: 32 }}
					handleClose={() => setOpenBubble(false)}
					style={{
						position: 'fixed',
						right: '5%',
					}}
				/>} */}
            </div>
        </>
    );
};

const LoansList = ({ loans }) => {
    const router = useRouter();
    const cookies = new Cookies();
    const { showLoading, hideLoading } = useLoading();
    const click_id = cookies.get('click_id');
    // const flow_id = cookies.get('flow_id');
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [signUpItem, setSignupItem] = useState({});
    const [form] = Form.useForm();
    const { user, setUser } = UserInfo();

    const getOffer = (item) => {
        showLoading();
        request
            .post('/get_offer', {
                offer_id: item.offer_id,
                click_id: click_id,
                type: item.type,
            })
            .then(function (response) {
                hideLoading();
                if (response.data && response.data.data && response.data.data.tracking_link) {
                    window.location.href = response.data.data.tracking_link;
                } else {
                    router.push(item.path);
                }
            })
            .catch(function (error) {
                hideLoading();
                console.log(error.response.data);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.status &&
                    error.response.data.code == 1001
                ) {
                    // self.alert_title = "Đăng ký thất bại";
                    // self.alert_content = `Rất tiếc, hồ sơ của bạn đã tồn tại trong hệ thống của ${item.name} hoặc bạn không đủ điều kiện đăng ký. Vui lòng xem thêm các sản phẩm khác tại Credit.vn`;
                    // self.alert_button_label = "Xác nhận";
                    // self.alert_button_id = 'fail-offer-' + item.offer_id;
                    // self.is_submit = true;
                    Modal.error({
                        title: 'Đăng ký thất bại',
                        content: `Rất tiếc, hồ sơ của bạn đã tồn tại trong hệ thống của ${item.label} hoặc bạn không đủ điều kiện đăng ký. Vui lòng xem thêm các sản phẩm khác tại Credit.vn`,
                        okText: 'Xác nhận',
                        okButtonProps: { id: SLUGID.CONFIRM_ERROR + item.offer_id },
                    });
                } else {
                    Modal.error({
                        title: 'Đăng ký thất bại',
                        content: 'Có lỗi xảy ra, xin vui lòng thử lại sau ít phút',
                        okText: 'Xác nhận',
                    });
                    // self.alert_title = "Lỗi";
                    // self.alert_content = `Không thể chuyển đến hệ thống của ${item.name}. Vui lòng thử lại sau.`;
                    // self.alert_button_label = "Xác nhận";
                    // self.alert_button_id = 'fail-offer-' + item.offer_id;
                    // self.is_submit = true;
                }
            });
    };

    const handleSignUp = (item) => {
        if (!user.email || user.email == '') {
            setSignupItem(item);
            setIsEmailModalOpen(true);
        } else {
            getOffer(item);
        }
    };

    const handleEmailOk = () => {
        form.validateFields()
            .then(async (values) => {
                setUser({ ...user, email: Object.values(values)[0] });

                await updateInfo(values);
                getOffer(signUpItem);
                setIsEmailModalOpen(false);
            })
            .catch((info) => {});
    };

    const updateInfo = (emailData) => {
        return request.post('/update_info', emailData);
    };

    return (
        <>
            {loans.map((loan, index) => (
                <Card className={StyleHome.loan_item} bodyStyle={{ padding: 0 }} key={index}>
                    <div className={StyleHome.loan_item_top}>
                        <img
                            alt="Logo"
                            src={loan.img.src}
                            style={{
                                display: 'block',
                                height: '100%',
                                maxHeight: '32px',
                            }}
                        />
                        <div style={{ padding: '8px 0 8px 8px' }}>
                            <Button
                                type="primary"
                                className={StyleHome.button}
                                onClick={() => {
                                    // handleSignUp(loan);
                                    getOffer(loan);
                                }}
                                id={SLUGID.LOAN_SIGN_UP + loan.offer_id}
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                    <div className={StyleHome.loan_item_bottom} style={{ padding: '8px 16px' }}>
                        <p style={{ marginBottom: '0', lineHeight: 1 }}>Cơ hội được giải ngân {loan.percent}%</p>
                        <Progress style={{ lineHeight: 1 }} percent={loan.percent} showInfo={false} />
                    </div>
                </Card>
            ))}

            {/* Email field modal */}
            <Modal
                centered={true}
                open={isEmailModalOpen}
                onOk={handleEmailOk}
                closable={false}
                wrapClassName={StyleHome.email_modal}
                onCancel={() => setIsEmailModalOpen(false)}
                okButtonProps={{
                    id: SLUGID.NEXT_EMAIL,
                }}
            >
                <p style={{ marginBottom: 8 }}>Vui lòng bổ sung email để tiếp tục</p>
                <Form form={form} name="email">
                    <EmailInput
                        onPressEnter={handleEmailOk}
                        autoFocus
                        name="email"
                        size="large"
                        placeholder="Nhập email"
                    />
                </Form>
            </Modal>
        </>
    );
};
