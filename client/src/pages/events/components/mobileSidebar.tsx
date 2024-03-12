import React from 'react';
import {
  Collapse,
  Button,
  Card,
  CardBody,
  Checkbox,
  Select,
  Option,
} from '@material-tailwind/react';

import Filter_Icon from '../../../assets/09_events/Filter.png';

// Renamed the function to start with an uppercase letter
function MobileSidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <div>
      <>
        {/* <Button onClick={toggleOpen}>Open Collapse</Button> */}
        <img
          src={Filter_Icon}
          onClick={toggleOpen}
          alt='aad'
          className='w-[16px]'
        />
        <Collapse open={open}>
          <Card className='my-4 mx-auto w-full'>
            <CardBody>
              <div className='mb-6'>
                <h2 className='text-primary text-[16px] mb-2'>Filters: </h2>
                <Card className='h-[calc(125vh-2rem)] w-full max-w-[18rem] p-4  bg-[#F3F1FB]'>
                  <div className='mb-2 p-4'>
                    <div className='mb-4'>
                      <h6>Event Type</h6>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />{' '}
                        <span>In-Person</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />{' '}
                        <span>Virtual</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />{' '}
                        <span>Hybrid</span>
                      </div>
                    </div>
                    <div className='mb-4'>
                      <h6>Event Categories</h6>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />{' '}
                        <span>Corporate</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />{' '}
                        <span>Non-Corporate</span>
                      </div>
                    </div>

                    <div className='mb-4'>
                      <h6 className='mb-4'>Coporate Categories</h6>
                      <div className='w-full '>
                        <Select label='Select Version' className='bg-white'>
                          <Option>All</Option>
                          <Option>Awards</Option>
                          <Option>Banquet</Option>
                          <Option>Board Meeting</Option>
                          <Option>Breakout Session</Option>
                          <Option>Conference</Option>
                          <Option>Congress</Option>
                          <Option>Consumer Trade</Option>
                          <Option>Holiday Party</Option>
                          <Option>Industry and Consumer Trade Show</Option>
                          <Option>Industry Trade Show</Option>
                          <Option>International Meeting</Option>
                          <Option>Networking</Option>
                          <Option>Plenary General</Option>
                          <Option>Product Launch</Option>
                          <Option>Reception</Option>
                          <Option>Retreat</Option>
                          <Option>Seminar</Option>
                          <Option>Workshop</Option>
                          <Option>Press</Option>
                        </Select>
                      </div>
                    </div>
                    <div className='mb-4'>
                      <h6>Price Range</h6>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />{' '}
                        <span>$70,000</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />
                        <span>$70,000 - $150,000</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />
                        <span>$150,000 - $500,000</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />
                        <span>$150,000 - $1,000,000</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />{' '}
                        <span>$1,000,000+</span>
                      </div>
                    </div>
                    <div>
                      <h6>Audience Size </h6>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />{' '}
                        <span>Any</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />
                        <span>10 - 100</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />
                        <span>100 - 250</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />
                        <span>250 - 750</span>
                      </div>
                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />
                        <span>750 - 1,500</span>
                      </div>

                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />
                        <span>1,500 - 5,000</span>
                      </div>

                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />
                        <span>5,000 - 10,000</span>
                      </div>

                      <div className='flex  items-center'>
                        <Checkbox defaultChecked crossOrigin='' />
                        <span>over 10,000</span>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant='filled'
                        color='indigo'
                        size='sm'
                        className='rounded-md  py-2 mt-4 px-6 bg-primary font-poppins'
                      >
                        <span className='text-white normal-case'>
                          Apply Filters
                        </span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </>
    </div>
  );
}

export default MobileSidebar;
