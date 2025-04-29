import Image from "next/image";

import styles from "./Pagination.module.css";

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: IPaginationProps) => {
  const maxVisiblePages = 3;

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeActive = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterActive = Math.ceil(maxVisiblePages / 2) - 1;

      if (currentPage <= maxPagesBeforeActive) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterActive >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeActive;
        endPage = currentPage + maxPagesAfterActive;
      }
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={`${styles.pagination} ${currentPage === 1 ? styles.active : ""}`}
        >
          <span className={styles.paginationContent}>1</span>
        </button>,
      );

      if (startPage > 2) {
        pages.push(
          <span key={"left-ellipsis"} className="text-xl font-semibold">
            ...
          </span>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`${styles.pagination} ${currentPage === i ? styles.active : ""}`}
        >
          <span className={styles.paginationContent}>{i}</span>
        </button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key={"right-ellipsis"} className={"text-xl font-semibold"}>
            ...
          </span>,
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`${styles.pagination} ${currentPage === totalPages ? styles.active : ""}`}
        >
          <span className={styles.paginationContent}>{totalPages}</span>
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-nowrap w-full">
      <button
        className={styles.button}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <div className={styles.buttonBox}>
          <span className={styles.buttonElem}>
            <Image
              src={"/icons/arrow.svg"}
              width={20}
              height={20}
              alt={"Назад"}
              loading={"lazy"}
              draggable={false}
            />
          </span>

          <span className={styles.buttonElem}>
            <Image
              src={"/icons/arrow.svg"}
              width={20}
              height={20}
              alt={"Назад"}
              loading={"lazy"}
              draggable={false}
            />
          </span>
        </div>
      </button>

      {renderPageNumbers()}

      <button
        className={`${styles.button} ${styles.nextPageButton}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <div className={styles.buttonBox}>
          <span className={styles.buttonElem}>
            <Image
              src={"/icons/arrow.svg"}
              width={20}
              height={20}
              alt={"Назад"}
              loading={"lazy"}
              draggable={false}
            />
          </span>

          <span className={styles.buttonElem}>
            <Image
              src={"/icons/arrow.svg"}
              width={20}
              height={20}
              alt={"Назад"}
              loading={"lazy"}
              draggable={false}
            />
          </span>
        </div>
      </button>
    </div>
  );
};
