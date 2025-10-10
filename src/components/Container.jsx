import Footer from "./Footer"

const Container = ({ children }) => {
    return <div className="min-h-screen">
        <div className="relative h-fit hiddenl lg:blockl ">
            <div className="absolute top-0 bg-gradient-to-b to-white from-[#011363] from-40% w-full h-[500px]   md:block hidden">
                <div className="relative w-full h-full">
                    {/* hidden on very large screens */}
                    <img src="/waves-lines.svg" alt="background" className="absolute -top-6 left-0 w-full h-full object-cover blockl 3xl:hiddenl " />
                </div>

            </div>
{/* hidden on mobile */}
            <div className=" relative top-[30px] left-0 md:mx-[30px] rounded-xl overflow-hidden bg-white  z-10">
                <div>
                    {children}
                </div>
            </div>
            <div className="mt-[30px]">
                <Footer />
            </div>
        </div>

        <div className="relative min-h-screen bg-gray-100 flex flex-col gap-4 items-center justify-center lg: hidden">
            <h1 className="text-center text-[35px] font-bold">view on desktop</h1>
            <p className="text-center text-gray-500">view on desktop for the best experience</p>
            <p>mobile view will be available soon</p>
        </div>


    </div>
}

export default Container