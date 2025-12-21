"use client";

import React, { FormEvent, useState } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { useUser } from "@/store/store";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  const login = useUser((state) => state.login);
  const register = useUser((state) => state.register);

  return (
    <form onSubmit={(e) => formSubmitHandler(e)} className="space-y-4">
      <div>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Введите email"
          className="w-full px-4 py-3 bg-white text-black placeholder:text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
        />
      </div>
      <div>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Введите пароль"
          className="w-full px-4 py-3 bg-white text-black placeholder:text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <Button
          onClick={() => login(email, password)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
        >
          Войти
        </Button>
        <Button
          onClick={() => register(email, password)}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
        >
          Регистрация
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
