import React from "react";
import styles from '../styles/improve_credit_score.module.css'; // Changed to CSS module

function CreditScoreTips() {
  return (
    <div className={styles.credit_container}> {/* Updated */}
      <div className={styles.header}> {/* Updated */}
        <h1>Tips to Improve Your Credit Score</h1>
        <p>Follow these tips to maintain and improve your credit score effectively in India.</p>
      </div>

      <ul className={styles['tips-list']}> {/* Updated */}
        <li>
          <h2>1. Pay Your Credit Card Bills on Time</h2>
          <p>Timely payments build a positive credit history and improve your score significantly.</p>
        </li>
        <li>
          <h2>2. Avoid Delays in Loan EMI Payments</h2>
          <p>Ensure you never miss your EMI deadlines as they impact your payment history.</p>
        </li>
        <li>
          <h2>3. Keep Credit Utilization Below 30%</h2>
          <p>Maintain a low credit utilization ratio to show lenders you manage credit responsibly.</p>
        </li>
        <li>
          <h2>4. Check Your Credit Report Regularly</h2>
          <p>Review your credit report for errors and discrepancies that could negatively impact your score.</p>
        </li>
        <li>
          <h2>5. Avoid Frequent Loan Applications</h2>
          <p>Too many inquiries can signal financial distress and lower your score.</p>
        </li>
        <li>
          <h2>6. Use Different Types of Credit</h2>
          <p>Maintain a mix of secured and unsecured credit to demonstrate diverse credit management.</p>
        </li>
        <li>
          <h2>7. Close Unnecessary Credit Accounts</h2>
          <p>Too many open accounts can increase your risk profile, so close accounts you don't use.</p>
        </li>
        <li>
          <h2>8. Avoid Over-Borrowing</h2>
          <p>Borrow only what you can comfortably repay to maintain financial stability.</p>
        </li>
        <li>
          <h2>9. Automate Payments</h2>
          <p>Set up automatic payments to ensure you never miss due dates for loans or credit cards.</p>
        </li>
        <li>
          <h2>10. Negotiate Better Terms with Lenders</h2>
          <p>If you're struggling, discuss with lenders to restructure loans or lower interest rates.</p>
        </li>
        <li>
          <h2>11. Pay More Than the Minimum Due</h2>
          <p>Paying only the minimum keeps your balances high and impacts your score negatively.</p>
        </li>
        <li>
          <h2>12. Avoid Co-Signing Loans</h2>
          <p>Co-signing loans makes you liable for repayments, affecting your credit if defaults occur.</p>
        </li>
        <li>
          <h2>13. Opt for Longer Tenures Cautiously</h2>
          <p>While longer tenures lower EMIs, they also increase interest outgo, impacting your finances.</p>
        </li>
        <li>
          <h2>14. Maintain a Healthy Savings Fund</h2>
          <p>Having savings reduces the need for high-interest credit during emergencies.</p>
        </li>
        <li>
          <h2>15. Avoid Settling Loans</h2>
          <p>Settling loans for less than the due amount damages your credit history.</p>
        </li>
        <li>
          <h2>16. Report Identity Theft Immediately</h2>
          <p>Monitor for unauthorized activity and notify credit bureaus if theft occurs.</p>
        </li>
        <li>
          <h2>17. Avoid Closing Old Credit Accounts</h2>
          <p>Old accounts contribute positively to the length of credit history.</p>
        </li>
        <li>
          <h2>18. Use Credit Cards for Small Purchases</h2>
          <p>Frequent but small credit card use builds positive activity without risk.</p>
        </li>
        <li>
          <h2>19. Avoid Overdrafts</h2>
          <p>Frequent overdrafts signal financial mismanagement and harm your credit score.</p>
        </li>
        <li>
          <h2>20. Use Credit Monitoring Services</h2>
          <p>Stay informed about changes to your score and detect issues early.</p>
        </li>
        <li>
          <h2>21. Avoid Hard Inquiries</h2>
          <p>Limit the number of hard credit inquiries by spacing out loan applications.</p>
        </li>
        <li>
          <h2>22. Regularly Update Your Address with Credit Bureaus</h2>
          <p>Ensure all contact information is accurate to avoid missing important communications.</p>
        </li>
        <li>
          <h2>23. Use Secured Credit Cards if Needed</h2>
          <p>Secured cards can help rebuild your credit score by demonstrating responsible use.</p>
        </li>
        <li>
          <h2>24. Avoid Payday Loans</h2>
          <p>High-interest payday loans can trap you in debt and harm your credit profile.</p>
        </li>
        <li>
          <h2>25. Set Financial Goals</h2>
          <p>Plan and stick to financial goals to ensure steady credit improvement.</p>
        </li>
        <li>
          <h2>26. Avoid Bouncing Cheques</h2>
          <p>Cheques that bounce can reflect poorly on your financial reliability.</p>
        </li>
        <li>
          <h2>27. Ensure Utility Payments Are Timely</h2>
          <p>Pay utilities on time if they are reported to credit bureaus.</p>
        </li>
        <li>
          <h2>28. Diversify Income Sources</h2>
          <p>Having multiple income streams can increase your financial stability.</p>
        </li>
        <li>
          <h2>29. Review Loan Terms Carefully</h2>
          <p>Understand all terms before taking a loan to avoid financial stress.</p>
        </li>
        <li>
          <h2>30. Build an Emergency Fund</h2>
          <p>Emergency funds help you meet unexpected expenses without relying on credit.</p>
        </li>
      </ul>
    </div>
  );
}

export { CreditScoreTips };