import React, {useState} from 'react';
import PageHeader from "../../components/page/header/pageHeader";
import {useModal} from "../../customHooks/useModal";
import BannerForm from "./bannerForm";

const Header = () => {
    const [search, setSearch] = useState('')
    const modal = useModal()

    return (
            <PageHeader
                    search={search}
                    setSearch={setSearch}
                    title={"Banners"}
                    type={"add"}
                    modal={modal}
                    modalTitle={"Add banner"}>
                    <BannerForm />
            </PageHeader>
    );
};

export default Header;
