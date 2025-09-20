import { useEffect, useState } from "react";


const Wordcounter = () => {
    const [text , setText] = useState('');
    const [count , setCount] = useState([]);

    const handelCount = () => {
        let cleandText = text.toLowerCase().replace(/[^a-z\s]/g , '');
        let Words = cleandText.split(/[\s+]/).filter(Boolean);

        const freqMap = new Map();
        for(let word of Words){
            if(freqMap.has(word)){
                freqMap.set(word , freqMap.get(word) + 1);
            }else{
                freqMap.set(word,1);
            }
        }

        let entries = Array.from(freqMap.entries());
        let sortedWords = entries.sort((a,b) => b[1] - a[1]);

        setCount(sortedWords);
    }

    useEffect(()=>{
        handelCount();
    },[text]);

    return (
        <div className="wordCounter">
            <h1 className='title'>Word Counter</h1>

            <div className="container">
                <textarea
                    className="textarea"
                    placeholder="Type your text here"
                    data-testid="textarea"
                    rows={6}
                    cols={50}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                
                <div className="results">
                    <h3 className='result-title'>Word Frequencies</h3>
                    {
                        count.length > 0 && (
                            <ul>
                                {
                                    count.map(([word , freq]) => (
                                        <li className="list">
                                            <strong>{word}</strong> count: {freq};
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Wordcounter
