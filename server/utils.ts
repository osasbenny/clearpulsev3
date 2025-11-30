import { nanoid } from "nanoid";

// Generate unique account number
export function generateAccountNumber(): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${timestamp}${random}`;
}

// Generate card number (mock)
export function generateCardNumber(): string {
  const parts = [];
  for (let i = 0; i < 4; i++) {
    parts.push(Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
  }
  return parts.join('').slice(0, 16);
}

// Generate CVV
export function generateCVV(): string {
  return Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

// Generate card expiry (5 years from now)
export function generateCardExpiry(): string {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear() + 5;
  return `${month}/${year}`;
}

// Format currency (cents to dollars)
export function formatCurrency(cents: number, currency = "USD"): string {
  const amount = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Mask account number (show last 4 digits)
export function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length <= 4) return accountNumber;
  return `****${accountNumber.slice(-4)}`;
}

// Mask card number (show last 4 digits)
export function maskCardNumber(cardNumber: string): string {
  if (cardNumber.length <= 4) return cardNumber;
  return `**** **** **** ${cardNumber.slice(-4)}`;
}

// Generate transaction reference
export function generateTransactionReference(): string {
  return `TXN${Date.now()}${nanoid(6).toUpperCase()}`;
}

// Calculate loan repayment schedule
export function calculateLoanRepayment(
  principal: number, // in cents
  annualInterestRate: number, // percentage
  termMonths: number
): {
  monthlyPayment: number;
  totalRepayment: number;
  schedule: Array<{
    month: number;
    principalAmount: number;
    interestAmount: number;
    totalAmount: number;
    remainingBalance: number;
  }>;
} {
  const monthlyRate = annualInterestRate / 100 / 12;
  const monthlyPayment = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  );
  
  let remainingBalance = principal;
  const schedule = [];
  
  for (let month = 1; month <= termMonths; month++) {
    const interestAmount = Math.round(remainingBalance * monthlyRate);
    const principalAmount = monthlyPayment - interestAmount;
    remainingBalance -= principalAmount;
    
    // Adjust last payment to account for rounding
    if (month === termMonths && remainingBalance !== 0) {
      const adjustment = remainingBalance;
      remainingBalance = 0;
      schedule.push({
        month,
        principalAmount: principalAmount + adjustment,
        interestAmount,
        totalAmount: monthlyPayment + adjustment,
        remainingBalance: 0,
      });
    } else {
      schedule.push({
        month,
        principalAmount,
        interestAmount,
        totalAmount: monthlyPayment,
        remainingBalance: Math.max(0, remainingBalance),
      });
    }
  }
  
  const totalRepayment = schedule.reduce((sum, payment) => sum + payment.totalAmount, 0);
  
  return {
    monthlyPayment,
    totalRepayment,
    schedule,
  };
}

// Get exchange rate (mock - in production, use real API)
export function getExchangeRate(fromCurrency: string, toCurrency: string): number {
  // Mock exchange rates
  const rates: Record<string, Record<string, number>> = {
    USD: { USD: 1, EUR: 0.92, GBP: 0.79 },
    EUR: { USD: 1.09, EUR: 1, GBP: 0.86 },
    GBP: { USD: 1.27, EUR: 1.16, GBP: 1 },
  };
  
  return rates[fromCurrency]?.[toCurrency] || 1;
}

// Convert currency amount
export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  const rate = getExchangeRate(fromCurrency, toCurrency);
  return Math.round(amount * rate);
}

// Validate SWIFT code format
export function isValidSwiftCode(swiftCode: string): boolean {
  // SWIFT code is 8 or 11 characters
  const swiftRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
  return swiftRegex.test(swiftCode);
}
