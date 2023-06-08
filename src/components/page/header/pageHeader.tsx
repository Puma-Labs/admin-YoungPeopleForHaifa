import React from 'react';
import Modal from "../../modal/Modal";
import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";
import {SearchIcon, AddIcon} from "../../../assets/icons";

interface PageHeaderProps {
    children: React.ReactNode,
    search: string,
    setSearch:  React.Dispatch<React.SetStateAction<string>>,
    title: string,
    type: 'add',
    modalTitle?: string,
    modal:  {
        showModal: boolean,
        setModalShow: React.Dispatch<React.SetStateAction<boolean>>,
        openModal: () => void,
        closeModal: () => void
    }
}
const PageHeader = ({children, search, setSearch, title, type, modal, modalTitle}: PageHeaderProps) => {
    return (
        <header className="sectionHeader">
            <div className="title">{title}</div>
            <div className="controls">
                <Input
                    id='search'
                    value={search}
                    onChange={setSearch}
                    type="text"
                    icon={<SearchIcon />}
                    placeholder="Search user by name"
                />
                {type === 'add' && (
                    <Button
                        icon={{ leftIcon: <AddIcon className='icon' /> }}
                        stylesType="round"
                        onClick={modal.openModal}
                    />
                )}
            </div>
            {type === 'add' && (
                <Modal
                    show={modal.showModal}
                    onClose={modal.setModalShow}
                    title={modalTitle}
                >
                    {children}
                </Modal>
            )}
        </header>
    )
};

export default PageHeader;
