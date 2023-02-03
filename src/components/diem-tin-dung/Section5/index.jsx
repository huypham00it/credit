import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Grid, Typography, notification, Modal } from 'antd';
import Router from 'next/router';
import { random } from 'lodash';

import dataConfig from '@/configs/diem_tin_dung';
import { BaseInput, EmailInput, LocationInput, NameInput, SelectInput, TextInput } from '@/components/form';
import style from './style.module.css';
import { CreditCardFilled, LeftOutlined, UpOutlined } from '@ant-design/icons';
import GaugeScoring from '@/components/general/GaugeScoring';
import toNonAccentVietnamese from '@/utils/nonAccentVietnamese';
import { UserInfo } from '@/contexts/user';
import * as SLUGID from '@/configs/slugId';
import Offer from '@/components/general/Offer';
import { Gauge } from '@/components/general/Gauge/Gauge';
import request from '@/utils/request';
import { useLoading } from '@/contexts/loading';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

const { Title, Paragraph } = Typography;
const data = dataConfig.section_05;
const loans_list = data.loans;

const { useBreakpoint } = Grid;

const Section5 = ({ provinces }) => {
    const { user, setUser } = UserInfo();
    const router = useRouter();
    const cookies = new Cookies();
    const { showLoading, hideLoading } = useLoading();
    const click_id = cookies.get('click_id');
    const [form] = Form.useForm();
    const screen = useBreakpoint();

    const [currentProvince, setCurrentProvince] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [score, setScore] = useState(false);
    const [hasEmail, setHasEmail] = useState(false);
    const [formDisabled, setFormDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    let offers = [];

    loans_list.forEach((loan) => {
        let _loan = user.loans.find((element) => element.name == loan.name);
        if (_loan) loan.percent = _loan.value >= 0.3 ? Math.round(Number(_loan.value) * 100) : 30;
        offers.push(loan);
    });

    function handleSetProvince(address = '') {
        form.setFieldValue('ward', null);
        form.setFieldValue('district', null);
        setWards([]);

        const currentProvince = provinces.find((province) =>
            toNonAccentVietnamese(province.name.replace(/\s+/g, ''))
                .toLowerCase()
                .includes(toNonAccentVietnamese(address.replace(/\s+/g, '')).toLowerCase()),
        );
        setCurrentProvince(currentProvince);
    }

    const handleSelectDistrict = (value) => {
        form.setFieldValue('ward', null);
        const district = currentProvince.districts.find((item) => item.name === value);
        setWards(district.wards.map((elm) => ({ label: elm.name, value: elm.name })));
    };

    useEffect(() => {
        if (currentProvince) {
            form.setFieldsValue('district', null);
            setDistricts(currentProvince.districts.map((elm) => ({ label: elm.name, value: elm.name })));
        }
    }, [currentProvince]);

    useEffect(() => {
        handleSetProvince(user?.address);
        if (user.email) {
            setHasEmail(true);
        }
    }, []);

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
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.status &&
                    error.response.data.code == 1001
                ) {
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
                }
            });
    };

    const handleFinish = (values) => {
        if (score === false) {
            setLoading(true);
            const postUserInfo = request.post('/check_credit_info', values);
            const updateEmail = !hasEmail ? request.post('/update_info', { email: values.email }) : 0;

            Promise.all([postUserInfo, updateEmail])
                .then((res) => {
                    if (res[1] && res[1].data.data) {
                        setUser(res[1].data.data);
                    }

                    let currentScore = 0;
                    let load = 0;
                    switch (user.credit_scoring) {
                        case 'Low':
                            currentScore = random(20, 25);
                            break;
                        case 'Medium':
                            currentScore = random(45, 50);
                            break;
                        case 'High':
                            currentScore = random(70, 75);
                            break;
                        case 'Very High':
                            currentScore = random(90, 95);
                            break;
                        default:
                            setScore(false);
                            break;
                    }

                    let intervalId = setInterval(() => {
                        if (load >= currentScore) {
                            clearInterval(intervalId);
                        }
                        setScore(load++);
                    }, 30);

                    setFormDisabled(true);
                    Router.push('#diem-tin-dung');
                })
                .catch(() => {
                    notification.error({
                        message: 'Hệ thống xảy ra lỗi!',
                        description: 'Vui lòng thử lại sau',
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            Router.push('#diem-tin-dung');
        }
    };

    return (
        <section className={style.section} id="diem-tin-dung">
            <div className="container">
                <Title className={style.heading}>{data.heading}</Title>
                <Row gutter={[64, 8]}>
                    <Col span={24} xl={11}>
                        <div style={{ position: 'relative' }}>
                            <GaugeScoring
                                hideGaugeDefault={true}
                                hasLimit={true}
                                number={score}
                                score={score != false ? user.credit_scoring : 'unknown'}
                                scoreClass={score === false ? style.score : style.score_lg}
                                customWrapStyle={{
                                    border: '1px solid var(--primary-color)',
                                }}
                            />
                            <Gauge
                                customStyle={{
                                    position: 'absolute',
                                    top: '51%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1,
                                }}
                                radius={screen.md ? 155 : 135}
                                percent={score}
                            />
                        </div>
                        {score === false ? (
                            <Card className={style.card}>
                                <Title className={style.card_title} level={2}>
                                    {data.sub_heading_01}
                                </Title>

                                <div className={style.card_content}>
                                    <CreditCardFilled />
                                    <Paragraph className={style.card_content__paragraph}>{data.note}</Paragraph>
                                </div>
                            </Card>
                        ) : (
                            <div className={style.offers}>
                                <Title level={2} className={style.offers_heading}>
                                    {data.sub_heading_01}
                                </Title>

                                <Row gutter={[16, 16]}>
                                    {offers.map((item, index) => (
                                        <Col span={24} key={index}>
                                            <Offer offer={item} handleButtonClick={getOffer} />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}
                    </Col>

                    <Col span={24} xl={13} id="form-diem-tin-dung">
                        <Card className={style.form}>
                            <Title level={2} className={style.form_heading}>
                                {data.form_heading}
                            </Title>
                            <Paragraph>{data.form_description}</Paragraph>

                            <Form form={form} onFinish={handleFinish} disabled={formDisabled}>
                                {/* Form 01 */}
                                <Title level={5} className={style.form_subheading}>
                                    {data.form_01.heading}
                                </Title>

                                <Row gutter={16}>
                                    <Col span={24} xl={12}>
                                        <NameInput
                                            className={style.input_field}
                                            label={data.form_01.name.label}
                                            name="name"
                                            size="large"
                                            placeholder={data.form_01.name.placeholder}
                                            initialValue={user?.name}
                                            disabled
                                        />
                                    </Col>
                                    <Col span={24} xl={12}>
                                        <EmailInput
                                            className={style.input_field}
                                            label={data.form_01.email.label}
                                            name="email"
                                            size="large"
                                            placeholder={data.form_01.email.placeholder}
                                            initialValue={user?.email}
                                            disabled={user?.email ? true : false}
                                        />
                                    </Col>
                                    <Col span={24} xl={12}>
                                        <LocationInput
                                            className={style.input_field}
                                            label={data.form_01.address.label}
                                            initialValue={user?.address}
                                            name="province"
                                            size="large"
                                            placeholder={data.form_01.address.placeholder}
                                            customItemStyle={{
                                                marginBottom: 0,
                                            }}
                                            edit={false}
                                            form={form}
                                            handleAddressSelect={() => {}}
                                            onBlur={() => {
                                                handleSetProvince(form.getFieldValue('address'));
                                            }}
                                            disabled
                                        />
                                    </Col>

                                    <Col span={24} xl={12}>
                                        <SelectInput
                                            className={style.input_field}
                                            label={data.form_01.district.label}
                                            name="district"
                                            size="large"
                                            onSelect={handleSelectDistrict}
                                            options={districts}
                                            placeholder={data.form_01.district.placeholder}
                                        />
                                    </Col>
                                    <Col span={24} xl={12}>
                                        <SelectInput
                                            label={data.form_01.ward.label}
                                            className={style.input_field}
                                            name="ward"
                                            size="large"
                                            options={wards}
                                            notFoundContent="Vui lòng chọn Quận/huyện"
                                            placeholder={data.form_01.ward.placeholder}
                                        />
                                    </Col>

                                    <Col span={24} xl={12}>
                                        <BaseInput
                                            className={style.input_field}
                                            name="address"
                                            size="large"
                                            placeholder={data.form_01.house_number.placeholder}
                                            label={data.form_01.house_number.label}
                                            required_message={data.form_01.house_number.required_message}
                                        />
                                    </Col>
                                    <Col span={24} xl={12}>
                                        <BaseInput
                                            name="income"
                                            type="number"
                                            size="large"
                                            controls={false}
                                            className={style.input_field}
                                            placeholder={data.form_01.salary.placeholder}
                                            label={data.form_01.salary.label}
                                            suffix={data.form_01.salary.suffix}
                                            onChange={(e) => {
                                                if (e.target.value.length > 3) {
                                                    form.setFieldValue('income', e.target.value.slice(0, 3));
                                                }
                                            }}
                                            required_message={data.form_01.salary.required_message}
                                        />
                                    </Col>

                                    <Col span={24} xl={12}>
                                        <SelectInput
                                            label={data.form_01.martial_status.label}
                                            className={style.input_field}
                                            name="marital_status"
                                            size="large"
                                            placeholder={data.form_01.martial_status.placeholder}
                                            options={data.form_01.martial_status.options}
                                        />
                                    </Col>
                                    <Col span={24} xl={12}>
                                        <SelectInput
                                            label={data.form_01.purpose.label}
                                            className={style.input_field}
                                            name="borrowing_purpose"
                                            size="large"
                                            placeholder={data.form_01.purpose.placeholder}
                                            options={data.form_01.purpose.options}
                                        />
                                    </Col>
                                </Row>

                                {/* Form 02 */}
                                <Title level={5} className={style.form_subheading}>
                                    {data.form_02.heading}
                                </Title>

                                <Row gutter={16}>
                                    <Col span={24} xl={12}>
                                        <SelectInput
                                            className={style.input_field}
                                            label={data.form_02.debt_type.label}
                                            name="debt_type"
                                            size="large"
                                            placeholder={data.form_02.debt_type.placeholder}
                                            options={data.form_02.debt_type.options}
                                        />
                                    </Col>
                                    <Col span={24} xl={12}>
                                        <BaseInput
                                            name="debt_month"
                                            type="number"
                                            size="large"
                                            controls={false}
                                            className={style.input_field}
                                            placeholder={data.form_02.monthly_pay.placeholder}
                                            label={data.form_02.monthly_pay.label}
                                            suffix={data.form_02.monthly_pay.suffix}
                                            onChange={(e) => {
                                                if (e.target.value.length > 3) {
                                                    form.setFieldValue('debt_month', e.target.value.slice(0, 3));
                                                }
                                            }}
                                            required_message={data.form_02.monthly_pay.required_message}
                                        />
                                    </Col>

                                    <Col span={24} xl={12}>
                                        <SelectInput
                                            label={data.form_02.e_wallet.label}
                                            className={style.input_field}
                                            name="e_wallet"
                                            size="large"
                                            placeholder={data.form_02.e_wallet.placeholder}
                                            options={data.form_02.e_wallet.options}
                                        />
                                    </Col>
                                </Row>

                                {/* Form 03 */}
                                <Title level={5} className={style.form_subheading}>
                                    {data.form_03.heading}
                                </Title>

                                <Row gutter={16}>
                                    <Col span={24} xl={12}>
                                        <SelectInput
                                            className={style.input_field}
                                            label={data.form_03.job.label}
                                            name="job"
                                            size="large"
                                            placeholder={data.form_03.job.placeholder}
                                            options={data.form_03.job.options}
                                        />
                                    </Col>
                                    <Col span={24} xl={12}>
                                        <SelectInput
                                            className={style.input_field}
                                            label={data.form_03.field.label}
                                            name="domain"
                                            size="large"
                                            placeholder={data.form_03.field.placeholder}
                                            options={data.form_03.field.options}
                                        />
                                    </Col>

                                    <Col span={24} xl={12}>
                                        <BaseInput
                                            name="company"
                                            size="large"
                                            className={style.input_field}
                                            placeholder={data.form_03.company.placeholder}
                                            label={data.form_03.company.label}
                                            required={false}
                                        />
                                    </Col>
                                    <Col span={24} xl={12}>
                                        <TextInput
                                            className={style.input_field}
                                            size="large"
                                            name="company_position"
                                            label={data.form_03.position.label}
                                            placeholder={data.form_03.position.placeholder}
                                            required={false}
                                            error_message={data.form_03.position.error_message}
                                        />
                                    </Col>

                                    <Col span={24} xl={12}>
                                        <SelectInput
                                            className={style.input_field}
                                            label={data.form_03.experience.label}
                                            name="work_experience"
                                            size="large"
                                            placeholder={data.form_03.experience.placeholder}
                                            options={data.form_03.experience.options}
                                            required={false}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item shouldUpdate>
                                            {() => {
                                                return (
                                                    <Button
                                                        className={style.form_button}
                                                        type="primary"
                                                        size="large"
                                                        icon={screen.xl ? <LeftOutlined /> : <UpOutlined />}
                                                        htmlType="submit"
                                                        loading={loading}
                                                        disabled={
                                                            !(
                                                                form.getFieldValue('name') &&
                                                                form.getFieldValue('province') &&
                                                                form.getFieldValue('district') &&
                                                                form.getFieldValue('ward') &&
                                                                form.getFieldValue('address') &&
                                                                form.getFieldValue('income') &&
                                                                form.getFieldValue('marital_status') &&
                                                                form.getFieldValue('borrowing_purpose') &&
                                                                form.getFieldValue('debt_type') &&
                                                                form.getFieldValue('debt_month') &&
                                                                form.getFieldValue('e_wallet') &&
                                                                form.getFieldValue('job') &&
                                                                form.getFieldValue('domain')
                                                            ) ||
                                                            form.getFieldsError().filter(({ errors }) => errors.length)
                                                                .length ||
                                                            score !== false
                                                        }
                                                    >
                                                        {data.button}
                                                    </Button>
                                                );
                                            }}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default Section5;
