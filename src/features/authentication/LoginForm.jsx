import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
function LoginForm() {
  const [email, setEmail] = useState("faisalharray@evowebx.com");
  const [password, setPassword] = useState("190204");
  const { Login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password) return;
    Login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Button size="large">{!isLoading ? "Log in" : <SpinnerMini />}</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
