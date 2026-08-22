import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt="Sunlit Network"
      width={512}
      height={199}
      priority={priority}
      className={cn("h-8 w-auto object-contain sm:h-9", className)}
    />
  );
}
