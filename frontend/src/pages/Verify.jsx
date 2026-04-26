import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useUserData } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const resendOtpTimer = 10; 
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(resendOtpTimer);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const { verifyUser, btnLoading, loginUser } = useUserData();
  const {fetchCart} = useCart();


  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const timeformat = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  async function submitHandler() {
   await verifyUser(otp, navigate, fetchCart);
  }

  const resendOtpHandler = async () => {
    setTimer(resendOtpTimer);
    setCanResend(false);
    const email = localStorage.getItem("email");
    await loginUser(email, navigate);
   
  }

  return (
    <div className="min-h-[60vh]">
      <Card className="sm:w-[300px] md:w-[400px] m-auto mt-5">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>
            If you didn't receive the OTP, please check your spam folder or try
            again.
          </CardDescription> 
          <Button
            variant="link"
            className="ml-0 me-auto p-0 text-xs cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Change Email
          </Button>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-3">
  <Label>Enter OTP</Label>

  <div className="flex justify-center">
    <InputOTP
      maxLength={6}
      value={otp}
      onChange={(value) => setOtp(value)}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  </div>
</div>
        </CardContent>

        <CardFooter>
          <Button
            type="button"
            onClick={submitHandler}
            disabled={btnLoading}
            className="cursor-pointer disabled:cursor-not-allowed"
          >
            {btnLoading ? (
              <>
                <LoaderIcon className="animate-spin" />
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
        <div className="flex flex-col justify-center items-center w-[200px] m-auto mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Resend OTP in {timeformat(timer)}
          </p>
          <Button
            disabled={!canResend}
            onClick={resendOtpHandler}
            className="cursor-pointer"
          >
            Resend OTP
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Verify;
