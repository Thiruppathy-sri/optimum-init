"use client";
import React, { useEffect } from "react";
import { useStore } from "../store/store";
import Image from "next/image";

function User(props: any) {
  const { user } = props;
  console.log(props, "props");
  return (
    <>
      <h4>{user.id} </h4>
      <h4>{`Name: ${user.name}`}</h4>
      <h4>{`salary: ${user.salary}`}</h4>
      <h4>{`age: ${user.age}`}</h4>
      <Image src={user.profileImage} width={200} height={200} alt={"profile"} />
    </>
  );
}

export default User;
