import React from 'react';
import Buy from './Buy'

const List = ({ numbers, onRemove  }) => (
  <ul>
    {
      numbers && numbers.map((number) => <li key={number.number}><Buy onRemove={onRemove} label={number.number} /></li>)
    }
  </ul>
  );

export default List;
