"use client";

import React, { useEffect, useState } from "react";
import { UserInterface } from "@/models/UserInterface";
import { useUser } from "@/store/store";
import UserWithAuth from "@/components/UserWithAuth";
import GetAllUsers from "@/components/GetAllUsers";
import LoginForm from "@/components/LoginForm";

const VisualiseSection = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  const isLoading = useUser((state) => state.isLoading);
  const isAuth = useUser((state) => state.isAuth);

  const checkAuth = useUser((state) => state.checkAuth);

  useEffect(() => {
    if (typeof(window) !== 'undefined' && localStorage.getItem("token")) {
      checkAuth();
    }
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Загрузка...</p>
        </div>
      </div>
    );
  } else if (isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <UserWithAuth setUsers={setUsers} users={users} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Добро пожаловать
              </h1>
              <p className="text-gray-600">Войдите или зарегистрируйтесь</p>
            </div>
            <LoginForm />
            <div className="mt-6 pt-6 border-t border-gray-200">
              <GetAllUsers setUsers={setUsers} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default VisualiseSection;
