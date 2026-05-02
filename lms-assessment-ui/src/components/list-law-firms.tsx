import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
  const [sortOrder, setSortOrder] = useState("asc");
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
    setPageSize(pageSize);
  if (sortBy === column) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {    
    setSortBy(column);
    setSortOrder("asc");
  }
};

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPage(1);
    setPageSize(parseInt(event.target.value, 10));
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  return (
    <section id="list-firms">
      <h2>List of Law Firms</h2>
      {status === "error" && <p>Error loading law firms.</p>}
      {status !== "error" && (
        <TableContainer component={Paper}>
          <Table 
            style={{ border: "2px solid #ccc" }}
            sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell
                    scope="row"
                    className={sortBy === "id" ? "selected-sort" : "unselected-sort"}
                    onClick={() => handleSort("id")}>
                  ID {sortBy === "id" && (sortOrder === "asc" ? "▲" : "▼")}
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell style={{ width: 160 }}>
                  Phone number
                </TableCell>
                <TableCell style={{ width: 160 }}>
                  Email
                </TableCell>
                <TableCell 
                    style={{ width: 160 }}
                    align="right"
                    scope="row"
                    className={sortBy === "createdAt" ? "selected-sort" : "unselected-sort"}
                    onClick={() => handleSort("createdAt")}>
                  Created At {sortBy === "createdAt" && (sortOrder === "asc" ? "▲" : "▼")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === "pending" &&
                // render rows of skeletons to avoid layout shift when data loads
                [...Array(pageSize)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={5} align="center">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ))}
              {status === "success" &&
                data.items.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell scope="row" style={{ whiteSpace: "nowrap" }}>{row.id}</TableCell>
                    <TableCell scope="row">{row.name}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
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
