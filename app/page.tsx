"use client"
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <> 
      {/* full div */}
      <section className="max-w-screen-3xl px-4 bg-white min-h-screen">
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
        <div className="max-w-screen-md mx-auto pt-20">
          <p className="text-xl pb-[10px]">Apple Watch Studio</p>
          <h1 className="text-3xl sm:text-6xl font-semibold leading-tight">Choose a case.</h1>
          <h1 className="text-3xl sm:text-6xl font-semibold leading-tight">Pick a band.</h1>
          <h1 className="text-3xl sm:text-6xl font-semibold leading-tight">Create your own style.</h1>
          <button 
            className="rounded-3xl bg-[#0076df] hover:bg-[#0077dff6] px-7 py-3 mt-[43px] text-white"
            aria-label="Get started with Apple Watch Studio">
            Get started
          </button>
          <div className="relative w-full">
            <Image
              src="/assets/images/strap-cover.jpeg"
              width={850}
              height={850}
              alt="Strap Cover"
              className="absolute top-0 left-0"
              priority
            />
            <Image
              src="/assets/images/watch-front.png"
              width={850}
              height={850}
              alt="Watch Front"
              className="absolute top-0 left-0"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}