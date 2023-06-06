import React, {FormEvent, useEffect, useState} from 'react';
import Input from "../../components/UI/input/Input";
import Textarea from "../../components/UI/input/Textarea";
import Select, {IListItem} from "../../components/UI/select/Select";
import {useSelect} from "../../customHooks/useSelect";
import Button from "../../components/UI/button/Button";
import {INotification} from "../../models/INotification";

interface NotificationFormProps {
    onClose: () => void
}

const defaultData = {
    title: '',
    message: '',
    date: '',
    time: '',
    when: '1'
}

const NotificationForm = ({onClose}: NotificationFormProps) => {
    const [formData, setFormData] = useState<INotification>(defaultData)
    const timeSelect = useSelect({value: '1', label: 'Now'})
    const addressee = useSelect({value: '0', label: 'All'})
    const [isDatesDisabled, setIsDatesDisables] = useState(false)

    useEffect(() => {
        timeSelect.selected.value === '2' ?
            setIsDatesDisables(false)
            : setIsDatesDisables(true)
    }, [timeSelect.selected])

    function handleInputChange(name: string) {
        return function (value: string) {
            setFormData({...formData, [name]: value})
        }
    }

    function handleSelectChange(option: IListItem) {
        timeSelect.handleSelect(option)
        setFormData({...formData, when: option.value})
    }

    function resetForm() {
        setFormData(defaultData)
    }

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        onClose()
    }
    return (
        <form onSubmit={onSubmit}>
            <Input
                placeholder="Enter notification title"
                label={"Title"}
                onChange={handleInputChange('title')}
                value={formData.title}
            />
            <Textarea
                placeholder="Enter notification message"
                label={"Message"}
                onChange={handleInputChange('message')}
                value={formData.message}
            />
            <div className="inputGroup">
                <Select
                    list={[
                        {value: '1', label: 'Now'},
                        {value: '2', label: 'Schedule'}
                    ]}
                    onChange={handleSelectChange}
                    selected={timeSelect.selected}
                    label="Choose publication date"
                />
                <Input
                    label="Date"
                    onChange={handleInputChange('date')}
                    value={formData.date}
                    type="date"
                    className="dateInput"
                    disabled={isDatesDisabled}
                />
                <Input
                    label="Time"
                    onChange={handleInputChange('time')}
                    value={formData.time}
                    type="time"
                    className="dateInput"
                    disabled={isDatesDisabled}
                />
            </div>
            <Select
                label="Addressee"
                list={[
                    {value: '0', label: 'All'},
                    {value: '1', label: 'Workers'},
                    {value: '2', label: 'Clients'}
                ]}
                onChange={addressee.handleSelect} selected={addressee.selected} />
            <div className="btn-group">
                <Button label='Reset' type="reset" stylesType='border' onClick={resetForm} />
                <Button label='Save' type="submit" />
            </div>
        </form>
    );
};

export default NotificationForm;
