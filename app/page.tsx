"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { watchData } from './data/data';

export default function Home() {
  const [isGetStarted, setIsGetStarted] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);
  const [isSideView, setIsSideView] = useState(false);
  const [isSizeButtonsSelected, setIsSizeButtonsSelected] = useState(false);
  const [isCaseButtonsSelected, setIsCaseButtonsSelected] = useState(false);
  const [isBandButtonsSelected, setIsBandButtonsSelected] = useState(false);
  const [isWatchCollectionsOpen, setIsWatchCollectionsOpen] = useState(false);
  const [allWatchData, setAllWatchData] = useState(watchData);
  const [selectedSize, setSelectedSize] = useState(allWatchData[0].size[0]);
  const [selectedCase, setSelectedCase] = useState(allWatchData[0].case[0]);
  const [selectedPrice, setSelectedPrice] = useState(allWatchData[0].price[0]);
  const [selectedBand, setSelectedBand] = useState(allWatchData[0].band[0]);
  const [collectionsData, setCollectionsData] = useState<{ name: string; index: number }[]>([]);
  const [watch, setWatchData] = useState(watchData[0]);
  const { name, size, frontView, sideView, band, price } = watch;
  const sizeOptions = ['42mm', '46mm'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : sizeOptions.length - 1;
      setSelectedSize(sizeOptions[newIndex]);
      setSelectedPrice(price[newIndex]);
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < sizeOptions.length - 1 ? prevIndex + 1 : 0;
      setSelectedSize(sizeOptions[newIndex]);
      setSelectedPrice(price[newIndex]);
      return newIndex;
    });
  };

  const handleGetStarted = () => {
    setAnimateImage(true);
    setTimeout(() => {
      setIsGetStarted(true);
    }, 200); // Delay to allow animation to complete
  };

  const convertToSlug = (str) => {
    return str.toLowerCase().replace(/\s+/g, '-');
  }

  const handleChangeData = (index: number) => {
    setWatchData(watchData[index]);
    setSelectedSize(watchData[index].size[0]);
    setSelectedCase(watchData[index].case[0]);
    setSelectedPrice(watchData[index].price[0]);
    setSelectedBand(watchData[index].band[0]);
    setIsWatchCollectionsOpen(!isWatchCollectionsOpen);
  };

  const handleOverlayClick = (e) => {
    // Close the modal if the overlay is clicked
    if (e.target === e.currentTarget) {
      setIsWatchCollectionsOpen(!isWatchCollectionsOpen);
    }
  };

  const handleSave = () => {
    const watchId = watch.id; // Get the selected watch ID
    const sizeIndex = watch.size.indexOf(selectedSize); // Get the index of the selected size
    const caseIndex = watch.case.indexOf(selectedCase); // Get the index of the selected case
    const bandIndex = watch.band.indexOf(selectedBand); // Get the index of the selected band
  
    // Construct the URL with indexes
    const url = `${window.location.origin}/?id=${watchId}&sizeIndex=${sizeIndex}&caseIndex=${caseIndex}&bandIndex=${bandIndex}`;
    
    // Update the URL without reloading
    window.history.pushState({}, '', url);
    console.log("Saved URL:", url);
  };

  useEffect(() => {
    const assignCollectionsData = () => {
      const data = allWatchData.map((item, index) => ({
        name: item.name,
        index: index,
      }));
      setCollectionsData(data);
    };
    assignCollectionsData();
  }, [allWatchData]);

  useEffect(() => {
    const loadCustomizedWatch = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      const sizeIndex = urlParams.get('sizeIndex'); // Expecting size index in the URL
      const caseIndex = urlParams.get('caseIndex'); // Expecting case index in the URL
      const bandIndex = urlParams.get('bandIndex'); // Expecting band index in the URL
    
      // Check if all required parameters are present
      if (!id || sizeIndex === null || caseIndex === null || bandIndex === null) {
        console.log("Missing parameters:", { id, sizeIndex, caseIndex, bandIndex });
        return; // Exit early if any parameter is missing
      }
    
      // Find the watch by ID
      const watch = watchData.find(watch => watch.id === Number(id));
      if (!watch) {
        console.log("Watch not found for ID:", id);
        // Reset URL and reload if invalid
        window.history.replaceState({}, '', '/');
        window.location.reload();
        return;
      }
    
      // Set the selected watch
      setWatchData(watch);
    
      // Validate size index
      const sizeIndexNum = Number(sizeIndex);
      if (sizeIndexNum >= 0 && sizeIndexNum < watch.size.length) {
        setSelectedSize(watch.size[sizeIndexNum]);
      } else {
        console.log("Invalid size index:", sizeIndex);
        window.history.replaceState({}, '', '/');
        window.location.reload();
        return;
      }
    
      // Validate case index
      const caseIndexNum = Number(caseIndex);
      if (caseIndexNum >= 0 && caseIndexNum < watch.case.length) {
        setSelectedCase(watch.case[caseIndexNum]);
      } else {
        console.log("Invalid case index:", caseIndex);
        window.history.replaceState({}, '', '/');
        window.location.reload();
        return;
      }
    
      // Validate band index
      const bandIndexNum = Number(bandIndex);
      if (bandIndexNum >= 0 && bandIndexNum < watch.band.length) {
        setSelectedBand(watch.band[bandIndexNum]);
      } else {
        console.log("Invalid band index:", bandIndex);
        window.history.replaceState({}, '', '/');
        window.location.reload();
        return;
      }
      handleGetStarted();
    };

    loadCustomizedWatch();
  }, []); // Run once on mount

  return (
    <>
      {/* full div */}
      <section className="max-w-screen-3xl px-4 bg-white min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center items-center">
          {/* Logo Section */}
          <div className="w-full px-0 sm:px-6 my-4 flex justify-center sm:justify-start">
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

          {isGetStarted && (
            <div className="w-full my-4 sm:my-9 grid grid-cols-2 gap-4">
              <div className="w-full sm:w-auto">
                <button className="w-full sm:w-auto" onClick={() => setIsWatchCollectionsOpen(!isWatchCollectionsOpen)}>
                  <span className="text-xl flex">Collections
                    <Image
                      src="/assets/svg/down-chevron.svg"
                      width={28}
                      height={28}
                      alt="Chevron Right"
                      className="px-2" />
                  </span>
                </button>
              </div>
              <div className="w-full sm:w-auto text-end">
                <button
                  className="rounded-3xl bg-[#0076df] hover:bg-[#0077dff6] text-white px-5 py-2 w-full sm:w-auto"
                  aria-label="Save"
                  onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {isGetStarted ? (
          <>
            <div className="grid-cols-1 justify-items-center">
              {/* Multiple Images displayed for selected size */}
              {isSizeButtonsSelected ? (
                <div className="w-full relative flex flex-nowrap gap-4 justify-center items-center overflow-x-auto">
                  {/* Left Button */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-0 z-10 bg-gray-300 rounded-3xl w-12 h-12 p-2"
                  >
                    <Image
                      src="/assets/svg/chevron-left.svg"
                      width={32}
                      height={32}
                      alt="Chevron Left"
                      className="w-full pr-1" />
                  </button>
                  {/* Render all available images */}
                  {sizeOptions.map((sizeOption, index) => (
                    <div
                      key={sizeOption}
                      className={`w-full max-w-xs md:max-w-md h-80 md:h-[448px] relative ${selectedSize === sizeOption ? 'border-blue-400 border-2' : ''
                        }`}
                      ref={(el) => {
                        if (selectedSize === sizeOption && el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                        }
                      }}
                    >
                      <div className="relative">
                        {/* Side View (Conditional Rendering) */}
                        {isSideView && selectedSize === sizeOption ? (
                          <Image
                            src={`${sideView[sizeOption]}-${convertToSlug(selectedBand)}.jpeg`}
                            width={1000}
                            height={1000}
                            alt={`${sizeOption} Side View`}
                            className="absolute top-0 left-0"
                            priority
                          />
                        ) : (
                          <>
                            {/* Front View */}
                            <Image
                              src={`${frontView[sizeOption][1]}-${convertToSlug(selectedBand)}.jpeg`}
                              width={1000}
                              height={1000}
                              alt={`${sizeOption} Front View`}
                              className="absolute top-0 left-0"
                              priority
                            />
                            {/* Back View */}
                            <Image
                              src={`${frontView[sizeOption][0]}-${selectedCase}.png`}
                              width={1000}
                              height={1000}
                              alt={`${sizeOption} Back View`}
                              className="absolute top-0 left-0"
                              priority
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Right Button */}
                  <button
                    onClick={handleNext}
                    className="absolute right-0 z-10 bg-gray-300 rounded-3xl w-12 h-12 p-2"
                  >
                    <Image
                      src="/assets/svg/chevron-right.svg"
                      width={26}
                      height={26}
                      alt="Chevron Right"
                      className="w-full px-2" />
                  </button>
                </div>
              ) : (
                <div
                  className={`w-full h-80 max-w-xs md:h-[448px] md:max-w-md ${animateImage ? 'animate-up' : ''
                    }`}
                >
                  <div className="relative">
                    {/* Render only the selected image */}
                    {isSideView ? (
                      <Image
                        src={`${sideView[selectedSize]}-${convertToSlug(selectedBand)}.jpeg`}
                        width={1000}
                        height={1000}
                        alt="Side View"
                        priority
                      />
                    ) : (
                      <>
                        <Image
                          src={`${frontView[selectedSize][1]}-${convertToSlug(selectedBand)}.jpeg`}
                          width={1000}
                          height={1000}
                          alt="Back View"
                          className="absolute top-0 left-0"
                          priority
                        />
                        <Image
                          src={`${frontView[selectedSize][0]}-${selectedCase.toLowerCase()}.png`}
                          width={1000}
                          height={1000}
                          alt="Front View"
                          className="absolute top-0 left-0"
                          priority
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={() => setIsSideView(!isSideView)}
                className="text-blue-600 underline">{isSideView ? 'Front View' : 'Side View'}</button>
            </div>

            <div className="text-center pt-5 pb-16">
              <p className="text-[#6e6e73] text-[12px] uppercase font-semibold">{name}</p>
              <p className="text-[#1d1d1f] font-semibold">
                {selectedSize} Jet Black {selectedCase} Case with {selectedBand}
              </p>
              <p>From ${selectedPrice}</p>
            </div>

            {/* Size selection buttons */}
            <div className="w-full">
              <div className="flex flex-row justify-center gap-4">
                {isSizeButtonsSelected ? (
                  <div className="rounded-3xl text-[17px] flex bg-[#E8E8ED] px-5 py-2">
                    <button onClick={() => setIsSizeButtonsSelected(!isSizeButtonsSelected)}>
                      <svg height="25" viewBox="0 0 19 25" width="19" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h19v25h-19z" fill="none"></path><path d="m18.25 9.038v1.7427c0 .2972-.0833.5382-.25.7227-.1665.1847-.385.277-.6553.277h-.3447v5.1904c0 2.2253-1.804 4.0293-4.0293 4.0293h-2.3643c.3291-.2865.6082-.6216.8301-1h1.5342c1.6704 0 3.0293-1.3589 3.0293-3.0293v-8.9414c0-1.6704-1.3589-3.0293-3.0293-3.0293h-6.9414c-1.3074 0-2.4136.8372-2.8372 2h-.1748c-.3113 0-.6113.0437-.9026.1111.417-1.781 2.0063-3.1111 3.9146-3.1111h6.9414c2.2253 0 4.0293 1.804 4.0293 4.0293v.0225h.3447c.2703 0 .4888.0902.6553.2703.1667.1803.25.4187.25.7159zm-7.25 8.9447c0 1.6664-1.3508 3.0173-3.0173 3.0173h-4.9654c-1.6665 0-3.0173-1.351-3.0173-3.0173v-6.9653c0-1.6664 1.3508-3.0173 3.0173-3.0173h4.9653c1.6665 0 3.0173 1.351 3.0173 3.0173v.1215h.3076c.2068 0 .3738.069.5012.2067.1274.1379.1912.3202.1912.5475v1.3326c0 .2273-.0637.4116-.1912.5526-.1274.1412-.2944.2118-.5012.2118h-.3076v3.9927zm-1-6.9653c0-1.1123-.905-2.0173-2.0173-2.0173h-4.9654c-.0059 0-.0115.0017-.0173.0017-.366.0032-.7048.1096-1 .2837-.5952.3511-1 .9922-1 1.7319v6.9653c0 1.1123.905 2.0173 2.0173 2.0173h4.9653c1.1123 0 2.0173-.905 2.0173-2.0173v-6.9653z" fill="#1d1d1f"></path></svg>
                    </button>
                    {watch.size.map((item, index) => (
                      <>
                        <button key={index}
                          onClick={() => { setSelectedSize(item); setSelectedPrice(price[index]) }}
                        >
                          <span className={`px-2 ${selectedSize === item ? 'font-bold' : ''}`}>{item}</span>
                        </button>
                      </>
                    ))}
                  </div>
                ) : (
                  <button className="rounded-3xl text-[17px] flex bg-[#E8E8ED] px-5 py-2" onClick={() => setIsSizeButtonsSelected(!isSizeButtonsSelected)}>
                    <svg height="25" viewBox="0 0 19 25" width="19" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h19v25h-19z" fill="none"></path><path d="m18.25 9.038v1.7427c0 .2972-.0833.5382-.25.7227-.1665.1847-.385.277-.6553.277h-.3447v5.1904c0 2.2253-1.804 4.0293-4.0293 4.0293h-2.3643c.3291-.2865.6082-.6216.8301-1h1.5342c1.6704 0 3.0293-1.3589 3.0293-3.0293v-8.9414c0-1.6704-1.3589-3.0293-3.0293-3.0293h-6.9414c-1.3074 0-2.4136.8372-2.8372 2h-.1748c-.3113 0-.6113.0437-.9026.1111.417-1.781 2.0063-3.1111 3.9146-3.1111h6.9414c2.2253 0 4.0293 1.804 4.0293 4.0293v.0225h.3447c.2703 0 .4888.0902.6553.2703.1667.1803.25.4187.25.7159zm-7.25 8.9447c0 1.6664-1.3508 3.0173-3.0173 3.0173h-4.9654c-1.6665 0-3.0173-1.351-3.0173-3.0173v-6.9653c0-1.6664 1.3508-3.0173 3.0173-3.0173h4.9653c1.6665 0 3.0173 1.351 3.0173 3.0173v.1215h.3076c.2068 0 .3738.069.5012.2067.1274.1379.1912.3202.1912.5475v1.3326c0 .2273-.0637.4116-.1912.5526-.1274.1412-.2944.2118-.5012.2118h-.3076v3.9927zm-1-6.9653c0-1.1123-.905-2.0173-2.0173-2.0173h-4.9654c-.0059 0-.0115.0017-.0173.0017-.366.0032-.7048.1096-1 .2837-.5952.3511-1 .9922-1 1.7319v6.9653c0 1.1123.905 2.0173 2.0173 2.0173h4.9653c1.1123 0 2.0173-.905 2.0173-2.0173v-6.9653z" fill="#1d1d1f"></path></svg>
                    <span className="px-2">Size</span>
                  </button>
                )}

                {isCaseButtonsSelected ? (
                  <>
                    <div className="rounded-3xl  text-[17px] flex bg-[#E8E8ED] px-5 py-2">
                      <button onClick={() => setIsCaseButtonsSelected(!isCaseButtonsSelected)}>
                        <svg height="25" viewBox="0 0 17 25" width="17" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h17v25h-17z" fill="none"></path><path d="m16 8.2017c-.1665-.1801-.385-.2703-.6553-.2703h-.3447v-.0225c0-2.2253-1.804-4.0293-4.0293-4.0293h-6.9414c-2.2253.0001-4.0293 1.804-4.0293 4.0294v8.9414c0 2.2253 1.804 4.0293 4.0293 4.0293h6.9414c2.2253 0 4.0293-1.804 4.0293-4.0293v-5.1904h.3447c.2703 0 .4888-.0923.6553-.277.1667-.1844.25-.4254.25-.7227v-1.7427c0-.2972-.0833-.5356-.25-.7159zm-2 8.6487c0 1.6704-1.3589 3.0293-3.0293 3.0293h-6.9414c-1.6704 0-3.0293-1.3589-3.0293-3.0293v-8.9414c0-1.6704 1.3589-3.0293 3.0293-3.0293h6.9414c1.6704 0 3.0293 1.3589 3.0293 3.0293z" fill="#1d1d1f"></path></svg>
                      </button>
                      {watch.case.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => { setSelectedCase(item); setSelectedPrice(price[index]) }}
                        >
                          <span className={`px-2 ${selectedCase === item ? 'font-bold' : ''}`}>{item}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button className="rounded-3xl text-[17px] flex bg-[#E8E8ED] px-5 py-2" onClick={() => {
                      setTimeout(() => {
                        setIsCaseButtonsSelected(!isCaseButtonsSelected);
                      }, 200);
                    }}>
                      <svg height="25" viewBox="0 0 17 25" width="17" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h17v25h-17z" fill="none"></path><path d="m16 8.2017c-.1665-.1801-.385-.2703-.6553-.2703h-.3447v-.0225c0-2.2253-1.804-4.0293-4.0293-4.0293h-6.9414c-2.2253.0001-4.0293 1.804-4.0293 4.0294v8.9414c0 2.2253 1.804 4.0293 4.0293 4.0293h6.9414c2.2253 0 4.0293-1.804 4.0293-4.0293v-5.1904h.3447c.2703 0 .4888-.0923.6553-.277.1667-.1844.25-.4254.25-.7227v-1.7427c0-.2972-.0833-.5356-.25-.7159zm-2 8.6487c0 1.6704-1.3589 3.0293-3.0293 3.0293h-6.9414c-1.6704 0-3.0293-1.3589-3.0293-3.0293v-8.9414c0-1.6704 1.3589-3.0293 3.0293-3.0293h6.9414c1.6704 0 3.0293 1.3589 3.0293 3.0293z" fill="#1d1d1f"></path></svg>
                      <span className="px-2">Case</span>
                    </button>
                  </>
                )}

                {isBandButtonsSelected ? (
                  <>
                    <div className="rounded-3xl text-[17px] flex bg-[#E8E8ED] px-5 py-2">
                      <button onClick={() => setIsBandButtonsSelected(!isBandButtonsSelected)}>
                        <svg height="25" viewBox="0 0 10 25" width="10" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h10v25h-10z" fill="none"></path><path d="m9.5 22.5a.5.5 0 0 1 -.5.5h-8a.5.5 0 1 1 0-1h.015a.485.485 0 0 0 .485-.485v-6.2216a4.5231 4.5231 0 0 0 1 .9448v5.2768a1.4779 1.4779 0 0 1 -.0813.485h5.1627a1.4758 1.4758 0 0 1 -.0814-.485v-5.2768a4.5209 4.5209 0 0 0 1-.9448v6.2216a.4851.4851 0 0 0 .4851.485h.0149a.5.5 0 0 1 .5.5zm-1.9194-19.5h-5.1621a1.4732 1.4732 0 0 1 .0815.485v9.015a2.5 2.5 0 0 0 5 0v-9.015a1.4873 1.4873 0 0 1 .0806-.485m1.4194-1a.5.5 0 0 1 .5.5.5.5 0 0 1 -.5.5h-.015a.485.485 0 0 0 -.485.485v9.015a3.5 3.5 0 0 1 -3.5 3.5 3.5 3.5 0 0 1 -3.5-3.5v-9.015a.485.485 0 0 0 -.485-.485h-.015a.5.5 0 0 1 0-1zm-3.2179 10.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75zm0-2.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75zm0-2.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75z" fill="#1d1d1f"></path></svg>
                      </button>
                      {watch.band.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => { setSelectedBand(item); setSelectedPrice(price[index]) }}>
                          <span className={`px-2 ${selectedBand === item ? 'font-bold' : ''}`}>{item}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button className="rounded-3xl text-[17px] flex bg-[#E8E8ED] px-5 py-2" onClick={() => setIsBandButtonsSelected(!isBandButtonsSelected)}>
                      <svg height="25" viewBox="0 0 10 25" width="10" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h10v25h-10z" fill="none"></path><path d="m9.5 22.5a.5.5 0 0 1 -.5.5h-8a.5.5 0 1 1 0-1h.015a.485.485 0 0 0 .485-.485v-6.2216a4.5231 4.5231 0 0 0 1 .9448v5.2768a1.4779 1.4779 0 0 1 -.0813.485h5.1627a1.4758 1.4758 0 0 1 -.0814-.485v-5.2768a4.5209 4.5209 0 0 0 1-.9448v6.2216a.4851.4851 0 0 0 .4851.485h.0149a.5.5 0 0 1 .5.5zm-1.9194-19.5h-5.1621a1.4732 1.4732 0 0 1 .0815.485v9.015a2.5 2.5 0 0 0 5 0v-9.015a1.4873 1.4873 0 0 1 .0806-.485m1.4194-1a.5.5 0 0 1 .5.5.5.5 0 0 1 -.5.5h-.015a.485.485 0 0 0 -.485.485v9.015a3.5 3.5 0 0 1 -3.5 3.5 3.5 3.5 0 0 1 -3.5-3.5v-9.015a.485.485 0 0 0 -.485-.485h-.015a.5.5 0 0 1 0-1zm-3.2179 10.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75zm0-2.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75zm0-2.5a.75.75 0 1 0 -.75.75.75.75 0 0 0 .75-.75z" fill="#1d1d1f"></path></svg>
                      <span className="px-2">Band</span>
                    </button>
                  </>
                )}
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
                src="/assets/images/watch-42mm-back.jpeg"
                width={1000}
                height={1000}
                alt="Strap Cover"
                className="absolute top-0 left-0"
                priority
              />
              <Image
                src="/assets/images/watch-42mm-front-aluminium.png"
                width={1000}
                height={1000}
                alt="Watch Front"
                className="absolute top-0 left-0"
                priority
              />
            </div>
          </div>
        )}
        <div className="py-10"></div>
        {isWatchCollectionsOpen && (
          <div
            onClick={handleOverlayClick}
            className="fixed inset-0 flex items-start pt-20 justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center text-xl">
              {collectionsData.map((collection) => (
                <div key={collection.index} className={`border-b pb-2 pt-3 ${collection.index === watch.id ? 'text-gray-400' : ''}`}>
                  <button onClick={() => handleChangeData(collection.index)}>
                    {collection.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section >
    </>
  );
}