import { useEffect, useState } from 'react';
import style from './style.module.css';

export const Gauge = ({ radius, percent = 0, customStyle, ...rest }) => {
    const [currentValue, setCurrentValue] = useState(0);

    const strokeWidth = 20;
    const innerRadius = radius - strokeWidth / 2;
    const circumference = innerRadius * 2 * Math.PI;
    const arc = circumference * (280 / 360);
    const dashArray = `${arc} ${circumference}`;

    const percentNormalized = Math.min(Math.max(percent, 0), 100);
    const offset = (arc * 3) / 4;
    let percentOffset = arc - ((percentNormalized - 25 * currentValue) / 100) * arc;

    const trailColors = ['#FD4363', '#978EEE', '#6A5EDC', '#4B3FBA'];

    useEffect(() => {
        if (!percentOffset < arc) {
            let result;
            if (percent > 25 && percent <= 50) {
                result = 1;
            } else if (percent > 50 && percent <= 75) {
                result = 2;
            } else if (percent > 75 && percent <= 100) {
                result = 3;
            } else {
                result = 0;
            }
            setCurrentValue(result);
        }
    }, [percent]);

    return (
        <>
            <div style={customStyle} className={style.wrapper}>
                <svg height={radius * 2} width={radius * 2}>
                    {[25, 50, 75, 100].map((item, index) => (
                        <circle
                            key={item}
                            className={style.gauge_base}
                            cx={radius}
                            cy={radius}
                            fill="transparent"
                            r={innerRadius}
                            stroke={percent >= item ? trailColors[index] : '#F5F5F5'}
                            strokeWidth={strokeWidth}
                            strokeDasharray={dashArray}
                            strokeDashoffset={offset}
                            transform={`rotate(${128 + index * 71.5}, ${radius}, ${radius})`}
                            style={{
                                transition: 'stroke-dashoffset 0.5s',
                            }}
                        />
                    ))}

                    <circle
                        className={style.gauge_base}
                        cx={radius}
                        cy={radius}
                        fill="transparent"
                        r={innerRadius}
                        stroke={trailColors[currentValue]}
                        strokeWidth={strokeWidth}
                        strokeDasharray={dashArray}
                        strokeDashoffset={percentOffset}
                        transform={`rotate(${128 + currentValue * 71.5}, ${radius}, ${radius})`}
                        style={{
                            transition: 'stroke-dashoffset 0.5s',
                        }}
                    />
                </svg>

                <span className={style.index_value}>0</span>
                <span className={style.index_value}>25</span>
                <span className={style.index_value}>50</span>
                <span className={style.index_value}>75</span>
                <span className={style.index_value}>100</span>
            </div>
        </>
    );
};
