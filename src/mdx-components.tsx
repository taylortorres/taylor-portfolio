import type { MDXComponents } from "mdx/types";
import BeforeAfter from "@/components/BeforeAfter";
import CaseImage from "@/components/CaseImage";
import Callout from "@/components/Callout";
import CaseVideo from "@/components/CaseVideo";
import CursorCaption from "@/components/CursorCaption";
import Figure from "@/components/Figure";
import Impact from "@/components/Impact";
import MotionDemos from "@/components/MotionDemos";
import PhonePair from "@/components/PhonePair";
import QuitRateChart from "@/components/QuitRateChart";
import Section from "@/components/Section";
import VideoPair from "@/components/VideoPair";

// Available in every MDX file without an import.
const components: MDXComponents = {
  Section,
  BeforeAfter,
  CaseImage,
  CaseVideo,
  Callout,
  CursorCaption,
  Figure,
  Impact,
  MotionDemos,
  PhonePair,
  QuitRateChart,
  VideoPair,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
