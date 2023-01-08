import 'antd/dist/antd.variable.min.css';
import NextNProgress from 'nextjs-progressbar';
import { ConfigProvider } from 'antd';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import locale from 'antd/lib/locale/vi_VN';
import 'moment/locale/vi';

import { UserContext } from '@/contexts/user';
import '@/assets/globals.css';
import '@/assets/customLib.css';
import theme from '@/configs/theme';
import { LoadingProvider } from '@/providers/LoadingProvider';

ConfigProvider.config({ theme });

import request from '@/utils/request';

function MyApp({ Component, pageProps }) {
    request.post('/log', {});
    const [user, setUser] = useState(pageProps.user);

    useEffect(() => {
        const queryString = (function (a) {
            if (a == '') return {};
            var b = {};
            for (var i = 0; i < a.length; ++i) {
                var p = a[i].split('=', 2);
                if (p.length == 1) b[p[0]] = '';
                else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
            }
            return b;
        })(window.location.search.substring(1).split('&'));

        const click_id = queryString['click_id'];
        const flow_id = queryString['flow_id'];
        const cookies = new Cookies();
        if (click_id) {
            cookies.set('click_id', click_id, { path: '/', maxAge: 60 * 60 * 24 * 30 });
        }
        if (flow_id) {
            cookies.set('flow_id', flow_id, { path: '/', maxAge: 60 * 60 * 24 * 30 });
        } else {
            cookies.remove('flow_id');
        }
    }, []);

    return (
        <ConfigProvider locale={locale}>
            <NextNProgress color={theme.primaryColor} />
            <UserContext.Provider
                value={{
                    user: user,
                    setUser: setUser,
                }}
            >
                <LoadingProvider>
                    <Component {...pageProps} />
                </LoadingProvider>
            </UserContext.Provider>
        </ConfigProvider>
    );
}

export default MyApp;
