'use client'

import React, {useState} from 'react';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

const LoginForm: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <form>
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
            <Button>Login</Button>
            <Button>Registration</Button>
        </form>
    );
};

export default LoginForm;