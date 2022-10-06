import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './form.css';


const Form = () => {

    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('');

    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject,
        }
        
        tg.MainButton.setParams(JSON.stringify(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, street, subject]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)

        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps       
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'отправить данные',
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, street]);

    const onCountryHandler = (e) => {
        setCountry(e.target.value)
    }

    const onStreetHandler = (e) => {
        setStreet(e.target.value);
    }

    const onSubjectHandler = (e) => {
        setSubject(e.target.value);
    }

    return (
        <div className="form">
            <h3>Введите ваши данные</h3>
            <input value={country} onChange={onCountryHandler} className="input" type="text" placeholder="Страна" />
            <input value={street} onChange={onStreetHandler} className="input" type="text" placeholder="Улица" />
            <select value={subject} onChange={onSubjectHandler} className="select" name="select">
                <option value="psyhical">Физ. лиц</option>
                <option value="legal">Юр. лиц</option>
            </select>
        </div>
    )
}

export default Form;