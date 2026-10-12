import Image, { type StaticImageData } from "next/image";

type Row = {
  /** The panel as exported (blur and gray background baked in). */
  src: StaticImageData;
  alt: string;
  title: string;
  text: string;
};

// Props "Process & Solution Preview" (Figma 2697:5530): rows of a 460px
// panel beside a short title and line, 45px apart. The panels are blurred on
// purpose (confidential work), so they are plain images: not zoomable, and
// shipped at 920px wide at most, so no sharper copy exists to request.
// Stacked (panel, then text) below md.
export default function PreviewRows({ rows }: { rows: Row[] }) {
  return (
    <div className="flex flex-col gap-12 md:gap-case-block">
      {rows.map(({ src, alt, title, text }) => (
        <div key={title} className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="relative aspect-[460/286] w-full shrink-0 md:w-[60%] md:max-w-preview-img">
            <Image src={src} alt={alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
          </div>
          <div className="md:max-w-preview-text md:flex-1">
            <h3 className="font-serif text-pair-title text-heading">{title}</h3>
            <p className="mt-2 font-sans text-case-body text-muted">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
