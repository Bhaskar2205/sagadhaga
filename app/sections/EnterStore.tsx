"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ThreadLoader from "../components/ThreadLoader";

export default function EnterStore() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    setLoading(true);

    setTimeout(() => {
      router.push("/shop");
    }, 1200); // animation duration
  };

  return (
    <>
      {loading && <ThreadLoader />}

      <section className="h-screen bg-black text-white flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-5xl tracking-widest mb-10">
            ENTER THE WORLD OF SAGADHAGA
          </h2>

          <button
            onClick={handleEnter}
            className="border border-white px-10 py-4 tracking-widest hover:bg-white hover:text-black transition"
          >
            ENTER STORE
          </button>

        </div>

      </section>
    </>
  );
}