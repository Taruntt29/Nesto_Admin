import React, { useMemo } from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy } from 'react-table';
import { Table, Form, DropdownButton, Dropdown } from 'react-bootstrap';

import './TableComponent.css';

const data = [
  { id: 1, checkbox: true, number: 1, tags: 'tag1, tag2', status: true },
  { id: 2, checkbox: true, number: 2, tags: 'tag2, tag3', status: false },
  { id: 3, checkbox: true, number: 3, tags: 'tag3, tag4', status: true },
  { id: 4, checkbox: true, number: 4, tags: 'tag4, tag5', status: false },
];

const columns = [
  {
    Header: <input type="checkbox" />,
    accessor: 'checkbox',
  },
  {
    Header: '#',
    accessor: 'number',
  },
  {
    Header: 'Tags',
    accessor: 'tags',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <DropdownButton
        id="dropdown-basic-button"
        title={value ? 'Active' : 'Inactive'}
      >
        <Dropdown.Item href="#">Active</Dropdown.Item>
        <Dropdown.Item href="#">Inactive</Dropdown.Item>
      </DropdownButton>
    ),
  },
];

const TableComponent = () => {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <Form>
        <Form.Control
          type="text"
          placeholder="Search"
          onChange={e => setGlobalFilter(e.target.value)}
        />
        <Form.Control as="select">
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </Form.Control>
      </Form>
      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  {column.canFilter ? column.render('Filter') : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TableComponent;
