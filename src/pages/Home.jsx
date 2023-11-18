//#region import
import { Fragment } from "react";
import { Link } from "react-router-dom";
//#region images
import HeroImage from "../assets/hero.svg";
import Line from "../assets/lines.svg";
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
      <div className="text-white px-12 flex flex-col text-center gap-y-4 lg:text-start lg:flex-row justify-between items-center">
        <img
          className="w-[12rem] lg:w-[28rem]"
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
      <div className="text-white flex flex-col gap-8 justify-between items-center">
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
          className="h-[12rem] md:h-[20rem]"
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

export default function Home() {
  return (
    <div className="bg-black text-white flex flex-col items-center gap-12 py-8 md:py-12">
      {/* Nav Bar */}
      <nav className="px-8 pb-8 w-full flex justify-between lg:px-12">
        <AppLogo />
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

        <div className="absolute p-4 md:p-0 left-0 my-auto z-1 md:static md:w-[28rem] flex flex-col gap-4 items-center md:items-start">
          <h1 className="text-5xl font-bold">
            Auto <span className="text-accent"> Quiz </span>
          </h1>
          <p className="opacity-70 text-lg text-center md:text-left lg:text-xl">
            Say farewell to manual quiz creation and hello to
            effortless learning. Our website auto-generates quizzes
            from PDFs, making knowledge assessment a breeze
          </p>
        </div>
        {/* Hero Image */}
        <img
          className="absolute md:static top-0 left-0 z-0 w-full opacity-[16%] md:w-[20rem] h-full md:opacity-100 object-contain md:object-fill lg:w-[28rem]"
          src={HeroImage}
          alt="Hero"
        />
      </div>

      {sections.map((elem, id) => {
        return (
          <Fragment key={id}>
            <img className="h-[12rem]" src={Line} alt="Line" />
            <Section title={elem.title} body={elem.body} />
          </Fragment>
        );
      })}
    </div>
  );
}