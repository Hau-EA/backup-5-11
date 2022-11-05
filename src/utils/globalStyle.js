import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        list-style: none;
        box-sizing: border-box;
    }

    :root {
        // variable solid colors
        --ds-c-black: #000000;
        --ds-c-white: #ffffff;
        --ds-c-grey: #4D5054;
        --ds-c-grey-dark: #0E1012;
        --ds-c-grey-neutral: #7A8189;
        --ds-c-grey-hover: #B0B6BD;
        --ds-c-grey-disabled: #EEF2F5;
        --ds-c-red: #E72631;
        --ds-c-red-hover: #F17D83;
        --ds-c-red-disabled: #F5A8AD;
        --ds-c-yellow: #FCB519;
        --ds-c-yellow-hover: #FDD375;
        --ds-c-yellow-disabled: #FEE1A3;
        --ds-c-green: #00E492;
        --ds-c-green-hover: #49FFBE;
        --ds-c-green-disabled: #97FFDA;
        --ds-c-sky: #00C8FF;
        --ds-c-sky-hover: #A0EBFF;
        --ds-c-sky-disabled: #CDF4FF;
        --ds-c-violet: #7906A1;
        --ds-c-violet-hover: #AF6AC7;
        --ds-c-violet-disabled: #C99CDA;
        --ds-c-blue: #1C3F88;
        --ds-c-blue-hover: #778CB8;
        --ds-c-blue-disabled: #A4B2CF;

        // variable gradients
        --ds-g-grey: linear-gradient(137.29deg, #4D5054 3.47%, #D2D3D4 107.8%);
        --ds-g-red: linear-gradient(137.29deg, #E72631 3.47%, #FAD4D6 107.8%);
        --ds-g-yellow: linear-gradient(137.29deg, #FCB519 3.47%, #FEF0D1 107.8%);
        --ds-g-green: linear-gradient(137.29deg, #09C649 3.47%, #CEF4DB 107.8%);
        --ds-g-sky: linear-gradient(137.29deg, #86DAF1 3.47%, #E7F8FC 107.8%);
        --ds-g-violet: linear-gradient(137.29deg, #7906A1 3.47%, #C99CDA 107.8%);
        --ds-g-blue: linear-gradient(137.29deg, #1C3F88 3.47%, #A4B2CF 107.8%);

        // variable steps
        --ds-bg-step: #EEF2F5;
        --ds-bg-step-completed: #00E492;
        --ds-bg-step-disabled: #97FFDA;

        // variable shadows
        --ds-box-shadow-1: 0px 1px 6px rgba(0, 0, 0, 0.1);
        --ds-box-shadow-2: 0px 2px 8px rgba(0, 0, 0, 0.1);
        --ds-box-shadow-3: 0px 4px 8px rgba(0, 0, 0, 0.1);
        --ds-box-shadow-4: 0px 4px 15px rgba(0, 0, 0, 0.12);

        // variable commons
        --ds-bg: #FFFFFF;
        --ds-bg-hover: #D2D9E7;
        --ds-bg-disabled: #EEF2F5;
    }

    .ds-heading-1 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 800;
        font-size: 40px;
        line-height: 48px;
        text-transform: capitalize;
    }
    .ds-heading-2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 800;
        font-size: 32px;
        line-height: 38px;
    }
    .ds-heading-3 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 800;
        font-size: 24px;
        line-height: 29px;
    }
    .ds-body-text-web {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 29px;
    }
    .ds-body-text-mobile {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 29px;
    }
    .ds-small-text {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 29px;
    }

    body {
        background-color: var(--t-bg-body);
    }
`;

export default GlobalStyle;
