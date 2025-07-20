"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Allfile = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/video");
      console.log(data);
      setDatas(data);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {datas?.map((v) => (
        <div key={v?._id} className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-xl transition-all duration-300">
          <div className="relative w-full h-60">
            <Image
              src={v?.thumbnailUrl.startsWith("http") ? v.thumbnailUrl : `https://${v.thumbnailUrl}`}
              layout="fill"
              objectFit="cover"
              alt={v?.title}
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 truncate">{v?.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{v?.description}</p>
            {v?.videoUrl?.startsWith("http") && (
              <a
                href={v.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Watch Video ↗
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allfile;
