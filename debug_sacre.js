// Debug script para testar o cálculo SACRE
function roundAbnt(value, decimals = 2) {
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

function calculateAmortizationPayment(principal, rate, periods) {
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

function generateSacreSchedule(principal, rate, periods) {
  if (principal <= 0 || periods <= 0) {
    return [];
  }

  const periodicRate = rate / 100;
  const rows = [];

  let balanceExact = principal;
  let amortizationDisplaySum = 0;

  for (let i = 1; i <= periods; i += 1) {
    const remainingPeriods = periods - i + 1;
    const isLast = i === periods;
    const currentInstallmentExact = calculateAmortizationPayment(balanceExact, rate, remainingPeriods);
    const interestExact = balanceExact * periodicRate;

    const installmentDisplay = roundAbnt(currentInstallmentExact);
    const interestDisplay = roundAbnt(interestExact);
    let amortizationDisplay = isLast ? 0 : roundAbnt(installmentDisplay - interestDisplay);
    if (isLast) {
      amortizationDisplay = roundAbnt(principal - amortizationDisplaySum);
    }

    const amortizationExact = isLast ? balanceExact : (currentInstallmentExact - interestExact);

    console.log(`Period ${i}:`);
    console.log(`  remainingPeriods: ${remainingPeriods}`);
    console.log(`  balanceExact: ${balanceExact.toFixed(6)}`);
    console.log(`  currentInstallmentExact: ${currentInstallmentExact.toFixed(6)}`);
    console.log(`  installmentDisplay: ${installmentDisplay.toFixed(2)}`);
    console.log(`  interestDisplay: ${interestDisplay.toFixed(2)}`);
    console.log(`  amortizationDisplay: ${amortizationDisplay.toFixed(2)}`);
    console.log(`  amortizationExact: ${amortizationExact.toFixed(6)}`);
    console.log();

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

// Test with the parameters from the app
console.log("=== SACRE Test: Principal 10.000, Rate 10%, Periods 12 ===");
const result = generateSacreSchedule(10000, 10, 12);
console.log("\nResults:");
result.forEach(row => {
  console.log(`P${row.period}: Parcela=${row.installment.toFixed(2)}, Amort=${row.amortization.toFixed(2)}, Juros=${row.interest.toFixed(2)}, Saldo=${row.balance.toFixed(2)}`);
});
