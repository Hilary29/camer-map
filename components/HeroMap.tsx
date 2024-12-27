"use client";

import dynamic from "next/dynamic";
/* import { CircleChart } from "./CircleChart";
import { HorizontalChart } from "./HorizontalChart"; */
import TabChart from "./TabChart";


const Map = dynamic(() => import("./Map"), { ssr: false });



export default function HeroMap() {

  return (
    <section id="HeroMap">
      <div className=" bg-[url('/img/font.png')] bg-cover bg-center min-h-screen flex flex-col ">
        <div className="mx-24 mt-16 text-black rounded-lg">
          <div className="text-black rounded-lg flex gap-2">
            <div className="text-white flex-1 basis-4/5 bg-[#ffffff16]  rounded-md p-4">
              <div className="w-full h-[600px]">
                <Map/> 
              </div>
            </div>
            <div className="">
            <TabChart/>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
