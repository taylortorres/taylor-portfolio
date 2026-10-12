import type { MDXComponents } from "mdx/types";
import BeforeAfter from "@/components/BeforeAfter";
import CaseImage from "@/components/CaseImage";
import Callout from "@/components/Callout";
import CaseVideo from "@/components/CaseVideo";
import CritBoard from "@/components/CritBoard";
import CursorCaption from "@/components/CursorCaption";
import Decision from "@/components/Decision";
import Figure from "@/components/Figure";
import Impact from "@/components/Impact";
import Insight from "@/components/Insight";
import MotionDemos from "@/components/MotionDemos";
import MotionOptions from "@/components/MotionOptions";
import PhonePair from "@/components/PhonePair";
import QuitRateChart from "@/components/QuitRateChart";
import Section from "@/components/Section";
import SyncedVideos from "@/components/SyncedVideos";

// Available in every MDX file without an import.
const components: MDXComponents = {
  Section,
  BeforeAfter,
  CaseImage,
  CaseVideo,
  Callout,
  CritBoard,
  CursorCaption,
  Decision,
  Figure,
  Impact,
  Insight,
  MotionDemos,
  MotionOptions,
  PhonePair,
  QuitRateChart,
  SyncedVideos,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
