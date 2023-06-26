import "./styles.sass";
import "react-image-crop/dist/ReactCrop.css";

import React, { FC, useState, useRef, useEffect } from "react";

import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { getImageURL } from "../../utils";
import { getBase64Image } from "../../utils";
// import { getImageAsBase64 } from "../../utils";
import Button from "../UI/button/Button";
import coverEmpty from "../../assets/images/preview-empty.png";
import reloadIcon from "../../assets/icons/reload-icon.svg";
import tickIcon from "../../assets/icons/tick.svg";
import cropIcon from "../../assets/icons/crop-simple-solid.svg";

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

interface IImageLoader {
    onChange: (image: any) => void;
    image?: string;
}

const ImageLoader: FC<IImageLoader> = ({ onChange, image }) => {
    const [selectedImg, setSelectedImg] = useState("");
    const [editedImg, setEditedImg] = useState("");
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [aspect, setAspect] = useState<number | undefined>(16 / 9.5);
    const [result, setResult] = useState("");

    useEffect(() => {
      if (image) {
        setSelectedImg(image);
      }
    }, [image]);

    const selectFile = () => {
        if (!selectedImg) {
            document.getElementById("imageInputFile")?.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              console.log('load', reader.result?.toString());
              
              setSelectedImg(reader.result?.toString() || "")
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const cropImage = () => {
      if (image) {
        
        const base64 = getBase64Image(document.getElementById("imageid") as HTMLImageElement);
        setEditedImg(base64 || "");
      } else {
        setEditedImg(selectedImg);
      }
        // setEditedImg(selectedImg);
    };

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {      
        if (aspect) {
            const { width, height } = e.currentTarget;
            // console.log(e.currentTarget);
                      
            console.log(centerAspectCrop(width, height, aspect));
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    const saveImage = () => {
        if (!completedCrop || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const pixelCrop = {
            x: completedCrop.x * scaleX,
            y: completedCrop.y * scaleY,
            width: completedCrop.width * scaleX,
            height: completedCrop.height * scaleY,
        };

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            const base64data = canvas.toDataURL("image/jpeg", 0.8);
            console.log(base64data);

            setSelectedImg(base64data);
            handleCancelEditing();

            onChange(base64data);
        }
    };

    const handleDeleteImg = () => {
        if (selectedImg) {
            setSelectedImg("");
            setEditedImg("");
            setCrop(undefined);
            onChange("");
        }
    };

    const handleCancelEditing = () => {
        setEditedImg("");
        setCrop(undefined);
        setCompletedCrop(undefined);
        onChange("");
    };

    return (
        <div className="image-loader">
          {result && (
            <img src={result} alt=""></img>
          )}
            <input
                type="file"
                accept="image/*"
                id="imageInputFile"
                className="input-file"
                onChange={handleFileChange}
            />
            <div className={`workspace`} onClick={selectFile}>
                {editedImg ? (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => {
                            setCrop(percentCrop);
                        }}
                        onComplete={(c) => {
                            console.log("complete", c);

                            setCompletedCrop(c);
                        }}
                        aspect={aspect}
                    >
                        <img ref={imgRef} alt="Crop me" src={editedImg} />
                    </ReactCrop>
                ) : selectedImg || image ? (
                    <div className="add-image">
                        {/* <img src={selectedImg} alt="add cover" onLoad={onImageLoad}></img> */}
                        <img id="imageid" src={image ? getImageURL(image) : selectedImg} alt="add cover" onLoad={onImageLoad} crossOrigin="anonymous"></img>
                    </div>
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
                        className={`addBtn ${selectedImg ? "hidden" : ""}`}
                    />

                    <div className="icon-buttons">
                        {editedImg && (
                            <>
                                {completedCrop && (
                                    <Button
                                        className="tool-item"
                                        stylesType="icon"
                                        icon={{
                                            leftIcon: (
                                                <img className="icon-container tick-icon" src={tickIcon} alt=""></img>
                                            ),
                                        }}
                                        onClick={saveImage}
                                    />
                                )}

                                <Button
                                    className="tool-item"
                                    stylesType="icon"
                                    icon={{ leftIcon: <img className="icon-container" src={reloadIcon} alt=""></img> }}
                                    onClick={handleCancelEditing}
                                />
                            </>
                        )}

                        {selectedImg && !editedImg && (
                            <Button
                                className="tool-item"
                                stylesType="icon"
                                icon={{
                                    leftIcon: <img className="icon-container tick-icon" src={cropIcon} alt=""></img>,
                                }}
                                onClick={cropImage}
                            />
                        )}

                        <Button
                            disabled={!selectedImg}
                            className="tool-item"
                            stylesType="icon"
                            icon={{ leftIcon: <span className="_icon-ico-trash"></span> }}
                            onClick={handleDeleteImg}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageLoader;

