import GaugeComponent from '@/components/home/Gauge';
import { useEffect, useState } from 'react';
import style from './style.module.css';

const GaugeScoring = ({ score, number = false, ...props }) => {
    const score_lst = {
        Low: {
            title: number ? number : 'Thấp',
            title_color: '#FD4363',
            color: ['#FD4363', '#F5F5F5', '#F5F5F5', '#F5F5F5'],
        },
        Medium: {
            title: number ? number : 'Trung bình',
            title_color: '#978EEE',
            color: ['#FD4363', '#978EEE', '#F5F5F5', '#F5F5F5'],
        },
        High: {
            title: number ? number : 'Cao',
            title_color: '#6A5EDC',
            color: ['#FD4363', '#978EEE', '#6A5EDC', '#F5F5F5'],
        },
        'Very High': {
            title: number ? number : 'Rất cao',
            title_color: '#4B3FBA',
            color: ['#FD4363', '#978EEE', '#6A5EDC', '#4B3FBA'],
        },
        unknown: {
            title: 'Chưa biết',
            title_color: '#1D39C4',
            color: ['#F5F5F5', '#F5F5F5', '#F5F5F5', '#F5F5F5'],
        },
    };

    return (
        <div
            className={style.credit_score_wrap}
            style={{ position: 'relative', ...props.customWrapStyle }}
            id="credit-score"
        >
            <div
                className={style.cut_circ}
                style={{
                    background: 'conic-gradient(rgb(240, 240, 240) 78%, white 10%, white)',
                }}
            >
                <div className={style.credit_inner}>
                    <div className={style.credit_inner_content}>
                        <h2
                            style={{
                                fontFamily: 'BeVietnamProBold',
                                marginBottom: 0,
                            }}
                        >
                            Điểm tín dụng
                        </h2>
                        <h1
                            style={{
                                fontFamily: 'Montserrat',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                color: score_lst[score].title_color,
                            }}
                            className={props.scoreClass}
                        >
                            {score_lst[score].title}
                        </h1>
                    </div>
                </div>
            </div>
            <div style={{ zIndex: 1 }}>
                <GaugeComponent score={score_lst[score]} {...props} />
            </div>
        </div>
    );
};

export default GaugeScoring;
