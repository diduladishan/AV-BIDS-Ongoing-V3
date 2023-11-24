import {
  Button,
  Card,
  Checkbox,
  Option,
  Select,
} from '@material-tailwind/react';
import { FC } from 'react';
import {
  CheckboxItem,
  audienceSizeCheckboxes,
  checkboxes,
  priceRangeCheckboxes,
} from '../../../constants';

interface SidebarProps {
  selectedEventType: string[];
  setSelectedEventType: React.Dispatch<React.SetStateAction<string[]>>;
  selectedEventCategory: string[];
  setSelectedEventCategory: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPriceRange: string[];
  setSelectedPriceRange: React.Dispatch<React.SetStateAction<string[]>>;
  selectedAudienceSize: string[];
  setSelectedAudienceSize: React.Dispatch<React.SetStateAction<string[]>>;
  applyFilters: (filters: any) => void;
  selectedEventSubCategory: string;
  setSelectedEventSubCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: FC<SidebarProps> = ({
  applyFilters,
  selectedAudienceSize,
  selectedEventCategory,
  selectedEventType,
  selectedPriceRange,
  setSelectedAudienceSize,
  setSelectedEventCategory,
  setSelectedEventType,
  setSelectedPriceRange,
  selectedEventSubCategory,
  setSelectedEventSubCategory,
}) => {
  const handleCheckboxChange = (
    value: string,
    setState: any,
    state: string[]
  ) => {
    const updatedState = state.includes(value)
      ? state.filter((item) => item !== value)
      : [...state, value];
    setState(updatedState);
  };

  const renderCheckboxes = (
    checkboxData: CheckboxItem[],
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    return checkboxData.map(({ value, label }) => (
      <div className='flex items-center' key={value}>
        <Checkbox
          crossOrigin=''
          checked={state.includes(value)}
          onChange={() => handleCheckboxChange(value, setState, state)}
        />
        <span>{label}</span>
      </div>
    ));
  };

  const handleApplyFilters = () => {
    applyFilters({
      eventType: selectedEventType,
      eventCategory: selectedEventCategory,
      eventSubCategory: selectedEventSubCategory,
      priceRange: selectedPriceRange,
      audienceSize: selectedAudienceSize,
    });
  };

  return (
    <div className='mb-6'>
      <h2 className='text-primary text-[16px] mb-2'>Filters: </h2>
      <Card className='h-[calc(125vh-2rem)] w-full max-w-[18rem] p-4  bg-[#F3F1FB]'>
        <div className='mb-2 p-4'>
          <div className='mb-4'>
            <h6>Event Type</h6>
            {renderCheckboxes(
              checkboxes,
              selectedEventType,
              setSelectedEventType
            )}
          </div>

          <div className='mb-4'>
            <h6>Event Categories</h6>
            {renderCheckboxes(
              [
                { value: 'Corporate', label: 'Corporate' },
                { value: 'Non-Corporate', label: 'Non-Corporate' },
              ],
              selectedEventCategory,
              setSelectedEventCategory
            )}
          </div>

          <div className='mb-4'>
            <h6 className='mb-4'>Corporate Categories</h6>
            <div className='w-full '>
              <Select
                label='Select Sub Category'
                className='bg-white'
                value={selectedEventSubCategory}
                onChange={(value: any) => setSelectedEventSubCategory(value)}
              >
                <Option value=''>All</Option>
                <Option value='Awards'>Awards</Option>
                <Option value='Banquet'>Banquet</Option>
                <Option value='Board Meeting'>Board Meeting</Option>
                <Option value='Breakout Session'>Breakout Session</Option>
              </Select>
            </div>
          </div>

          <div className='mb-4'>
            <h6>Price Range</h6>
            {renderCheckboxes(
              priceRangeCheckboxes,
              selectedPriceRange,
              setSelectedPriceRange
            )}
          </div>

          <div>
            <h6>Audience Size </h6>
            {renderCheckboxes(
              audienceSizeCheckboxes,
              selectedAudienceSize,
              setSelectedAudienceSize
            )}
          </div>

          <div>
            <Button
              variant='filled'
              color='indigo'
              size='sm'
              className='rounded-md  py-2 mt-4 px-6 bg-primary font-poppins'
              onClick={handleApplyFilters}
            >
              <span className='text-white normal-case'>Apply Filters</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
