// Debug script para testar calculateAmortizationPayment

function calculateAmortizationPayment(principal, rate, periods) {
  if (periods <= 0) {
    return 0;
  }

  const periodicRate = rate / 100;
  if (periodicRate === 0) {
    return principal / periods;
  }

  console.log(`  calcAmortizationPayment: principal=${principal}, rate=${rate}%, periods=${periods}`);
  console.log(`    periodicRate=${periodicRate}`);
  const term = Math.pow(1 + periodicRate, -periods);
  console.log(`    (1+i)^-m = ${term}`);
  console.log(`    1 - (1+i)^-m = ${1 - term}`);
  const pmt = principal * periodicRate / (1 - term);
  console.log(`    PMT = ${principal} * ${periodicRate} / ${1 - term} = ${pmt}`);
  return pmt;
}

// Test multiple calls
console.log("Test 1: principal=10000, rate=10%, periods=12");
const pmt1 = calculateAmortizationPayment(10000, 10, 12);
console.log(`Result: ${pmt1}\n`);

console.log("Test 2: principal=9532.366849, rate=10%, periods=11");
const pmt2 = calculateAmortizationPayment(9532.366849, 10, 11);
console.log(`Result: ${pmt2}\n`);

console.log("Test 3: principal=9017.970383, rate=10%, periods=10");
const pmt3 = calculateAmortizationPayment(9017.970383, 10, 10);
console.log(`Result: ${pmt3}\n`);

console.log(`Comparison: pmt1=${pmt1}, pmt2=${pmt2}, pmt3=${pmt3}`);
console.log(`pmt1 === pmt2? ${pmt1 === pmt2}`);
