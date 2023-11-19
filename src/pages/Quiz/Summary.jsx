import { NavBar } from "../../components/NavBar";
import { Button } from "../../components/Button";
import { FaPlus, FaChevronLeft } from "react-icons/fa6";
import { useLoaderData } from "react-router";
import { bool, string, number, arrayOf, object } from "prop-types";
import { twMerge } from "tailwind-merge";

AttemptRow.propTypes = {
  isHeader: bool,
  index: number,
  attemptName: string,
  attemptScore: string,
  attemptNumQuestions: number,
};

function AttemptRow({
  isHeader,
  index,
  attemptName,
  attemptScore,
  attemptNumQuestions,
}) {
  console.log(index);
  return (
    <ul
      className={twMerge(
        "flex justify-between items-center rounded-2xl px-6 py-4 hover:brightness-125 active:brightness-75",
        isHeader
          ? "border-secondary border-[1px]"
          : index % 2 === 0
          ? "bg-primary text-secondary"
          : "bg-secondary text-primary"
      )}
    >
      <li className="w-20 text-left">
        {isHeader ? "Attempt" : attemptName}
      </li>
      <li className="w-20 text-center">
        {isHeader ? "Score" : attemptScore}
      </li>
      <li className="w-20 text-right">
        {isHeader ? "Questions" : attemptNumQuestions}
      </li>
    </ul>
  );
}

AttemptTable.propTypes = {
  attempts: arrayOf(object),
};

function AttemptTable({ attempts }) {
  return (
    <div className="flex flex-col gap-4">
      <AttemptRow isHeader={true} />
      {attempts.map((elem, id) => {
        return <AttemptRow key={id} index={id} {...elem} />;
      })}
    </div>
  );
}

const attempts = [
  {
    attemptName: "Attempt 1",
    attemptScore: "51%",
    attemptNumQuestions: 10,
  },
  {
    attemptName: "Attempt 3",
    attemptScore: "51%",
    attemptNumQuestions: 10,
  },
  {
    attemptName: "Attempt 4",
    attemptScore: "25%",
    attemptNumQuestions: 5,
  },
  {
    attemptName: "Attempt 5",
    attemptScore: "51%",
    attemptNumQuestions: 10,
  },
];

export default function Summary() {
  const { name } = useLoaderData();
  return (
    <div className="py-4 px-12 min-h-[100dvh] bg-black text-white flex flex-col gap-12">
      {/* Nav Bar */}
      <NavBar />
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Button icon={<FaChevronLeft />} style={"transparent"} />
          <h2 className="text-3xl font-bold text-secondary">
            {name}
          </h2>
        </div>
        <Button
          text={"New Attempt"}
          icon={<FaPlus />}
          style={"secondary"}
        />
      </div>
      {/* Attempt Table */}
      <AttemptTable attempts={attempts} />
    </div>
  );
}
