import React, {useState, FC} from "react";
import classes from "./Paginator.module.css";
import cn from "classnames";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: FC<PropsType> = (
    {
        totalItemsCount,
        pageSize,
        currentPage,
        onPageChanged,
        portionSize = 10
    }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={classes.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>Prev</button>}

        {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map((page) => {
                return <span className={cn({
                    [classes.selectedPage]: currentPage === page
                }, classes.pageNumber)}
                             key={page}
                             onClick={(ev) => {
                                 onPageChanged(page);
                             }}>{page}</span>
            })}

        {portionCount > portionNumber &&
        <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>Next</button>}
    </div>
}

export default Paginator;