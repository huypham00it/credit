import { Layout } from 'antd';
const { Footer } = Layout;

import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function FooterPage({ style }) {
    const maxW768 = useMediaQuery('(max-width:768px)');

    return (
        <Footer
            style={{
                textAlign: 'center',
                backgroundColor: '#fff',
                color: '#2D229B',
                padding: '4px',
                fontSize: maxW768 ? '12px' : '',
                ...style,
            }}
        >
            Powered by RIO Technology © {new Date().getFullYear()} Credit.vn
        </Footer>
    );
}
