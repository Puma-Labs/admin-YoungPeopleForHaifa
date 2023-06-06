import { useState } from "react";

export function useModal() {
    const [showModal, setModalShow] = useState(false)

    function openModal() {
        setModalShow(true)
    }

    function closeModal() {
        setModalShow(false)
    }
    return { showModal, setModalShow, openModal, closeModal }
}
