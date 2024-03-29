import { Grid, Col, Row } from 'antd';

import DesktopAdvPageLayout from '@/layouts/DesktopAdvPage.layout';
import Footer from '@/layouts/components/Footer';
import MobileAdvPageLayout from '@/layouts/MobileAdvPage.layout';
import MafcLogo from '@/assets/img/miraeasset.svg';
import StyleMCredit from '@/assets/MCredit.module.css';
import RouterGuard from '@/layouts/components/RouterGuard';
import { UserInfo } from '@/contexts/user';
import UserForm from '@/components/mafc/UserForm';
import MobileHeader from '@/layouts/components/FormMobileHeader';
import DesktopHeader from '@/layouts/components/FormDesktopHeader';
import * as Banner from '@/configs/banner_images';
import MafcBg from '@/assets/img/mafc_bg.png';

const { useBreakpoint } = Grid;

export default function InfoPage() {
	const screen = useBreakpoint();
	const { user } = UserInfo();
	return <></>
	// return screen.md ? (
	// 	<RouterGuard>
	// 		<DesktopAdvPageLayout
	// 			bg={MafcBg.src}
	// 		>
	// 			<DesktopHeader logo={MafcLogo} banner={Banner.MafcBanner} bg="#004179" />

	// 			<Row style={{ maxWidth: '375px', margin: '0 auto', width: '100%' }}>
	// 				<Col span={24} style={{ padding: '0 16px 16px 16px' }}>
	// 					<h1 style={{ textAlign: 'center', marginTop: '8' }}>Chào mừng <span>{user && user.gender === 'Nam' ? 'anh' : 'chị'}</span> <span className={StyleMCredit.text_bold}>{user && user.name}</span> đã đến với <span className={StyleMCredit.text_bold}>Mirae Asset</span>!</h1>
	// 					<p style={{ fontSize: '14px' }}>Vui lòng kiểm tra các thông tin sau</p>

	// 					<UserForm style={{ margin: '12px 0' }} />
	// 				</Col>
	// 			</Row>

	// 			<Footer style={{ marginTop: 'auto' }} />
	// 		</DesktopAdvPageLayout>
	// 	</RouterGuard>
	// ) : (
	// 	<RouterGuard>
	// 		<MobileAdvPageLayout>
	// 			<MobileHeader logo={MafcLogo} banner={Banner.MafcBanner} />
	// 			<Row style={{ backgroundColor: '#ffffff' }}>
	// 				<Col span={24} style={{ padding: '0 16px 16px 16px' }}>
	// 					<h1 style={{ textAlign: 'center', marginTop: '8.82px' }}>Chào mừng <span>{user && user.gender === 'Nam' ? 'anh' : 'chị'}</span> <span className={StyleMCredit.text_bold}>{user && user.name}</span> đã đến với <span className={StyleMCredit.text_bold}>Mirae Asset</span>!</h1>
	// 					<p style={{ fontSize: '14px' }}>Vui lòng kiểm tra các thông tin sau</p>

	// 					<UserForm style={{ margin: '12px 0' }} />
	// 				</Col>
	// 			</Row>
	// 		</MobileAdvPageLayout>
	// 	</RouterGuard>
	// );
}