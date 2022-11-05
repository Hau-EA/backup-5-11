import React from 'react';

const ArrowDownIcon = ({
  color = '#ffffff',
  size = { width: 10, height: 6 },
  styles = {},
  onClick = () => {},
}) => {
  return (
    <svg
      width={size.width}
      height={size.height}
      viewBox="0 0 10 6"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...styles }}
      onClick={onClick}
    >
      <path d="M5 5L5.35355 5.35355L5 5.70711L4.64645 5.35355L5 5ZM9.35355 1.35355L5.35355 5.35355L4.64645 4.64645L8.64645 0.646447L9.35355 1.35355ZM4.64645 5.35355L0.646446 1.35355L1.35355 0.646447L5.35355 4.64645L4.64645 5.35355Z" />
    </svg>
  );
};

export default ArrowDownIcon;
