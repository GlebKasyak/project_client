import React, { FC, useEffect, ComponentType } from "react";

import { PageUrls } from "../shared/constants";
import { storageKeys } from "../shared/constants/commons";

const WithAuthRedirect = <P extends any>(Component: ComponentType<P>) => {
    const RedirectComponent: FC<P> = props => {

        useEffect(() => {
            let isAuth = localStorage.getItem(storageKeys.isAuth);

            if(isAuth && JSON.parse(isAuth)) {
                props.history.push(PageUrls.home);
            }
        }, [props.history]);

        return <Component { ...props } />
    };

    RedirectComponent.displayName = "WithAuthRedirect";
    return RedirectComponent;
};

export default WithAuthRedirect;