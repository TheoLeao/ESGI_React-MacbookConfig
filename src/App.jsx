import { useState } from 'react';
import styles from './App.module.scss';
import macbookImage from './assets/macbookImage.jpeg';

function App() {
  const [count, setCount] = useState(0)
  const options = {
    processor: [
      { name: "Processeur Intel Core i7 hexacœur de 9e génération à 2,6 GHz (Turbo Boost jusqu’à 4,5 GHz)", price: 0 },
      { name: "Processeur Intel Core i9 8 cœurs de 9e génération à 2,4 GHz (Turbo Boost jusqu’à 5 GHz)", price: 360 }
    ],
    memory: [
      { name: "16 Go de mémoire DDR4 à 2 400 MHz", price: 0 },
      { name: "32 Go de mémoire DDR4 à 2 400 MHz", price: 480 }
    ],
    gpu: [
      { name: "Radeon Pro 555X avec 4 Go de mémoire GDDR5", price: 0 },
      { name: "Radeon Pro 560X avec 4 Go de mémoire GDDR5", price: 120 }
    ],
    storage: [
      { name: "SSD de 256 Go", price: 0 },
      { name: "SSD de 512 Go", price: 240 },
      { name: "SSD de 1 To", price: 480 },
      { name: "SSD de 2 To", price: 960 },
      { name: "SSD de 4 To", price: 1920 }
    ],
    finalCut: {
      name: "Final Cut Pro X",
      price: 329.99
    },
    logicPro: {
      name: "Logic Pro X",
      price: 229.99
    }
  };

  const [processor, setProcessor] = useState(0);
  const [memory, setMemory] = useState(0);
  const [gpu, setGpu] = useState(0);
  const [storage, setStorage] = useState(0);
  const [finalCut, setFinalCut] = useState(false);
  const [logicPro, setLogicPro] = useState(false);

  const OptionType = {
    processor: "processor",
    memory: "memory",
    gpu: "gpu",
    storage: "storage",
    finalCut: "finalCut",
    logicPro: "logicPro"
  }

  const total = 2699 + options.processor[processor].price + options.memory[memory].price + options.gpu[gpu].price + options.storage[storage].price + (finalCut && options.finalCut.price) + (logicPro && options.logicPro.price);

  const OptionGroup = ({ option, selected, onClick, type }) => {
    return <div className={`${styles.option} ${selected && styles.selected}`} onClick={onClick}>
      <span>{option.name}</span>
      {!selected && <span>{option.price - options[type][eval(type)].price}€</span>}
    </div>
  }
  const SingleOption = ({ option, onClick, type, selected }) => {
    return <div>
      <h4>{option.name}</h4>
      <div className={styles.singleOptionButtons}>
        <div className={`${styles.button} ${!selected && styles.selected}`} onClick={() => onClick(false)}>
          <span className={styles.title}>Aucun</span>
          {selected && <span>- {options[type].price}€</span>}
        </div>
        <div className={`${styles.button} ${selected && styles.selected}`} onClick={() => onClick(true)}>
          <span className={styles.title}>{option.name}</span>
          {!selected && <span>+ {options[type].price}€</span>}
        </div>
      </div>
    </div>
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.visualisation}>
          <img src={macbookImage}></img>
        </div>
        <div className={styles.options}>
          <h3>Processor</h3>
          {options.processor.map((option, i) => {
            return <OptionGroup option={option} onClick={() => setProcessor(i)} selected={processor == i} type={OptionType.processor}></OptionGroup>
          })}
          <h3>Mémoire RAM</h3>
          {options.memory.map((option, i) => {
            return <OptionGroup option={option} onClick={() => setMemory(i)} selected={memory == i} type={OptionType.memory}></OptionGroup>
          })}
          <h3>Graphismes</h3>
          {options.gpu.map((option, i) => {
            return <OptionGroup option={option} onClick={() => setGpu(i)} selected={gpu == i} type={OptionType.gpu}></OptionGroup>
          })}
          <h3>Storage</h3>
          {options.storage.map((option, i) => {
            return <OptionGroup option={option} onClick={() => setStorage(i)} selected={storage == i} type={OptionType.storage}></OptionGroup>
          })}
          <h3>Logiciels préinstallés</h3>
          <SingleOption option={options.finalCut} selected={finalCut} onClick={setFinalCut} type={OptionType.finalCut}></SingleOption>
          <SingleOption option={options.logicPro} selected={logicPro} onClick={setLogicPro} type={OptionType.logicPro}></SingleOption>
        </div>
      </div>
      <div className={styles.footer}>
        Prix: {total}€
      </div>
    </div>
  )
}

export default App