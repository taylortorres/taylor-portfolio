import Image from "next/image";

// The 14px arrow from the sidebar's HOME and BACK TO TOP chips (Figma node
// 2682:68515). It points left; BACK TO TOP rotates it to point up.
export default function ChipIcon({ up = false }: { up?: boolean }) {
  return (
    <span aria-hidden="true" className={`flex size-3.5 shrink-0 items-center justify-center ${up ? "rotate-90" : ""}`}>
      <Image src="/case-study/arrow.svg" alt="" width={11} height={9} />
    </span>
  );
}
