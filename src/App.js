import React, {useEffect, useRef, useState} from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const initialUSDNum = 1;

  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(initialUSDNum);

  const ratesRef = useRef({});

  useEffect(() => {
      fetch(`https://v6.exchangerate-api.com/v6/af85b4fed255e521f4ce6f29/latest/${fromCurrency}`)
          .then(res => res.json())
          .then((json) => {
              ratesRef.current = json.conversion_rates;
              onChangeToPrice(initialUSDNum);
      }).catch((err) => console.warn(err));
  },[]);

    const onChangeFromPrice = (value) => {
      const price = value / ratesRef.current[fromCurrency];
      const result = price * ratesRef.current[toCurrency];
      setToPrice(result.toFixed(3));
      setFromPrice(value);
    }

    useEffect(() => {
        onChangeFromPrice(fromPrice);
    },[fromCurrency]);

    useEffect(() => {
        onChangeToPrice(toPrice);
    },[toCurrency]);

    const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
        setFromPrice(result.toFixed(3));
        setToPrice(value);
    }

  return (
    <div className="App">
      <Block value={fromPrice}
             currency={fromCurrency}
             onChangeCurrency={(cur) => setFromCurrency(cur)}
             onChangeValue={onChangeFromPrice}
      />
      <Block value={toPrice}
             currency={toCurrency}
             onChangeCurrency={(cur) => setToCurrency(cur)}
             onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
