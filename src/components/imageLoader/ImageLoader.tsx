import "./styles.sass";

import React, { FC, useState, useRef, useEffect } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop } from "react-image-crop";
import Emptiness from "../UI/emptiness/Emptiness";
import Button from "../UI/button/Button";
import Gosa from "../../assets/images/Gosa_avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddIcon } from "../../assets/icons";
import { $public } from "../../http";
import axios from "axios";
import coverEmpty from "../../assets/images/preview-empty.png";
import reloadIcon from "../../assets/icons/reload-icon.svg";
import tickIcon from "../../assets/icons/tick.svg"

export interface IImageLoader {
    onChange: (image: any) => void;
    type?: 1 | number;
    error?: boolean;
    multi?: boolean;
    value?: string;
}

const ImageLoader: FC<IImageLoader> = ({ onChange, type, error, multi = false, value }) => {
    const [isLoop, setLoop] = useState<any>();
    const [fileURL, setURLFile] = useState<any>(null);
    const [crop, setCrop] = useState<Crop>();
    const [proportion, setProportion] = useState<any>(type ? type : 1)
    const [listImage, setListImg] = useState<any>([]);
    const [cropImage, setCropImage] = useState<string>();

    const image = useRef<any>();
    const inputFile = useRef<any>(null);

    const handleFileChange = (e: any) => {
        setURLFile(URL.createObjectURL(e.target?.files[0]));
        // onChange(URL.createObjectURL(e.target?.files[0]));
    };

    const handleCropChange = (dataCrop: Crop) => {
      setCrop(dataCrop);
    }

    function getCroppedImg() {      
        // setCrop(dataCrop);
        clearTimeout(isLoop);

        setLoop(
            setTimeout(() => {
                if (typeof crop !== "undefined") {
                    const canvas = document.createElement("canvas");
                    const scaleX = image.current.naturalWidth / image.current.width;
                    const scaleY = image.current.naturalHeight / image.current.height;
                    canvas.width = proportion === 1 ? 960 : 318;
                    canvas.height = proportion === 1 ? 960 : 188;
                    const ctx = canvas.getContext("2d");

                    ctx?.drawImage(
                        image.current,
                        crop.x * scaleX,
                        crop.y * scaleY,
                        crop.width * scaleX,
                        crop.height * scaleY,
                        0,
                        0,
                        proportion === 1 ? 960 : 318,
                        proportion === 1 ? 960 : 188
                    );
                    if (multi) {
                        setCropImage(ctx?.canvas.toDataURL("image/jpeg", 0.8) ?? "");
                    } else {
                        const croppedImg = ctx?.canvas.toDataURL("image/jpeg", 0.8)
                        console.log(ctx?.canvas.toDataURL("image/jpeg", 0.8));

                        setURLFile(croppedImg);

                        onChange(ctx?.canvas.toDataURL("image/jpeg", 0.8) ?? "");
                    }
                }
            }, 500)
        );
    }

    function selectFile() {
        if (!fileURL) {
            document.getElementById("imageInputFile")?.click();
        }
    }

    function turnProportion() {
        if (typeof proportion === "undefined") {
            setProportion(1);
        } else {
            if (proportion === 1) {
                setProportion(1);
            } else {
                setProportion(2.3);
            }
        }
        setCrop(undefined);
    }

    useEffect(() => {
        turnProportion();
    }, []);

    function save() {
        setListImg([...listImage, cropImage]);
        setURLFile(null);
        setCrop(undefined);
        onChange(listImage ?? "");
    }

    function cancel() {
        if (fileURL) {
            setURLFile(null);
            setCrop(undefined);
            onChange("");
        }
    }

    function del(indexInList: number) {
        let newListImage = JSON.parse(JSON.stringify(listImage));
        newListImage.splice(indexInList, 1);
        setListImg(newListImage);
    }

    return (
        <div className={`image-loader`}>
            <input
                ref={inputFile}
                type="file"
                accept="image/*"
                id="imageInputFile"
                className="input-file"
                onChange={handleFileChange}
            />
            <div className={`workspace ${error ? "error" : ""}`} onClick={selectFile}>
                {fileURL ? (
                    <>
                        <ReactCrop crop={crop} aspect={proportion} onChange={handleCropChange}>
                            <img ref={image} src={fileURL} alt="original" className="original" />
                        </ReactCrop>
                    </>
                ) : (
                    <div className="add-image">
                        <img src={coverEmpty} alt="add cover"></img>
                    </div>
                )}
            </div>
            <div className="toolContainer">
                <div className="tools">
                    <Button
                        label="Добавить"
                        stylesType="text"
                        icon={{ leftIcon: <span className="_icon-ico-plus" /> }}
                        onClick={selectFile}
                    />
                    {multi && (
                        <Button
                            disabled={!fileURL}
                            className="tool-item"
                            stylesType="success"
                            label="Сохранить"
                            onClick={save}
                        />
                    )}
                    <div className="icon-buttons">
                        <Button
                            className="tool-item"
                            stylesType="icon"
                            icon={{ leftIcon: <img className="icon-container tick-icon" src={tickIcon} alt=""></img> }}
                            onClick={getCroppedImg}
                        />
                        <Button
                            className="tool-item"
                            stylesType="icon"
                            icon={{ leftIcon: <img className="icon-container" src={reloadIcon} alt=""></img> }}
                            // onClick={cancel}
                        />
                        <Button
                            disabled={!fileURL}
                            className="tool-item"
                            stylesType="icon"
                            icon={{ leftIcon: <span className="_icon-ico-trash"></span> }}
                            onClick={cancel}
                        />
                    </div>

                </div>
                {multi && (
                    <div className="containerListImage">
                        <div className="listImg">
                            {listImage.map((item: string, index: number) => (
                                <div key={`image-list-${index}`} className="itemImage">
                                    <div className="delete">
                                        <FontAwesomeIcon icon="close" onClick={() => del(index)} />
                                    </div>
                                    <img src={item} alt="" />
                                </div>
                            ))}
                            <div className={`itemImageAdd ${fileURL && "disabled"}`} onClick={() => selectFile()}>
                                <FontAwesomeIcon icon="plus" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageLoader;

