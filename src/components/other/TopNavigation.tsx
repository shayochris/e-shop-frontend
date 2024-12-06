"use client";
import React from "react";
import { MdPersonOutline } from "react-icons/md";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useRouter } from "next/navigation";
import { logout } from "@/app/store/features/authSlice";

type PopoverItem = {
  path?: string;
  title: string;
  icon: React.ReactNode;
  show?: boolean;
  onClick?: () => void;
};

export default function TopNavigation() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const popOverItems: PopoverItem[] = [
    {
      path: "/settings",
      title: "Settings",
      icon: <IoSettingsOutline size={20} />,
    },
    {
      path: "/login",
      title: "Login",
      icon: <IoMdLogIn size={20} />,
      show: !tokens,
    },
    {
      path: "/",
      title: "Logout",
      icon: <IoMdLogOut size={20} />,
      show: !!tokens,
      onClick: handleLogout,
    },
  ];

  return (
    <nav className="w-[90%] lg:w-[80%] mx-auto flex items-center justify-between">
      <Link href="/">Logo</Link>
      <div className="flex items-center justify-evenly">
        <Link href="/cart" className="mr-3">
          <FaCartShopping size={20} />
        </Link>
        <Popover>
          <PopoverTrigger>
            <MdPersonOutline className="size-6" />
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1">
            {popOverItems.map((item) => {
              if (item.hasOwnProperty("show") && !item.show) {
                return null;
              }

              if (item.onClick) {
                return (
                  <button
                    key={item.title}
                    className="block p-2 hover:bg-gray-100 rounded-lg flex items-center w-full text-left"
                    onClick={item.onClick}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <small>{item.title}</small>
                  </button>
                );
              }

              return (
                <Link
                  key={item.title}
                  className="block p-2 hover:bg-gray-100 rounded-lg flex items-center w-full text-left"
                  href={item.path || "/"}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <small>{item.title}</small>
                </Link>
              );
            })}
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
