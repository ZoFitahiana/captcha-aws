"use client"
import { useEffect, useState } from 'react';

const Captcha = ({ onSuccess }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = "https://b82b1763d1c3.eu-west-3.captcha-sdk.awswaf.com/b82b1763d1c3/jsapi.js";
      script.type = "text/javascript";
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    };

    if (typeof window !== 'undefined' && !scriptLoaded) {
      loadScript();
    }
  }, [scriptLoaded]);

  useEffect(() => {
    if (scriptLoaded && typeof window !== 'undefined' && window.AwsWafCaptcha) {
      window.showMyCaptcha = function () {
        var container = document.querySelector("#my-captcha-container");

        window.AwsWafCaptcha.renderCaptcha(container, {
          apiKey: process.env.NEXT_PUBLIC_WAF_API_KEY,
          onSuccess: captchaExampleSuccessFunction,
          onError: captchaExampleErrorFunction,
        });
      };

      window.captchaExampleSuccessFunction = function (wafToken) {
        setCaptchaToken(wafToken);
        setError(null);
        onSuccess();
      };

      window.captchaExampleErrorFunction = function (error) {
        setCaptchaToken(null);
        setError(error);
        alert('Error resolving CAPTCHA: ' + error.message);
      };
    }
  }, [scriptLoaded, onSuccess]);

  return (
    <div>
      <div id="my-captcha-container"></div>
      <button onClick={() => window.showMyCaptcha && window.showMyCaptcha()}>Show CAPTCHA</button>
    </div>
  );
};

export default Captcha;
