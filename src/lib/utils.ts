import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatar valor como moeda brasileira
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function roundAbnt(value: number, decimals = 2): number {
  if (!Number.isFinite(value)) {
    return value;
  }

  const sign = Math.sign(value) || 1;
  const absolute = Math.abs(value);
  const fixed = absolute.toFixed(decimals + 10);
  const [integerPart, fractionalPart = ''] = fixed.split('.');
  const paddedFraction = fractionalPart.padEnd(decimals + 1, '0');
  const relevant = paddedFraction.slice(0, decimals);
  const nextDigit = paddedFraction.charAt(decimals);
  const rest = paddedFraction.slice(decimals + 1);

  let shouldRoundUp = false;
  if (nextDigit < '5') {
    shouldRoundUp = false;
  } else if (nextDigit > '5') {
    shouldRoundUp = true;
  } else {
    if (/[^0]/.test(rest)) {
      shouldRoundUp = true;
    } else {
      const lastDigit = relevant.charAt(relevant.length - 1) || '0';
      shouldRoundUp = Number(lastDigit) % 2 !== 0;
    }
  }

  let roundedInteger = integerPart;
  let roundedFraction = relevant;

  if (shouldRoundUp) {
    if (decimals > 0) {
      const digits = roundedFraction.split('').map((digit) => Number(digit));
      let carry = 1;
      for (let index = digits.length - 1; index >= 0 && carry > 0; index -= 1) {
        const sum = digits[index] + carry;
        digits[index] = sum % 10;
        carry = Math.floor(sum / 10);
      }
      roundedFraction = digits.map(String).join('');
      if (carry > 0) {
        roundedInteger = (BigInt(roundedInteger) + BigInt(1)).toString();
      }
    } else {
      roundedInteger = (BigInt(roundedInteger) + BigInt(1)).toString();
      roundedFraction = '';
    }
  } else if (decimals > 0) {
    roundedFraction = roundedFraction.padEnd(decimals, '0');
  }

  const result = decimals > 0
    ? Number(`${roundedInteger}.${roundedFraction.padEnd(decimals, '0')}`)
    : Number(roundedInteger);

  return sign * result;
}

// Calcular juros simples
export function calculateSimpleInterest(
  principal: number,
  rate: number,
  time: number
): { final: number; interest: number } {
  const interest = principal * (rate / 100) * time;
  return {
    final: principal + interest,
    interest,
  };
}

// Calcular juros compostos
export function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number
): { final: number; interest: number } {
  const final = principal * Math.pow(1 + rate / 100, time);
  const interest = final - principal;
  return {
    final,
    interest,
  };
}

export type AmortizationRow = {
  period: number;
  installment: number;
  amortization: number;
  interest: number;
  balance: number;
};

export type AmortizationMethod = 'sac' | 'price' | 'sacre';

export function calculateAmortizationPayment(
  principal: number,
  rate: number,
  periods: number
): number {
  if (periods <= 0) {
    return 0;
  }

  const periodicRate = rate / 100;
  if (periodicRate === 0) {
    return principal / periods;
  }

  return (
    principal * periodicRate /
    (1 - Math.pow(1 + periodicRate, -periods))
  );
}

export type AmortizationTotals = {
  totalInstallment: number;
  totalAmortization: number;
  totalInterest: number;
};

export function calculateAmortizationTotals(
  rows: AmortizationRow[],
  principal: number
): AmortizationTotals {
  const totalInstallment = roundAbnt(rows.reduce((sum, row) => sum + row.installment, 0));
  const totalAmortization = roundAbnt(rows.reduce((sum, row) => sum + row.amortization, 0));
  const totalInterest = roundAbnt(rows.reduce((sum, row) => sum + row.interest, 0));
  return {
    totalInstallment,
    totalAmortization,
    totalInterest,
  };
}

export function generateSacSchedule(
  principal: number,
  rate: number,
  periods: number
): AmortizationRow[] {
  if (principal <= 0 || periods <= 0) {
    return [];
  }

  const periodicRate = rate / 100;
  const rows: AmortizationRow[] = [];

  let balanceExact = principal;
  const amortizationExact = principal / periods;
  let amortizationDisplaySum = 0;

  for (let i = 1; i <= periods; i += 1) {
    const interestExact = balanceExact * periodicRate;
    const isLast = i === periods;

    let amortizationExactThis = isLast ? balanceExact : amortizationExact;

    // For display, round each amortization except last — last will be adjusted to match principal
    let amortizationDisplay = isLast ? 0 : roundAbnt(amortizationExactThis);

    // For last period, compute amortizationDisplay so that sum equals principal (rounded appropriately)
    if (isLast) {
      amortizationDisplay = roundAbnt(principal - amortizationDisplaySum);
    }

    const interestDisplay = roundAbnt(interestExact);
    const installmentDisplay = roundAbnt(amortizationDisplay + interestDisplay);

    rows.push({
      period: i,
      installment: installmentDisplay,
      amortization: amortizationDisplay,
      interest: interestDisplay,
      balance: isLast ? 0 : roundAbnt(balanceExact - amortizationExactThis),
    });

    amortizationDisplaySum += amortizationDisplay;
    balanceExact = balanceExact - amortizationExactThis;
  }

  return rows;
}

