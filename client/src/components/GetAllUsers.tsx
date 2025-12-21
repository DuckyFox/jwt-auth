import React from "react";
import Button from "@/components/UI/Button";
import UserService from "@/services/UserServices";
import { UserInterface } from "@/models/UserInterface";

interface GetAllUsersProps {
  setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>;
}

const GetAllUsers = (props: GetAllUsersProps) => {
  const { setUsers } = props;

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Button
        onClick={() => getUsers()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
      >
        Загрузить всех пользователей
      </Button>
    </div>
  );
};

export default GetAllUsers;
