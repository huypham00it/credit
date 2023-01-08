import { Grid } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import fsPromises from 'fs/promises';
import path from 'path';

import { UserInfo } from '@/contexts/user';
import MobileHeader from '@/layouts/components/FormMobileHeader';
import DesktopHeader from '@/layouts/components/FormDesktopHeader';
import DesktopAdvPageLayout from '@/layouts/DesktopAdvPage.layout';
import MobileAdvPageLayout from '@/layouts/MobileAdvPage.layout';
import RouterGuard from '@/layouts/components/RouterGuard';
import { FormSteps } from '@/components/ldp';
import takomoData from '@/configs/takomo';
import PersonalInfomation from '@/components/takomo/PersonalInfomation';
import AddressWork from '@/components/takomo/AddressWork';
import Relatives from '@/components/takomo/Relatives';
import { takomo_tracking } from '@/configs/tracking';
import Payment from '@/components/takomo/Payment';
import logStep from '@/utils/log';
import toNonAccentVietnamese from '@/utils/nonAccentVietnamese';

const { useBreakpoint } = Grid;

export async function getServerSideProps() {
    const provincesFilePath = path.join(process.cwd(), 'meta/provinces.json');
    const provincesData = await fsPromises.readFile(provincesFilePath);
    const provinces = JSON.parse(provincesData);

    const bankFilePath = path.join(process.cwd(), 'meta/takomo/banks.json');
    const jsonData = await fsPromises.readFile(bankFilePath);
    const banks = JSON.parse(jsonData);
    return {
        props: { provinces, banks }, // will be passed to the page component as props
    };
}
export default function InfoPage({ provinces, banks }) {
    const { user, setUser } = UserInfo();
    const screen = useBreakpoint();
    const [step, setStep] = useState(0);
    const [customer, setCustomer] = useState(null);
    const [trackingTime, setTrackingTime] = useState(takomo_tracking);
    const [currentProvince, setCurrentProvince] = useState(null);

    useEffect(() => {
        if (user) {
            setCustomer({
                ...customer,
                name: user.name,
                gender: user.gender,
                id_card: user.id_card,
                phone: user.phone,
                address: user.address,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const next = (data, type) => {
        if (type === 'information') {
            console.log(toNonAccentVietnamese('Tỉnh Bà Rịa - Vũng Tàu'.replace(/\s+/g, '')).toLowerCase());
            const currentProvince = provinces.find((province) =>
                toNonAccentVietnamese(province.name.replace(/\s+/g, ''))
                    .toLowerCase()
                    .includes(toNonAccentVietnamese(data.address.replace(/\s+/g, '')).toLowerCase()),
            );
            setCurrentProvince(currentProvince);
        }

        document.body.scrollTo(0, 0);
        if (customer !== null) {
            setCustomer({ ...customer, ...data });
        } else {
            setCustomer(data);
        }
        setStep(step + 1);
    };

    const prev = () => {
        document.body.scrollTo(0, 0);
        setStep(step - 1);
    };

    const handleSubmit = (data) => {
        console.log(data);
    };

    const handleTrackingStart = (name) => {
        setTrackingTime({ ...trackingTime, [name]: { ...trackingTime[name], start: new Date().getTime() } });
    };

    const handleTrackingEnd = (name, value) => {
        console.log(trackingTime);
        const fieldTime = new Date().getTime() - trackingTime[name].start;

        console.log({
            [name]: value,
            offer_id: takomoData.offer_id,
            total_input: fieldTime,
        });
        // logStep({
        //     [name]: value,
        //     offer_id: takomoData.offer_id,
        //     total_input: fieldTime,
        // });
    };

    const steps = [
        <PersonalInfomation
            key={1}
            data={takomoData}
            next={next}
            user={customer}
            handleTrackingStart={handleTrackingStart}
            handleTrackingEnd={handleTrackingEnd}
        />,
        <AddressWork
            key={2}
            data={takomoData}
            prev={prev}
            next={next}
            user={customer}
            setUser={setCustomer}
            currentProvince={currentProvince}
            handleTrackingStart={handleTrackingStart}
            handleTrackingEnd={handleTrackingEnd}
        />,
        <Relatives
            key={3}
            data={takomoData}
            prev={prev}
            next={next}
            user={customer}
            setUser={setCustomer}
            handleTrackingStart={handleTrackingStart}
            handleTrackingEnd={handleTrackingEnd}
        />,
        <Payment
            key={3}
            data={takomoData}
            prev={prev}
            next={next}
            user={customer}
            setUser={setCustomer}
            banks={banks}
            handleTrackingStart={handleTrackingStart}
            handleTrackingEnd={handleTrackingEnd}
        />,
    ];

    return screen.md ? (
        <RouterGuard>
            <DesktopAdvPageLayout>
                <DesktopHeader logo={takomoData.logo} bg="linear-gradient(to right, #6F3893, #F7358E)" />
                <main
                    style={{
                        marginTop: 49,
                        backgroundImage: 'url(' + takomoData.backgroundForm.src + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center -49px',
                    }}
                >
                    <FormSteps id="takomo_steps" steps={takomoData.steps} current={step} />
                    {steps[step]}
                </main>
            </DesktopAdvPageLayout>
        </RouterGuard>
    ) : (
        <RouterGuard>
            <MobileAdvPageLayout>
                <MobileHeader
                    logo={takomoData.logo}
                    banner={takomoData.bannerMobile}
                    paddingTop={62.3}
                    showCaption={true}
                    caption={'Tin được không?\n Lãi suất 0%'}
                    styleCaption={{
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        position: 'absolute',
                        top: '12%',
                        right: '23.7%',
                    }}
                />
                <main style={{ padding: 16, backgroundColor: '#ffffff' }}>
                    <FormSteps id="takomo_steps" steps={takomoData.steps} current={step} />
                    {steps[step]}
                </main>
            </MobileAdvPageLayout>
        </RouterGuard>
    );
}
