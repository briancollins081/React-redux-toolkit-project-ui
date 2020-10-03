import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, Menu } from 'semantic-ui-react'
import { retrivePosts } from '../../features/posts/postsSlice';
import { retriveUsers } from '../../features/users/usersSlice';

export const MainNavbar = () => {
    const [activeItem, setActiveItem] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(activeItem === 'posts'){
            dispatch(retrivePosts({ page:1, limit:12, sort:-1 }));
        }
        if(activeItem === 'users'){
            dispatch(retriveUsers({ page:1, limit:4, sort:-1 }));
        }
    }, [activeItem])
    const handleMenuItemClick = (e, { name }) => {
        setActiveItem(name);
        history.push(
            name === 'home' ? '/' :
                name === 'users' ? '/users' :
                    name === 'posts' ? '/posts' :
                        '/'
        );
        if (name === 'logout') {
            localStorage.removeItem('token');
        }
    }

    return <Menu secondary className="mt-10" >
        <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleMenuItemClick}
        />
        <Menu.Item
            name='posts'
            active={activeItem === 'posts'}
            onClick={handleMenuItemClick}
        />
        <Menu.Item
            name='users'
            active={activeItem === 'users'}
            onClick={handleMenuItemClick}
        />
        <Menu.Menu position='right'>
            <Menu.Item>
                <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={handleMenuItemClick}
            />
        </Menu.Menu>
    </Menu>
}