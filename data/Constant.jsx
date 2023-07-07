// creatable select
export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    fontWeight: '500',
    fontSize: '14px',
    color: '#8d98aa',
    fontFamily: 'Manrope',
    border: state.isFocused ? '1px solid #48bbff' : '1px solid #ced4da',
    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(72, 187, 255, 0.25)' : null,
    ':hover': {
      border: '1px solid #48bbff',
    },
    backgroundColor: '#e0e4ec',
    borderRadius: '8.5px',
  }),
  option: (provided, state) => ({
    ...provided,
    color: '#343a40',
    backgroundColor: state.isFocused ? '#f4f4f4' : 'transparent',
    fontWeight: state.isSelected ? 'bold' : 'normal',
  }),
  multiValue: provided => ({
    ...provided,
    backgroundColor: '#8d98aa',
    borderRadius: '2px',
  }),
  multiValueLabel: provided => ({
    ...provided,
    fontWeight: '500',
    fontSize: '14px',
    color: '#ffffff',
    fontFamily: 'Manrope',
  }),
  multiValueRemove: provided => ({
    ...provided,
    ':hover': {
      backgroundColor: 'red',
      color: 'white',
    },
    backgroundColor: '#343a40',
    color: '#8d98aa',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '112.4%',
    color: '#8D98AA',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '112.4%',
    color: '#8D98AA',
  }),
};

// table data
export const data = [
  {
    id: 1,
    checkbox: true,
    status: 'active',
  },
  {
    id: 2,
    checkbox: false,
    status: 'inactive',
  },
  {
    id: 3,
    checkbox: true,
    status: 'pending',
  },
  {
    id: 4,
    checkbox: false,
    status: 'active',
  },
  {
    id: 5,
    checkbox: true,
    status: 'inactive',
  },
  {
    id: 6,
    checkbox: false,
    status: 'active',
  },
  {
    id: 7,
    checkbox: true,
    status: 'pending',
  },
  {
    id: 8,
    checkbox: false,
    status: 'inactive',
  },
  {
    id: 9,
    checkbox: true,
    status: 'active',
  },
  {
    id: 10,
    checkbox: false,
    status: 'pending',
  },
];
