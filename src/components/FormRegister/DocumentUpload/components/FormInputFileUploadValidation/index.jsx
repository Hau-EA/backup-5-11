import React, { useRef } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import {} from '../../../../../constants';
import FileUploadIcon from '../../../../../assets/icons/file-upload-icon.svg';

const FormInputFileUploadValidation = ({
  field,
  information,
  setInformation,
  validation,
  setValidation,
  handleDisallowNextStep,
}) => {
  const refDriverLicenceFront = useRef(null);
  const refDriverLicenceBack = useRef(null);
  const refPassport = useRef(null);
  const refs = {
    refDriverLicenceFront,
    refDriverLicenceBack,
    refPassport,
  };

  const handleFieldEmptyValidation = (value, name, validation, msgRequired) => {
    if (!value) {
      validation = {
        ...validation,
        [name]: msgRequired,
      };
    }

    return validation;
  };

  const handleFieldValidation = (value, name, validation) => {
    if (!value) {
      validation = {
        ...validation,
        [name]: '',
      };
    }

    return validation;
  };

  const checkFieldValid = (value, field, information, validation) => {
    const { name, msgRequired } = field;

    validation = handleFieldEmptyValidation(
      value,
      name,
      validation,
      msgRequired
    );

    validation = handleFieldValidation(value, name, validation);

    setValidation(validation);

    handleDisallowNextStep(information, validation);
  };

  const handleOnChange = async (e, field) => {
    const { name } = e.target;
    const fileData = e.target.files[0];

    let newInformation = { ...information };

    const URL = window.URL || window.webkitURL;
    const img = new Image();
    const objectUrl = URL.createObjectURL(fileData);
    img.onload = function getDimension() {
      const { width, height } = img;
      fileData.width = width;
      fileData.height = height;
    };

    if (objectUrl) {
      newInformation = {
        ...information,
        [name]: objectUrl,
      };
      setInformation(newInformation);

      checkFieldValid(objectUrl, field, newInformation, validation);
    }
  };

  const handleOnBlur = (e, field) => {
    const { name } = e.target;

    checkFieldValid(information[name], field, information, validation);
  };

  const handleImageUploaded = (field) => {
    const { name, ref } = field;

    const newInformation = {
      ...information,
      [name]: '',
    };
    setInformation(newInformation);

    const timer = setTimeout(() => {
      refs[ref].current.click();

      checkFieldValid(newInformation[name], field, newInformation, validation);

      clearTimeout(timer);
    }, [100]);
  };

  return (
    <FormGroupStyled>
      {information[field.name] ? (
        <img
          name={field.name}
          src={information[field.name]}
          alt={field.label}
          onClick={() => handleImageUploaded(field)}
        />
      ) : (
        <>
          <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
          <FormControl
            ref={refs[field.ref]}
            id={field.name}
            type={field.type}
            name={field.name}
            isInvalid={validation[field.name]}
            onChange={(e) => handleOnChange(e, field)}
            onBlur={(e) => handleOnBlur(e, field)}
          />

          <FormControlFeedback hidden={false} type="validation">
            {validation[field.name]}
          </FormControlFeedback>
        </>
      )}
    </FormGroupStyled>
  );
};

const FormGroupStyled = styled(Form.Group)`
  margin-bottom: 12px;
  position: relative;

  img {
    width: 100%;
    height: 230px;
    object-fit: contain;
    border-radius: 12px;
  }
`;
const InputLabel = styled(Form.Label)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  display: block;
  color: var(--ds-c-grey-dark);
  position: absolute;
  top: 144.5px;
  width: 100%;
  margin: 0;
  text-align: center;
`;
const FormControl = styled(Form.Control)`
  width: 100%;
  height: 230px;
  background-image: url(${FileUploadIcon});
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: 50% 68.5px;
  border: 1px dashed #dbe1e8;

  padding: 0;
  margin: 0px;
  margin-top: 24px;

  &:focus {
    border: 1px dashed #dbe1e8 !important;
    outline: none !important;
    box-shadow: none !important;
  }

  &:invalid,
  &:invalid:focus,
  &.is-invalid {
    border: 1px solid var(--ds-c-red) !important;
    outline: none !important;
    box-shadow: none !important;
    background-image: url(${FileUploadIcon}) !important;
    background-repeat: no-repeat;
    background-size: 60px;
    background-position: 50% 68.5px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 99%;
    height: 40px;
    background: #fff;
    border-radius: 4px;
  }
`;
const FormControlFeedback = styled(Form.Control.Feedback)`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: var(--ds-c-red);
`;

export default FormInputFileUploadValidation;
