// High precision test - no rounding

function calculatePMT(principal, ratePercent, periods) {
  const i = ratePercent / 100;
  const term = Math.pow(1 + i, -periods);
  const pmt = principal * i / (1 - term);
  return pmt;
}

// Test with exact values
console.log("=== High Precision SACRE Test (5%, 12 periods) ===\n");

let balance = 10000;
const rate = 5;
const totalPeriods = 12;

for (let period = 1; period <= 12; period++) {
  const remainingPeriods = totalPeriods - period + 1;
  const pmt = calculatePMT(balance, rate, remainingPeriods);
  const interest = balance * (rate / 100);
  const amortization = pmt - interest;
  
  console.log(`Period ${period}:`);
  console.log(`  Balance: ${balance.toFixed(10)}`);
  console.log(`  Remaining: ${remainingPeriods}`);
  console.log(`  PMT: ${pmt.toFixed(10)}`);
  console.log(`  Interest: ${interest.toFixed(10)}`);
  console.log(`  Amortization: ${amortization.toFixed(10)}`);
  console.log();
  
  balance = balance - amortization;
  
  if (period === 3) {
    console.log("... [skipping to last period] ...\n");
    period = 11;
  }
}
