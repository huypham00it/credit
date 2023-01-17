import { Typography, Badge, Table, Empty } from 'antd';
import { motion } from 'framer-motion';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import offers from '@/configs/offers';
import { fadeIn, staggerContainer } from '@/utils/motion';

const { Title } = Typography;

const SignupHistory = (props) => {
    const maxW374 = useMediaQuery('(max-width:374px)');

    let histories = [];

    props.data.forEach((item) => {
        let _loan = offers.find((elmn) => elmn.offer_id == item.offer_id);
        if (_loan) {
            histories.push({
                ...item,
                name: _loan.name,
                type: _loan.loan_type == 'long' ? 'Vay dài hạn' : 'Vay ngắn hạn',
            });
        }
    });

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Badge
                    status={status === 'cancel' ? 'error' : status === 'success' ? 'success' : 'warning'}
                    text={status === 'cancel' ? 'Hủy' : status === 'success' ? 'Thành công' : 'Chờ duyệt'}
                />
            ),
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Danh mục',
            key: 'type',
            dataIndex: 'type',
        },
    ];

    return (
        <>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
            >
                <motion.div variants={fadeIn('down', 'tween', 0.2, 0.5)}>
                    <div
                        style={{ maxWidth: 696, margin: '0 auto', marginLeft: maxW374 ? 16 : 'auto' }}
                        id="signup-history"
                    >
                        <Title style={{ fontSize: 16, marginBottom: 16, textAlign: 'center', fontWeight: 700 }}>
                            Lịch sử đăng ký
                        </Title>
                        {histories.length > 0 && (
                            <Table
                                scroll={{ x: 'max-content' }}
                                columns={columns}
                                dataSource={histories}
                                pagination={false}
                            />
                        )}
                        {histories.length === 0 && (
                            <Empty description={<span>Chưa có lịch sử. Vui lòng đăng ký khoản vay mới</span>} />
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default SignupHistory;
