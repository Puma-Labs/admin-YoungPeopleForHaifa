import './styles.sass'

import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Spinner from '../../components/UI/spinner/Spinner'
import Emptiness from '../../components/UI/emptiness/Emptiness'
import Modal from '../../components/modal/Modal';
import Change from './bannerForm';
import BannerItem from './bannerItem';
import {useStore} from "../../context/StoreContext";
import Timofey from '../../assets/images/Timofey_avatar.png'
import Header from "./Header";
import Layout from "../../components/layout/layout";

const BannerList: FC = () => {
  const {banner} = useStore()
  const [modalAdd, setModalAdd] = useState(false)
  const [page] = useState<number>(1)

  useEffect(() => {
    banner.loadList(page).then(() => {}).catch(err => {
      console.error(err)
    })
  }, [banner, page])

  return (
    <div className="banner">
      <Header />
      <div className="body">
        <Layout length={4} isLoading={false}>
            <ul className={"itemsList"}>
                <BannerItem item={
                    {imgLink: '', title: "Cool banner", description: "Very cool", link: ''}
                } />
            </ul>
        </Layout>
      </div>

      <Modal show={modalAdd} onClose={(state) => setModalAdd(state)} size={{width: "70%", height: 850}}>
        <Change />
      </Modal>
    </div>
  );
};

export default observer(BannerList);
