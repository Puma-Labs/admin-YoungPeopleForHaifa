import React, {useState} from 'react';
import PageHeader from "../../components/page/header/pageHeader";
import {useModal} from "../../customHooks/useModal";
import NotificationForm from "./notificationForm";

const Header = () => {
    const [search, setSearch] = useState('')
    const modal = useModal()

    return (
        <PageHeader
            search={search}
            setSearch={setSearch}
            title={"Notifications"}
            type={"add"}
            modal={modal}
            modalTitle={"Add notification"}
        >
            <NotificationForm onClose={modal.closeModal}/>
        </PageHeader>
    );
};

export default Header;
