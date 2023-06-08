import './styles.sass'

import React, {useState} from 'react';
import ImageLoader from '../../components/imageLoader/ImageLoader';
import Button from '../../components/UI/button/Button';
import {IBanner} from '../../models/IBanner';
import Input from '../../components/UI/input/Input';
import Spinner from '../../components/UI/spinner/Spinner';
import {useStore} from "../../context/StoreContext";

export interface BannerFormProps {
  bannerData?: IBanner
  onSave?: () => void
}

const BannerForm = ({onSave, bannerData}: BannerFormProps) => {
  const {banner} = useStore()
  const [newBanner, setNewBanner] = useState<IBanner>({} as IBanner)
  const [loading, setLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  function setChange(e: any) {
    e.preventDefault()
    setLoading(true)
    setImageError(false)
    if(newBanner.imgLink && newBanner.imgLink.length > 0) {
      banner.createOne(newBanner).then(() => {
        // if(onSave) { onSave() }
      }).catch(e => {
        console.error(e)
      }).finally(() =>  setLoading(false))
    } else {
      setLoading(false)
      setImageError(true)
    }
  }

  return (
    <>
      {!loading ? (
        <>
          <ImageLoader error={imageError} onChange={(image: string) => setNewBanner({...newBanner, imgLink: image})} type={2} />
          <form onSubmit={(e) => setChange(e)} className="main-info">
            <Input inputContainer="mainInput" required={true} label="Название" value={newBanner.title} type="text" onChange={(value) => setNewBanner({...newBanner, title: value})}/>
            <Input inputContainer="mainInput" required={true} label="Link на баннере" value={newBanner.link} type="text" onChange={(value) => setNewBanner({...newBanner, link: value})}/>
            <Input inputContainer="mainInput" required={true} label="Описание" value={newBanner.description} type="text" onChange={(value) => setNewBanner({...newBanner, description: value})}/>
            <Button type="submit" label="Сохранить" className="sendMainInfo" />
          </form>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default BannerForm;
