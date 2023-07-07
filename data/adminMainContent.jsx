import BrokerManagement from '../features/dashboard/Broker-Mangement/BrokerManagement';
import AddBroker from '../features/dashboard/Broker-Mangement/AddBroker/AddBroker';
import LoanAgent from '../features/dashboard/LoanAgent/LoanAgent';
import { AllPropertyTable } from '../features/dashboard/property-management/all-property/AllPropertyTable';
import Invoice from '../features/dashboard/BuilderManagement/Invoice';
import Onboard from '../features/dashboard/BuilderManagement/Onboard/Onboard';
import Property from '../features/dashboard/BuilderManagement/Property';
import Subscription from '../features/dashboard/BuilderManagement/Subscription';
import Claim from '../features/dashboard/BuilderManagement/Claim/Claim';

import RaiseDispute from '../features/dashboard/BuilderManagement/Claim/RaiseDispute';
// import AddNewBuilder from '../features/dashboard/BuilderManagement/Onboard/AddNewBuilder';
import AddPropertyWrapper from '../features/dashboard/property-management/all-property/AddPropertyWrapper';
import Amenties from '../features/dashboard/property-management/all-property/Amenties/Amenties';
import LocationAdvantages from '../features/dashboard/property-management/all-property/location-advantages/LocationAdvantages';
import LoanApproved from '../features/dashboard/property-management/all-property/loan-approved/LoanApproved';
import NearByArea from '../features/dashboard/property-management/all-property/near-by-area/NearByArea';
import Specification from '../features/dashboard/property-management/all-property/specification/Specification';
import PropertyType from '../features/dashboard/property-management/all-property/property-type/PropertyType';
import Furnishing from '../features/dashboard/property-management/all-property/furnishing/Furnishing';
import Profile from '../features/dashboard/BuilderManagement/Profile/Profile';
import ManageQA from '../features/dashboard/ManageQA/ManageQA';
import PaymentManagement from '../features/dashboard/PaymentManagement/PaymentManagement';
import Blogs from '../features/dashboard/Blogs/Blogs';
import Training from '../features/dashboard/Training/Training';
import Intents from '../features/dashboard/BuilderManagement/Profile/Intents';
// import NewBuilder from '../features/dashboard/BuilderManagement/Onboard/NewBuilder';
import RaiseDisputeQuestion from '../features/dashboard/BuilderManagement/Claim/RaiseDisputeQuestion';
import AddNewBuilder from '../features/dashboard/BuilderManagement/add-new-builder/AddNewBuilderNew';
import SubCompany from '../features/dashboard/property-management/all-property/sub-company/SubCompany';
import BuilderOnBoarding from '../features/dashboard/BuilderManagement/add-new-builder/BuilderOnBoarding';
import ContactUs from '../features/dashboard/BuilderManagement/ContactUs/ContactUs';
import AddSubscriptions from '../features/dashboard/subscriptions/AddSubscriptions';

export const adminMainContent = [
  {
    element: 'dashboard',
    title: 'dashboard',
  },
  {
    element: 'Roles & Employees',
    title: 'Roles & Employees',
  },
  {
    element: 'Nesto Modules',
    title: 'Nesto Modules',
  },
  {
    element: 'Builder Management',
    title: 'Builder Management',
    dropdownItemsContent: [
      {
        element: <Onboard />,
        title: 'All Builder',
      },
      {
        element: <BuilderOnBoarding />,
        title: 'Add New Builder',
      },
      {
        element: <Intents />,
        title: 'Intents',
      },
      {
        element: <RaiseDisputeQuestion />,
        title: 'Raised Dispute Question',
      },
      // {
      //   element: <Invoice />,
      //   title: "Location Advantages",
      // },
      // {
      //   element: <Claim />,
      //   title: "Loan Approved",
      // },
      // {
      //   element: <QueryManager />,
      //   title: "Near By Area",
      // },
      // {
      //   element: ,
      //   // element: <Profile />,
      //   title: "Furnishing",
      // },
      // {
      //   element: "Specification",
      //   title: "Specification",
      // },
    ],
  },

  // property management
  {
    element: 'Property Management',
    title: 'Property Management',
    dropdownItemsContent: [
      {
        element: <AllPropertyTable />,
        title: 'All Property',
      },
      {
        element: <AddPropertyWrapper />,
        title: 'Add New',
      },
      {
        element: <SubCompany />,
        title: 'Sub Company',
      },
      {
        element: 'Request a property',
        title: 'Request A Property',
      },
      {
        element: <PropertyType />,
        title: 'Property Type',
      },
      {
        element: <Amenties />,
        title: 'Amenties',
      },
      {
        element: <LocationAdvantages />,
        title: 'Location Advantages',
      },
      {
        element: <LoanApproved />,
        title: 'Loan Approved',
      },
      {
        element: <NearByArea />,
        title: 'Near By Area',
      },
      {
        element: <Furnishing />,
        title: 'Furnishing',
      },
      {
        element: <Specification />,
        title: 'Specification',
      },
    ],
  },

  // property management code end here
  {
    element: 'Broker Management',
    title: 'Broker Management',
    dropdownItemsContent: [
      {
        element: <BrokerManagement />,
        title: 'All Brokers',
      },
      {
        element: <AddBroker />,
        title: 'Add New',
      },
    ],
  },
  {
    element: <AddSubscriptions />,
    title: 'Subscription Management',
  },
  {
    element: <LoanAgent />,
    title: 'Loan Agent',
  },
  {
    element: <PaymentManagement />,
    title: 'Payment Management',
  },
  {
    element: <ManageQA />,
    title: 'Manage Q & A',
  },
  {
    element: <Blogs />,
    title: 'Blogs',
  },
  {
    element: <Training />,
    title: 'Training',
  },
  {
    element: 'Analytics',
    title: 'Analytics',
  },
  {
    element: 'Content Management',
    title: 'Content Management',
  },
  {
    element: 'Queries Management',
    title: 'Queries Management',
  },
  {
    element: <ContactUs />,
    title: 'Contact Us',
  },
];
