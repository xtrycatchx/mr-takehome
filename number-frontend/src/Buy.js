import React from 'react';

const Buy = ({ label, onRemove }) => {
  const onBuyNumber = (fun, label) => {
    fetch('http://localhost:8881/api/buy', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        number: label
      })
    })

    fun(label)
  }

  return (<button onClick={() => onBuyNumber(onRemove, label)}>{label}</button>)
}

export default Buy;


