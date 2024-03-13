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
          className='border border-[#717171]'
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
    <div className='bg-transparent rounded-lg'>
      <h2 className='text-primary text-[16px] mb-2 pl-4 pt-6'>Filters: </h2>
      {/* h-[calc(110vh-2rem)] */}
      <Card className='h-full w-full max-w-[18rem] px-4  bg-transparent shadow-none'>
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
                <Option value='Conference'>Conference</Option>
                <Option value='Congress'>Congress</Option>
                <Option value='Consumer Trade'>Consumer Trade</Option>
                <Option value='Holiday Party'>Holiday Party</Option>
                <Option value='Industry and Consumer Trade Show'>
                  Industry and Consumer Trade Show
                </Option>
                <Option value='Industry Trade Show'>Industry Trade Show</Option>
                <Option value='International Meeting'>
                  International Meeting
                </Option>
                <Option value='Networking'>Networking</Option>
                <Option value='Plenary General'>Plenary General</Option>
                <Option value='Product Launch'>Product Launch</Option>
                <Option value='Reception'>Reception</Option>
                <Option value='Retreat'>Retreat</Option>
                <Option value='Seminar'>Seminar</Option>
                <Option value='Workshop'>Workshop</Option>
                <Option value='Press'>Press</Option>
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
            <h6>Audience Size</h6>
            {renderCheckboxes(
              audienceSizeCheckboxes,
              selectedAudienceSize,
              setSelectedAudienceSize
            )}
          </div>

          {/* <div>
            <Button
              variant="filled"
              color="indigo"
              size="sm"
              className="rounded-md  py-2 mt-4 px-6 bg-primary font-poppins"
              onClick={handleApplyFilters}
            >
              <span className="text-white normal-case">Apply Filters</span>
            </Button>
          </div> */}
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
