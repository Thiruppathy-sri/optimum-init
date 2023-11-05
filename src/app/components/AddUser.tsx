"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useStore } from "../store/store";
import { POST } from "../api/users/route";
import { PUT } from "../api/users/[id]/route";
import Image from "next/image";

type Inputs = {
  name: string;
  salary: string;
  age: string;
  profileImage: any;
};

const AddUser = ({
  userToEdit,
  closeEditForm,
}: {
  userToEdit?: any;
  closeEditForm?: () => void | undefined;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const { users } = useStore();
  const setUser = useStore((store) => store.setUser);
  const updateUser = useStore((store) => store.updateUser);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  useEffect(() => {
    if (userToEdit) {
      reset(userToEdit);
    }
  }, [userToEdit, reset]);

  const onSubmit = async (data: any) => {
    if (userToEdit) {
      const result = await PUT({ ...data, profileImage: profileImage });
      updateUser({ ...data, profileImage: profileImage });
      reset();
      if (closeEditForm) {
        closeEditForm();
      }
      if (result.status === 200) {
        updateUser(data);
      }
    } else {
      const result = await POST({ ...data, profileImage: profileImage });
      if (result.status === 200) {
        setUser({ ...data, profileImage: profileImage });
        reset();
      }
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="name"
                  className="w-full border rounded-md py-2 px-3"
                />
              )}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="block text-gray-600">
              Salary
            </label>
            <Controller
              name="salary"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="salary"
                  className="w-full border rounded-md py-2 px-3"
                  pattern="^[1-9]\d*$"
                />
              )}
            />
            {errors.salary && (
              <p className="text-red-500">
                {errors.salary.type === "pattern"
                  ? "Please enter a positive whole number."
                  : "Salary is required"}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-600">
              Age
            </label>
            <Controller
              name="age"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="age"
                  className="w-full border rounded-md py-2 px-3"
                />
              )}
            />
            {errors.age && (
              <span className="text-red-500">Age is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-gray-600">
              Profile Image
            </label>
            <Controller
              name="profileImage"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="file"
                    id="profileImage"
                    className="w-full border rounded-md py-2 px-3"
                    onChange={(e) => {
                      const selectedFile =
                        e.target && e.target.files ? e.target.files[0] : null;
                      if (selectedFile) {
                        setProfileImage(URL.createObjectURL(selectedFile));
                      }
                    }}
                  />
                  {profileImage && (
                    <Image
                      src={profileImage}
                      width={200}
                      height={200}
                      alt="Profile Image Preview"
                      className="mt-2 max-w-full h-auto"
                    />
                  )}
                </>
              )}
            />
            {errors.profileImage && (
              <span className="text-red-500">Profile Image is required</span>
            )}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
