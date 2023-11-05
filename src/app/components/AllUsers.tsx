"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import Modal from "./Modal";
import User from "./User";
import { DELETE } from "../api/users/[id]/route";
import AddUser from "./AddUser";

function AllUsers(props: any) {
  const { users } = useStore();
  const { userData, selectedTab } = props;
  const deleteUser = useStore((state) => state.deleteUser);

  const handleDelete = (userId: any) => {
    deleteUser(userId);
    const result = DELETE(userId);
  };
  useEffect(() => {}, [userData]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [usersModal, setUserModal] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const openModal = (id: any) => {
    setModalOpen(true);
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        setUserModal(users[i]);
        return users[i];
      }
    }
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditOpen(false);
  };
  const openEditForm = (user: any) => {
    setUserToEdit(user);
    setEditOpen(true);
  };

  const closeEditForm = () => {
    setEditOpen(false);
  };

  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Salary</th>
                <th className="py-2 px-3 text-left">Age</th>
                <th className="py-2 px-3 text-left">
                  {" "}
                  {selectedTab === 2 ? "Edit" : "View"}
                </th>
                <th className="py-2 px-3 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item: any) => (
                <tr key={item.id} className="border-t border-indigo-300">
                  <td className="py-2 px-3">{item?.name}</td>
                  <td className="py-2 px-3">{item?.salary}</td>
                  <td className="py-2 px-3">{item?.age}</td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() =>
                        selectedTab === 2
                          ? openEditForm(item)
                          : openModal(item.id)
                      }
                    >
                      {selectedTab === 2 ? "Edit" : "View"}
                    </button>
                  </td>
                  <td className="py-2 px-3">
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <User user={usersModal} />
        </Modal>
        <Modal isOpen={isEditOpen} onClose={closeModal}>
          <AddUser userToEdit={userToEdit} closeEditForm={closeEditForm} />
        </Modal>
      </div>
    </>
  );
}

export default AllUsers;
