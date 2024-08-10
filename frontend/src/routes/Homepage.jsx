
import Hero from "../components/Hero"
import Box from "../components/Box";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const Category = lazy(() => import("../components/Category"))

//main homepage component
function Homepage() {
  return (
    <>
        <Hero/>
        <div className="bg-white mt-14 pt-24">
          <Suspense fallback={<Loading/>}>
            <Category/>
          </Suspense>
        </div>
    </>
  )
}

export default Homepage