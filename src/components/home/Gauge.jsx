import { useEffect } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';

const GaugeComponent = ({ score, hideGaugeDefault = false, ...props }) => {
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
    }, [score]);

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
