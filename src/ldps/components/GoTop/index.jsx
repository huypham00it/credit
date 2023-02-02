import useScrollPosition from '@/hooks/useScrollPosition';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import style from './style.module.css';

const GoTop = () => {
    const position = useScrollPosition();

    return (
        <div
            className={style.button + ' ' + (position > 500 ? style.show : '')}
            onClick={() => {
                document.body.scrollTop = 0;
            }}
        >
            <VerticalAlignTopOutlined />
        </div>
    );
};

export default GoTop;
