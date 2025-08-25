import { useTheme } from '@mui/material';
import { animated, config, useSpring, useTrail } from '@react-spring/web';

const innerPath = [
  'M233.333 300V233.333H300V300H233.333Z',
  'M433.333 366.667V233.333H566.667V366.667H433.333Z',
  'M566.667 500V566.667H500V500H566.667Z',
  'M233.333 566.667V433.333H366.667V566.667H233.333Z',
];
const outerPath = [
  'M266.667 100H133.333C124.493 100 116.014 103.512 109.763 109.763C103.512 116.014 100 124.493 100 133.333V266.667',
  'M700 266.667V133.333C700 124.493 696.488 116.014 690.237 109.763C683.986 103.512 675.507 100 666.667 100H533.333',
  'M533.333 700H666.667C675.507 700 683.986 696.488 690.237 690.237C696.488 683.986 700 675.507 700 666.667V533.333',
  'M100 533.333V666.667C100 675.507 103.512 683.986 109.763 690.237C116.014 696.488 124.493 700 133.333 700H266.667',
];

const QrCodeSvg = (props) => {
  const { palette } = useTheme();
  const strokeColor = palette.text.primary;

  const outerStyle = useSpring({
    loop: { reverse: true },
    reset: true,
    from: {
      transform: 'translate3d(5%,5%,0)',
      scale: 0.9,
    },
    to: { transform: 'translate3d(0,0,0)', scale: 1 },
    config: config.wobbly,
  });
  const trails = useTrail(innerPath.length, {
    loop: { reverse: true },
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.slow,
  });

  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {trails.map((style, i) => (
        <animated.g key={i} style={style}>
          <path
            d={innerPath[i]}
            stroke={palette.primary.main}
            strokeWidth={66.6667}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </animated.g>
      ))}
      <animated.g style={outerStyle}>
        {outerPath.map((v, i) => (
          <path
            key={i}
            d={v}
            stroke={strokeColor}
            strokeWidth={50}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </animated.g>
    </svg>
  );
};
export default QrCodeSvg;
