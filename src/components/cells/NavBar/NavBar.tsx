import React, { FC } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Button } from "antd";

import { PageUrls } from "../../../shared/constants";
import { storageKeys } from "../../../shared/constants/commons";
import { AppStateType } from "../../../store/reducers";
import { logout } from "../../../store/actions/user.action";
import { UserSelectors } from "../../../store/selectors";
import icons from "../../../shared/icons";
import socket from "../../../socketServices";
import "./style.scss";

type MapStateToProps = {
    userId: string
};

type MapDispatchToProps = {
    logout: () => void
}

type Props = MapStateToProps & MapDispatchToProps;

const NavBar: FC<Props> = ({ logout, userId }) => {
    const history = useHistory();
    const { pathname } = history.location;

    const authData = localStorage.getItem(storageKeys.isAuth);

    const handleClick = () => {
        logout();
        socket.setOnlineStatus({ userId, isOnline: false });
    };

    let navigationsLinks = authData && JSON.parse(authData)
        ? (
            <div className="navbar-wrapper">
                <Menu
                    defaultSelectedKeys={ [pathname] }
                    selectedKeys={ [pathname] }
                    className="navbar navbar--left"
                    mode="horizontal"
                    theme="dark"
                >
                    <Menu.Item key={ PageUrls.home } className="navbar__item" >
                        <NavLink exact to={ PageUrls.home } >
                            <icons.HomeOutlined />
                            Home
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={ PageUrls.users } className="navbar__item" >
                        <NavLink to={ PageUrls.users } >
                            <icons.ContactsOutlined />
                            Users
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={ PageUrls.dialogs } className="navbar__item" >
                        <NavLink to={ PageUrls.dialogs } >
                            <icons.MessageOutlined />
                            Dialogs
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={ PageUrls.profile } className="navbar__item" >
                        <NavLink to={ PageUrls.profile } >
                            <icons.UserOutlined />
                            Profile
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={ PageUrls.logout }  >
                        <Button
                            type="danger"
                            className="w-100 btn"
                            icon="logout"
                            onClick={ handleClick }
                        >
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu>
            </div>)
        : (
            <Menu
                defaultSelectedKeys={ [pathname] }
                selectedKeys={ [pathname] }
                className="navbar navbar--right"
                mode="horizontal"
                theme="dark"
            >
                <Menu.Item key={ PageUrls.login } className="navbar__item" >
                    <NavLink to={ PageUrls.login }  >
                        <icons.LoginOutlined />
                        Login
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={ PageUrls.register } className="navbar__item" >
                    <NavLink to={ PageUrls.register } >
                        <icons.SaveOutlined />
                        Register
                    </NavLink>
                </Menu.Item>
            </Menu>
        );

    return <>{ navigationsLinks }</>;
};


export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
    state => ({ userId: UserSelectors.getUserId(state) }),
    { logout }
)(NavBar);