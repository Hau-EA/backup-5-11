import React from 'react';
import { Calendar } from 'react-date-range';
import styled from 'styled-components';
import ArrowIcon from '../../../../../assets/icons/arrow-down-icon.svg';
import DoubleArrowIcon from '../../../../../assets/icons/double-arrow-icon.svg';

const CustomDatepickerSelected = ({ isOpen, date, onChange }) => {
  return (
    <>
      {isOpen && (
        <CalendarStyled>
          <Calendar
            onChange={onChange}
            date={date ? new Date(date) : new Date()}
          />
        </CalendarStyled>
      )}
    </>
  );
};

const CalendarStyled = styled.div`
  width: 100%;
  height: 326px;
  display: flex;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  margin-top: 2px;
  padding: 16px 18px;
  margin-inline: auto;
  position: absolute;
  z-index: 1;
  top: -272px;
  background: var(--ds-c-white);

  & .rdrCalendarWrapper {
    width: 100%;
    height: 100%;
  }

  & .rdrMonthAndYearWrapper {
    padding: 15px 6px;
    height: 42px;

    button {
      background: url(${DoubleArrowIcon}) no-repeat;
      background-position: center;
      height: 17px;
      width: 17px;
      margin: 0;

      & i {
        display: none;
      }
    }

    button.rdrNextButton {
      transform: rotate(180deg);
    }

    & .rdrMonthAndYearPickers {
      height: 17px;
      width: 100%;
      display: flex;
      justify-content: start;

      span {
        margin: 0px;

        select {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #0e1012;
          padding-top: 0px;
          padding-bottom: 0px;
          background: url(${ArrowIcon}) no-repeat right;
        }
      }

      & .rdrMonthPicker {
        order: 1;

        select {
          padding-left: 30px;
          padding-right: 22px;
        }
      }

      & .rdrYearPicker {
        order: -1;

        select {
          padding-left: 38.5px;
          padding-right: 22px;
        }
      }
    }
  }

  & .rdrMonthsVertical {
    flex-direction: row;

    & .rdrMonth {
      padding: 0;
      width: 100%;

      & .rdrWeekDays {
        display: flex;
        justify-content: center;
        height: 42px;

        span {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;

          color: #7a8189;
          width: 42px;
          max-width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      & .rdrDays {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          width: 42px;
          height: 42px;

          span {
            top: 0;
            left: 0;
            border-radius: 50%;
            width: 42px;
            height: 42px;

            span {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 17px;
              color: #0e1012;

              display: flex;
              justify-content: center;
              align-items: center;
            }
          }

          &:hover {
            span {
              background-color: #fcb519;
            }
          }

          &:active,
          &:focus,
          &:target,
          &:visited,
          &:focus-visible {
            border: none;
            box-shadow: none;
            outline: none;
            background-color: #fcb519;
            border-radius: 50%;
          }
        }

        button.rdrDayPassive {
          span {
            span {
              color: #eef2f5;
            }
          }
        }

        button.rdrDayToday {
          span {
            span {
              &::after {
                background: none;
                border: 1px solid #fcb519;
                border-radius: 50%;
                width: 42px;
                height: 42px;
                top: 0;
                left: 0;
                transform: unset;
              }
            }
          }

          span.rdrSelected {
            background-color: var(--ds-c-white) !important;
            border: 1px solid #fcb519 !important;
          }
        }

        button.rdrDay {
          span.rdrSelected {
            background-color: #fcb519;
          }
        }

        button.rdrDayHovered {
          span {
            span {
              font-weight: 700;
            }

            &::after {
              border: none;
              box-shadow: none;
              outline: none;
              background-color: transparent;
              border-radius: 50%;
              width: 42px;
              height: 42px;
            }
          }
        }

        button.rdrDay {
          span.rdrDayEndPreview {
            border: none;
            box-shadow: none;
            outline: none;
            background-color: transparent;
            border-radius: 50%;
            width: 42px;
            height: 42px;
          }
        }
      }
    }
  }
`;

export default CustomDatepickerSelected;
