import React, { Dispatch } from "react";
import { indexType } from "../assets/type/homeType";
import { Pagination as BootstrapPagination } from "react-bootstrap";
const Pagination = ({
  post_count,
  setShowIndex,
  setIndex,
  index,
  showIndex
}: {
  post_count: number;
  setShowIndex: any;
  setIndex:any;
  showIndex:number;
  index:{ start: number; end: number };
}) => {
  const next = (reset: boolean = false) => {
    if (post_count != 0) {
      if (reset) {
        setShowIndex(post_count / 5);
        setIndex(() => {
          return { start: post_count - 5, end: post_count };
        });
      } else {
        if (index.end < post_count) {
          setShowIndex((value: number) => value + 1);
          setIndex((state: indexType) => {
            return { start: state.start + 5, end: state.end + 5 };
          });
        }
      }
      // refetch();
    }
  };

  const prev = (reset: boolean = false) => {
    if (post_count != 0) {
      if (reset) {
        setShowIndex(1);
        setIndex(() => {
          return { start: 0, end: 5 };
        });
      } else {
        if (index.start != 0) {
          setShowIndex((value:number) => value - 1);
          setIndex((state: indexType) => {
            return { start: state.start - 5, end: state.end - 5 };
          });
        }
      }
      // refetch();
    }
  };
  return (
    <BootstrapPagination className="m-auto">
    <BootstrapPagination.First onClick={() => prev(true)} />
    <BootstrapPagination.Prev onClick={() => prev()} />
    <BootstrapPagination.Item>{showIndex}</BootstrapPagination.Item>
    <BootstrapPagination.Next onClick={() => next()} />
    <BootstrapPagination.Last onClick={() => next(true)} />
  </BootstrapPagination>
  );
};

export default Pagination;
