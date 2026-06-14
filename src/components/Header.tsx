import { TrendingUp, Home, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:gap-0">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl md:text-2xl font-bold text-primary">
          <TrendingUp className="h-6 w-6 md:h-8 md:w-8" />
          <span>Simula Juros</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2 md:gap-2">
          <Button variant="ghost" size="sm" asChild className="text-xs md:text-sm">
            <Link to="/">
              <Home className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-xs md:text-sm">
            <Link to="/login">
              <LogIn className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Login</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-xs md:text-sm">
            <Link to="/cadastro">
              <UserPlus className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Cadastro</span>
            </Link>
          </Button>
          
        </nav>
      </div>
    </header>
  );
}
