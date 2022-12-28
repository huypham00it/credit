import { Layout, Grid } from 'antd';
import Image from 'next/image';
import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

import DesktopLayout from '@/layouts/Desktop.layout';
import MobileLayout from '@/layouts/Mobile.layout';
import data from '@/configs/terms_conditions';
import style from '@/assets/TermsConditions.module.css';

export default function TermAndConditions() {
    const { Content } = Layout;
    const { useBreakpoint } = Grid;
    const screen = useBreakpoint();

    return screen.md ? (
        <DesktopLayout title={data.title}>
            <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
                <Content
                    id="desktop-page-content"
                    style={{
                        backgroundImage: `
							linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
							radial-gradient(123.18% 99.53% at 130.47% 0%, #FD4363 0%, #2D229B 100%)
						`,
                        backgroundSize: '100% 243px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: "top",
                        padding: '2.9% 8% 3% 8%',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        width: '100vw'
                    }}
                    className={style.layout}
                >
                    <div className={style.content_inner}>
                        <div>
                            <Link href="/login">
                                <span className={style.back}><LeftOutlined /> {data.back}</span>
                            </Link>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <Image src={data.logo.src} height={screen.md ? "50" : "32"} width={screen.md ? "170" : "108.8"} alt='Credit.vn' />
                            <h3>{data.title}</h3>
                        </div>

                        <div className={style.content_inner__text}>
                            {data.content.map((item, index) => {
                                return (
                                    <section
                                        className={style.section_content}
                                        key={index}
                                    >
                                        <h4>{item.heading}</h4>
                                        <MainText data={item.items} />
                                    </section>

                                )
                            })}
                        </div>
                    </div>
                </Content>
            </Layout>
        </DesktopLayout>
    ) : (
        <MobileLayout title={data.title}>
            <Content
                id="desktop-page-content"
                style={{
                    backgroundImage: `
							linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
							radial-gradient(123.18% 99.53% at 130.47% 0%, #FD4363 0%, #2D229B 100%)
						`,
                    backgroundSize: '100% 243px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: "top",
                    padding: '2.9% 8% 3% 8%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    width: '100vw'
                }}
                className={style.layout}
            >
                <div className={style.content_inner}>
                    <div>
                        <Link href="/login">
                            <span className={style.back}><LeftOutlined /> {data.back}</span>
                        </Link>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Image src={data.logo.src} height={screen.md ? "50" : "32"} width={screen.md ? "170" : "108.8"} alt='Credit.vn' />
                        <h3>{data.title}</h3>
                    </div>

                    <div className={style.content_inner__text}>
                        {data.content.map((item, index) => {
                            return (
                                <section
                                    className={style.section_content}
                                    key={index}
                                >
                                    <h4>{item.heading}</h4>
                                    <MainText data={item.items} />
                                </section>

                            )
                        })}
                    </div>
                </div>
            </Content>
        </MobileLayout>
    );
}

const Subtext = ({ data = [] }) => {

    if (data.length > 0)
        return (
            <ul>
                {data.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        )
    else
        return <></>
}

const MainText = ({ data = [] }) => {

    if (data.length > 1) {
        return (
            <ol>
                {data.map((elmn, i) => (
                    <div key={i}>
                        <li>{elmn.text}</li>
                        <Subtext data={elmn.sub_text} />
                    </div>
                ))}
            </ol>
        )
    } else {
        return (
            <div>
                <p>{data[0].text}</p>
                <Subtext data={data[0].sub_text} />
            </div>
        )
    }
}