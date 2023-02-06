import { Button, Typography, Radio, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';

import * as SLUGID from '@/configs/slugId';
import gender_question from '@/configs/gender_question';
import theme from '@/configs/theme';
import signupStyle from '@/assets/Signup.module.css';
import DirectionArrow from '@/components/form/DirectionArrow';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import title from '@/configs/title';
import Head from 'next/head';
import InputMaterial from '../form/InputMaterial';
import validEmail from '@/utils/validEmail';
import { set } from 'lodash';

const { Title } = Typography;

export default function GenderQuestion({ user, setUser, prevQuestion, nextQuestion, current_step, total_steps }) {
    let start_input = useRef(new Date().getTime());
    let total_input = useRef(1);
    const fieldTime = useRef(null);
    const genderRef = useRef(null);
    const [hasError, setHasError] = useState(false);

    const matches = useMediaQuery('(max-height:568px)');
    const minW768 = useMediaQuery('(min-width:768px)');

    const handleNextQuestion = () => {
        nextQuestion({ type: 'email', total_input: fieldTime.current, value: user.email });
        nextQuestion({ type: 'gender', total_input: total_input.current, value: user.gender });
    };

    const updateGender = (value) => {
        total_input.current = new Date().getTime() - start_input.current;
        let new_data = { ...user };
        new_data.gender = value;
        setUser(new_data);
    };

    const updateEmail = (value) => {
        let new_data = { ...user };
        new_data.email = value;
        setUser((user) => new_data);
    };

    const handlePressEnter = () => {
        const emailValue = document.getElementById('email-input')?.value;
        console.log(emailValue);
        if (validEmail(emailValue)) {
            handleNextQuestion();
        }
    };

    useEffect(() => {
        document.getElementById('gender_question').addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && user.gender) {
                handlePressEnter();
            }
        });
    });

    useEffect(() => {
        if (!validEmail(user.email)) {
            let new_data = { ...user };
            new_data.email = '';
            setUser(new_data);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{title.Qgender}</title>
            </Head>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                className={matches ? signupStyle.small_screen : signupStyle.mobile_screen}
                id="gender_question"
            >
                <Space direction="vertical">
                    <Title
                        style={{
                            color: theme.primaryColor,
                            fontWeight: 400,
                            marginTop: 0,
                            fontSize: 14,
                            marginBottom: 0,
                        }}
                    >
                        {/* {gender_question.subtitle} */}
                        {`Bước ${current_step + 1}/${total_steps}`}
                    </Title>
                    {/* Email */}

                    <Title
                        level={5}
                        style={{
                            color: 'rgba(0, 0, 0, 0.85)',
                            fontWeight: 500,
                            marginTop: 0,
                            marginBottom: 8,
                            lineHeight: 2,
                        }}
                    >
                        {gender_question.email}
                    </Title>

                    <InputMaterial
                        id="email-input"
                        value={user.email}
                        fieldTime={fieldTime}
                        setValue={updateEmail}
                        setError={setHasError}
                        validMethod={validEmail}
                        placeholder="Nhập email"
                        messageError="Vui lòng nhập đúng email"
                        showError={hasError && user.email != ''}
                    />

                    <Title
                        level={5}
                        style={{
                            color: 'rgba(0, 0, 0, 0.85)',
                            fontWeight: 500,
                            marginTop: 0,
                            marginBottom: 8,
                            lineHeight: 2,
                        }}
                    >
                        {gender_question.title}
                    </Title>
                    <Radio.Group ref={genderRef} buttonStyle="solid" style={{ width: '100%' }} size="large">
                        {gender_question.options.map((option, index) => (
                            <Radio.Button
                                className={[
                                    signupStyle.radio_item,
                                    option.value === user.gender ? signupStyle.radio_item_active : '',
                                ]}
                                value={option.value}
                                key={index}
                                style={{
                                    width: '100%',
                                    marginBottom: '8px',
                                    backgroundColor: '#f5f5f5',
                                    borderColor: 'transparent',
                                }}
                                onChange={(e) => updateGender(e.target.value)}
                            >
                                {option.label}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Button
                            type="primary"
                            disabled={user.gender == '' || user.email == '' || !validEmail(user.email)}
                            onClick={handleNextQuestion}
                            className={signupStyle.button_small}
                            id={SLUGID.NEXT_GENDER}
                        >
                            {gender_question.button}
                        </Button>

                        {minW768 && (
                            <p style={{ fontSize: '14px', fontWeight: 400, marginBottom: 0 }}>ấn Enter để tiếp tục</p>
                        )}
                    </div>
                </Space>

                <DirectionArrow
                    className={signupStyle.button_bottom}
                    onClickPrev={() => prevQuestion()}
                    onClickNext={() => handleNextQuestion()}
                    nextDisabled={user.gender == '' || user.email == '' || !validEmail(user.email)}
                    id={SLUGID.NEXT_GENDER}
                />
            </div>
        </>
    );
}
