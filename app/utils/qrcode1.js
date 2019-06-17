import React from 'react'
import Svg, { Circle, Rect } from 'react-native-svg'
import qrcode from './qrcode'

/** Generates QR Code as SVG image */
export default function(options) {
  const qr = qrcode(2, 'L')
  qr.addData(options.content);
  qr.make();
  const length = qr.getModuleCount();
  const xsize = options.width / length;
  const ysize = options.height / length;

  const rect = []

  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      if (qr.isDark(x, y)) {
        const px = (x * xsize).toString();
        const py = (y * ysize).toString();
        // const px = (x * xsize + xsize / 2).toString();
        // const py = (y * ysize + ysize / 2).toString();
        rect.push(
          <Rect key={`qr-${y}-${x}`} x={px} y={py} width={xsize} height={ysize} fill={options.color} />
          // <Circle key={`qr-${y}-${x}`} cx={px} cy={py} r={xsize / 2} fill={options.color} />
        )
      }
    }
  }

  return (
    <Svg width={options.width} height={options.height}>
      {rect}
    </Svg>
  );
}
