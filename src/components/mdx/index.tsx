import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import CycleFlow from "@/components/CycleFlow";
import Flow from "@/components/Flow";
import * as ScreenKit from "@/components/Screen";
import SetupSteps from "@/components/SetupSteps";
import type { SetupStep } from "@/lib/content";

import { Callout } from "./callout";

/** Links inside the help centre stay in the app; others open in a new tab. */
function SmartLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

/** Wide tables scroll on their own instead of widening the page. */
function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-scroll">
      <table {...props} />
    </div>
  );
}

/** Everything an article can use, by the names articles use. */
export function mdxComponents({ steps }: { steps: SetupStep[] }): MDXComponents {
  return {
    ...ScreenKit,
    CycleFlow,
    Flow,
    SetupSteps: function ArticleSetupSteps() {
      return <SetupSteps steps={steps} />;
    },
    Callout,
    a: SmartLink,
    table: Table,
  };
}
