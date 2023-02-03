import { Grid } from 'antd';
import fsPromises from 'fs/promises';
import path from 'path';

import RouterGuard from '@/layouts/components/RouterGuard';
import DesktopLayout from '@/ldps/layouts/Desktop';
import title from '@/configs/title';
import style from '@/assets/CreditScoring.module.css';
import { Section1, Section2, Section3, Section4, Section5, Section6, Section7 } from '@/components/diem-tin-dung';
import GoTop from '@/ldps/components/GoTop';
import data from '@/configs/diem_tin_dung';

const { useBreakpoint } = Grid;

export async function getServerSideProps() {
    const provincesFilePath = path.join(process.cwd(), 'meta/provinces.json');
    const provincesData = await fsPromises.readFile(provincesFilePath);
    const provinces = JSON.parse(provincesData);

    return {
        props: { provinces }, // will be passed to the page component as props
    };
}

function Page({ provinces }) {
    const screen = useBreakpoint();

    return (
        <RouterGuard>
            <DesktopLayout
                title={title.DiemTinDung}
                headerMenu={data.menu}
                customClass={style.hero}
                id="diem-tin-dung-page"
            >
                <div className={style.container}>
                    <Section1 />
                    <Section2 />
                    <Section3 />
                    <Section4 />
                    <Section5 provinces={provinces} />
                    <Section6 />
                    <Section7 />
                </div>
                <GoTop />
            </DesktopLayout>
        </RouterGuard>
    );
}

export default Page;
