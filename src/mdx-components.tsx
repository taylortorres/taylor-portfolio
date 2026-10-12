import type { MDXComponents } from "mdx/types";
import CaseImage from "@/components/CaseImage";
import Callout from "@/components/Callout";
import CaseVideo from "@/components/CaseVideo";
import CursorCaption from "@/components/CursorCaption";
import Figure from "@/components/Figure";
import Impact from "@/components/Impact";
import QuitRateChart from "@/components/QuitRateChart";
import Section from "@/components/Section";
import VideoPair from "@/components/VideoPair";

// Available in every MDX file without an import.
const components: MDXComponents = {
  Section,
  CaseImage,
  CaseVideo,
  Callout,
  CursorCaption,
  Figure,
  Impact,
  QuitRateChart,
  VideoPair,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
