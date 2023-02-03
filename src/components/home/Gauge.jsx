import { useEffect } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';

const GaugeComponent = ({ score, hasLimit = false, hideGaugeDefault = false, ...props }) => {
    const minW768 = useMediaQuery('(min-width:768px)');

    var opts = {
        angle: -0.29, // The span of the gauge arc
        lineWidth: 0.07, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
            length: 0,
            strokeWidth: 0,
        },
        staticZones: hideGaugeDefault
            ? []
            : [
                  { strokeStyle: score.color[0], min: 0, max: 24.5 },
                  { strokeStyle: '#FFFFFF', min: 24.5, max: 25 },
                  { strokeStyle: score.color[1], min: 25, max: 49.5 },
                  { strokeStyle: '#FFFFFF', min: 49.5, max: 51 },
                  { strokeStyle: score.color[2], min: 50, max: 75.5 },
                  { strokeStyle: '#FFFFFF', min: 75.5, max: 76 },
                  { strokeStyle: score.color[3], min: 76, max: 100 },
              ],
    };

    useEffect(() => {
        const target = document.getElementById('gauge-canvas');
        const gauge = new Gauge(target).setOptions(opts);
        gauge.maxValue = 100;
        gauge.setMinValue(0);
        gauge.set(0); // not important
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (hasLimit) {
            var radius = target.height / 1.9;
            var ctx = target.getContext('2d');

            ctx.translate(radius, radius);
            drawNumbers(ctx, radius);
        }
    }, [score]);

    const drawNumbers = (ctx, radius) => {
        var ang;
        ctx.font = minW768 ? 'bold 16px arial' : 'bold 24px arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        let num = 7;
        ang = (num * Math.PI) / 5.6;
        ctx.fillStyle = '#CF1322';
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.74);
        ctx.rotate(-ang);
        ctx.fillText(0, 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius);
        ctx.rotate(-ang);

        num = 5;
        ang = (num * Math.PI) / 5.6;
        ctx.fillStyle = '#1D39C4';
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.74);
        ctx.rotate(-ang);
        ctx.fillText(100, 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius);
        ctx.rotate(-ang);

        num = 8;
        ang = (num * Math.PI) / 5.5;
        ctx.fillStyle = '#D46B08';
        ctx.rotate(ang);
        ctx.translate(-27, -radius * 0.82);
        ctx.rotate(-ang);
        ctx.fillText(25, 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius);
        ctx.rotate(-ang);

        num = 3;
        ang = (num * Math.PI) / 4.8;
        ctx.fillStyle = '#13C2C2';
        ctx.rotate(ang);
        ctx.translate(5, -radius * 0.32);
        ctx.rotate(-ang);
        ctx.fillText(75, 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius);
        ctx.rotate(-ang);

        num = 12;
        ang = minW768 ? (num * Math.PI) / 4.55 : (num * Math.PI) / 4.59;
        ctx.fillStyle = '#52C41A';
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.325);
        ctx.rotate(-ang);
        ctx.fillText(50, 0, -45);
        ctx.rotate(ang);
        ctx.translate(0, radius);
        ctx.rotate(-ang);
    };

    return minW768 ? (
        <canvas
            id="gauge-canvas"
            style={{
                marginTop: '-17px',
                width: '330px',
                height: '330px',
            }}
        ></canvas>
    ) : (
        <canvas
            id="gauge-canvas"
            style={{
                marginTop: '-12px',
                width: '280px',
                height: '280px',
            }}
        ></canvas>
    );
};

export default GaugeComponent;
