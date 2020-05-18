import React, { useState, useEffect, useCallback } from "react";
import { Card } from "antd";
import { useHistory } from "react-router-dom";

import { Preloader } from "../../components";

import { UserAPI } from "../../apiServices/userAPI";
import { getDataFromQueryUrl } from "../../shared/helpres";

const UserInfoPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const fetchData = useCallback(async (userId: string) => {
        setIsLoading(true);
        const user = await UserAPI.getUserInfo(userId);

        setIsLoading(false);
        console.log(user)
    },[]);

    useEffect(() => {
        const { userId } = getDataFromQueryUrl(history.location.search);
        if(userId) fetchData(userId)
    }, [history.location.search, fetchData]);

    if(isLoading) return <Preloader text="User is loading..." />

    return (
        <div className="container" >
          <div className="user-info-page" >
              <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                  <Card.Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>,
          </div>
        </div>
    )
}

export default UserInfoPage;