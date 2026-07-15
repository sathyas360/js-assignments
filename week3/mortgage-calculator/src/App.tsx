import { useState } from 'react'
import './App.css'

export function App() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [term, setTerm] = useState('')

  const p = Number(amount)
  const i = Number(rate) / 100 / 12
  const n = Number(term) * 12

  const filled = [amount, rate, term].every((value) => value.trim() !== '');
  const valid = !Number.isNaN(p) && !Number.isNaN(i) && !Number.isNaN(n)

  const monthly = p * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
  const total = monthly * n
  const interest = total - p

  return (
    <div className="calculator">
      <h1>Mortgage Calculator</h1>

      <label>
        Loan amount
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>

      <label>
        Annual interest rate (%)
        <input value={rate} onChange={(e) => setRate(e.target.value)} />
      </label>

      <label>
        Loan term (years)
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
      </label>

      {!valid && <p className="error">Please enter numbers only.</p>}

      {filled && valid && (
        <div className="results">
          <p>Monthly payment: INR {monthly.toFixed(2)}</p>
          <p>Total payment amount: INR {total.toFixed(2)}</p>
          <p>Total interest paid: INR {interest.toFixed(2)}</p>
        </div>
      )}
    </div>
  )
}

export default App
