import Flow, { type FlowStage } from "@/components/Flow";

const STAGES: FlowStage[] = [
  {
    title: "The cycle starts",
    text: "A new cycle opens on its own, or when HR creates one. Overnight, a manager appraisal is added for each active employee.",
    actors: ["Automatic", "HR"],
  },
  {
    title: "Objectives and tasks are set",
    text: "HR sets company objectives. Managers set team objectives and give out tasks with weights. Employees can add their own tasks for approval.",
    actors: ["HR", "Managers", "Employees"],
  },
  {
    title: "The work happens",
    text: "People update their tasks when check-ins fall due, meet one-to-one and send each other 360° feedback.",
    actors: ["Employees", "Managers"],
  },
  {
    title: "Self review",
    text: "Employees can write a self review for the cycle and submit it. This step is optional.",
    actors: ["Employees"],
  },
  {
    title: "Manager review",
    text: "The line manager answers the values questions, rates each task and writes the conclusion with a final score out of 100. Completing it locks the review.",
    actors: ["Managers"],
  },
  {
    title: "Calibration",
    text: "HR, and managers of managers, compare finished scores across teams and adjust any that are out of line, giving a reason.",
    actors: ["HR", "Managers"],
  },
  {
    title: "Results",
    text: "Employees read their conclusion. HR checks the Overview and reports, and the next cycle begins.",
    actors: ["Employees", "HR"],
  },
];

/** How one performance cycle runs, and who acts at each stage. */
export default function CycleFlow() {
  return <Flow stages={STAGES} />;
}
