import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
  nav: { width: 36, height: 32, className: "h-8 w-auto" },
  footer: { width: 44, height: 39, className: "h-10 w-auto" },
} as const;

export default function TbmLogo({
  variant = "nav",
  className,
}: {
  variant?: keyof typeof SIZES;
  className?: string;
}) {
  const { width, height, className: sizeClass } = SIZES[variant];

  return (
    <Image
      src="/tbm-logo.png"
      alt="TBM STUDIOZ"
      width={width}
      height={height}
      className={cn(sizeClass, className)}
      priority={variant === "nav"}
    />
  );
}
