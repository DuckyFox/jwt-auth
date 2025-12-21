"use client";

import React, { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} />;
};

export default Input;
