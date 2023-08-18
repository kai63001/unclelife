import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage404 = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
      <p className="text-lg mb-8">
        The page you{"'"}re looking for doesn{"'"}t exist.
      </p>
      <Button asChild>
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage404;
