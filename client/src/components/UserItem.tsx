import React from "react";
import { UserInterface } from "@/models/UserInterface";

interface UserItemProps {
  user: UserInterface;
}

const UserItem = (props: UserItemProps) => {
  const { user } = props;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100 hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          <p className="text-sm font-medium text-gray-600">Email</p>
        </div>
        <p className="text-gray-800 font-semibold break-words">{user.email}</p>
        <div className="pt-2 border-t border-indigo-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Статус активации:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.isActivated
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.isActivated ? "Активирован" : "Не активирован"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