export function generatePriceSchedule(
  principal: number,
  rate: number,
  periods: number
): AmortizationRow[] {
  if (principal <= 0 || periods <= 0) {
    return [];
  }

  const periodicRate = rate / 100;
  const rows: AmortizationRow[] = [];

  let balanceExact = principal;
  const fixedInstallmentExact = calculateAmortizationPayment(principal, rate, periods);
  const fixedInstallmentDisplay = roundAbnt(fixedInstallmentExact);
  let amortizationDisplaySum = 0;

  for (let i = 1; i <= periods; i += 1) {
    const isLast = i === periods;
    const interestExact = balanceExact * periodicRate;
    const interestDisplay = roundAbnt(interestExact);

    const amortizationExact = isLast ? balanceExact : (fixedInstallmentExact - interestExact);
    let amortizationDisplay = isLast ? 0 : roundAbnt(fixedInstallmentDisplay - interestDisplay);
    if (isLast) {
      amortizationDisplay = roundAbnt(principal - amortizationDisplaySum);
    }

    const installmentDisplay = isLast
      ? roundAbnt(amortizationDisplay + interestDisplay)
      : fixedInstallmentDisplay;

    rows.push({
      period: i,
      installment: installmentDisplay,
      amortization: amortizationDisplay,
      interest: interestDisplay,
      balance: isLast ? 0 : roundAbnt(balanceExact - amortizationExact),
    });

    amortizationDisplaySum += amortizationDisplay;
    balanceExact = balanceExact - amortizationExact;
  }

  return rows;
}

export function generateSacreSchedule(
  principal: number,
  rate: number,
  periods: number
): AmortizationRow[] {
  if (principal <= 0 || periods <= 0) {
    return [];
  }

  const sacRows = generateSacSchedule(principal, rate, periods);
  const priceRows = generatePriceSchedule(principal, rate, periods);
  const periodicRate = rate / 100;
  const rows: AmortizationRow[] = [];

  let balanceExact = principal;
  let amortizationDisplaySum = 0;

  for (let i = 1; i <= periods; i += 1) {
    const isLast = i === periods;
    const sacInstallment = sacRows[i - 1].installment;
    const priceInstallment = priceRows[i - 1].installment;

    // O valor da parcela SACRE é a média entre SAC e PRICE
    const installmentExact = (sacInstallment + priceInstallment) / 2;
    const interestExact = balanceExact * periodicRate;
    const amortizationExact = isLast ? balanceExact : (installmentExact - interestExact);

    const installmentDisplay = roundAbnt(installmentExact);
    const interestDisplay = roundAbnt(interestExact);
    const amortizationDisplay = isLast
      ? roundAbnt(principal - amortizationDisplaySum)
      : roundAbnt(amortizationExact);

    const newBalance = isLast ? 0 : roundAbnt(balanceExact - amortizationExact);

    rows.push({
      period: i,
      installment: installmentDisplay,
      amortization: amortizationDisplay,
      interest: interestDisplay,
      balance: newBalance,
    });

    amortizationDisplaySum += amortizationDisplay;
    balanceExact = balanceExact - amortizationExact;
  }

  return rows;
}

export function generateAmortizationSchedule(
  principal: number,
  rate: number,
  periods: number,
  method: AmortizationMethod
): AmortizationRow[] {
  switch (method) {
    case 'sac':
      return generateSacSchedule(principal, rate, periods);
    case 'sacre':
      return generateSacreSchedule(principal, rate, periods);
    case 'price':
    default:
      return generatePriceSchedule(principal, rate, periods);
  }
}

// Gerar dados para o gráfico
export function generateChartData(
  principal: number,
  rate: number,
  time: number,
  type: 'simple' | 'compound'
) {
  const data = [];
  for (let i = 0; i <= time; i++) {
    const result =
      type === 'simple'
        ? calculateSimpleInterest(principal, rate, i)
        : calculateCompoundInterest(principal, rate, i);
    data.push({
      period: i,
      value: result.final,
    });
  }
  return data;
}
