import React, { useEffect, useState } from 'react';
import InputWithLabels from '../../../shared/components/InputWithLabels';
import DatePickerComponent from '../../../shared/components/DatePickerComponent';
import DotSelector from '../../../shared/components/DotSelector';
import ImageUploader from '../../../shared/components/ImageUploader';
import { Tooltip } from '@mui/material';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';
import { useLoading } from '../../../shared/components/useLoading';
import { register } from '../../../services/api';
import useUserStore from '../../../zustand/useUserStore';
import { useNavigate } from 'react-router-dom';
import LocationCatcher from './LocationCatcher';

const AboutUser = () => {
  const [startDate, setStartDate] = useState(new Date());

  const genders = ['Male', 'Female', 'She-Male', 'He-Female', 'Other'];
  const [userGender, setUserGender] = useState('');

  const [userInterestGender, setUserInterestGender] = useState('');

  const relationshipTypes = ['Long Term', 'Short Term', 'lol'];
  const [relationshipIntent, setRelationshipIntent] = useState('');

  const [images, setImages] = useState(Array(3).fill(null));

  const [isUserValid, setIsUserValid] = useState(false);

  const { show, hide } = useLoading();

  const nav = useNavigate();

  const { getCurrentUser, setCurrentUser } = useUserStore();

  const [coordinates, setCoordinates] = useState(null);

  const handleUserCreation = (res) => {
    setCurrentUser(res.data);

    console.log('THIS IS RES', res);

    localStorage.setItem('token', res.data.token);

    nav('/dashboard');
  };

  const handleRegisterUser = async () => {
    show();

    const user = await getCurrentUser();

    console.log(user);

    const data = {
      mail: user.mail,
      password: user.encryptedPassword,
      username: user.username,
      dob: startDate,
      gender: userGender,
      genderInterest: userInterestGender,
      relationIntent: relationshipIntent,
      images,
      phoneNumber: '0400980001',
      sexOrientation: 'Straight',
      coordinates: coordinates,
    };

    console.log(data);

    const response = await register(data);

    handleUserCreation(response);

    console.log(response);

    hide();
  };

  function isAtLeastEighteenYearsOld(startDate) {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    // Convert startDate to a Date object if it's not already (assuming startDate is a string)
    const startDateObject = new Date(startDate);

    // Check if the start date is on or before the date 18 years ago
    return startDateObject <= eighteenYearsAgo;
  }

  useEffect(() => {
    if (
      userGender !== '' &&
      userInterestGender !== '' &&
      relationshipIntent !== '' &&
      images.every((image) => image !== null) &&
      isAtLeastEighteenYearsOld(startDate)
    ) {
      setIsUserValid(true);
    } else {
      setIsUserValid(false);
    }
  }, [userGender, userInterestGender, relationshipIntent, images, startDate]);

  const getFormValid = () => {
    return 'Create Account';
  };

  const getNotFormValid = () => {
    return 'Check not complete';
  };

  return (
    <div style={{ height: '100%', width: '100vw', backgroundColor: '#222' }}>
      <div style={{ width: '40%', marginLeft: '30px', paddingTop: '20px' }}>
        <DatePickerComponent
          startDate={startDate}
          setStartDate={setStartDate}
        />
        <div>
          <h1 style={{ color: 'white' }}>Gender: {userGender}</h1>
          <DotSelector
            items={genders}
            selectedValue={userGender}
            setSelectedValue={setUserGender}
          />
        </div>
        <div>
          <h1 style={{ color: 'white' }}>
            Gender Interest: {userInterestGender}
          </h1>
          <DotSelector
            items={genders}
            selectedValue={userInterestGender}
            setSelectedValue={setUserInterestGender}
          />
        </div>
        <div>
          <h1 style={{ color: 'white' }}>
            Relationship Intent: {relationshipIntent}
          </h1>
          <DotSelector
            items={relationshipTypes}
            selectedValue={relationshipIntent}
            setSelectedValue={setRelationshipIntent}
          />
        </div>
        <div>
          <h1 style={{ color: 'white' }}>Images</h1>
          <ImageUploader images={images} setImages={setImages} />
        </div>
      </div>
      <div className="App">
        <header className="App-header">
          <LocationCatcher
            coordinates={coordinates}
            setCoordinates={setCoordinates}
          />
        </header>
      </div>
      <>
        <Tooltip title={isUserValid ? getFormValid() : getNotFormValid()}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <CustomPrimaryButton
              label="Create"
              additionalStyle={{ marginTop: '20px' }}
              disabled={!isUserValid}
              onClick={handleRegisterUser}
              dataTestid={'create-presentation-name-test-button'}
            />
          </div>
        </Tooltip>
      </>
    </div>
  );
};
export default AboutUser;
