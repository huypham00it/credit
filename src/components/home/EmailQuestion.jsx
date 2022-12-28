import { Button, Space, Typography } from 'antd';
import { useState, useEffect, useRef } from 'react';

import email_question from '@/configs/email_question';
import signupStyle from '@/assets/Signup.module.css';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import theme from '@/configs/theme';
import validEmail from '@/utils/validEmail';
import InputMaterial from '@/components/form/InputMaterial';
import DirectionArrow from '@/components/form/DirectionArrow';
import * as SLUGID from '@/configs/slugId';
import title from '@/configs/title';
import Head from "next/head";

const { Title } = Typography;

export default function EmailQuestion({ user, setUser, nextQuestion }) {
	const [hasError, setHasError] = useState(false);
	const fieldTime = useRef(null);

	const matches = useMediaQuery('(max-height:568px)');
	const minW768 = useMediaQuery('(min-width:768px)');

	useEffect(() => {
		if (!validEmail(user.email)) setHasError(true);
	}, [user]);

	const updateEmail = (value) => {
		let new_data = { ...user };
		new_data.email = value;
		setUser(new_data);
	}

	const handleNextQuestion = () => {
		if (hasError || user.email === "") {
			return;
		}
		nextQuestion({ type: "email", total_input: fieldTime.current, value: user.email });
	}

	const handleEnterPress = (e) => {
		if (!hasError && e.target.value !== "") {
			nextQuestion({ type: "email", total_input: fieldTime.current, value: user.email });
		}
	}

	return (
		<>
			<Head>
				<title>{title.Qemail}</title>
			</Head>
			<div style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
				className={matches ? signupStyle.small_screen : signupStyle.mobile_screen}
			>
				<Space direction='vertical'>
					<Title
						style={{
							color: theme.primaryColor,
							fontWeight: 400,
							marginTop: 0,
							fontSize: 14,
							marginBottom: 0,
						}}
					>
						{email_question.subtitle}
					</Title>
					<Title
						level={5}
						style={{
							color: 'rgba(0, 0, 0, 0.85)',
							fontWeight: 500,
							marginTop: 0,
							marginBottom: 8,
							lineHeight: 2
						}}
					>
						{email_question.title}
					</Title>
					<InputMaterial
						onPressEnter={(e) => handleEnterPress(e)}
						value={user.email}
						fieldTime={fieldTime}
						setValue={updateEmail}
						setError={setHasError}
						validMethod={validEmail}
						placeholder="Ví dụ: nguyenvana@gmail.com"
						messageError="Vui lòng nhập đúng email"
						showError={hasError && user.email != ""}
					/>

					<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
						<Button
							type="primary"
							disabled={hasError}
							onClick={handleNextQuestion}
							className={signupStyle.button_small}
							id={SLUGID.NEXT_EMAIL}
						>
							{email_question.button}
						</Button>

						{minW768 && <p style={{ fontSize: "14px", fontWeight: 400, marginBottom: 0 }}>ấn Enter để tiếp tục</p>}
					</div>
				</Space>

				<DirectionArrow
					className={signupStyle.button_bottom}
					onClickPrev={() => prevQuestion()}
					onClickNext={() => handleNextQuestion()}
					nextDisabled={hasError}
					prevDisabled={true}
					id={SLUGID.NEXT_EMAIL}
				/>
			</div>
		</>
	);
}
