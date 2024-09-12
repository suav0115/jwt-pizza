import React from 'react';
import { useBreadcrumb } from '../hooks/appNavigation';
import { EmailIcon, StoreIcon } from '../icons';
import { pizzaService } from '../service/service';
import View from './view';

import Button from '../components/button';

export default function CreateFranchise() {
  const navigateToParentPath = useBreadcrumb();
  const [franchise, setFranchise] = React.useState({ stores: [] });

  async function createFranchise(event) {
    event.preventDefault();
    await pizzaService.createFranchise(franchise);
    navigateToParentPath();
  }

  return (
    <View title='Create franchise'>
      <div className='text-start py-8 px-4 sm:px-6 lg:px-8'>
        <form onSubmit={createFranchise}>
          <div className='text-neutral-100'>Want to create franchise?</div>
          <div className='max-w-sm space-y-3 py-4  flex-1'>
            <div className='relative'>
              <input
                type='text'
                required
                onChange={(e) => setFranchise({ ...franchise, name: e.target.value })}
                className='peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                placeholder='franchise name'
              />
              <div className='absolute text-orange-800 inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none'>
                <StoreIcon />
              </div>
            </div>
            <div className='relative'>
              <input
                type='email'
                required
                onChange={(e) => setFranchise({ ...franchise, admins: [{ email: e.target.value }] })}
                className='peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                placeholder='franchisee admin email'
              />
              <div className='absolute text-orange-800 inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none'>
                <EmailIcon />
              </div>
            </div>
          </div>

          <Button title='Create' submit />
          <Button title='Cancel' onPress={navigateToParentPath} className='bg-transparent border-neutral-300' />
        </form>
      </div>
    </View>
  );
}
