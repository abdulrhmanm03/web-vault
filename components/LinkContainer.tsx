"use client";

import Image from "next/image";

interface LinkContainerProps {
  title: string;
  image: string;
  url: string;
}

export default function LinkContainer({
  title,
  image,
  url,
}: LinkContainerProps) {
  return (
    <div
      key={title}
      className="group max-h-[220px] rounded-lg m-4 w-72 h-48 overflow-hidden relative cursor-pointer"
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
    >
      <Image
        width={300}
        height={100}
        className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover transition-transform duration-300 group-hover:scale-110"
        src={image}
        alt={title}
      />
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <span className="text-white text-sm font-semibold">{title}</span>
      </div>
    </div>
  );
}
