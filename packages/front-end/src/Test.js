import { useEffect, useState } from 'react';

export const Test = () => {
  const [stuff, setStuff] = useState({});
  

  const getStuff = async () => {
    const result = await fetch('http://localhost:4001/test')
    setStuff(await result.json())
  }
  
  useEffect(() => {
    getStuff()
  },[])

  return (
    <h1>
      {JSON.stringify(stuff)}
    </h1>
  )
}