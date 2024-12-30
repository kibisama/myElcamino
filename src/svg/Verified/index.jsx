import { useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';

const VerifiedSvg = (props) => {
  const { palette } = useTheme();

  const checkSpring = useSpring({
    from: {
      strokeDashoffset: -613,
    },
    to: {
      strokeDashoffset: 0,
    },
    config: { duration: 1000 },
  });
  const circleSpring = useSpring({
    from: {
      strokeDashoffset: -1586,
    },
    to: {
      strokeDashoffset: 0,
    },
    config: { duration: 1000 },
  });

  return (
    <svg
      width="80%"
      viewBox="0 0 668 668"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <animated.g
        style={{
          strokeDasharray: 613,
          ...checkSpring,
          animationDirection: 'reverse',
        }}
      >
        <path
          d="M634 100.667L334 400.667L200.667 267.333"
          stroke={palette.primary.main}
          strokeWidth={66.6667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </animated.g>
      <animated.g
        style={{
          strokeDasharray: 1586,
          ...circleSpring,
        }}
      >
        <path
          d="M632 300.667C633.34 311.727 634.008 322.859 634 334C634 393.334 616.405 451.336 583.441 500.671C550.476 550.006 503.623 588.458 448.805 611.164C393.987 633.87 333.667 639.811 275.473 628.236C217.279 616.66 163.824 588.088 121.868 546.132C79.9122 504.176 51.34 450.721 39.7644 392.527C28.1889 334.333 34.1299 274.013 56.8362 219.195C79.5424 164.377 117.994 117.524 167.329 84.5591C216.664 51.5947 274.666 34 334 34C380.452 34.4335 426.142 45.856 467.333 67.3333"
          stroke={palette.text.primary}
          strokeWidth={50}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </animated.g>
    </svg>
  );
};
export default VerifiedSvg;
