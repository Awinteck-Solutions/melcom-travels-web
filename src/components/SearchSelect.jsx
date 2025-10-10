import { Select } from "@mantine/core"

const SearchSelect = ({ label, value, onChange }) => {
  return (
      <div>
          <div className='w-fit relative cursor-pointer'>
                                <div>
                                <Select
                                    label={label}
                                    placeholder={label}
                                    autoSelectOnBlur
                                    searchable
                                    data={['Amsterdam', 'Accra', 'Cotonuo', 'Paris']}
                                    value={value}
                                    onChange={onChange}
                                    styles={{
                                        input: {
                                            width: '100%',
                                            height: '60px',
                                            textAlign: 'center',
                                            borderColor: 'white',
                                            borderWidth: '2px',
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                        },
                                        rightSection: {
                                            color: 'white'
                                        }
                                    }}
                                    />
                                    <p>{label} International Airport</p>
                              </div>
                                <div className='absolute z-10 top-0 right-1 h-full w-5 bg-white'></div>
                            </div>
    </div>
  )
}

export default SearchSelect