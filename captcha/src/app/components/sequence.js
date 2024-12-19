"use client"
import { useEffect, useState } from 'react';
import Captcha from './captcha';
const Sequence = ({ number }) => {
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [captchaRequired, setCaptchaRequired] = useState(false);

  useEffect(() => {
    const makeRequest = async (index) => {
      try {
        const response = await fetch('https://api.prod.jcloudify.com/whoami', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (data.type === '403 FORBIDDEN' && data.message === 'Bad credentials') {
          setSequence((prev) => [...prev, `${index + 1}. Forbidden`]);
          setCurrentIndex(index + 1);
        } else if (data.type === 'CAPTCHA_REQUIRED') {
          setCaptchaRequired(true);
        }
      } catch (error) {
        console.error('Error making request:', error);
      }
    };

    if (currentIndex < number && !captchaRequired) {
      makeRequest(currentIndex);
    }
  }, [currentIndex, number, captchaRequired]);

  useEffect(() => {
    if (currentIndex < number && !captchaRequired) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, number, captchaRequired]);

  const handleCaptchaSuccess = () => {
    setCaptchaRequired(false);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="sequence-container">
      {sequence.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      {captchaRequired && <Captcha onSuccess={handleCaptchaSuccess} />}
    </div>
  );
};

export default Sequence;
