import "./styles.sass";

import React, { FC, useState, useEffect, useMemo } from "react";
import { useStore } from "../../context/StoreContext";
import { observer } from "mobx-react-lite";
import "moment/locale/ru";
import QRForm from "./qrForm/QRForm"
import QRItem from "./QRItem"
import AddButton from "../../components/UI/addButton/AddButton";
import { QRId } from "../../models/IQR";
import Modal from "../../components/modal_/Modal";

const QR: FC = () => {
    const { qr } = useStore();
    
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
    
    useEffect(() => {
        qr.loadList()
            .then(() => {})
            .catch((err) => {
                console.error(err);
            });
    }, [qr]);

    const handleDelete = (id: QRId | null) => {
        qr.selectQR(id);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        if (qr.selected) {
            await qr.deleteOne(qr.selected)
        }
        setFormOpen(false);
        setDeleteConfirmationOpen(false);
    };

    const handleSelectQR = (id: QRId) => {
        return () => {
            qr.selectQR(id)
            setFormOpen(true);
        }
    }

    return (
        <>
            <div className="container qrs">
                <div className="title">Информация с QR кодами</div>
                <div className="qrs-container">
                    {
                        qr.getIds().map((id) => {
                            return (
                                <QRItem qr={qr.getById()[id]} 
                                    isSelected={qr.selected === id} 
                                    onSelect={handleSelectQR(id)} 
                                    key={id}
                                    onDelete={handleDelete}
                                />
                            )
                        })
                    }

                    <QRForm
                        isOpen={isFormOpen}
                        onClose={() => {
                            setFormOpen(false)
                            qr.selectQR(null)
                        }}
                        qrData={qr.selected ? qr.getById()[qr.selected] : null}
                        onDelete={handleDelete}
                    />

                    <Modal
                        showModal={isDeleteConfirmationOpen}
                        title="Вы уверены?"
                        message="Если вы удалите событие, то отменить это действие будет невозможно."
                        buttons={[
                            {
                                onPress: handleDeleteConfirmed,
                                label: "Удалить",
                            },
                        ]}
                        cancelButton={{
                            onPress: () => {
                                setDeleteConfirmationOpen(false)
                                if (!isFormOpen) {
                                    qr.selectQR(null);
                                }
                            },
                            label: "Отмена",
                        }}
                    />
                
                    <AddButton onClick={() => {
                        setFormOpen(true)
                    }} />
                </div>
            </div>
        </>
    )
}

export default observer(QR)

