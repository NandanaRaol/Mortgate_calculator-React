import { useState } from 'react';
import './calc.css'
const App = () => {
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  function onSubmit(event) 
  {
    event.preventDefault();
    const data = new FormData(event.target);
    const loanAmount = parseFloat(data.get('loan-amount'));
    const interestRate = parseFloat(data.get('interest-rate'));
    const loanTerm = parseFloat(data.get('loan-term'));
    const monthlyInterestRate = interestRate / 100 / 12;
    const loanTermInMonths = loanTerm * 12;
    const monthlyPaymentAmount = (loanAmount * monthlyInterestRate) /  (1 - 1 / Math.pow(1 + monthlyInterestRate, loanTermInMonths));
    const totalPayment = monthlyPaymentAmount * loanTermInMonths;
    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    });
    setMonthlyPayment(currencyFormatter.format(monthlyPaymentAmount));
    setTotalPayment(currencyFormatter.format(totalPayment));
    setTotalInterest(currencyFormatter.format(totalPayment - loanAmount));
  }
  return (
    <div className="mortgage-calculator">
      <form className="mortgage-calculator-form" onSubmit={onSubmit}>
        <div>
          <label>
            Loan Amount:{' '}
            <input type="number" name="loan-amount" required />
          </label>
        </div>
        <br />
        <div>
          <label>
            Loan Term (years):{' '}
            <input type="number" name="loan-term" required />
          </label>
        </div>
        <br />
        <div>
          <label>
            Interest Rate (%):{' '}
            <input type="number" name="interest-rate" required />
          </label>
        </div>
        <br />
        <div>
          <button type="submit">Calculate</button>
        </div>
      </form>
      <hr />
      <div aria-live="polite" className="mortgage-calculator-results">
        <div>
          Monthly Payment Amount: <strong>{monthlyPayment}</strong>
        </div>
        <br />
        <div>
          Total Payment Amount: <strong>{totalPayment}</strong>
        </div>
        <br />
        <div>
          Total Interest Paid: <strong>{totalInterest}</strong>
        </div>
      </div>
    </div>
  );
};

export default App;
