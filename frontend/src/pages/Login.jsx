import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/context/UserContext";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [checkloading, setcheckloading] = useState(false)

  function testLoading() {
    setcheckloading(true)
    setTimeout(() => {
      setcheckloading(false)
    }, 3000);
  }

  const navigate = useNavigate();

  const { loginUser, btnLoading } = UserData();

const submitHandler = () => {
  loginUser(email, navigate)
}

  return (
    <div className="min-h-[60vh]">
      <Card className="sm:w-[300px] md:w-[400px] m-auto mt-5">
        <CardHeader>
          <CardTitle>Enter email to get otp</CardTitle>
          <CardDescription>
            if you already got otp then you can directly go to otp tab
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-x-1">
            <Label className="mb-2.5">Enter Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
            <Button onClick={submitHandler} disabled={btnLoading} > {btnLoading ? <LoaderIcon/>  : 'Submit'} </Button>
          <button>{ btnLoading ? <LoaderIcon/>  : 'Submit'}</button>
        </CardFooter>
      </Card>

      {/* <div onClick={testLoading} > {checkloading ? <p>Loading...</p> : <p>Click to test loading</p>} </div>
      <button onClick={testLoading} disabled={checkloading} > {checkloading ? <LoaderIcon/>  : 'Test Loading'} </button> */}
      <Button onClick={testLoading} disabled={checkloading} > {checkloading ? <LoaderIcon/>  : 'Test Loading'} </Button>
    </div>
  );
};

export default Login;
