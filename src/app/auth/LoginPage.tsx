import { AuthFormProvider } from "./hooks/useAuthForm";
import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <AuthFormProvider mode="login">
      <AuthLayout variant="login">
        <LoginForm />
      </AuthLayout>
    </AuthFormProvider>
  );
}
