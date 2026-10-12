import type { MDXComponents } from "mdx/types";
import CaseImage from "@/components/CaseImage";
import CaseVideo from "@/components/CaseVideo";
import CursorCaption from "@/components/CursorCaption";
import Impact from "@/components/Impact";
import Section from "@/components/Section";
import VideoPair from "@/components/VideoPair";

// Available in every MDX file without an import.
const components: MDXComponents = {
  Section,
  CaseImage,
  CaseVideo,
  CursorCaption,
  Impact,
  VideoPair,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
