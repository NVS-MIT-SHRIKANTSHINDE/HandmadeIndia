import { useState } from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const Phone = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {user ? (
        <h2>Login Success</h2>
      ) : (
        <div>
          {showOTP ? (
            <>
              <div>
                Enter your OTP
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  type="number"
                />
                <button onClick={onOTPVerify}>
                  {loading && "Loading..."}
                  <span>Verify OTP</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                Verify your phone number
                <input
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                  type="tel"
                />
                <button onClick={onSignup}>
                  {loading && "Loading..."}
                  <span>Send code via SMS</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Phone;
