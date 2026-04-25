import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-[60%] m-auto flex flex-col justify-center items-center">
      <img src="/images/notFound.png" alt="not found" />
      <Link to={"/"}>
        {" "}
        <Button variant="ghost" className='mb-8'>
          {" "}
          Go to <Home /> page{" "}
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
