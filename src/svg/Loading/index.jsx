import { useTheme } from '@mui/material';
import { animated, config, useTrail } from '@react-spring/web';

const paths = [
  'M334 34V134',
  'M122 122L192.667 192.667',
  'M34 334H134',
  'M122 546L192.667 475.333',
  'M334 534V634',
  'M546 546L475.333 475.333',
  'M634 334H534',
  'M546 122L475.333 192.667',
];

const LoadingSvg = (props) => {
  const { palette } = useTheme();
  const trails = useTrail(paths.length, {
    loop: { reverse: true },
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.stiff,
  });
  return (
    <svg
      width="50%"
      viewBox="0 0 668 668"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {trails.map((style, i) => (
        <animated.g key={i} style={style}>
          <path
            d={paths[i]}
            stroke={palette.text.primary}
            strokeWidth={66.6667}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </animated.g>
      ))}
    </svg>
  );
};
export default LoadingSvg;
