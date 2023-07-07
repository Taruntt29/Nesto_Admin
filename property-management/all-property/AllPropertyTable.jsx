import React, { useMemo, useState, useEffect, lazy, Suspense } from 'react';

import {
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
} from 'react-table';
import { FiEdit } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import LoadingSpinner from '../../../../components/loading-spinner/LoadingSpinner';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  useDeleteMutation,
  useGetQuery,
  useGetQueryWithId,
  usePutMutation,
} from '../../../../hooks/tanstackQuery';
import { apiEndpoints } from '../../../../config/apiEndpoints';
import {
  Button,
  ButtonGroup,
  Dropdown,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { Form, Spinner, Table } from 'react-bootstrap/esm';
import ErrorMessage from '../../../../components/error-message/ErrorMessage';
// import AddPropertyWrapperUpdate from './AddPropertyWrapperUpdate';
import './AllPropertyTable.css';
const AddPropertyWrapperUpdate = lazy(() =>
  import('./AddPropertyWrapperUpdate')
);
// const AllPropertyTable = ({ data }) => {
export const AllPropertyTable = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);
  const {
    isLoading: isGetPropertyByIdLoading,
    isError: isGetPropertyByIdIsError,
    data: getPropertyByIdData,
    isSuccess: isGetPropertyByIdSuccess,
    refetch: refetchGetPropertyById, // Add
  } = useGetQueryWithId('getAllpropertyId', apiEndpoints.getPropertyById, id);

  const {
    mutate: updateProperty,
    isLoading: isUpdateAllPropertyLoading,
    isError: isUpdateAllPropertyIsError,
    data: updateAllPropertyData,
    isSuccess: isUpdateAllPropertySuccess,
  } = usePutMutation(apiEndpoints.updateProperty, 'getAllproperty');

  const {
    mutate: deletePropertyById,
    isLoading: isDeletePropertyByIdLoading,
    isError: isDeletePropertyByIdIsError,
    data: deletePropertyByIdData,
    isSuccess: isDeletePropertyByIdSuccess,
  } = useDeleteMutation(apiEndpoints.deleteProperty, 'getAllproperty');

  const {
    isLoading: isGetAllPropertyLoading,
    isError: isGetAllPropertyIsError,
    data: getAllPropertyData,
    isSuccess: isGetAllPropertySuccess,
    refetch: getAllPropertyRefetch,
  } = useGetQuery('getAllproperty', apiEndpoints.getAllproperty);

  const data = useMemo(() => {
    if (getAllPropertyData) {
      return getAllPropertyData?.map((item, index) => ({
        indexNumber: index + 1,
        _id: item?._id,
        builderId: item.builderId?._id,
        builderName: item?.builderId?.name,
        subBuilder: item?.subCompany?.subCompanyName ?? 'No Data Found',
        // nameOfPropertyAndPropertyType: item.name,
        nameOfProperty: item?.name,
        constructionStatus: item.constructionStatus,
        propertyType: item.propertyType?.name ?? 'No Data Found',
        unitType: item?.unitType,
        location: item?.location,
        noOfVisits: item?.noOfVisits,
        price: `${item?.minPrice ?? ''}-${item?.maxPrice ?? ''}`,
        brokerageValue: item?.brokerageValue ?? 'No Data Found',
        tags: 'tags',
        status: 'status',
        action: 'action',
      }));
    }
    return [];
  }, [getAllPropertyData]);

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <div>
            <input type="checkbox" />
          </div>
        ),
        accessor: 'checkbox',
      },
      {
        Header: '#',
        accessor: 'indexNumber',
      },
      {
        Header: 'Builder Id',
        accessor: 'builderId',
      },
      {
        Header: 'Builder',
        accessor: 'builderName',
        Cell: ({ cell }) => (
          <>
            <div className="all__property__table__title">
              {cell.row.original.builderName}
            </div>
          </>
        ),
      },
      {
        Header: 'Sub-Builder',
        accessor: 'subBuilder',
      },
      {
        Header: 'Name of Property',
        accessor: 'nameOfProperty',
        Cell: ({ cell }) => (
          <>
            <div className="all__property__table__title">
              {cell.row.original.nameOfProperty}
            </div>
          </>
        ),
      },
      {
        Header: 'Construction Status',
        accessor: 'constructionStatus',
      },
      {
        Header: 'Property Type',
        accessor: 'propertyType',
        // Cell: ({ cell }) => (
        //   <>
        //     <div className="all__property__table__title">
        //       {cell.row.original.propertyType}
        //     </div>
        //   </>
        // ),
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Number of Visits',
        accessor: 'noOfVisits',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Brokerage',
        accessor: 'brokerageValue',
      },
      {
        Header: 'Tags',
        accessor: 'tags',
        Cell: ({ value }) => (
          <Dropdown className="custom-dropdown" style={{ zIndex: '99999' }}>
            <Dropdown.Toggle
              variant="light"
              id="tags-dropdown"
              className="rounded-pill"
            >
              Recent
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Recent</Dropdown.Item>
              <Dropdown.Item>Featured</Dropdown.Item>
              <Dropdown.Item>Best Seller</Dropdown.Item>
              <Dropdown.Item>Promotional</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell }) => (
          <>
            <div className="all__property__table__title">
              {/* {cell.row.original.builderName} */}
              <Form>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="custom-switch"

                  // checked={isChecked}
                  // onChange={handleChange}
                />
              </Form>
            </div>
          </>
        ),
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ cell }) => (
          <>
            <ButtonGroup className="gap-2">
              <Button
                variant="transparent"
                className="p-0"
                onClick={() => handleEdit(cell.row.original._id)}
              >
                <FiEdit />
              </Button>
              <Button
                variant="transparent"
                className="p-0"
                onClick={() => handleDelete(cell.row.original._id)}
              >
                <BsTrash3 />
              </Button>
            </ButtonGroup>
          </>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const handleEdit = id => {
    console.log(id);
    setId(id);
  };

  const handleDelete = id => {
    deleteAmenitiesById(id);
    setIsEditMode(false);
    setId(null);
    setAmenityFormData(
      Object.keys(amenityFormData).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      )
    );
    setFiles([]);
  };

  useEffect(() => {
    if (id) {
      refetchGetPropertyById();
      setIsEditMode(true);
    }
  }, [id, refetchGetPropertyById]);
  if (isGetAllPropertyLoading) {
    return <LoadingSpinner />;
  }

  if (isGetAllPropertyIsError) {
    return <ErrorMessage />;
  }

  if (isGetAllPropertySuccess && !isEditMode) {
    return (
      <>
        <div className="px-3 py-3">
          <div className="mb-4">
            <InputGroup>
              <FormControl
                value={globalFilter || ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search..."
                className="input-background"
              />
              <InputGroup.Text>
                <AiOutlineSearch />
              </InputGroup.Text>
            </InputGroup>
          </div>
          <div className="all__property__table p-2">
            <Table
              responsive
              borderless
              {...getTableProps()}
              className="bg-white"
            >
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
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
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="py-4 px-3">
              <span>
                Showing {pageIndex * pageSize + 1} to{' '}
                {pageIndex * pageSize + rows.length} of {data.length} entries
              </span>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isGetPropertyByIdLoading) {
    return <LoadingSpinner />;
  }

  if (isGetPropertyByIdIsError) {
    return <ErrorMessage />;
  }

  if (isEditMode && isGetPropertyByIdSuccess) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <AddPropertyWrapperUpdate />
      </Suspense>
    );
  }
};
