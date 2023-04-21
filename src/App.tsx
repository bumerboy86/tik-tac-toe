import { useCallback, useState } from 'react';
import styles from './App.module.css';
import { Tabs } from './components/Tabs/Tabs';
import { Backdrop } from './components/Bacdrop/Backdrop';
import { ITabsItem } from './interfaces/ITabsItem';
import { IWinner } from './interfaces/IWinner';

const App = () => {
  const initialMovie: Number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const initialTabs:  ITabsItem[] = [
    {id: 0, val: ''},
    {id: 1, val: ''},
    {id: 2, val: ''},
    {id: 3, val: ''},
    {id: 4, val: ''},
    {id: 5, val: ''},
    {id: 6, val: ''},
    {id: 7, val: ''},
    {id: 8, val: ''},
  ]

  const winArr = [
    { a: 0, b: 1, c: 2 },
    { a: 3, b: 4, c: 5 },
    { a: 6, b: 7, c: 8 },
    { a: 0, b: 4, c: 8 },
    { a: 2, b: 4, c: 6 },
    { a: 0, b: 3, c: 6 },
    { a: 1, b: 4, c: 7 },
    { a: 2, b: 5, c: 8 },
];
  const [movies, setMovies] = useState<number>(9);
  const [win, setWin] = useState<IWinner>({winner: '', winning: false});
  const [movesArr, setMovesArr] = useState<Number[]>(initialMovie);
  const [tabsArr, setTabsArr] = useState<ITabsItem[]>(initialTabs);

  const clearHandler = () => {
    setMovesArr(initialMovie);
    setTabsArr(initialTabs);
    setWin({winner: '', winning: false});
    setMovies(9);
  }

  const checkWin = useCallback((arr: {id: number, val: string}[], text: string) => {
    for (let i = 0; i < winArr.length; i++) {
        if (arr[winArr[i].a].val === text && arr[winArr[i].b].val === text && arr[winArr[i].c].val === text) {
         setWin({winner: text === 'x' ? 'Human win!!!' : 'CPU win!!!', winning: true});
         return true;
        }
    }
    return false;
  }, [])


  const cpuMovieHandler = (arr: Number[], mov: number) => {
    let nummber = ~~(Math.random() * arr.length);
    const newMoviesArr: Number[] = [...arr].filter(item => item !== arr[nummber]);

    const newArr = [...tabsArr].map(key => {
      if (key.id === arr[nummber] && key.val.trim().length === 0) {
        key.val = 'o'
        }
      return key;
      });

    setTabsArr(newArr);
    const win = checkWin(newArr, 'o');
    if (!win) {
      const newMovies = mov - 1
      setMovies(newMovies);
    }
    setMovesArr(newMoviesArr);
  }

  const tikHandler = (data: {id: number, val: string}) => {
    if (!win.winner && tabsArr[data.id].val === '') {
      const newArr = [...tabsArr].map(key => {
        if (key.id === data.id && key.val.trim().length === 0) {
          key.val = data.val
          }
        return key;
        });
  
      setTabsArr(newArr);

      const newMoviesArr: Number[] = [...movesArr].filter(item => item !== data.id);
      setMovesArr(newMoviesArr);
  
      const win = checkWin(newArr, 'x');
      const newMovies = movies - 1;
      setMovies(newMovies);
      newMovies === 0 && setWin({winner: 'Draw!!!', winning: true});
      if (!win && newMovies > 0) {
        cpuMovieHandler(newMoviesArr, newMovies);
      }
    }
  }

  return (
    <div className={styles.App}>
      {win.winning && <Backdrop fn={() =>  setWin(prev => ({...prev, winning: false}))} data={win.winner}/>}
      <div className={styles.container}>
        <div className={styles.btnBox}>
            <button className={`${styles.clear} ${styles.btn}`} onClick={clearHandler}>Старт</button>
        </div>
        <div id={styles.place}>
            {tabsArr.length && tabsArr.map(item => <Tabs key={item.id} data={item.val} fn={() => tikHandler({id: item.id, val: 'x' })} />
            )}
        </div>
      </div>
    </div>
  )
}

export default App;
