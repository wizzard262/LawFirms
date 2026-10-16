import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useApi from "~/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TableHead from "@mui/material/TableHead";
import Skeleton from "@mui/material/Skeleton";

export default function ListLawFirms() {
  // useState must mean if the user changes page, pageSize, etc the var is updated
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc"); // newest first, so a firm you add shows at the top
  const { getLawFirms } = useApi();

  const { data, status } = useQuery({
    queryKey: ["getLawFirms", page, pageSize, sortBy, sortOrder],
    queryFn: () => getLawFirms(page, pageSize, sortBy, sortOrder),
  });

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleSort = (column: string) => {
    setPage(0);
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // back to the first page (pages count from 0 here), keeping the sort
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPage(0);
    setPageSize(parseInt(event.target.value, 10));
  };

  const sortHeader = (column: string, label: string) => (
    <button
      type="button"
      className={sortBy === column ? "sort-button sorted" : "sort-button"}
      onClick={() => handleSort(column)}
      aria-label={`Sort by ${label}`}
    >
      {label} {sortBy === column ? (sortOrder === "asc" ? "▲" : "▼") : "↕"}
    </button>
  );

  return (
    <section id="list-firms" className="card card-wide" aria-labelledby="list-title">
      <h2 id="list-title">Law firms</h2>
      <p className="muted small sort-hint">Sort by ID or by when a firm was added; newest first to start with.</p>
      {status === "error" && <p className="notice">Couldn't load the law firms. The API may be waking up: try again in a minute.</p>}
      {status !== "error" && (
        <TableContainer>
          <Table className="firms-table" size="small" aria-labelledby="list-title">
            <TableHead>
              <TableRow>
                <TableCell aria-sort={sortBy === "id" ? (sortOrder === "asc" ? "ascending" : "descending") : undefined}>
                  {sortHeader("id", "ID")}
                </TableCell>
                <TableCell className="nosort">Name</TableCell>
                <TableCell className="nosort">Phone number</TableCell>
                <TableCell className="nosort">Email</TableCell>
                <TableCell
                  align="right"
                  aria-sort={sortBy === "createdAt" ? (sortOrder === "asc" ? "ascending" : "descending") : undefined}
                >
                  {sortHeader("createdAt", "Added")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === "pending" &&
                // render rows of skeletons to avoid layout shift when data loads
                [...Array(pageSize)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={5} className="full">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ))}
              {status === "success" && data.items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="full muted">No law firms yet. Add one below.</TableCell>
                </TableRow>
              )}
              {status === "success" &&
                data.items.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell data-label="ID" className="mono">{row.id}</TableCell>
                    <TableCell data-label="Name">{row.name}</TableCell>
                    <TableCell data-label="Phone">{row.phoneNumber}</TableCell>
                    <TableCell data-label="Email">{row.email}</TableCell>
                    <TableCell data-label="Added" align="right" style={{ whiteSpace: "nowrap" }}>
                      {new Date(row.createdAt).toLocaleString("en-GB", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  count={data?.totalCount ?? 0}
                  rowsPerPage={pageSize}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </section>
  );
}
