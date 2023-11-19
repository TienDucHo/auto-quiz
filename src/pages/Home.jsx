//#region import
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//#region images
import HeroImage from "../assets/hero.svg";
import WhatDoWeDo from "../assets/what_do_we_do.svg";
import Thea from "../assets/thea.png";
import Duc from "../assets/duc.png";
import Khanh from "../assets/khanh.png";
import WhatDoWeWant from "../assets/what_do_we_want.svg";
//#endregion
import { node, string } from "prop-types";
import { Button } from "../components/Button";
import { FaCoffee } from "react-icons/fa";
import AppLogo from "../components/AppLogo";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
//#endregion

//#region data
const devs = [
  {
    name: "Thea Nguyen",
    imageSource: Thea,
  },
  {
    name: "Duc Ho",
    imageSource: Duc,
  },
  {
    name: "Khanh Bui",
    imageSource: Khanh,
  },
];

const sections = [
  {
    title: "What do we do?",
    body: (
      <div className="text-white px-12 flex flex-col text-center gap-y-8 lg:text-start lg:flex-row justify-between items-center">
        <img
          className="w-[20rem] lg:w-[28rem]"
          src={WhatDoWeDo}
          alt="What do we do?"
        />
        <p className="max-w-[20rem] text-lg lg:text-xl">
          Simply upload your PDFs, and let{" "}
          <span className="font-bold">
            Auto
            <span className="text-accent"> Quiz </span>
          </span>{" "}
          weave them into interactive review sessions
        </p>
      </div>
    ),
  },
  {
    title: "Who are we?",
    body: (
      <div className="text-white flex flex-col gap-12 justify-between items-center">
        <p className="max-w-[24rem] text-center text-lg lg:text-xl">
          We are three students who are too tired during our Midterm
          season, and wish there was something like{" "}
          <span className="font-bold">
            Auto
            <span className="text-accent"> Quiz </span>
          </span>{" "}
        </p>
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center w-full">
          {devs.map((elem, id) => {
            return (
              <AvatarCard
                key={id}
                name={elem.name}
                imageSource={elem.imageSource}
              />
            );
          })}
        </div>
      </div>
    ),
  },
  {
    title: "What do we want?",
    body: (
      <div className="flex flex-col gap-12">
        <img
          className="h-[18rem] md:h-[20rem]"
          src={WhatDoWeWant}
          alt="What do we want?"
        />
        <div className="flex flex-col justify-center items-center gap-4 pt-4">
          <Button
            text="Buy us a Coffee"
            style="primary"
            textStyle="bold"
            icon={<FaCoffee />}
            onClick={() => {}}
          />
          <span className="opacity-70">We appreciate it</span>
        </div>
      </div>
    ),
  },
];
//#endregion

//#region components
AvatarCard.propTypes = {
  name: string,
  imageSource: string,
};

function AvatarCard({ name, imageSource }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-[12rem] h-[12rem] lg:w-[16rem] lg:h-[16.5rem] relative bg-secondary rounded-2xl">
        <img
          className="object-cover absolute bottom-0"
          src={imageSource}
          alt={name}
        />
      </div>
      <h3 className="font-bold text-xl lg:text-2xl">{name}</h3>
    </div>
  );
}

Section.propTypes = {
  title: string,
  body: node,
};

function Section({ title, body }) {
  let boldText = title.split(" ")[0];
  let firstSpaceIndex = title.indexOf(" ");
  let remainingText = title.substr(firstSpaceIndex + 1);

  return (
    <div className="flex flex-col gap-12 justify- items-center">
      <h1 className="text-secondary text-4xl font-bold">
        <span className="text-accent">{boldText}</span>{" "}
        {remainingText}
      </h1>
      {body}
    </div>
  );
}
//#endregion

let isMobile = window.innerWidth < 680 ? true : false;

export default function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [, setWindowWith] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWindowWith(window.innerWidth);
    isMobile = window.innerWidth < 680 ? true : false;
  };
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (duration) => {
      return {
        pathLength: 1.5,
        opacity: 1,
        transition: {
          pathLength: {
            type: "spring",
            duration: duration,
            bounce: 0,
          },
          opacity: { duration: 0.01 },
        },
      };
    },
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, navigate, loading]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    !loading && (
      <div className="bg-black text-white flex flex-col items-center gap-12 py-8 md:py-12">
        {/* Nav Bar */}
        <nav className="px-8 pb-8 w-full flex justify-between lg:px-12">
          <AppLogo variant={"light"} />
          <Link
            to="/sign-in"
            className="font-medium hover:text-secondary transitions duration-300 ease-in-out text-lg lg:text-xl"
          >
            Sign In
          </Link>
        </nav>

        {/* Hero */}
        <div className="relative md:static p-4 lg:p-12 min-h-[24rem] flex flex-col md:flex-row md:h-[24rem] justify-center items-center md:justify-between w-full bg-secondary text-black ">
          {/* Hero Text */}
          <motion.div
            className="absolute p-4 md:p-0 left-0 my-auto z-1 md:static md:w-[28rem] flex flex-col gap-4 items-center md:items-start"
            initial={{ opacity: 0, x: -20, zIndex: 0 }}
            animate={{ opacity: 1, x: 0, zIndex: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold">
              Auto <span className="text-accent"> Quiz </span>
            </h1>
            <p className="opacity-70 text-lg text-center md:text-left lg:text-xl">
              Say farewell to manual quiz creation and hello to
              effortless learning. Our website auto-generates quizzes
              from PDFs, making knowledge assessment a breeze
            </p>
          </motion.div>
          {/* Hero Image */}
          <motion.img
            className="absolute md:static top-0 left-0 z-0 w-full opacity-[16%] md:w-[20rem] h-full md:opacity-100 object-contain md:object-fill lg:w-[28rem]"
            src={HeroImage}
            alt="Hero"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: !isMobile ? 1 : 0.1,
              x: 0,
            }}
            transition={{ duration: 1 }}
          />
        </div>

        {sections.map((elem, id) => {
          return (
            <div
              key={id}
              className="flex flex-col items-center gap-y-4 md:gap-y-8"
            >
              <motion.svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.line
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  stroke="#CBD8DF"
                  variants={draw}
                  strokeWidth={2}
                  custom={5}
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="6"
                  stroke="#CBD8DF"
                  fill="#141E26"
                  strokeWidth={2}
                  variants={draw}
                  custom={2}
                />
              </motion.svg>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Section title={elem.title} body={elem.body} />
              </motion.div>
            </div>
          );
        })}
      </div>
    )
  );
}
