import { Layout } from 'antd';
const { Footer } = Layout;

export default function FooterPage({ style }) {
    return (
        <Footer
            style={{
                textAlign: 'center',
                backgroundColor: '#fff',
                color: '#2D229B',
                padding: '4px',
                ...style,
            }}
        >
            Powered by RIO Technology © {new Date().getFullYear()} Credit.vn
        </Footer>
    );
}
