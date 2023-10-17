import {
	Button,
	Flex,
	Icon,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Stack,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr
} from "@chakra-ui/react";
import React, { useMemo, useState, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
	TiArrowSortedDown,
	TiArrowSortedUp,
	TiArrowUnsorted
} from "react-icons/ti";
import {
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable
} from "react-table";

function SearchTable1(props) {
	const { columnsData, tableData, onRowClick } = props;

	const [localTableData, setLocalTableData] = useState([]); // <-- Local state

	useEffect(() => {
		setLocalTableData(JSON.parse(JSON.stringify(props.tableData))); // <-- Deep copy
	}, [props.tableData]);

	const columns = useMemo(() => columnsData, []);
	const data = useMemo(() => localTableData, [localTableData]);
	//const data = useMemo(() => tableData, []);

	const tableInstance = useTable(
		{
			columns,
			data
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		gotoPage,
		pageCount,
		prepareRow,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setPageSize,
		setGlobalFilter,
		state
	} = tableInstance;

	const createPages = (count) => {
		let arrPageCount = [];

		for (let i = 1; i <= count; i++) {
			arrPageCount.push(i);
		}

		return arrPageCount;
	};

	const { pageIndex, pageSize, globalFilter } = state;

	return (
		<>
			<Flex
				direction="column"
				w="100%"
				overflowX={{ sm: "scroll", lg: "hidden" }}
			>
				<Flex justify="space-between" align="center" w="100%" px="22px">
					<Stack
						direction={{ sm: "column", md: "row" }}
						spacing={{ sm: "4px", md: "12px" }}
						align="center"
						me="12px"
						my="24px"
						minW={{ sm: "100px", md: "200px" }}
					>
						<Select
							value={pageSize}
							onChange={(e) => setPageSize(Number(e.target.value))}
							color="black"
							size="sm"
							borderRadius="12px"
							maxW="75px"
							cursor="pointer"
						>
							<option>5</option>
							<option>10</option>
							<option>15</option>
							<option>20</option>
							<option>25</option>
						</Select>
						<Text fontSize="xs" color="black" fontWeight="normal">
							entries per page
						</Text>
					</Stack>
					<Input
						type="text"
						placeholder="Search..."
						minW="230px"
						maxW="175px"
						fontSize="sm"
						_focus={{ borderColor: "#94aca4" }}
						onChange={(e) => setGlobalFilter(e.target.value)}
					/>
				</Flex>
				<Table {...getTableProps()} variant="simple" color="black" mb="24px">
					<Thead>
						{headerGroups.map((headerGroup) => (
							<Tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<Th
										{...column.getHeaderProps(column.getSortByToggleProps())}
										pe="0px"
									>
										<Flex
											justify="space-between"
											align="center"
											fontSize={{ sm: "10px", lg: "12px" }}
											color="black"
										>
											{column.render("Header")}
											<Icon
												w={{ sm: "10px", md: "14px" }}
												h={{ sm: "10px", md: "14px" }}
												color="color"
												float="right"
												as={
													column.isSorted
														? column.isSortedDesc
															? TiArrowSortedDown
															: TiArrowSortedUp
														: TiArrowUnsorted
												}
											/>
										</Flex>
									</Th>
								))}
							</Tr>
						))}
					</Thead>
					<Tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<Tr
									{...row.getRowProps()}
									onClick={() => onRowClick(row.original)}
									_hover={{ backgroundColor: "white" }}
								>
									{row.cells.map((cell) => {
										return (
											<Td {...cell.getCellProps()} fontSize={{ sm: "14px" }}>
												{cell.render("Cell")}
											</Td>
										);
									})}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
				<Flex
					direction={{ sm: "column", md: "row" }}
					justify="space-between"
					align="center"
					px="22px"
					w="100%"
					px={{ md: "22px" }}
				>
					<Text
						fontSize="sm"
						color="black"
						fontWeight="normal"
						mb={{ sm: "24px", md: "0px" }}
					>
						Showing {pageSize * pageIndex + 1} to{" "}
						{pageSize * (pageIndex + 1) <= tableData.length
							? pageSize * (pageIndex + 1)
							: tableData.length}{" "}
						of {tableData.length} entries
					</Text>
					<Stack direction="row" alignSelf="flex-end" spacing="4px" ms="auto">
						<Button
							variant="no-hover"
							onClick={() => previousPage()}
							transition="all .5s ease"
							w="40px"
							h="40px"
							borderRadius="50%"
							bg="#fff"
							border="1px solid lightgray"
							display={
								pageSize === 5 ? "none" : canPreviousPage ? "flex" : "none"
							}
							_hover={{
								bg: "gray.200",
								opacity: "0.7",
								borderColor: "gray.500"
							}}
						>
							<Icon as={GrFormPrevious} w="16px" h="16px" color="gray.400" />
						</Button>
						{pageSize === 5 ? (
							<NumberInput
								max={pageCount - 1}
								min={1}
								w="75px"
								mx="6px"
								defaultValue="1"
								onChange={(e) => gotoPage(e)}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper onClick={() => nextPage()} />
									<NumberDecrementStepper onClick={() => previousPage()} />
								</NumberInputStepper>
							</NumberInput>
						) : (
							createPages(pageCount).map((pageNumber) => {
								return (
									<Button
										variant="no-hover"
										transition="all .5s ease"
										onClick={() => gotoPage(pageNumber - 1)}
										w="40px"
										h="40px"
										borderRadius="160px"
										bg={pageNumber === pageIndex + 1 ? "black" : "#fff"}
										//border="1px solid lightgray"
										_hover={{
											bg: "gray.200",
											opacity: "0.7",
											borderColor: "gray.500"
										}}
									>
										<Text
											fontSize="xs"
											color={pageNumber === pageIndex + 1 ? "#fff" : "gray.600"}
										>
											{pageNumber}
										</Text>
									</Button>
								);
							})
						)}
						<Button
							variant="no-hover"
							onClick={() => nextPage()}
							transition="all .5s ease"
							w="40px"
							h="40px"
							borderRadius="160px"
							bg="#fff"
							border="1px solid lightgray"
							display={pageSize === 5 ? "none" : canNextPage ? "flex" : "none"}
							_hover={{
								bg: "gray.200",
								opacity: "0.7",
								borderColor: "gray.500"
							}}
						>
							<Icon as={GrFormNext} w="16px" h="16px" color="gray.400" />
						</Button>
					</Stack>
				</Flex>
			</Flex>
		</>
	);
}

export default SearchTable1;
