import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedCards } from "@/components/AnimatedCards";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="container py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 pl-0 md:pl-8 lg:pl-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Simule seus{" "}
              <span className="text-primary">investimentos</span> com precisão
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A nossa plataforma se trata de uma calculadora de juros compostos e simples, 
              oferecendo análises visuais detalhadas, comparações interativas e insights 
              educacionais para suas decisões financeiras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/cadastro">
                  Começar Agora
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">
                  Fazer Login
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-3 -translate-y-3 rounded-tl-[20px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] bg-emerald-500/10 shadow-[0_0_50px_rgba(16,185,129,0.35)]" />
            <div className="relative aspect-square rounded-tl-[20px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] overflow-hidden bg-slate-950/90 border border-white/10 shadow-[0_0_40px_rgba(16,185,129,0.45)]">
              <div className="absolute inset-0 bg-slate-950/90" />

              <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
                <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 shadow-sm shadow-black/10">
                  <div className="text-xs uppercase text-white/50 tracking-[0.25em] mb-3">
                    Explicação rápida
                  </div>
                  <div className="text-3xl font-semibold">Como o rendimento cresce</div>
                  <p className="mt-3 text-sm text-white/75 max-w-[18rem] leading-6">
                    Mostramos o impacto do tempo, da taxa e do aporte inicial com uma visualização simples e direta.
                  </p>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="flex items-center justify-between text-xs text-white/60 uppercase tracking-[0.25em] mb-3">
                      <span>Tabela de evolução</span>
                      <span>Visão simplificada</span>
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Ano 1</span>
                        <span className="font-semibold">R$ 11.250</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Ano 3</span>
                        <span className="font-semibold">R$ 14.100</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Ano 5</span>
                        <span className="font-semibold">R$ 16.750</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-white/50 uppercase tracking-[0.25em] mb-3">Legenda do gráfico</div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-1/4 bg-primary" />
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-white/70">
                      <div className="flex items-center justify-between">
                        <span>Juros compostos</span>
                        <span>+8,7%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Contribuição</span>
                        <span>+4,5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="text-sm text-white/80">
                    "Imagine um especialista ao seu lado, apontando cada linha da tabela e explicando como cada valor se transforma em crescimento no longo prazo."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Por que escolher o Simula Juros?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas e intuitivas para você tomar decisões financeiras inteligentes
            </p>
          </div>
          <AnimatedCards />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12 md:py-24">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crie sua conta gratuitamente e comece a simular seus investimentos hoje mesmo
          </p>
          <Button size="lg" asChild>
            <Link to="/cadastro">
              Criar Conta Grátis
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
