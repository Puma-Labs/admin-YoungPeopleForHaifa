import './styles.sass'

import React, { FC } from 'react'
import { usePagination } from '../../../customHooks/usePagination'
import leftIcon from '../../assets/icons/arrow-left.svg'
import rightIcon from '../../assets/icons/arrow-right.svg'

interface IPagination {
    onPageChange: (page: number) => void,
    totalCount: number,
    siblingCount?: number,
    currentPage: number,
    pageSize?: number,
    className?: string
}

const ChPagination: FC<IPagination> = (
    {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize = 12,
        className
    }) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    })

    if (currentPage === 0 || (typeof paginationRange !== 'undefined' && paginationRange.length < 2)) {
        return null
    }

    function onNext() {
        onPageChange(currentPage + 1)
    }

    function onPrevious() {
        onPageChange(currentPage - 1)
    }

    function handlePageClick(number: number | string) {
        if (typeof number === 'number') {
            onPageChange(number)
        }
    }
    let lastPage = typeof paginationRange !== 'undefined' ? paginationRange[paginationRange.length - 1] : ''
    return (
        <div className='pagination'>
            <button
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={onPrevious}
            >
                <img src={leftIcon} alt="left" />
            </button>
            <div className="numbers">
                {paginationRange?.map((pageNumber, index) => {
                    if (pageNumber === '...') {
                        return <div className="else" key={`${pageNumber}-else-${index}`}>...</div>
                    }

                    return (
                        <button
                            key={pageNumber}
                            className={`number ${currentPage === pageNumber ? 'active' : ''}`}
                            onClick={() => handlePageClick(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    )
                })}
            </div>
            <button
                className={`next ${currentPage === lastPage ? 'disabled' : ''}`}
                onClick={onNext}
            >
                <img src={rightIcon} alt="right" />
            </button>
        </div>
    )
}

export default ChPagination
