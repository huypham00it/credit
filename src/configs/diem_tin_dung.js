import IMG_01 from '@/assets/img/diem-tin-dung/sec01.png'
import IMG_02 from '@/assets/img/diem-tin-dung/sec02.png'
import { AppstoreOutlined, CalendarOutlined, DollarCircleTwoTone, FileOutlined, InfoCircleOutlined, InfoCircleTwoTone, LikeTwoTone, PlusSquareOutlined, PropertySafetyTwoTone, QuestionCircleTwoTone, RocketTwoTone, SafetyCertificateOutlined, SafetyCertificateTwoTone, SmileTwoTone, UnlockFilled, UnlockOutlined, UnlockTwoTone, UnorderedListOutlined, WarningOutlined, WarningTwoTone } from '@ant-design/icons'
import takomo from '@/assets/img/takomo.svg';
import robocash from '@/assets/img/robocash.svg';
import senmo from '@/assets/img/senmo.svg';

const data = {
    IMG_01,
    IMG_02,
    menu: [
        { label: "Điểm tín dụng ?", href: "#info" },
        { label: "Cách chấm điểm", href: "#method" },
        { label: "Chấm điểm ngay", href: "#form-diem-tin-dung" },
        { label: "Xếp hạng điểm", href: "#rank" },
        { label: "Tiêu chí chấm điểm", href: "#criterial" }
    ],
    section_01: {
        heading: "Bạn có biết?",
        paragraph: "Hiện nay, hệ thống điểm tín dụng cá nhân đã và đang bắt đầu được áp dụng rộng rãi ở thị trường tài chính Việt Nam. Không nắm rõ khái niệm và cách chấm điểm của hệ thống này sẽ khiến bạn gặp bất lợi khi có nhu cầu vay vốn tại các tổ chức tài chính.",
        items: [
            "Các bạn đã có bao giờ vay tiền ngân hàng hay tổ chức tín dụng (TCTD) nào đó chưa?",
            "Các bạn có biết các ngân hàng xét cấp tín dụng cho bạn dựa trên những điều kiện không?",
            "Các bạn có bao giờ trễ hẹn thanh toán tiền lãi ngân hàng không?",
            "Bạn có biết lịch sử tín dụng cá nhân của mình ảnh hưởng như thế nào đến việc xét duyệt khoản vay hay không?",
            "Bạn có biết việc ngân hàng quyết định cấp thẻ tín dụng cũng dựa vào lịch sử tín dụng của bạn không ?"
        ]
    },
    section_02: {
        heading: "Điểm tín dụng",
        paragraph: "Điểm tín dụng là con số các tổ chức tài chính sử dụng để xác định độ tin cậy về mặt tài chính của một cá nhân khi cá nhân đó nộp hồ sơ xin vay. Đây là biện pháp nhằm giảm bớt rủi ro tín dụng của các tổ chức tài chính. Rủi ro tín dụng là khi khách hàng không trả đầy đủ cả gốc lẫn lãi của các khoản vay, hoặc trả nhưng không đúng hạn.",
        sub_heading: "Mục đích của điểm tín dụng",
        items: [
            {
                icon: <UnlockTwoTone twoToneColor="#594DC9" />,
                text: "Điểm tín dụng quyết định đến khả năng vay vốn của khách hàng cũng như hạn mức tín dụng mà ngân hàng có thể giải ngân khi bạn có nhu cầu vay vốn."
            },
            {
                icon: <SafetyCertificateTwoTone twoToneColor="#594DC9" />,
                text: "Ảnh hưởng đến các lần vay tiếp theo của khách hàng nếu điểm tín dụng thấp hơn mức tối thiểu mà ngân hàng có thể chấp nhận."
            }
        ],
        foot_paragraph: "Có một hệ thống đánh giá chấm điểm tín dụng sẽ tạo cơ sở cho các tổ chức tín dụng xét duyệt hồ sơ vay và kiểm soát rủi ro một cách hiệu quả hơn. Ngoài ra, các tổ chức tài chính cũng dựa theo khung điểm tín dụng tiêu chuẩn để ấn định hạn mức cho vay của khách hàng. Đó là lý do vì sao dù cùng một mức thu nhập, có người được duyệt hồ sơ nhanh và được cho vay nhiều hơn những người khác.\n\nĐiểm tín dụng càng cao, bạn càng được hưởng nhiều ưu đãi về hạn mức vay và lãi suất. Một người không có lịch sử tín dụng, tức là chưa từng vay mượn thì mức độ tin cậy của họ cũng ngang ngửa với nhóm khách hàng có nợ xấu, nợ quá hạn. Do đó, một lịch sử tín dụng trống không, chưa từng vay mượn chưa chắc là tốt hơn so với lịch sử tín dụng có nợ quá hạn."
    },
    section_03: {
        heading: "Cách chấm điểm",
        paragraph: "Hiện nay, hồ sơ, lịch sử tín dụng của các cá nhân được quản lý bởi Trung tâm Thông tin tín dụng CIC (Credit Information Center). Đây là trung tâm trực thuộc ngân hàng nhà nước, chịu trách nhiệm tổng hợp thông tin các khoản vay và quá trình thanh toán các khoản vay của một cá nhân từ nhiều tổ chức tài chính khác nhau để tạo nên hồ sơ lịch sử tín dụng của cá nhân đó.\n\nNgoài ra các tổ chức tài chính, trung tâm còn cập nhật thông tin cá nhân dựa trên dữ liệu thông tin của các bộ ngành và khai thác trên các phương tiện thông tin đại chúng khác. Các tổ chức tín dụng khi nhận hồ sơ xin vay sẽ truy cập vào cơ sở dữ liệu của trung tâm này để kiểm tra thông tin trước khi ra quyết định xét duyệt."
    },
    section_04: {
        heading: "Điểm tín dụng thường dựa vào",
        items: [
            {
                icon: <UnorderedListOutlined />,
                heading: "Lịch sử thanh toán nợ (35%)",
                desc: "Phản ánh việc trả tiền đúng hạn, trả hết nợ hay trả trễ hạn",
                content: "Phản ánh việc trả tiền đúng hạn, trả hết nợ hay trả trễ hạn… Phần lớn điểm tín dụng được đánh giá dựa trên lịch sử thanh toán của người vay. Việc trả nợ nghiêm túc và đúng hạn sẽ là yếu tố quan trọng nhất ảnh hưởng đến điểm tín dụng của mỗi cá nhân."
            },
            {
                icon: <FileOutlined />,
                heading: "Các khoản nợ tín dụng (30%)",
                desc: "Phản ánh tất cả các món nợ, tỷ lệ nợ tín dụng từ tổng số các khoản vay ngân hàng",
                content: "Phản ánh tất cả các món nợ, tỷ lệ nợ tín dụng được tạo nên từ tổng số các khoản vay mà ngân hàng cấp cho bạn. Theo các chuyên gia, người có điểm số lý tưởng có xu hướng duy trì tỷ lệ nợ tín dụng ở mức trung bình khoảng 7%."
            },
            {
                icon: <CalendarOutlined />,
                heading: "Thời gian có lý lịch tín dụng (15%)",
                desc: "Phản ánh thời gian tài khoản tín dụng của bạn được mở",
                content: "Phản ánh thời gian tài khoản tín dụng của bạn được mở. Thời gian này càng dài càng tốt bởi như vậy ngân hàng hay tổ chức tín dụng có thể đánh giá được hành vi tài chính của bạn một cách tổng thể và hoàn thiện hơn."
            },
            {
                icon: <PlusSquareOutlined />,
                heading: "Tín dụng mới (10%)",
                desc: "Việc mở thêm các khoản tín dụng mới thường không được ưa chuộng",
                content: "Việc mở thêm các khoản tín dụng mới thường không được ưa chuộng, nhất là trong một thời gian ngắn. Các khoản tín dụng của bạn được mở càng lâu và có hoạt động trong ít nhất 6 tháng sẽ càng thúc đẩy điểm tín dụng của bạn và giúp bạn xây dựng được một lịch sử tín dụng lâu dài và vững chắc."
            },
            {
                icon: <AppstoreOutlined />,
                heading: "Loại tín dụng (10%)",
                desc: "Phản ánh tất cả các loại tín dụng mà bạn có",
                content: "Phản ánh tất cả các loại tín dụng mà bạn có như: Thẻ tín dụng, các khoản vay (vay học phí, vay mua nhà, vay mua xe…) Các chuyên gia cho rằng việc từng sử dụng nhiều đòn bẩy tài chính và trả nợ đúng hạn cho thấy người đi vay có khả năng xử lý tốt các loại nợ tín dụng."
            }
        ],
        detail: 'Chi tiết'
    },
    section_05: {
        heading: "Chấm điểm tín dụng trong 30s",
        scoring: "Điểm tín dụng",
        unknown: "CHƯA BIẾT",
        sub_heading_01: "Bạn sẽ nhận tiền\nnhanh nhất từ",
        note: "Hãy điền đầy đủ thông tin Điểm tín dụng\nvà Kiểm tra ngay để xem nội dung này",
        form_heading: "Điểm tín dụng",
        form_description: "Để xem Điểm tín dụng và khoản vay phù hợp, điền đầy đủ thông tin Điểm tín dụng và ấn ”Kiểm tra ngay”",
        form_01: {
            heading: "Thông tin cá nhân",
            name: {
                label: "Họ và tên",
                placeholder: "Ví dụ: Nguyễn Văn A"
            },
            email: {
                label: "Email",
                placeholder: "Ví dụ: creditvn@gmail.com"
            },
            address: {
                label: "Tỉnh/Thành phố",
                placeholder: "Ví dụ: Hà Nội"
            },
            district: {
                label: 'Quận/huyện',
                placeholder: "Ví dụ: Quận 1"
            },
            ward: {
                label: "Phường/Xã/Thị trấn",
                placeholder: "Ví dụ: Tân Định"
            },
            house_number: {
                label: "Số nhà/Căn hộ",
                placeholder: "Ví dụ: 70, Nguyễn Phi Khanh",
                required_message: "Vui lòng nhập Số nhà/Căn hộ"
            },
            salary: {
                label: "Thu nhập hàng tháng",
                placeholder: "Ví dụ: 7",
                suffix: "triệu đồng",
                required_message: "Vui lòng cung cấp mức thu nhập"
            },
            martial_status: {
                label: "Tình trạng hôn nhân",
                placeholder: "Hãy chọn 01 lựa chọn",
                options: [
                    { label: "Kết hôn", value: "Kết hôn" },
                    { label: "Đã ly hôn", value: "Đã ly hôn" },
                    { label: "Độc thân", value: "Độc thân" },
                    { label: "Đã goá vợ/chồng", value: "Đã goá vợ/chồng" }
                ]
            },
            purpose: {
                label: "Mục đích vay",
                placeholder: "Hãy chọn 01 lựa chọn",
                options: [
                    { label: "Kinh doanh", value: "Kinh doanh" },
                    { label: "Sửa xe máy", value: "Sửa xe máy" },
                    { label: "Du lịch", value: "Du lịch" },
                    { label: "Sự kiện quan trọng", value: "Sự kiện quan trọng" },
                    { label: "Chăm sóc sức khoẻ", value: "Chăm sóc sức khoẻ" },
                    { label: "Mua sắm", value: "Mua sắm" },
                    { label: "Cần gấp", value: "Cần gấp" },
                    { label: "Khác", value: "Khác" }
                ]
            }
        },
        form_02: {
            heading: "Thông tin về nợ",
            debt_type: {
                label: "Loại nợ",
                placeholder: "Hãy chọn 01 lựa chọn",
                options: [
                    { label: "Trả góp", value: "Trả góp" },
                    { label: "Thế chấp", value: "Thế chấp" },
                    { label: "Tín chấp", value: "Tín chấp" },
                    { label: "Nợ thẻ tín dụng", value: "Nợ thẻ tín dụng" },
                    { label: "Mua ô tô", value: "Mua ô tô" },
                    { label: "Mua xe máy", value: "Mua xe máy" },
                    { label: "Vay online", value: "Vay online" },
                    { label: "Vay sinh viên", value: "Vay sinh viên" },
                    { label: "Khác", value: "Khác" }
                ]
            },
            monthly_pay: {
                label: "Số tiền thanh toán hàng tháng",
                placeholder: "Ví dụ: 5",
                suffix: "triệu đồng",
                required_message: "Vui lòng nhập Số tiền thanh toán hàng tháng"
            },
            e_wallet: {
                label: "Ví điện tử",
                placeholder: "Hãy chọn 01 lựa chọn",
                options: [
                    { label: "Không sử dụng", value: "Không sử dụng" },
                    { label: "MoMo", value: "MoMo" },
                    { label: "ZaloPay", value: "ZaloPay" },
                    { label: "ViettelPay", value: "ViettelPay" },
                    { label: "Moca", value: "Moca" },
                    { label: "ShopeePay", value: "ShopeePay" },
                    { label: "VNPAY", value: "VNPAY" },
                    { label: "NextPay", value: "NextPay" },
                    { label: "Payoo", value: "Payoo" },
                    { label: "OnePay", value: "OnePay" },
                    { label: "Foxpay", value: "Foxpay" },
                    { label: "e-wallet", value: "e-wallet" },
                    { label: "PayNow", value: "PayNow" },
                    { label: "VTC Pay", value: "VTC Pay" },
                    { label: "Appota", value: "Appota" },
                    { label: "FPay", value: "FPay" },
                    { label: "VNPT Pay", value: "VNPT Pay" },
                    { label: "Ngan Luong Wallet", value: "Ngan Luong Wallet" },
                    { label: "BảoKim", value: "BảoKim" },
                    { label: "123Pay", value: "123Pay" },
                    { label: "NPay", value: "NPay" },
                    { label: "VinID", value: "VinID" },
                    { label: "PayAQ", value: "PayAQ" },
                ]
            }
        },
        form_03: {
            heading: "Công việc",
            job: {
                label: "Hình thức công việc",
                placeholder: "Hãy chọn 01 lựa chọn",
                options: [
                    { label: "Toàn thời gian", value: "Toàn thời gian" },
                    { label: "Bán thời gian", value: "Bán thời gian" },
                    { label: "Thất nghiệp", value: "Thất nghiệp" },
                    { label: "Sinh viên", value: "Sinh viên" },
                    { label: "Về hưu", value: "Về hưu" },
                    { label: "Nội trợ", value: "Nội trợ" }
                ]
            },
            field: {
                label: "Lĩnh vực",
                placeholder: "Hãy chọn 01 lựa chọn",
                options: [
                    { label: "Cảnh sát", value: "Cảnh sát" },
                    { label: "Quân đội", value: "Quân đội" },
                    { label: "Tín dụng/Bảo hiểm", value: "Tín dụng/Bảo hiểm" },
                    { label: "Tài chính/Bất động sản", value: "Tài chính/Bất động sản" },
                    { label: "Xây dựng", value: "Xây dựng" },
                    { label: "Công nghệ thông tin", value: "Công nghệ thông tin" },
                    { label: "Giáo dục", value: "Giáo dục" },
                    { label: "Chăm sóc sức khoẻ", value: "Chăm sóc sức khoẻ" },
                    { label: "Dịch vụ khách sạn", value: "Dịch vụ khách sạn" },
                    { label: "Chế tạo", value: "Chế tạo" },
                    { label: "Bán hàng và marketing", value: "Bán hàng và marketing" },
                    { label: "Dịch vụ ăn uống", value: "Dịch vụ ăn uống" },
                    { label: "Dịch vụ vận tải", value: "Dịch vụ vận tải" },
                    { label: "Bán lẻ", value: "Bán lẻ" },
                    { label: "Khác", value: "Khác" }
                ]
            },
            company: {
                label: "Tên công ty",
                placeholder: "Ví dụ: Công ty TNHH ABC"
            },
            position: {
                label: "Chức vụ",
                placeholder: "Ví dụ: Nhân viên, Trường phòng",
                error_message: "Vui lòng nhập cung cấp chức vụ"
            },
            experience: {
                label: "Kinh nghiệm làm việc",
                placeholder: "Hãy chọn 01 lựa chọn",
                options: [
                    { label: "Ít hơn 1 tháng", value: "Ít hơn 1 tháng" },
                    { label: "Từ 1- 3 tháng", value: "Từ 1- 3 tháng" },
                    { label: "Từ 6 tháng - 2 năm", value: "Từ 6 tháng - 2 năm" },
                    { label: "Hơn 2 năm", value: "Hơn 2 năm" }
                ]
            }
        },
        button: "KIỂM TRA NGAY",
        loans: [
            {
                name: "takomo",
                img: takomo,
                percent: 84,
                offer_id: "takomo",
                loan_type: "short",
                label: "Takomo",
                path: "/takomo",
                type: "redirect"
            },
            {
                name: "robocash",
                img: robocash,
                percent: 65,
                offer_id: "robocash-2",
                loan_type: "short",
                label: "Robocash",
                path: "/robocash",
                type: "redirect"
            },
            {
                name: "senmo",
                img: senmo,
                percent: 0,
                offer_id: "senmo",
                loan_type: "short",
                label: "Senmo",
                path: "/senmo",
                type: "redirect"
            },
        ]
    },
    section_06: {
        heading: 'Các nhóm xếp hạng điểm tín dụng cá nhân',
        desc: "Sau khi đã có số điểm tổng hợp cuối cùng dựa trên phương pháp tính toán thống kê, CIC sẽ đưa ra kết luận xếp hạng tín dụng cá nhân để phản ánh mức độ rủi ro khi đi vay của cá nhân đó. Có 5 nhóm xếp hạng tín dụng",
        items: [
            {
                icon: <WarningTwoTone twoToneColor="#F5222D" />,
                heading: "Rủi ro rất cao (E)",
                desc: 'Dư nợ cho vay có khả năng mất vốn'
            },
            {
                icon: <InfoCircleTwoTone twoToneColor="#FA8C16" />,
                heading: "Rủi ro cao (D)",
                desc: 'Dư nợ cho vay có nghi ngờ'
            },
            {
                icon: <QuestionCircleTwoTone twoToneColor="#594DC9" />,
                heading: "Rủi ro trung bình (C)",
                desc: 'Dư nợ cho vay dưới tiêu chuẩn'
            },
            {
                icon: <SmileTwoTone twoToneColor="#0050B3" />,
                heading: "Rủi ro thấp (B)",
                desc: 'Dư nợ cho vay cần chú ý'
            },
            {
                icon: <LikeTwoTone twoToneColor="#389E0D" />,
                heading: "Rủi ro rất thấp (A)",
                desc: 'Dư nợ cho vay đủ tiêu chuẩn'
            }
        ],
        paragraph: "Một cá nhân khi xếp hạng tín dụng rơi vào nhóm C, D và E thì khả năng được xét duyệt hồ sơ cho vay sẽ thấp hơn cá nhân được xếp hạng A và B. Có những tổ chức kiểm soát rủi ro khắt khe đến mức không xét duyệt hồ sơ cho vay cho bất kỳ khách hàng nào có xếp hạng tín dụng từ C trở xuống. Nhiều khách hàng đi vay không biết về điểm số này dẫn đến thắc mắc không biết vì sao hồ sơ vay của mình không được xét duyệt trong khi chứng minh thu nhập của mình rõ ràng cao hơn những khách hàng được duyệt khác."
    },
    section_07: {
        heading: "Các tiêu chí chấm điểm tín dụng cá nhân",
        desc: "Điểm tín dụng được CIC tính toán dựa trên báo cáo cá nhân theo từng tháng về các khoản chi trả tài chính (vay nợ, thế chấp…) do các tổ chức tài chính cung cấp. Có 3 nhóm điểm tiêu chí quan trọng để chấm điểm tín dụng cá nhân đó là",
        items: [
            {
                icon: <PropertySafetyTwoTone twoToneColor="#594DC9" />,
                heading: "Nhóm điểm số dư nợ & tình trạng nợ",
                paragraph: "Nhóm điểm này phản ánh trực tiếp khả năng chi trả của cá nhân. Ví dụ: Nếu khách hàng có số dư nợ càng cao thì khả năng vỡ nợ càng lớn, dẫn đến khả năng trả nợ càng thấp."
            },
            {
                icon: <DollarCircleTwoTone twoToneColor="#594DC9" />,
                heading: "Nhóm điểm lịch sử trả nợ",
                paragraph: "Trái ngược với nhóm trên, nhóm điểm này phản ánh gián tiếp khả năng vỡ nợ của khách hàng dựa vào lịch sử hành vi hay cách quản lý tài chính."
            }, {
                icon: <RocketTwoTone twoToneColor="#594DC9" />,
                heading: "Nhóm điểm lịch sử quan hệ tín dụng",
                paragraph: "Nhóm điểm cuối cùng có mức độ quan trọng thấp nhất so với 2 nhóm trên. Đây là nhóm phản ánh thời gian sử dụng của cá nhân với các tổ chức tài chính."
            }
        ]
    },
    button: "CHẤM ĐIỂM NGAY"
}

export default data