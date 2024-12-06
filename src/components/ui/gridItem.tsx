import React from "react";

type gridItemProps = {
  children: React.ReactNode;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};

export default function GridItem({
  sm = 12,
  md = 12,
  lg = 12,
  xl = 12,
  xxl = 12,
  children,
}: gridItemProps) {
  let style = `col-span-12 `;

  const getGridItemClassName = () => {
    if (sm === 2) style += `sm:col-span-2 `;
    if (sm === 3) style += `sm:col-span-3 `;
    if (sm === 4) style += `sm:col-span-4 `;
    if (sm === 6) style += `sm:col-span-6 `;
    if (sm === 5) style += `sm:col-span-5 `;
    if (sm === 7) style += `sm:col-span-7 `;
    if (sm === 8) style += `sm:col-span-8 `;
    if (sm === 9) style += `sm:col-span-9 `;

    if (md === 2) style += `md:col-span-2 `;
    if (md === 3) style += `md:col-span-3 `;
    if (md === 4) style += `md:col-span-4 `;
    if (md === 5) style += `md:col-span-5 `;
    if (md === 6) style += `md:col-span-6 `;
    if (md === 7) style += `md:col-span-7 `;
    if (md === 8) style += `md:col-span-8 `;
    if (md === 9) style += `md:col-span-9 `;

    if (lg === 2) style += `lg:col-span-2 `;
    if (lg === 3) style += `lg:col-span-3 `;
    if (lg === 4) style += `lg:col-span-4 `;
    if (lg === 5) style += `lg:col-span-5 `;
    if (lg === 6) style += `lg:col-span-6 `;
    if (lg === 8) style += `lg:col-span-8 `;
    if (lg === 7) style += `lg:col-span-7 `;
    if (lg === 9) style += `lg:col-span-9 `;

    if (xl === 3) style += `xl:col-span-3 `;
    if (xl === 4) style += `xl:col-span-4 `;
    if (xl === 5) style += `xl:col-span-5 `;
    if (xl === 6) style += `xl:col-span-6 `;
    if (xl === 7) style += `xl:col-span-7 `;
    if (xl === 8) style += `xl:col-span-8 `;
    if (xl === 9) style += `xl:col-span-9 `;

    if (xxl === 3) style += `2xl:col-span-3 `;
    if (xxl === 4) style += `2xl:col-span-4 `;
    if (xxl === 5) style += `2xl:col-span-5 `;
    if (xxl === 6) style += `2xl:col-span-6 `;
    if (xxl === 7) style += `2xl:col-span-7 `;
    if (xxl === 8) style += `2xl:col-span-8 `;
    if (xxl === 9) style += `2xl:col-span-9 `;
    return style;
  };

  return <div className={`${getGridItemClassName()}`}> {children} </div>;
}
