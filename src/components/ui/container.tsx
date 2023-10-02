import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <main className={cn("mx-auto max-w-xl px-5", className)}>{children}</main>
  );
}
