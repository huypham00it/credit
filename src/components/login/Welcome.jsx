/* eslint-disable @next/next/no-img-element */
import { Space, Button, Typography, Grid } from 'antd';
import React from 'react';
import theme from '@/configs/theme';
import welcome from '@/configs/welcome';
import signUpStyle from '@/assets/Welcome.module.css';
import title from '@/configs/title';
import Head from "next/head";
import Link from 'next/link'

const { Text } = Typography;
const { useBreakpoint } = Grid;

export default function Welcome(props) {
	const nextQuestion = props.nextQuestion;
	const screen = useBreakpoint();

	return (
		<>
			<Head>
				<title>{title.Q0}</title>
			</Head>
			<div
				className={signUpStyle.content_wrap}
				style={{
					maxWidth: "375px",
					margin: '0 auto'
				}}>
				<Space
					direction="vertical"

				>
					<Text
						style={{
							color: theme.primaryColor,
							fontFamily: 'Montserrat',
							fontSize: "14px"
						}}
					>
						{welcome.subtitle}
					</Text>
					<Text
						style={{
							fontFamily: 'Montserrat',
							color: 'rgba(0, 0, 0, 0.85)',
							fontSize: "16px"
						}}
					>
						{welcome.title}
					</Text>
					<Button
						className={signUpStyle.button} block type="primary" onClick={() => nextQuestion()}
					>Xác nhận và tiếp tục</Button>

					<p className={signUpStyle.terms_conditions}>Bằng cách bấm vào Xác nhận và tiếp tục, bạn đã đồng ý với <Link href="/terms-and-conditions">điều khoản và điều kiện</Link> của chúng tôi</p>
					{!screen.md && <img
						src="/images/image.png"
						alt=""
						style={{ borderRadius: "8px", width: '100%' }}
					/>}
				</Space>

			</div>
		</>

	);
}
