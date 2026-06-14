import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, DollarSign, Zap, ShieldCheck, Wallet, Target } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Oportunidades Reais",
    description: "Veja simulações alinhadas a valores que cabem no seu bolso e aproveite oportunidades reais.",
  },
  {
    icon: DollarSign,
    title: "Valores Acessíveis",
    description: "Planeje aportes e pagamentos com números que fazem sentido para o seu orçamento.",
  },
  {
    icon: Zap,
    title: "Ação Imediata",
    description: "Receba resultados instantâneos para diferentes opções de investimento e escolha com segurança.",
  },
  {
    icon: ShieldCheck,
    title: "Decisões Seguras",
    description: "Compare cenários e identifique a melhor oportunidade sem comprometer suas finanças.",
  },
  {
    icon: Wallet,
    title: "Bolso em Primeiro Lugar",
    description: "Entenda como cada valor impacta seu fluxo de caixa e mantenha seu orçamento sob controle.",
  },
  {
    icon: Target,
    title: "Amortização Inteligente",
    description: "Simule amortização e veja como parcelas menores podem caber no seu bolso até o fim do plano.",
  },
  {
    icon: DollarSign,
    title: "Parcelas Planejadas",
    description: "Compare diferentes métodos de amortização para escolher o melhor caminho financeiro.",
  },
  {
    icon: Target,
    title: "Meta Clara",
    description: "Defina objetivos financeiros e descubra quais valores são mais viáveis para alcançá-los.",
  },
];

export function AnimatedCards() {
  return (
    <div className="relative overflow-hidden py-12">
      <div className="flex gap-4 animate-slide-left">
        {/* Duplicar os cards para criar efeito infinito */}
        {[...features, ...features].map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="min-w-[300px] md:min-w-[350px] flex-shrink-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
