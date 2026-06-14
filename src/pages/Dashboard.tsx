import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Toggle } from "@/components/ui/toggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { mockAuth } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { TrendingUp, DollarSign, Percent, Calendar, Calculator, Scale } from "lucide-react";
import { formatCurrency, calculateSimpleInterest, calculateCompoundInterest, calculateAmortizationPayment, generateAmortizationSchedule, type AmortizationRow, type AmortizationMethod } from "@/lib/utils";

export function Dashboard() {
  const navigate = useNavigate();
  const user = mockAuth.getUser();

  const [principal, setPrincipal] = useState("10000");
  const [isPrincipalFocused, setIsPrincipalFocused] = useState(false);
  const [rate, setRate] = useState("5");
  // show formatted value with comma as decimal separator and dot as thousands separator
  const [isRateFocused, setIsRateFocused] = useState(false);
  const [time, setTime] = useState("12");
  const [isCompound, setIsCompound] = useState(true);
  const [rateUnit, setRateUnit] = useState<'monthly' | 'annual'>('monthly');
  const [timeUnit, setTimeUnit] = useState<'months' | 'years'>('months');
  const [amortizationMethod, setAmortizationMethod] = useState<AmortizationMethod>('price');
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const parseLocaleNumber = (raw: string) => {
    if (!raw) return 0;
    let s = String(raw).replace(/[^0-9.,]/g, '');

    const firstSeparatorIndex = Math.min(
      ...['.', ','].map((sep) => {
        const idx = s.indexOf(sep);
        return idx === -1 ? Infinity : idx;
      })
    );

    if (firstSeparatorIndex !== Infinity) {
      const integerPart = s.slice(0, firstSeparatorIndex).replace(/[.,]/g, '');
      let decimalPart = s.slice(firstSeparatorIndex + 1).replace(/[.,]/g, '');
      decimalPart = decimalPart.slice(0, 2);
      s = integerPart + '.' + decimalPart;
    } else {
      s = s.replace(/[.,]/g, '');
    }

    const n = parseFloat(s);
    return Number.isNaN(n) ? 0 : n;
  };

  const principalValue = parseLocaleNumber(principal);
  const rateValue = parseLocaleNumber(rate);
  const timeValue = parseLocaleNumber(time);

  const effectiveRate = rateUnit === 'annual' && timeUnit === 'months'
    ? rateValue / 12
    : rateValue;

  const effectivePeriods = timeUnit === 'years' && rateUnit === 'monthly'
    ? timeValue * 12
    : timeValue;

  const paymentPeriods = Math.max(Math.round(effectivePeriods), 1);

  const result = isCompound
    ? calculateCompoundInterest(principalValue, effectiveRate, effectivePeriods)
    : calculateSimpleInterest(principalValue, effectiveRate, effectivePeriods);

  const formattedFinal = formatCurrency(result.final);
  const formattedInterest = formatCurrency(result.interest);
  const shouldGrowFinal = formattedFinal.length > 16;
  const shouldGrowInterest = formattedInterest.length > 16;
  const responsiveGrowClass = 'md:min-h-[21.6rem]';

  const amortizationSchedule = generateAmortizationSchedule(principalValue, effectiveRate, paymentPeriods, amortizationMethod);
  const installmentValue = amortizationSchedule.length ? amortizationSchedule[0].installment : 0;
  const totalPaid = amortizationSchedule.reduce((sum, row) => sum + row.installment, 0);
  const formattedInstallment = formatCurrency(installmentValue);
  const formattedTotalPaid = formatCurrency(totalPaid);
  const amortizationTotals = amortizationSchedule.reduce(
    (acc, row) => ({
      installment: acc.installment + row.installment,
      amortization: acc.amortization + row.amortization,
      interest: acc.interest + row.interest,
    }),
    { installment: 0, amortization: 0, interest: 0 }
  );
  const formattedTotalInstallmentValue = formatCurrency(amortizationTotals.installment);
  const formattedTotalAmortizationValue = formatCurrency(amortizationTotals.amortization);
  const formattedTotalInterestValue = formatCurrency(amortizationTotals.interest);

  const handlePrincipalChange = (value: string) => {
    let cleaned = value.replace(/[^0-9.,]/g, '');

    const firstSeparatorIndex = Math.min(
      ...['.', ','].map((sep) => {
        const idx = cleaned.indexOf(sep);
        return idx === -1 ? Infinity : idx;
      })
    );

    if (firstSeparatorIndex !== Infinity) {
      const sep = cleaned[firstSeparatorIndex];
      const integerPart = cleaned.slice(0, firstSeparatorIndex).replace(/[.,]/g, '');
      let decimalPart = cleaned.slice(firstSeparatorIndex + 1).replace(/[.,]/g, '');
      decimalPart = decimalPart.slice(0, 2);
      cleaned = integerPart + sep + decimalPart;
    } else {
      cleaned = cleaned.replace(/[.,]/g, '');
    }

    setPrincipal(cleaned);
  };

  const handleRateChange = (value: string) => {
    let cleaned = value.replace(/[^0-9.,]/g, '');
    const firstSeparatorIndex = Math.min(
      ...['.', ',']
        .map((sep) => {
          const index = cleaned.indexOf(sep);
          return index === -1 ? Infinity : index;
        })
    );

    if (firstSeparatorIndex !== Infinity) {
      const separator = cleaned[firstSeparatorIndex];
      const integerPart = cleaned.slice(0, firstSeparatorIndex).replace(/[.,]/g, '');
      let decimalPart = cleaned.slice(firstSeparatorIndex + 1).replace(/[.,]/g, '');
      decimalPart = decimalPart.slice(0, 2);
      cleaned = integerPart + separator + decimalPart;
    } else {
      cleaned = cleaned.replace(/[.,]/g, '');
    }

    setRate(cleaned);
  };

  const formatRateDisplay = (value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    return num.toFixed(2);
  };

  const formatRateDisplayLocale = (value: string) => {
    if (!value) {
      return '';
    }

    const normalized = value.replace(',', '.');
    const num = parseFloat(normalized);
    if (Number.isNaN(num)) {
      return value;
    }

    const hasSeparator = /[.,]/.test(value);
    if (!hasSeparator) {
      return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(num);
    }

    const [, decPart = ''] = normalized.split('.');
    const fractionDigits = Math.min(decPart.length, 2);

    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(num);
  };

  const formatPrincipalDisplay = (value: string) => {
    const numericValue = parseLocaleNumber(value);
    return formatCurrency(numericValue);
  };

  // Dados para comparação
  const simpleResult = calculateSimpleInterest(principalValue, effectiveRate, effectivePeriods);
  const compoundResult = calculateCompoundInterest(principalValue, effectiveRate, effectivePeriods);
  const difference = compoundResult.final - simpleResult.final;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/perfil" className="hover:opacity-80 transition-opacity">
            <Avatar className="h-10 w-10 cursor-pointer border-2 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {user.user_metadata?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>

          <Link to="/" className="flex items-center gap-2 font-serif text-xl md:text-2xl font-bold text-primary">
            <TrendingUp className="h-6 w-6 md:h-8 md:w-8" />
            <span className="hidden sm:inline">Simula Juros</span>
          </Link>

          {/* theme toggle removed */}
        </div>
      </header>

      <div className="container py-8 space-y-8">
        {/* Título */}
        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Calculadora de Juros</h1>
          <p className="text-muted-foreground">Simule seus investimentos com precisão</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor Inicial */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-primary" />
                Valor Inicial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                type="text"
                value={isPrincipalFocused ? principal : formatPrincipalDisplay(principal)}
                onChange={(e) => handlePrincipalChange(e.target.value)}
                onFocus={() => setIsPrincipalFocused(true)}
                onBlur={() => setIsPrincipalFocused(false)}
                className="text-lg font-mono"
              />
              <p className="text-xs text-muted-foreground">
                💡 Valor investido ou capital inicial da simulação
              </p>
            </CardContent>
          </Card>

          {/* Taxa de Juros */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Percent className="h-5 w-5 text-primary" />
                Taxa de Juros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="text"
                  inputMode="decimal"
                  value={isRateFocused ? rate : formatRateDisplayLocale(rate)}
                  onChange={(e) => handleRateChange(e.target.value)}
                  onFocus={() => setIsRateFocused(true)}
                  onBlur={() => setIsRateFocused(false)}
                  className="text-lg font-mono"
                />
                <span className="flex items-center px-3 bg-muted rounded-md font-mono">%</span>
              </div>
              <div className="flex gap-2">
                <Toggle
                  pressed={rateUnit === 'monthly'}
                  onPressedChange={() => setRateUnit('monthly')}
                  variant="outline"
                  className="flex-1"
                >
                  Mensal
                </Toggle>
                <Toggle
                  pressed={rateUnit === 'annual'}
                  onPressedChange={() => setRateUnit('annual')}
                  variant="outline"
                  className="flex-1"
                >
                  Anual
                </Toggle>
              </div>
              <p className="text-xs text-muted-foreground">
                💡 {rateUnit === 'monthly' ? "Taxa mensal" : "Taxa anual"}
              </p>
            </CardContent>
          </Card>

          {/* Período */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Período
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="text-lg font-mono"
                min="1"
              />
              <div className="flex gap-2">
                <Toggle
                  pressed={timeUnit === 'months'}
                  onPressedChange={() => setTimeUnit('months')}
                  variant="outline"
                  className="flex-1"
                >
                  Meses
                </Toggle>
                <Toggle
                  pressed={timeUnit === 'years'}
                  onPressedChange={() => setTimeUnit('years')}
                  variant="outline"
                  className="flex-1"
                >
                  Anos
                </Toggle>
              </div>
              <p className="text-xs text-muted-foreground">
                💡 Total em dias: ~{Math.round(timeUnit === 'months' ? timeValue * 30 : timeValue * 365)} dias
              </p>
            </CardContent>
          </Card>

          {/* Tipo de Juros */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-primary" />
                Tipo de Juros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Toggle
                  pressed={!isCompound}
                  onPressedChange={() => setIsCompound(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Simples
                </Toggle>
                <Toggle
                  pressed={isCompound}
                  onPressedChange={() => setIsCompound(true)}
                  variant="outline"
                  className="flex-1"
                >
                  Composto
                </Toggle>
              </div>
              <p className="text-xs text-muted-foreground">
                💡 {isCompound 
                  ? "Juros sobre juros - rendimento exponencial" 
                  : "Juros apenas sobre o capital inicial - rendimento linear"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className={`bg-gradient-to-br from-primary/10 to-transparent border-primary/20 ${shouldGrowFinal ? responsiveGrowClass : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl">Montante Final</CardTitle>
              <CardDescription>Valor total após o período</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <p className="text-4xl font-bold font-mono text-primary break-words max-w-full text-center">
                {formattedFinal}
              </p>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-br from-accent/10 to-transparent border-accent/20 ${shouldGrowInterest ? responsiveGrowClass : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl">Total de Juros</CardTitle>
              <CardDescription>Rendimento obtido</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <p className="text-4xl font-bold font-mono text-accent break-words max-w-full text-center">
                {formattedInterest}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Amortização: resumo e link para tela de detalhes */}
        <div className="space-y-6">
          <Card className={`w-full max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-transparent border-primary/20 ${responsiveGrowClass}`}>
            <CardHeader>
              <CardTitle className="text-xl">Amortização</CardTitle>
              <CardDescription>Resumo e acesso à tabela completa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Parcela estimada</p>
                  <p className="text-4xl font-bold font-mono text-primary">{formattedInstallment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total pago</p>
                  <p className="text-2xl font-bold font-mono text-accent">{formattedTotalPaid}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <Toggle
                    pressed={amortizationMethod === 'price'}
                    onPressedChange={() => setAmortizationMethod('price')}
                    variant="outline"
                    className="flex-1"
                  >
                    PRICE
                  </Toggle>
                  <Toggle
                    pressed={amortizationMethod === 'sac'}
                    onPressedChange={() => setAmortizationMethod('sac')}
                    variant="outline"
                    className="flex-1"
                  >
                    SAC
                  </Toggle>
                  <Toggle
                    pressed={amortizationMethod === 'sacre'}
                    onPressedChange={() => setAmortizationMethod('sacre')}
                    variant="outline"
                    className="flex-1"
                  >
                    SACRE
                  </Toggle>
                </div>
                <p className="text-xs text-muted-foreground">
                  💡 {amortizationMethod === 'price'
                    ? 'Prestação fixa com amortização crescente.'
                    : amortizationMethod === 'sac'
                    ? 'Amortização constante e prestações decrescentes.'
                    : 'Prestação recalculada; amortização cresce ao longo do tempo.'}
                </p>
                <div className="flex justify-center">
                  <Button size="lg" onClick={() => navigate('/amortizacao', { state: { meta: { valorFinanciado: principalValue, taxaJuros: effectiveRate, parcelas: paymentPeriods, sistema: amortizationMethod }, tabela: amortizationSchedule, totais: { totalPago: totalPaid, totalJuros: amortizationTotals.interest, totalAmortizado: amortizationTotals.amortization } } })}>
                    Ver detalhes de amortização
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botão de Comparação */}
        <div className="flex justify-center">
          <Button size="lg" className="w-full max-w-sm sm:w-auto" onClick={() => setShowComparison(true)}>
            <Scale className="mr-2" />
            Comparar Juros Simples vs Compostos
          </Button>
        </div>
      </div>

      {/* Modal de Comparação */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="w-full max-w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Comparação: Juros Simples vs Compostos</DialogTitle>
            <DialogDescription>
              Veja a diferença entre os dois tipos de juros
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Tabela de Comparação */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Juros Simples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Montante Final</p>
                    <p className="text-xl font-bold font-mono">{formatCurrency(simpleResult.final)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Juros</p>
                    <p className="text-lg font-mono">{formatCurrency(simpleResult.interest)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Juros Compostos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Montante Final</p>
                    <p className="text-xl font-bold font-mono text-primary">{formatCurrency(compoundResult.final)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Juros</p>
                    <p className="text-lg font-mono text-primary">{formatCurrency(compoundResult.interest)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary">
                <CardHeader>
                  <CardTitle className="text-lg">Diferença</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Você ganha a mais</p>
                    <p className="text-xl font-bold font-mono text-primary">
                      {formatCurrency(difference)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Percentual</p>
                    <p className="text-lg font-mono text-primary">
                      +{((difference / simpleResult.final) * 100).toFixed(2)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
