import React from 'react';
import styles from '../styles/factors_effecting_credit_score.module.css'; // *Changed import to CSS Module*

export function CreditScoreFactors() {
  return (
    <div className={styles.factor_container}> {/* *Updated className to use CSS Module styles* */}
      <div className={styles.header}> {/* *Updated className to use CSS Module styles* */}
        <h1>Factors Affecting Your Credit Score</h1>
        <p>Understand the key elements that influence your credit score in India.</p>
      </div>

      <ul className={styles['factors-list']}> {/* *Updated className to use CSS Module styles* */}
        {[
          { title: '1. Payment History', description: 'Timely repayment of loans and credit card bills significantly impacts your credit score.' },
          { title: '2. Credit Utilization Ratio', description: 'Using a high percentage of your available credit limit can lower your score.' },
          { title: '3. Length of Credit History', description: 'The age of your credit accounts contributes to your creditworthiness.' },
          { title: '4. Credit Mix', description: 'A balanced mix of secured and unsecured credit enhances your score.' },
          { title: '5. Hard Inquiries', description: 'Frequent applications for credit can negatively affect your score.' },
          { title: '6. Outstanding Debt', description: 'High amounts of outstanding debt can lower your credit score.' },
          { title: '7. Loan Settlements', description: 'Settling loans for less than the due amount harms your credit history.' },
          { title: '8. Number of Credit Accounts', description: 'Having too many or too few accounts can impact your score.' },
          { title: '9. Late Payments', description: 'Delays in payments reflect poorly on your payment history.' },
          { title: '10. Defaulting on Loans', description: 'Defaulting on loans severely impacts your creditworthiness.' },
          { title: '11. Co-Signing Loans', description: 'If the primary borrower defaults, it affects your credit score.' },
          { title: '12. Overdrafts', description: 'Frequent overdrafts can signal poor financial management.' },
          { title: '13. Errors in Credit Report', description: 'Incorrect entries or fraudulent activities can lower your score.' },
          { title: '14. Lack of Credit History', description: 'No credit history makes it harder for lenders to assess your creditworthiness.' },
          { title: '15. High Credit Card Balances', description: 'Consistently carrying high balances lowers your score.' },
          { title: '16. Frequent Credit Card Cancellations', description: 'Closing old accounts shortens your credit history.' },
          { title: '17. Not Using Credit', description: 'Using no credit at all can result in a lack of credit history.' },
          { title: '18. High Debt-to-Income Ratio', description: 'Lenders consider high debt compared to income as risky.' },
          { title: '19. Multiple Loan Applications', description: 'Applying for multiple loans in a short time lowers your score.' },
          { title: '20. Unpaid Utility Bills', description: 'Unpaid bills reported to credit bureaus can impact your score.' },
          { title: '21. Bankruptcy', description: 'Filing for bankruptcy significantly lowers your credit score.' },
          { title: '22. Foreclosure', description: 'Losing property due to loan default negatively affects your score.' },
          { title: '23. Lack of Diverse Credit', description: 'Having only one type of credit account can lower your score.' },
          { title: '24. Ignoring Credit Report Updates', description: 'Failing to check your report for updates can lead to unnoticed issues.' },
          { title: '25. Changing Jobs Frequently', description: 'Instability in employment can indirectly affect your creditworthiness.' },
          { title: '26. Delay in Address Updates', description: 'Incorrect contact information can lead to missed communications.' },
          { title: '27. Using Multiple Credit Cards Excessively', description: 'Maxing out multiple cards can harm your credit score.' },
          { title: '28. Not Disputing Errors', description: 'Failing to dispute errors in your credit report can keep your score low.' },
          { title: '29. Relying on Payday Loans', description: 'High-interest payday loans can lead to financial stress and score reduction.' },
          { title: '30. Lack of Financial Planning', description: 'Poor financial planning can lead to defaults and lower your score.' },
        ].map((factor, index) => (
          <li key={index}>
            <h2>{factor.title}</h2>
            <p>{factor.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}