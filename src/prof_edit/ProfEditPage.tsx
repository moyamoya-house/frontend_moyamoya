import React, { useEffect, useState } from 'react';
import ProfEdit from './ProfEdit.tsx';
import { Box } from '@yamada-ui/react';

export interface User {
  id: number;
  name: string;
  prof_image: string;
  second_image: string;
  prof_comment: string;
  password: string;
  email: string;
}

const ProfileEditPage = () => {
  const [useData, setUserData] = useState<User | null>(null);

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
        <ProfEdit useData={useData} />
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
};

export default ProfileEditPage;
