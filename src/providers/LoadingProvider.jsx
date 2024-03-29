import { useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingContext } from '@/contexts/loading';
import { Spin, Grid } from 'antd';
import styleLoading from '@/assets/LoadingProvider.module.css';
import { LoadingOutlined } from '@ant-design/icons';
import Logo from '@/components/general/Logo';

const { useBreakpoint } = Grid;
export function LoadingProvider(props) {
    const [loading, setLoading] = useState(false);
    const screen = useBreakpoint();

    const antIcon = (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
                style={{
                    width: '65vw',
                    marginTop: '-13vh',
                    position: 'absolute',
                }}
            >
                {screen.md ? (
                    <Logo type="light" width={353.33} height={98.54} className={styleLoading.logo} />
                ) : (
                    <Logo type="light" layout="responsive" width={354} height={104} />
                )}
            </div>
            <div>
                <LoadingOutlined
                    style={{
                        fontSize: 50,
                        color: '#fff',
                    }}
                    spin
                />
            </div>
            <div style={{ fontSize: 16, marginLeft: '10px', color: '#fff' }}>Loading...</div>
        </div>
    );
    return (
        <LoadingContext.Provider
            value={{
                showLoading: () => setLoading(true),
                hideLoading: () => setLoading(false),
            }}
        >
            <Spin className={styleLoading.loadingProvider} spinning={loading} indicator={antIcon}>
                {props.children}
            </Spin>
        </LoadingContext.Provider>
    );
}

LoadingProvider.propTypes = {
    children: PropTypes.node,
};
