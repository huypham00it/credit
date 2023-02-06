import Image from 'next/image';
import PropTypes from 'prop-types';

import LIGHT_LOGO from '@/assets/img/credit_white.svg';
import DARK_LOGO from '@/assets/img/credit.svg';
import DARK_LOGO_TEXT from '@/assets/img/credit_text_white.svg';

const Logo = ({ type, textColor, ...props }) => {
    return (
        <Image
            {...props}
            src={type === 'light' ? LIGHT_LOGO : props.textColor == 'white' ? DARK_LOGO_TEXT : DARK_LOGO}
        />
    );
};

Logo.propTypes = {
    type: PropTypes.oneOf(['light', 'dark']),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    alt: PropTypes.string,
    textColor: PropTypes.oneOf(['white']),
};

Logo.defaultProps = {
    type: 'dark',
    alt: 'Creditvn',
};

export default Logo;
