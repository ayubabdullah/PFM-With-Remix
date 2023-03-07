import { Form, useTransition } from "@remix-run/react"
import propTypes from "prop-types"
import { useState } from "react"
import { GrClose } from "react-icons/gr"
import { options } from "~/utils/categories"

// get the options from the utils folder
const categoryOptions = options

export default function AddTransactionModal({ onModalOpenClick }) {
  const [type, setType] = useState("income")

  const transition = useTransition()

  // disable the submit button while submitting
  const submitButton =
    transition.state === "submitting" ? (
      <button className="button primary" type="submit" disabled>
        Adding
      </button>
    ) : (
      <button className="button primary" type="submit">
        Add Transaction
      </button>
    )

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="title">Add Transaction</h5>
          <button onClick={onModalOpenClick} className="close">
            <GrClose className="icon" />
          </button>
        </div>
        <div className="modal-body">
          <Form method="POST" className="modal-form">
            <div className="form-group">
              <label>Category</label>
              <select name="category" id="category" className="category">
                {categoryOptions[type].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                id="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="date"
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="amount"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <div className="radio-container">
                <div>
                  <input
                    type="radio"
                    name="type"
                    id="income"
                    value="income"
                    className="radio-input"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "income"}
                  />
                  <label htmlFor="income" className="radio-label">
                    Income
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="type"
                    id="expense"
                    value="expense"
                    className="radio-input"
                    onChange={(e) => setType(e.target.value)}
                    checked={type === "expense"}
                  />
                  <label htmlFor="expense" className="radio-label">
                    Expense
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group textarea">
              <label>Note</label>
              <textarea name="note" id="note" cols="30" rows="10"></textarea>
            </div>
            <div className="form-button-group">
              <button onClick={onModalOpenClick} className="button cancel">
                Dismiss
              </button>
              {submitButton}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

AddTransactionModal.propTypes = {
  onModalOpenClick: propTypes.func.isRequired,
}