import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { mockAuth } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await mockAuth.signIn(email, password);
      
      if (error) {
        setErrorMessage(error.message || "E-mail ou senha incorretos.");
        return;
      }

      if (data && data.user) {
        mockAuth.setUser(data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const bannerImageSrc = `${import.meta.env.BASE_URL}Plano_de_fundo.jpeg`;

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      const nextScrollY = Math.min(window.scrollY, 120);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(() => setScrollY(nextScrollY));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const scrollProgress = Math.min(scrollY / 120, 1);
  const bannerHeight = 336 - (336 - 168) * scrollProgress;
  const bannerScale = 1 - 0.06 * scrollProgress;
  const textTranslate = 24 * scrollProgress;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container flex-1 py-8 md:py-12">
        {/* Banner Image */}
        <div className="mb-8 rounded-2xl overflow-hidden relative transition-[height] duration-500 ease-out" style={{ height: `${bannerHeight}px` }}>
          <img 
            src={bannerImageSrc} 
            alt="Plano de fundo do login" 
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            style={{ transform: `scale(${bannerScale})`, objectPosition: 'center -15px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90 flex items-start justify-center">
            <div className="text-center transition-transform duration-500 ease-out pt-8 md:pt-12" style={{ transform: `translateY(${textTranslate + 20}px)` }}>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
                Bem-vindo de volta!
              </h1>
              <p className="text-foreground text-lg">
                Acesse sua conta e continue suas simulações
              </p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="max-w-xl mx-auto">
          <Card className="p-6 md:p-8">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl">Login</CardTitle>
              <CardDescription className="text-base md:text-lg">
                Entre com seu e-mail e senha para acessar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail ou Username</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>

                {errorMessage ? (
                  <p className="text-sm text-destructive text-center">{errorMessage}</p>
                ) : null}

                <p className="text-center text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link to="/cadastro" className="text-primary hover:underline">
                    Cadastre-se
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
