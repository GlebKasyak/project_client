import React, { useEffect, ComponentType } from "react";

import { PageUrls } from "../assets/constants";
import { storageKeys } from "../assets/constants/commons";

const WithAuthRedirect = <P extends any>(Component: ComponentType<P>) => {
    const RedirectComponent: React.FC<P> = props => {

        useEffect(() => {
            let isAuth = localStorage.getItem(storageKeys.isAuth);

            if(isAuth && JSON.parse(isAuth)) props.history.push(PageUrls.home);
        }, [props.history]);

        return <Component { ...props } />
    };

    RedirectComponent.displayName = `WithAuthRedirect`;
    return RedirectComponent;
};

export default WithAuthRedirect;