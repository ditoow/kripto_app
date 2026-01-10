import { AuthFormProvider } from "./hooks/useAuthForm";
import AuthLayout from "./components/AuthLayout";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthFormProvider mode="register">
      <AuthLayout variant="register">
        <RegisterForm />
      </AuthLayout>
    </AuthFormProvider>
  );
}
