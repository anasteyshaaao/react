import React, { useState } from 'react';
import UseEffectExample from './UseEffectExample';

const Peremennaya = ({setCount, count}) => <button onClick={() => {setCount((prevCount) => prevCount + 1)
  setCount((prevCount) => prevCount + 1)

}}>Увеличить счетчик</button>;

function CounterWithEffect() {
  const [count, setCount] = useState(0);
  const [showEffect, setShowEffect] = useState(true); // Состояние для показа/скрытия UseEffectExample
  
  return (
    <div>
      <h2>useState Пример</h2>
      <p>Текущее значение счетчика: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить счетчик</button>
<Peremennaya setCount={setCount} count={count}> 

</Peremennaya>
      {/* Кнопка для показа/скрытия UseEffectExample */}
      <button onClick={() => setShowEffect(!showEffect)}>
        {showEffect ? 'Скрыть UseEffectExample' : 'Показать UseEffectExample'}
      </button>

      {/* Условный рендеринг UseEffectExample */}
      {showEffect && <UseEffectExample />}

      {/* Добавляем ReduxCounter */}
     
    </div>
  );
}

export default CounterWithEffect;