import React from "react";
import Button from "@/components/UI/Button";
import GetAllUsers from "@/components/GetAllUsers";
import { useUser } from "@/store/store";
import { UserInterface } from "@/models/UserInterface";
import AllUsersList from "@/components/AllUsersList";

interface UserWithAuthProps {
  setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>;
  users: UserInterface[];
}

const UserWithAuth = (props: UserWithAuthProps) => {
  const { users, setUsers } = props;

  const user = useUser((state) => state.user);
  const logout = useUser((state) => state.logout);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Привет, <span className="text-indigo-600">{user.email}</span>
            </h1>
            <p className="text-gray-500 mt-1">Вы успешно авторизованы</p>
          </div>
          <Button
            onClick={() => logout()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Выход
          </Button>
        </div>
      </div>

      {/* Actions Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <GetAllUsers setUsers={setUsers} />
      </div>

      {/* Users List */}
      <AllUsersList users={users} />
    </div>
  );
};

export default UserWithAuth;
