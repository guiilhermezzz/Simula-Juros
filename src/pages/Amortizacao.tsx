import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, type AmortizationRow } from "@/lib/utils";

export function Amortizacao() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as any;

  useEffect(() => {
    if (!state || !state.tabela) {
      // se não houver dados no estado, volte ao Dashboard
      navigate('/dashboard');
    }
  }, [state, navigate]);

  if (!state || !state.tabela) {
    return null;
  }

  const tabela: AmortizationRow[] = state.tabela;
  const meta = state.meta || {};
  const totais = state.totais || {};

  const formatRate = (value: number) => `${(value * 100).toFixed(2)}%`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-emerald-50 border border-border p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.18em] text-primary/80">Amortização</p>
              <h1 className="mt-3 text-4xl font-serif font-bold leading-tight text-foreground">Detalhes do cronograma de pagamento</h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Veja a evolução do saldo devedor, juros, amortização e valor da parcela em cada período. A tabela abaixo traz a sequência completa com totais consolidados.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>Voltar</Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[2fr_1fr] justify-center items-center">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Resumo do financiamento</CardTitle>
              <CardDescription>{meta.sistema ? `Sistema: ${String(meta.sistema).toUpperCase()}` : 'Resumo do financiamento'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 justify-items-center">
                <div className="w-full max-w-xs rounded-3xl bg-muted/50 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Valor financiado</p>
                  <p className="mt-3 text-2xl font-semibold font-mono text-foreground">{formatCurrency(meta.valorFinanciado || 0)}</p>
                </div>
                <div className="w-full max-w-xs rounded-3xl bg-muted/50 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Parcelas</p>
                  <p className="mt-3 text-2xl font-semibold font-mono text-foreground">{meta.parcelas || tabela.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card className="rounded-3xl bg-primary/5 border border-primary/20 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-primary/80">Total pago</p>
              <p className="mt-3 text-3xl font-semibold font-mono text-primary">{formatCurrency(totais.totalPago || 0)}</p>
            </Card>
            <Card className="rounded-3xl bg-accent/5 border border-accent/20 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-accent/80">Total de juros</p>
              <p className="mt-3 text-3xl font-semibold font-mono text-accent">{formatCurrency(totais.totalJuros || 0)}</p>
            </Card>
            <Card className="rounded-3xl bg-foreground/5 border border-foreground/10 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Total amortizado</p>
              <p className="mt-3 text-3xl font-semibold font-mono text-foreground">{formatCurrency(totais.totalAmortizado || 0)}</p>
            </Card>
          </div>
        </div>

        <Card className="mt-6 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">Detalhes das parcelas</CardTitle>
            <CardDescription>Lista completa de prestações, amortização, juros e saldo devedor.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-sm">
                <thead className="bg-muted text-left text-sm text-muted-foreground uppercase tracking-[0.18em]">
                  <tr>
                    <th className="sticky top-0 z-10 bg-muted/95 px-4 py-4">Parcela</th>
                    <th className="sticky top-0 z-10 bg-muted/95 px-4 py-4">Valor</th>
                    <th className="sticky top-0 z-10 bg-muted/95 px-4 py-4">Amortização</th>
                    <th className="sticky top-0 z-10 bg-muted/95 px-4 py-4">Juros</th>
                    <th className="sticky top-0 z-10 bg-muted/95 px-4 py-4">Saldo devedor</th>
                  </tr>
                </thead>
                <tbody>
                  {tabela.map((row) => (
                    <tr key={row.period} className="border-b border-border even:bg-muted/30 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{row.period}</td>
                      <td className="px-4 py-3 font-mono">{formatCurrency(row.installment)}</td>
                      <td className="px-4 py-3 font-mono text-foreground">{formatCurrency(row.amortization)}</td>
                      <td className="px-4 py-3 font-mono text-accent">{formatCurrency(row.interest)}</td>
                      <td className="px-4 py-3 font-mono text-foreground">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted/10 text-sm font-semibold text-foreground">
                  <tr>
                    <td className="px-4 py-4">Total</td>
                    <td className="px-4 py-4">{formatCurrency(totais.totalPago || 0)}</td>
                    <td className="px-4 py-4">{formatCurrency(totais.totalAmortizado || 0)}</td>
                    <td className="px-4 py-4">{formatCurrency(totais.totalJuros || 0)}</td>
                    <td className="px-4 py-4">{formatCurrency(tabela.length ? tabela[tabela.length - 1].balance : 0)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Amortizacao;
