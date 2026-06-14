// Debug - log function calls

function calculateAmortizationPaymentDebug(principal, rate, periods, debugId) {
  console.log(`  calcAP #${debugId}: principal=${principal.toFixed(2)}, rate=${rate}, periods=${periods}`);
  
  if (periods <= 0) {
    return 0;
  }

  const periodicRate = rate / 100;
  if (periodicRate === 0) {
    return principal / periods;
  }

  const pmt = principal * periodicRate / (1 - Math.pow(1 + periodicRate, -periods));
  console.log(`    → PMT = ${pmt.toFixed(6)}`);
  return pmt;
}

function generateSacreDebug(principal, rate, periods) {
  if (principal <= 0 || periods <= 0) {
    return [];
  }

  const periodicRate = rate / 100;
  const rows = [];

  let balanceExact = principal;
  let callCount = 0;

  for (let i = 1; i <= periods; i += 1) {
    const remainingPeriods = periods - i + 1;
    const isLast = i === periods;
    
    console.log(`\nIteration ${i}:`);
    console.log(`  balanceExact=${balanceExact.toFixed(2)}, remainingPeriods=${remainingPeriods}`);
    
    const currentInstallmentExact = calculateAmortizationPaymentDebug(balanceExact, rate, remainingPeriods, ++callCount);
    
    const interestExact = balanceExact * periodicRate;
    const amortizationExact = isLast ? balanceExact : (currentInstallmentExact - interestExact);

    rows.push({
      period: i,
      installment: currentInstallmentExact,
      interest: interestExact,
      balance: isLast ? 0 : (balanceExact - amortizationExact),
    });

    balanceExact = balanceExact - amortizationExact;
    
    if (i === 3) {
      console.log(`\n... (continuing ${periods - 3} more periods) ...\n`);
      i = periods - 1;  // Jump to last period
    }
  }

  return rows;
}

// Test
console.log("=== Testing SACRE: Principal 10.000, Rate 5%, Periods 12 ===\n");
const result = generateSacreDebug(10000, 5, 12);
