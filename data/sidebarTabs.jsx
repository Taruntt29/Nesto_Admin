import { RiDashboardFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { MdDoubleArrow } from "react-icons/md";
import Blogs from "../features/dashboard/Blogs/Blogs";
export const tabs = [
  {
    id: "1",
    title: "Dashboard",
    icon: <RiDashboardFill />,
  },
  {
    id: "2",
    title: "Roles & Employees",
    icon: <HiUserGroup />,
  },
  {
    id: "3",
    title: "Nesto Modules",
    icon: <RiDashboardFill />,
  },
  {
    id: "4",
    title: "Builder Management",
    icon: <RiDashboardFill />,
    isCollapsed: false,
    dropdownItems: [
      { id: "19", title: "All Builders", icon: <MdDoubleArrow /> },
      { id: "20", title: "Add New Builder", icon: <MdDoubleArrow /> },
      { id: "21", title: "Intents", icon: <MdDoubleArrow /> },
      { id: "22", title: "Raised Dispute Question", icon: <MdDoubleArrow /> },
      // { id: "19", title: "Invoices", icon: <MdDoubleArrow /> },
      // { id: "20", title: "Claim", icon: <MdDoubleArrow /> },
      // { id: "21", title: "Query Manage", icon: <MdDoubleArrow /> },
      // { id: "22", title: "Raise Dispute", icon: <MdDoubleArrow /> },
    ],
  },
  {
    id: "5",
    title: "Property Management",
    icon: <RiDashboardFill />,
    isCollapsed: false,
    dropdownItems: [
      { id: "23", title: "All Property", icon: <MdDoubleArrow /> },
      { id: "24", title: "Add New", icon: <MdDoubleArrow /> },
      { id: "25", title: "Sub Company", icon: <MdDoubleArrow /> },
      { id: "26", title: "Request A property", icon: <MdDoubleArrow /> },
      { id: "27", title: "Property Type", icon: <MdDoubleArrow /> },
      { id: "28", title: "Amenties", icon: <MdDoubleArrow /> },
      { id: "29", title: "Location Advantages", icon: <MdDoubleArrow /> },
      { id: "30", title: "Loan Approved", icon: <MdDoubleArrow /> },
      { id: "31", title: "Near By Area", icon: <MdDoubleArrow /> },
      { id: "32", title: "Furnishing", icon: <MdDoubleArrow /> },
      { id: "33", title: "Specification", icon: <MdDoubleArrow /> },
    ],
  },
  // {
  //   id: '6',
  //   title: 'Broker Management',
  //   icon: <RiDashboardFill />,
  // },

  {
    id: "6",
    title: "Broker Management",
    icon: <RiDashboardFill />,
    isCollapsed: false,
    dropdownItems: [
      { id: "34", title: "All Broker", icon: <MdDoubleArrow /> },
      { id: "35", title: "Add New Broker", icon: <MdDoubleArrow /> },
    ],
  },

  {
    id: "7",
    title: "Subscription Management",
    icon: <RiDashboardFill />,
  },
  {
    id: "8",
    title: "Loan Agent",
    icon: <RiDashboardFill />,
  },
  {
    id: "9",
    title: "Payment Management",
    icon: <RiDashboardFill />,
  },
  {
    id: "10",
    title: "Manage Q & A",
    icon: <RiDashboardFill />,
  },
  {
    id: "11",
    title: "Blogs",
    icon: <RiDashboardFill />,
  },
  {
    id: "12",
    title: "Training",
    icon: <RiDashboardFill />,
  },
  {
    id: "13",
    title: "Analytics",
    icon: <RiDashboardFill />,
  },
  {
    id: "14",
    title: "Content Management",
    icon: <RiDashboardFill />,
  },
  {
    id: "15",
    title: "Queries Management",
    icon: <RiDashboardFill />,
  },
  {
    id: "16",
    title: "Contact Us",
    icon: <RiDashboardFill />,
  },
];
