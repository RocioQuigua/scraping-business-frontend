import React, { useState } from 'react';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons'
import { Sidebar } from '../../organisms/Sidebar/Sidebar';

export const Header = () => {
  const [visibleMenu, setVisibleMenu] = useState();

  return (
    <div className='header'>
      <div className='header__information'>
        <h1>Search<strong>GO</strong></h1>
        <h2>Juan Camilo</h2>
        <Button 
          className='header__btn-menu'
          onClick={() => setVisibleMenu(true)}
        >
          <MenuOutlined />
        </Button>
      </div>
      <Sidebar visible={visibleMenu} setVisible={setVisibleMenu}/>
    </div>
  );
};