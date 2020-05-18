import React, { FC } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Button } from "antd";

import { pageUrls } from "../../../assets/constants";
import { storageKeys } from "../../../assets/constants/commons";
import { logout, ThunkDispatchUsersType } from "../../../store/actions/user.action";
import icons from "../../../shared/icons";
import "./style.scss";


type Props = {
    dispatch: ThunkDispatchUsersType
}

const NavBar: FC<Props> = ({ dispatch }) => {
    const history = useHistory();
    const { pathname } = history.location;

    const authData = localStorage.getItem(storageKeys.isAuth);

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
                    <Menu.Item key={ pageUrls.home } className="navbar__item" >
                        <NavLink exact to={ pageUrls.home } >
                            <icons.HomeOutlined />
                            Home
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={ pageUrls.users } className="navbar__item" >
                        <NavLink to={ pageUrls.users } >
                            <icons.ContactsOutlined />
                            Users
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={ pageUrls.dialogs } className="navbar__item" >
                        <NavLink to={ pageUrls.dialogs } >
                            <icons.MessageOutlined />
                            Dialogs
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={ pageUrls.profile } className="navbar__item" >
                        <NavLink to={ pageUrls.profile } >
                            <icons.UserOutlined />
                            Profile
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key={ pageUrls.logout }  >
                        <Button
                            type="danger"
                            className="w-100 btn"
                            icon="logout"
                            onClick={ () => dispatch(logout()) }
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
                <Menu.Item key={ pageUrls.login } className="navbar__item" >
                    <NavLink to={ pageUrls.login }  >
                        <icons.LoginOutlined />
                        Login
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={ pageUrls.register } className="navbar__item" >
                    <NavLink to={ pageUrls.register } >
                        <icons.SaveOutlined />
                        Register
                    </NavLink>
                </Menu.Item>
            </Menu>
        );

    return <>{ navigationsLinks }</>;
};


export default connect()(NavBar);