import { useEffect, useState } from 'react';
import './App.css'
import { Quote, useFetchQuotes, } from './hooks/useFetchQuotes'
import { LineWave } from 'react-loader-spinner';

function App() {
  const { quote, loading, fetchNextQuote } = useFetchQuotes();
  const [quotesArr, setQuotesArr] = useState<any[]>([]);
  const [quoteIndex, setQuoteIndex] = useState(0);


  useEffect(() => {
    if (!loading) {
      setQuotesArr((prevQuotes) => [...prevQuotes, quote]);
    }
  }, [loading, setQuotesArr]);

  const nextHandler = () => {
    if(quotesArr.length === (quoteIndex+1)) {
      setQuoteIndex(quoteIndex+1)
      fetchNextQuote();
    } 
    setQuoteIndex(quoteIndex+1)
  }

  const prevHandler = () => {
    const newIndex = quoteIndex <= 0 ?  0: quoteIndex -1;
    console.log(newIndex)

    setQuoteIndex(newIndex)
  }

  console.log(quotesArr)

  return (
    <>
      <div>
        {loading ? (
          <LineWave
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />) : (
          <>
            <div className='quoteContainer'>
              <blockquote>{quotesArr.length > 1 ? quotesArr[quoteIndex]?.content : quote?.content}</blockquote>
              <cite>{quotesArr.length > 1 ? quotesArr[quoteIndex]?.author : quote?.author}</cite>
            </div>

          </>
        )
        }
      </div >
      <button onClick={prevHandler}>Prev</button>
      <button onClick={nextHandler}>Next</button>
    </>
  )
}

export default App
