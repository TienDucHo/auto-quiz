// import { useLoaderData } from "react-router";
import { NavBar } from "../components/NavBar";

const NewAttempt = () => {
    // const { name } = useLoaderData();
    const quizName = "French"

    return <div className="h-screen  p-12 flex flex-col">
        <NavBar />
        <div className="grid lg:grid-cols-2 w-full h-full place-items-center gap-y-16">
            <div className="flex flex-col gap-y-4 self-end lg:self-center">
                <p className="text-accent font-medium texy-xl lg:text-2xl">{quizName}</p>
                <p className="text-secondary text-4xl lg:text-5xl">New Attempt</p>
                <p className="text-white opacity-70 text-xl lg:text-2xl">Why settle for anything less than an actual quiz to evaluate your understanding?</p>
            </div>
            <div className="text-secondary lg:pl-[20%] w-full flex flex-col gap-y-6 md:gap-y-8 self-start lg:self-center items-center self-justify-end text-lg lg:text-xl">
                <input type="text" placeholder="Number of Questions" className="bg-black w-full text-white outline-none border-2 border-dotted border-secondary px-8 py-3 rounded-2xl" />
                <input type="text" placeholder="Number of Questions" className="bg-black w-full text-white outline-none border-2 border-dotted border-secondary px-8 py-3 rounded-2xl" />
                <div className="flex justify-between w-full gap-x-6 md:gap-x-8">
                    {/* icon, text, onClick, style, textStyle, className */}
                    <button className="w-full rounded-2xl border border-secondary py-3 px-8">Cancel</button>
                    <button className="w-full rounded-2xl bg-secondary text-black py-3 px-8">Create</button>
                </div>
            </div>
        </div>
    </div>
}

export default NewAttempt;