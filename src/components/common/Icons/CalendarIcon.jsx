import React from 'react';

const CalendarIcon = ({
  color = '#ffffff',
  size = { width: 24, height: 24 },
  styles = {},
  onClick = () => {},
}) => {
  return (
    <svg
      width={size.width}
      height={size.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...styles }}
      onClick={onClick}
    >
      <path
        d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10V11H3V10Z"
        stroke={color}
        strokeWidth="1.2"
      />
      <rect
        x="3"
        y="6"
        width="18"
        height="15"
        rx="2"
        stroke={color}
        strokeWidth="1.2"
      />
      <path
        d="M7 3L7 8"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M17 3L17 8"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CalendarIcon;
