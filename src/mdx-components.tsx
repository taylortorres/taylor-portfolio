import type { MDXComponents } from "mdx/types";
import BeforeAfter from "@/components/BeforeAfter";
import CaptionedPhotos from "@/components/CaptionedPhotos";
import CaseImage from "@/components/CaseImage";
import Callout from "@/components/Callout";
import CaseVideo from "@/components/CaseVideo";
import CritBoard from "@/components/CritBoard";
import CursorCaption from "@/components/CursorCaption";
import Decision from "@/components/Decision";
import DemoVideo from "@/components/DemoVideo";
import FeatureRows from "@/components/FeatureRows";
import Figure from "@/components/Figure";
import Impact from "@/components/Impact";
import Insight from "@/components/Insight";
import Lessons from "@/components/Lessons";
import MotionDemos from "@/components/MotionDemos";
import MotionOptions from "@/components/MotionOptions";
import PhasePlan from "@/components/PhasePlan";
import PhonePair from "@/components/PhonePair";
import PostPanel from "@/components/PostPanel";
import PrincipleCards from "@/components/PrincipleCards";
import QuitRateChart from "@/components/QuitRateChart";
import Section from "@/components/Section";
import SectionPart from "@/components/SectionPart";
import SolutionCompare from "@/components/SolutionCompare";
import SyncedVideos from "@/components/SyncedVideos";

// Available in every MDX file without an import.
const components: MDXComponents = {
  Section,
  SectionPart,
  BeforeAfter,
  CaptionedPhotos,
  CaseImage,
  CaseVideo,
  Callout,
  CritBoard,
  CursorCaption,
  Decision,
  DemoVideo,
  FeatureRows,
  Figure,
  Impact,
  Insight,
  Lessons,
  MotionDemos,
  MotionOptions,
  PhasePlan,
  PhonePair,
  PostPanel,
  PrincipleCards,
  QuitRateChart,
  SolutionCompare,
  SyncedVideos,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
