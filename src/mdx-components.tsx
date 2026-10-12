import type { MDXComponents } from "mdx/types";
import BeforeAfter from "@/components/BeforeAfter";
import BodyLabel from "@/components/BodyLabel";
import CaptionedPhotos from "@/components/CaptionedPhotos";
import CaseImage from "@/components/CaseImage";
import Callout from "@/components/Callout";
import CaseVideo from "@/components/CaseVideo";
import CritBoard from "@/components/CritBoard";
import CursorCaption from "@/components/CursorCaption";
import Decision from "@/components/Decision";
import DemoVideo from "@/components/DemoVideo";
import EvolutionStep from "@/components/EvolutionStep";
import FeatureRows from "@/components/FeatureRows";
import Figure from "@/components/Figure";
import FramedPanels from "@/components/FramedPanels";
import Impact from "@/components/Impact";
import Insight from "@/components/Insight";
import Lessons from "@/components/Lessons";
import MotionDemos from "@/components/MotionDemos";
import MotionOptions from "@/components/MotionOptions";
import PhasePlan from "@/components/PhasePlan";
import PhonePair from "@/components/PhonePair";
import PostCollage from "@/components/PostCollage";
import PostPanel from "@/components/PostPanel";
import PrincipleCards from "@/components/PrincipleCards";
import QuitRateChart from "@/components/QuitRateChart";
import Section from "@/components/Section";
import SectionPart from "@/components/SectionPart";
import SiteReviews from "@/components/SiteReviews";
import SolutionCompare from "@/components/SolutionCompare";
import SyncedVideos from "@/components/SyncedVideos";

// Available in every MDX file without an import.
const components: MDXComponents = {
  Section,
  SectionPart,
  BeforeAfter,
  BodyLabel,
  CaptionedPhotos,
  CaseImage,
  CaseVideo,
  Callout,
  CritBoard,
  CursorCaption,
  Decision,
  DemoVideo,
  EvolutionStep,
  FeatureRows,
  Figure,
  FramedPanels,
  Impact,
  Insight,
  Lessons,
  MotionDemos,
  MotionOptions,
  PhasePlan,
  PhonePair,
  PostCollage,
  PostPanel,
  PrincipleCards,
  QuitRateChart,
  SiteReviews,
  SolutionCompare,
  SyncedVideos,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
