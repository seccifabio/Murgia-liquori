import LiquidTransition from "@/components/LiquidTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <LiquidTransition>{children}</LiquidTransition>;
}
