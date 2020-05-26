import axios from "axios";

import { MainEndpoints } from "../shared/constants/api.contsnts";
import { ReactionType } from "../interfaces/reaction";


class ReactionAPI {
    static createReaction = (data: ReactionType) => axios.post(`${ MainEndpoints.reaction }`, data);

    static remoteReaction = (data: ReactionType) =>
        axios.delete(`${ MainEndpoints.reaction }/${ JSON.stringify(data) }`);
}

export default ReactionAPI;