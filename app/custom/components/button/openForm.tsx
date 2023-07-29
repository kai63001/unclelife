"use client";
import { useAppSelector } from "@/app/redux/hook";
import Link from "next/link";
import { FileSymlink } from "lucide-react";
import {Button} from "@/components/ui/button";

const OpenFormBtn = () => {
  const { infomation } = useAppSelector((state) => state.formReducer);

  return infomation?.id ? (
    <Link
      href={`${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${infomation.id}`}
      target="_blank"
      className="rounded-md shadow-me font-medium flex items-center"
    >
      <Button className={'bg-background px-5 py-3 rounded-md shadow-me font-medium flex items-center h-12 border-0 text-md'} variant="outline">
        <FileSymlink className="mr-2 h-4 w-4" /> Open Form
      </Button>
    </Link>
  ) : (
    <div className="bg-background text-gray-600 px-5 py-3 rounded-md shadow-me font-medium cursor-not-allowed flex items-center">
      <FileSymlink className="mr-2 h-4 w-4" /> Open Form
    </div>
  );
};

export default OpenFormBtn;
