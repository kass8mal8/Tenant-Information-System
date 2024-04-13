import { useState } from 'react';
import axios from 'axios';

const usePatch = (url) => {
  const [loading, setLoading] = useState(false);

  const patch = async (body) => {
    setLoading(true);
    try {
      const res = await axios.put(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log({ res });

      return res.data;
    } catch (error) {
      setLoading(false);
      throw error?.response?.data;
    } finally {
      setLoading(false);
    }
  };

  return { patch, loading };
};

export default usePatch;
