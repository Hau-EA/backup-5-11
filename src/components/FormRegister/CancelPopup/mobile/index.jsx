import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import ButtonCommon from '../../../common/ButtonCommon';

const CancelPopupMobile = ({ isOpen, onClose, onClick }) => {
  return (
    <ModalStyled
      show={isOpen}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBody>
        <p>Do you want to cancel registration?</p>
      </ModalBody>
      <ModalFooter>
        <ButtonCommon
          value="No"
          onClick={onClose}
          styles={{
            margin: '0px',
            fontSize: '14px',
            width: '50%',
            height: '32px',
          }}
          color="var(--ds-c-grey-dark)"
          background="var(--ds-c-white)"
        />
        <ButtonCommon
          value="Yes"
          onClick={onClick}
          styles={{
            margin: '0px',
            fontSize: '14px',
            width: '50%',
            height: '32px',
          }}
          color="var(--ds-c-grey-dark)"
          background="var(--ds-c-yellow)"
        />
      </ModalFooter>
    </ModalStyled>
  );
};

const ModalStyled = styled(Modal)`
  & .modal-content {
    padding: 24px;
    border-radius: 12px;
    box-shadow: var(--ds-box-shadow-4);
    background: var(--ds-c-white);
    width: 276px;
    height: 129px;
    margin-inline: auto;
  }
`;
const ModalBody = styled(Modal.Body)`
  padding: 0;
  margin-bottom: 32px;

  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: var(--ds-c-grey-dark);
    margin: 0;
  }
`;
const ModalFooter = styled(Modal.Footer)`
  border: none;
  padding: 0;
  display: flex;
`;

export default CancelPopupMobile;
