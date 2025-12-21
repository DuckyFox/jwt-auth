import React from "react";
import { UserInterface } from "@/models/UserInterface";
import UserItem from "@/components/UserItem";

interface AllUsersListProps {
  users: UserInterface[];
}

const AllUsersList = (props: AllUsersListProps) => {
  const { users } = props;

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-500 text-lg">Список пользователей пуст</p>
        <p className="text-gray-400 text-sm mt-2">
          Нажмите кнопку выше, чтобы загрузить пользователей
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Список пользователей ({users.length})
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserItem key={user.email} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AllUsersList;
