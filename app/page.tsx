"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// import watches from './data/data.json';

// interface Watch {
//   id: number;
//   name: string;
//   case: string;
//   band: string;
//   price: number;
//   image: string;
// }


export default function Home() {
  const [isGetStarted, setIsGetStarted] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);
  const [isSideView, setIsSideView] = useState(false);

  // const { watches, bands } = watchesData;
  // const [selectedCase, setSelectedCase] = useState<string | null>(null);
  // const [selectedBand, setSelectedBand] = useState<string | null>(null);
  // const [filteredWatches, setFilteredWatches] = useState<Watch[]>(watches);


  // const handleCaseChange = (newCase: string) => {
  //   setSelectedCase(newCase);
  //   filterWatches(newCase, selectedBand);
  // };

  // const handleBandChange = (newBand: string) => {
  //   setSelectedBand(newBand);
  //   filterWatches(selectedCase, newBand);
  // };

  // const filterWatches = (caseFilter: string | null, bandFilter: string | null) => {
  //   const filtered = watches.filter(
  //     (watch) =>
  //       (caseFilter ? watch.case === caseFilter : true) &&
  //       (bandFilter ? watch.band === bandFilter : true)
  //   );
  //   setFilteredWatches(filtered);
  // };

  const handleGetStarted = () => {
    setAnimateImage(true);
    setTimeout(() => {
      setIsGetStarted(true);
    }, 200); // Delay to allow animation to complete
  };

  return (
    <>
      {/* full div */}
      <section className="max-w-screen-3xl px-4 bg-white min-h-screen">
        <div className="flex flex-row items-center justify-between">
          <div className="mx-0 sm:mx-6 my-4 sm:my-9">
            <Link href="/">
              <Image
                src="/assets/images/apple-watch-design-studio-logo.jpeg"
                width={100}
                height={30}
                alt="Apple Watch Design Studio Logo"
                priority
              />
            </Link>
          </div>
          <div className="mx-0 sm:mx-6 my-4 sm:my-9">
            <button>
              <span className="text-xl">Collections</span>
            </button>
            {/* <ul>
              {watches.watches.map((watch: Watch) => (
                <li key={watch.id}>
                  <h2>{watch.name}</h2>
                </li>
              ))}
            </ul> */}
          </div>
          <div>
            <button
              className="rounded-3xl bg-[#0076df] hover:bg-[#0077dff6] text-white px-5 py-2"
              aria-label="Get started">
              Save
            </button>
          </div>
        </div>

        {isGetStarted ? (
          <>
            <div className="grid-cols-1 justify-items-center">
              <div className={`w-full h-80 max-w-xs md:h-[448px] md:max-w-md  ${animateImage ? 'animate-up' : ''}`}>
                {isSideView ? (
                  <Image
                    src="/assets/images/side-view.jpeg"
                    width={1000}
                    height={1000}
                    alt="Strap Cover"
                    priority
                  />
                ) : (
                  <>
                    <Image
                      src="/assets/images/strap-cover.jpeg"
                      width={1000}
                      height={1000}
                      alt="Strap Cover"
                      className="absolute top-0 left-0"
                      priority
                    />
                    <Image
                      src="/assets/images/watch-front.png"
                      width={1000}
                      height={1000}
                      alt="Watch Front"
                      className="absolute top-0 left-0"
                      priority
                    />
                  </>
                )}
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={() =>
                  isSideView ?
                    setIsSideView(false)
                    :
                    setIsSideView(true)
                }
                className="text-blue-600 underline">{isSideView ? 'Front View' : 'Side View'}</button>
            </div>

            <div className="text-center pt-5 pb-16">
              <p className="text-[#6e6e73] text-[12px]">APPLE WATCH SERIES 10</p>
              <p className="text-[#1d1d1f] font-semibold">46mm Jet Black Aluminum Case with Black Solo Loop</p>
              <p>From $429</p>
            </div>
            <div className="w-full">
              <div className="flex flex-row justify-center">
                <button className="rounded-3xl text-[17px] flex bg-[#E8E8ED] px-5 py-2">
                  <svg height="25" viewBox="0 0 19 25" width="19" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h19v25h-19z" fill="none"></path><path d="m18.25 9.038v1.7427c0 .2972-.0833.5382-.25.7227-.1665.1847-.385.277-.6553.277h-.3447v5.1904c0 2.2253-1.804 4.0293-4.0293 4.0293h-2.3643c.3291-.2865.6082-.6216.8301-1h1.5342c1.6704 0 3.0293-1.3589 3.0293-3.0293v-8.9414c0-1.6704-1.3589-3.0293-3.0293-3.0293h-6.9414c-1.3074 0-2.4136.8372-2.8372 2h-.1748c-.3113 0-.6113.0437-.9026.1111.417-1.781 2.0063-3.1111 3.9146-3.1111h6.9414c2.2253 0 4.0293 1.804 4.0293 4.0293v.0225h.3447c.2703 0 .4888.0902.6553.2703.1667.1803.25.4187.25.7159zm-7.25 8.9447c0 1.6664-1.3508 3.0173-3.0173 3.0173h-4.9654c-1.6665 0-3.0173-1.351-3.0173-3.0173v-6.9653c0-1.6664 1.3508-3.0173 3.0173-3.0173h4.9653c1.6665 0 3.0173 1.351 3.0173 3.0173v.1215h.3076c.2068 0 .3738.069.5012.2067.1274.1379.1912.3202.1912.5475v1.3326c0 .2273-.0637.4116-.1912.5526-.1274.1412-.2944.2118-.5012.2118h-.3076v3.9927zm-1-6.9653c0-1.1123-.905-2.0173-2.0173-2.0173h-4.9654c-.0059 0-.0115.0017-.0173.0017-.366.0032-.7048.1096-1 .2837-.5952.3511-1 .9922-1 1.7319v6.9653c0 1.1123.905 2.0173 2.0173 2.0173h4.9653c1.1123 0 2.0173-.905 2.0173-2.0173v-6.9653z" fill="#1d1d1f"></path></svg>
                  <span className="px-2">Size</span>
                </button>
                <button className="flex rounded-3xl text-[17px] bg-[#E8E8ED] mx-2 px-5 py-2">
                  <svg height="25" viewBox="0 0 17 25" width="17" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h17v25h-17z" fill="none"></path><path d="m16 8.2017c-.1665-.1801-.385-.2703-.6553-.2703h-.3447v-.0225c0-2.2253-1.804-4.0293-4.0293-4.0293h-6.9414c-2.2253.0001-4.0293 1.804-4.0293 4.0294v8.9414c0 2.2253 1.804 4.0293 4.0293 4.0293h6.9414c2.2253 0 4.0293-1.804 4.0293-4.0293v-5.1904h.3447c.2703 0 .4888-.0923.6553-.277.1667-.1844.25-.4254.25-.7227v-1.7427c0-.2972-.0833-.5356-.25-.7159zm-2 8.6487c0 1.6704-1.3589 3.0293-3.0293 3.0293h-6.9414c-1.6704 0-3.0293-1.3589-3.0293-3.0293v-8.9414c0-1.6704 1.3589-3.0293 3.0293-3.0293h6.9414c1.6704 0 3.0293 1.3589 3.0293 3.0293z" fill="#1d1d1f"></path></svg>
                  <span className="px-2">Case</span>
                </button>
                <button className="flex rounded-3xl text-[17px] bg-[#E8E8ED] px-5 py-2">
                  <svg height="25" viewBox="0 0 10 25" width="10" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h10v25h-10z" fill="none"></path><path d="m9.5 22.5a.5.5 0 0 1 -.5.5h-8a.5.5 0 1 1 0-1h.015a.485.485 0 0 0 .485-.485v-6.2216a4.5231 4.5231 0 0 0 1 .9448v5.2768a1.4779 1.4779 0 0 1 -.0813.485h5.1627a1.4758 1.4758 0 0 1 -.0814-.485v-5.2768a4.5209 4.5209 0 0 0 1-.9448v6.2216a.4851.4851 0 0 0 .4851.485h.0149a.5.5 0 0 1 .5.5zm-1.9194-19.5h-5.1621a1.4732 1.4732 0 0 1 .0815.485v9.015a2.5 2.5 0 0 0 5 0v-9.015a1.4873 1.4873 0 0 1 .0806-.485m1.4194-1a.5.5 0 0 1 .5.5.5.5 0 0 1 -.5.5h-.015a.485.485 0 0 0 -.485.485v9.015a3.5 3.5 0 0 1 -3.5 3.5 3.5 3.5 0 0 1 -3.5-3.5v-9.015a.485.485 0 0 0 -.485-.485h-.015a.5.5 0 0 1 0-1zm-3.2179 10.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75zm0-2.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75zm0-2.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75z" fill="#1d1d1f"></path></svg>
                  <span className="px-2">Band</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-screen-md mx-auto pt-10 sm:pt-16">
            <p className="text-xl pb-[10px]">Apple Watch Studio</p>
            <h1 className="text-[40px] sm:text-6xl font-semibold leading-tight tracking-[-.009em]">Choose a case.</h1>
            <h1 className="text-[40px] sm:text-6xl font-semibold leading-tight tracking-[-.009em]">Pick a band.</h1>
            <h1 className="text-[40px] sm:text-6xl font-semibold leading-tight tracking-[-.009em]">Create your own style.</h1>
            <button
              className="rounded-3xl bg-[#0076df] hover:bg-[#0077dff6] px-7 py-3 mt-[43px] text-white"
              aria-label="Get started"
              onClick={handleGetStarted}>
              Get started
            </button>
            <div className="relative w-full">
              <Image
                src="/assets/images/strap-cover.jpeg"
                width={1000}
                height={1000}
                alt="Strap Cover"
                className="absolute top-0 left-0"
                priority
              />
              <Image
                src="/assets/images/watch-front.png"
                width={1000}
                height={1000}
                alt="Watch Front"
                className="absolute top-0 left-0"
                priority
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
}