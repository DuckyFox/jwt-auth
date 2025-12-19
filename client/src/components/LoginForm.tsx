'use client'

import React, {FormEvent, useEffect, useState} from 'react';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import {useUser} from "@/store/store";
import {UserInterface} from "@/models/UserInterface";
import UserService from "@/services/UserServices";

const LoginForm: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [users, setUsers] = useState<UserInterface[]>([])
    const formSubmitHandler = (e: FormEvent) => {
        e.preventDefault()
    }

    const store = useUser()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, []);

    console.log(store.isLoading)

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    if (store.isLoading) {
        return <div>Загрузка</div>
    }

    else if (store.isAuth) {
        return (
            <div>
                <h1>{`Вход выполнен ${store.user.email}`}</h1>
                <Button onClick={()=>store.logout()}>Logout</Button>
                <Button onClick={() => getUsers()}>
                    Get all users
                </Button>
                {users.map((item)=><div key={item.email}>{item.email}</div>)}
            </div>

        )
    } else {
        return (
            <div>
                <form
                    onSubmit={(e) => formSubmitHandler(e)}
                >
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Enter e-mail'
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='text'
                        placeholder='Enter password'
                    />
                    <Button onClick={() => store.login(email, password)}>Login</Button>
                    <Button onClick={() => store.register(email, password)}>Registration</Button>
                </form>
                <Button onClick={() => getUsers()}>
                    Get all users
                </Button>
            </div>
        );
    }
};

export default LoginForm;