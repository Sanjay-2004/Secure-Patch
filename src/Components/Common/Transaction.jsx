import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Transaction() {
    useEffect(() => {
        transactionHistory();
    }, []);
    const [cardData, setCardData] = useState([]);
    const [error, setError] = useState("");

    const transactionHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:8080/transactions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setCardData(response.data);
        } catch (error) {
            setError(error);
        }
        let history = document.createElement('div')
        history.className = "card"

    }
    return (
        <div className='container my-2 '>
            {error ? (
                <div className='alert alert-danger' role='alert'>
                    Error: {error}
                </div>
            ) : (cardData.map((cdata) => (
                <div className='card mb-3' key={cdata._id}>
                    <h5 className='card-header text-center'>{cdata.transactionHash}</h5>
                    <div className='card-body'>
                        <h5 className='card-title'>Sender: {cdata.sender}</h5>
                        <h5 className='card-title'>Receiver: {cdata.receiver}</h5>
                        <p className='card-text'>Block Hash: {cdata.blockHash}</p>
                        <p className='card-text'>Block Number: {cdata.blockNumber}</p>
                        <p className='card-text'>Gas Used: {cdata.gasUsed}</p>
                        <p className='card-text'>Transaction Message: {cdata.transactionDone}</p>
                    </div>
                    <div className='card-footer text-body-secondary'>
                        {new Date(cdata.date).toLocaleString()}
                    </div>
                </div>
            )))}
        </div>
    )
}