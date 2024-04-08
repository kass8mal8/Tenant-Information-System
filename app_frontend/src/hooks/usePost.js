import { useState } from 'react';
import axios from 'axios';

const usePost = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (body) => {
    setLoading(true);
    try {
      const res = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log({ res });

      return res.data;
    } catch (error) {
      // setError(error.message)
      setLoading(false);
      throw error?.response?.data;
      //   throw new Error(error.)
    } finally {
      setLoading(false);
      // setError(null)
    }
  };

  return { post, loading, error };
};

export default usePost;
