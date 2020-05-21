import React, { useEffect, ComponentType } from "react";
import { RouteComponentProps  } from "react-router-dom";

import { PageUrls } from "../shared/constants";
import { storageKeys } from "../shared/constants/commons";

const WithDoNotAuthRedirect = <P extends RouteComponentProps>(Component: ComponentType<P>) => {
     const RedirectComponent: React.FC<P> = props => {
        useEffect(() => {
            let isAuth = localStorage.getItem(storageKeys.isAuth);

            if(!isAuth || !JSON.parse(isAuth)) {
                if(props.history.location.pathname !== PageUrls.register) {
                    props.history.push(PageUrls.login);
                }
            }

        }, [props.history]);

        return <Component { ...props } />
    };

    RedirectComponent.displayName = "WithDoNotAuthRedirect";
    return RedirectComponent;
};

export default WithDoNotAuthRedirect;