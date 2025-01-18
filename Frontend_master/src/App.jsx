import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navigate } from 'react-router-dom';

<Route path="*" element={<Navigate to="/" replace />} />

import { LoginPage } from '../components/login_page';
import { OTPVerificationPage } from '../components/otp_login_page';
import { LoanApplicationForm } from '../components/application_form';
import { LoanApprovalStatus } from '../components/Automatic_loan_approval';
import { ChangesSaved } from '../components/changes_saved';
import { LoanDashboard } from '../components/loan_dashboard';
import { LoanApproval } from '../components/direct_loan_approval';
import { CreditScoreFactors } from '../components/factors_effecting_credit_score';
import { CreditScoreTips } from '../components/improve_credit_score';
import { ForgotPassword } from '../components/forgot_password';
import { LiveChat } from '../components/live_chat';
import { EmployeeLogin } from '../components/login_employees';
import { ReviewSubmitted } from '../components/Manual_loan_review';
import { PaymentScheduled } from '../components/payment_has_processed';
import { EditProfile } from '../components/profile_update';
import { UserRegistration } from '../components/Registration_page';
import { ChatSaved } from '../components/saveChat';
import { LoanRepaymentSchedule } from '../components/schedule_payment';
import { SupportTicket } from '../components/support_ticket';
import { TicketSubmitted } from '../components/ticket_submitted';
import { LoanManagement } from '../components/employee_dashboard';


function App() {
    return (
      <Router>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Registration_page" element={<UserRegistration />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/login_employees" element={<EmployeeLogin />} />
          <Route path="/otp_login_page" element={<OTPVerificationPage />} />
          <Route path="/application_form" element={<LoanApplicationForm />} />
          <Route path="/employee_dashboard" element={<LoanManagement />} />
          <Route path="/Automatic_loan_approval" element={<LoanApprovalStatus />} />
          <Route path="/Manual_loan_review" element={<ReviewSubmitted />} />
          <Route path="/direct_loan_approval" element={<LoanApproval />} />
          <Route path="/factors_effecting_credit_score" element={<CreditScoreFactors />} />
          <Route path="/improve_credit_score" element={<CreditScoreTips />} />
          <Route path="/live_chat" element={<LiveChat />} />
          <Route path="/saveChat" element={<ChatSaved />} />
          <Route path="/payment_has_processed" element={<PaymentScheduled />} />
          <Route path="/profile_update" element={<EditProfile />} />
          <Route path="/ticket_submitted" element={<TicketSubmitted />} />
          <Route path="/support_ticket" element={<SupportTicket />} />
          <Route path="/loan_dashboard" element={<LoanDashboard />} />
          <Route path="/changes_saved" element={<ChangesSaved />} />
          <Route path="/schedule_payment" element={<LoanRepaymentSchedule />} />

          <Route path="/login_page" element={<LoginPage />} />


      </Routes>
  </Router>
  
    );
}

export default App;
