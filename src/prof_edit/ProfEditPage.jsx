import React, { useEffect, useState } from 'react';
import ProfileEdit from './ProfEdit';
import { Box } from '@yamada-ui/react';

const ProfileEditPage = () => {
  const [useData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:5000/mypage', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Box>
      {useData ? (
        <Box mt={150}>
        <ProfileEdit useData={useData} />
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
};

export default ProfileEditPage;
