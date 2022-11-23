import React from 'react';
import classes from './pagination.module.scss';
import Typography from 'components/typography';
import { DOTS, usePagination, UsePaginationProps } from 'hooks/usePagination';
import cn from 'classnames';
import Link from 'next/link';

interface Props extends UsePaginationProps {
  onPageChange: (value: number) => void;
  route: string;
}

const Pagination = (props: Props) => {
  const {
    totalCount,
    onPageChange,
    currentPage,
    pageSize,
    siblingCount = 1,
    showLastPage,
    route,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    showLastPage,
  });

  const currentRout = route.split('?')[0];

  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }
  const handleOnPageChange = (e: any, pageNumber: number) => {
    e.preventDefault();
    onPageChange(pageNumber);
  };
  return (
    <nav className={classes.Pagination}>
      <div className={classes.pages}>
        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <Typography key={i} size="size__16" fontWeight="black">
                &#8230;
              </Typography>
            );
          }
          return (
            <Link href={`${currentRout}?page=${pageNumber}`} key={pageNumber}>
              <a
                className={cn(classes.page, {
                  [classes.active]: pageNumber === currentPage,
                })}
                tabIndex={0}
                role="button"
                rel="canonical"
                onClick={(e) => handleOnPageChange(e, Number(pageNumber))}
                onKeyDown={(e) => handleOnPageChange(e, Number(pageNumber))}
              >
                <Typography size="size__16" fontWeight="black">
                  {pageNumber}
                </Typography>
              </a>
            </Link>
          );
        })}
      </div>
      <Typography color="secondary" size="size__14">
        {`Всего публикаций: ${totalCount}`}
      </Typography>
    </nav>
  );
};

export default Pagination;
