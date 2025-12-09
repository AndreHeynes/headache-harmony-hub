import { BetaUserMenu } from "@/components/BetaUserMenu";

interface SharedHeaderProps {
  title?: string;
  logo?: React.ReactNode;
}

export function SharedHeader({ title = "Program", logo }: SharedHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          {logo && <div className="flex-shrink-0">{logo}</div>}
          <span className="text-lg font-semibold">{title}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <BetaUserMenu />
        </div>
      </div>
    </header>
  );
}
