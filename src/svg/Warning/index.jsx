import { useTheme } from '@mui/material';
import { animated, useSpring, to } from '@react-spring/web';

const WarningSvg = (props) => {
  const { palette } = useTheme();
  const outerSpring = useSpring({
    from: { x: 0 },
    to: [{ x: 35 }, { x: -35 }, { x: 10 }, { x: -10 }, { x: 0 }],
    config: { duration: 150 },
  });
  const innerSpring = useSpring({
    from: { x: 0 },
    to: [
      { x: 12 },
      { x: -12 },
      { x: 7 },
      { x: -7 },
      { x: 3 },
      { x: -3 },
      { x: 0 },
    ],
    config: { duration: 50 },
  });
  return (
    <svg
      viewBox="0 0 710 663"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <animated.g
        style={{
          scale: 0.75,
          transformOrigin: '50% 50%',
          transform: to(outerSpring.x, (x) => `rotateZ(${x}deg)`),
        }}
      >
        <path
          d="M296.667 68.6667L42.6667 529C36.7894 539.179 33.7076 550.73 33.7337 562.484C33.7597 574.237 36.8926 585.775 42.8149 595.928C48.7372 606.08 57.2383 614.486 67.4565 620.294C77.6748 626.102 89.2469 629.106 101 629H609C620.753 629.106 632.325 626.102 642.544 620.294C652.762 614.486 661.263 606.08 667.185 595.928C673.107 585.775 676.24 574.237 676.266 562.484C676.292 550.73 673.211 539.179 667.333 529L413.333 68.6667C407.568 58.2466 399.117 49.561 388.858 43.5129C378.6 37.4648 366.909 34.2749 355 34.2749C343.091 34.2749 331.4 37.4648 321.142 43.5129C310.883 49.561 302.432 58.2466 296.667 68.6667Z"
          stroke={palette.text.primary}
          strokeWidth={50}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </animated.g>
      <animated.g
        style={{
          scale: 0.75,
          transformOrigin: '50% 50%',
          transform: to(innerSpring.x, (x) => `rotateZ(${x}deg)`),
        }}
      >
        <path
          d="M355 229V362.333"
          stroke={palette.primary.main}
          strokeWidth={66.6667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M356.667 495.667H353.333"
          stroke={palette.primary.main}
          strokeWidth={66.6667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </animated.g>
    </svg>
  );
};
export default WarningSvg;
